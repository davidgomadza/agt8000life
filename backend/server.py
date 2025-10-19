from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import secrets
import base64

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ======================
# MODELS
# ======================

class UserCreate(BaseModel):
    email: EmailStr
    name: str

class UserLogin(BaseModel):
    email: EmailStr

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    name: str
    wallet_address: str = Field(default_factory=lambda: f"AGT{secrets.token_hex(6).upper()}")
    world_chain_balance: float = 5.0  # Demo balance
    body_agt_balance: float = 0.0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PurchaseCreate(BaseModel):
    amount: float

class Purchase(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    amount: float
    total_price: float
    status: str = "pending"  # pending, verified, rejected
    payment_proof: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TransactionCreate(BaseModel):
    recipient_address: str
    amount: float
    coin_type: str  # world_chain or body_agt

class Transaction(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    from_user_id: str
    from_address: str
    to_address: str
    amount: float
    coin_type: str
    status: str = "completed"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProofSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    purchase_id: str
    user_id: str
    receipt_data: Optional[str] = None
    screenshot_data: Optional[str] = None
    status: str = "pending"  # pending, approved, rejected
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    verified_at: Optional[datetime] = None

class WalletResponse(BaseModel):
    wallet_address: str
    world_chain_balance: float
    body_agt_balance: float
    activation_status: str

# ======================
# HELPER FUNCTIONS
# ======================

def serialize_datetime(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    return obj

def deserialize_datetime(doc):
    if 'created_at' in doc and isinstance(doc['created_at'], str):
        doc['created_at'] = datetime.fromisoformat(doc['created_at'])
    if 'verified_at' in doc and isinstance(doc['verified_at'], str) and doc['verified_at']:
        doc['verified_at'] = datetime.fromisoformat(doc['verified_at'])
    return doc

# ======================
# AUTH ROUTES
# ======================

@api_router.post("/auth/signup", response_model=User)
async def signup(user_data: UserCreate):
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email}, {"_id": 0})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user = User(**user_data.model_dump())
    doc = user.model_dump()
    doc['created_at'] = serialize_datetime(doc['created_at'])
    
    await db.users.insert_one(doc)
    return user

@api_router.post("/auth/login", response_model=User)
async def login(login_data: UserLogin):
    user = await db.users.find_one({"email": login_data.email}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user = deserialize_datetime(user)
    return User(**user)

# ======================
# WALLET ROUTES
# ======================

@api_router.get("/wallet/{user_id}", response_model=WalletResponse)
async def get_wallet(user_id: str):
    user = await db.users.find_one({"id": user_id}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    activation_status = "Active" if user['body_agt_balance'] >= 8000 else "Not Activated" if user['body_agt_balance'] == 0 else f"Partial Activation ({user['body_agt_balance']} AGT)"
    
    return WalletResponse(
        wallet_address=user['wallet_address'],
        world_chain_balance=user['world_chain_balance'],
        body_agt_balance=user['body_agt_balance'],
        activation_status=activation_status
    )

# ======================
# PURCHASE ROUTES
# ======================

@api_router.post("/purchase/{user_id}", response_model=Purchase)
async def create_purchase(user_id: str, purchase_data: PurchaseCreate):
    user = await db.users.find_one({"id": user_id}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    total_price = purchase_data.amount * 100  # $100 per AGT
    
    purchase = Purchase(
        user_id=user_id,
        amount=purchase_data.amount,
        total_price=total_price
    )
    
    doc = purchase.model_dump()
    doc['created_at'] = serialize_datetime(doc['created_at'])
    
    await db.purchases.insert_one(doc)
    return purchase

@api_router.get("/purchases/{user_id}", response_model=List[Purchase])
async def get_purchases(user_id: str):
    purchases = await db.purchases.find({"user_id": user_id}, {"_id": 0}).to_list(100)
    
    for purchase in purchases:
        purchase = deserialize_datetime(purchase)
    
    return purchases

# ======================
# TRANSACTION ROUTES
# ======================

@api_router.post("/send/{user_id}", response_model=Transaction)
async def send_agt(user_id: str, transaction_data: TransactionCreate):
    user = await db.users.find_one({"id": user_id}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Check balance
    if transaction_data.coin_type == "world_chain":
        if user['world_chain_balance'] < transaction_data.amount:
            raise HTTPException(status_code=400, detail="Insufficient World Chain AGT balance")
        
        # Deduct from sender
        await db.users.update_one(
            {"id": user_id},
            {"$inc": {"world_chain_balance": -transaction_data.amount}}
        )
        
        # Add to recipient (if exists)
        recipient = await db.users.find_one({"wallet_address": transaction_data.recipient_address}, {"_id": 0})
        if recipient:
            await db.users.update_one(
                {"wallet_address": transaction_data.recipient_address},
                {"$inc": {"world_chain_balance": transaction_data.amount}}
            )
    else:
        if user['body_agt_balance'] < transaction_data.amount:
            raise HTTPException(status_code=400, detail="Insufficient Body AGT balance")
        
        # Deduct from sender
        await db.users.update_one(
            {"id": user_id},
            {"$inc": {"body_agt_balance": -transaction_data.amount}}
        )
        
        # Add to recipient (if exists)
        recipient = await db.users.find_one({"wallet_address": transaction_data.recipient_address}, {"_id": 0})
        if recipient:
            await db.users.update_one(
                {"wallet_address": transaction_data.recipient_address},
                {"$inc": {"body_agt_balance": transaction_data.amount}}
            )
    
    transaction = Transaction(
        from_user_id=user_id,
        from_address=user['wallet_address'],
        to_address=transaction_data.recipient_address,
        amount=transaction_data.amount,
        coin_type=transaction_data.coin_type
    )
    
    doc = transaction.model_dump()
    doc['created_at'] = serialize_datetime(doc['created_at'])
    
    await db.transactions.insert_one(doc)
    return transaction

@api_router.get("/transactions/{user_id}", response_model=List[Transaction])
async def get_transactions(user_id: str):
    user = await db.users.find_one({"id": user_id}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    transactions = await db.transactions.find(
        {"$or": [{"from_user_id": user_id}, {"to_address": user['wallet_address']}]},
        {"_id": 0}
    ).to_list(100)
    
    for transaction in transactions:
        transaction = deserialize_datetime(transaction)
    
    return transactions

# ======================
# PROOF OF PURCHASE ROUTES
# ======================

@api_router.post("/proof/submit/{user_id}")
async def submit_proof(
    user_id: str,
    purchase_id: str = Form(...),
    receipt: Optional[str] = Form(None),
    screenshot: Optional[str] = Form(None)
):
    user = await db.users.find_one({"id": user_id}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    purchase = await db.purchases.find_one({"id": purchase_id}, {"_id": 0})
    if not purchase:
        raise HTTPException(status_code=404, detail="Purchase not found")
    
    proof = ProofSubmission(
        purchase_id=purchase_id,
        user_id=user_id,
        receipt_data=receipt,
        screenshot_data=screenshot
    )
    
    doc = proof.model_dump()
    doc['created_at'] = serialize_datetime(doc['created_at'])
    
    await db.proof_submissions.insert_one(doc)
    
    # Auto-verify (simplified for now)
    if receipt or screenshot:
        await db.proof_submissions.update_one(
            {"id": proof.id},
            {"$set": {"status": "approved", "verified_at": datetime.now(timezone.utc).isoformat()}}
        )
        
        await db.purchases.update_one(
            {"id": purchase_id},
            {"$set": {"status": "verified"}}
        )
        
        # Credit the user with Body AGT
        await db.users.update_one(
            {"id": user_id},
            {"$inc": {"body_agt_balance": purchase['amount']}}
        )
        
        return {"message": "Proof submitted and verified successfully", "status": "approved"}
    
    return {"message": "Proof submitted for review", "status": "pending"}

@api_router.get("/proof/status/{user_id}")
async def get_proof_status(user_id: str):
    proofs = await db.proof_submissions.find({"user_id": user_id}, {"_id": 0}).to_list(100)
    
    for proof in proofs:
        proof = deserialize_datetime(proof)
    
    return proofs

# ======================
# BASIC ROUTES
# ======================

@api_router.get("/")
async def root():
    return {"message": "AGT API - Advanced GeneticSynthesis Technology"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()