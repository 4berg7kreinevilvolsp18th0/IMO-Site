"""
Pytest configuration and fixtures
"""
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from fastapi.testclient import TestClient
from database import Base, get_db
from main import app
import os

# Use in-memory SQLite for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db():
    """Create a fresh database for each test"""
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db):
    """Create a test client with database override"""
    def override_get_db():
        try:
            yield db
        finally:
            pass
    
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture
def sample_direction_data():
    """Sample direction data for testing"""
    return {
        "slug": "test-direction",
        "title": "Test Direction",
        "description": "Test description",
        "color_key": "blue",
        "is_active": True
    }


@pytest.fixture
def sample_appeal_data():
    """Sample appeal data for testing"""
    return {
        "title": "Test Appeal",
        "description": "Test appeal description",
        "contact_type": "email",
        "contact_value": "test@example.com",
        "is_anonymous": False,
        "status": "new",
        "priority": "normal"
    }

