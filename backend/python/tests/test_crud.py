"""
Tests for CRUD operations
"""
import pytest
from uuid import uuid4
from crud import (
    create_direction, get_direction, get_direction_by_slug, get_directions,
    create_appeal, get_appeal, get_appeal_by_token, get_appeals
)
from schemas import DirectionCreate, AppealCreate


def test_create_direction(db, sample_direction_data):
    """Test creating a direction"""
    direction = create_direction(db, DirectionCreate(**sample_direction_data))
    assert direction.id is not None
    assert direction.slug == sample_direction_data["slug"]
    assert direction.title == sample_direction_data["title"]


def test_get_direction(db, sample_direction_data):
    """Test getting a direction by ID"""
    direction = create_direction(db, DirectionCreate(**sample_direction_data))
    retrieved = get_direction(db, direction.id)
    assert retrieved is not None
    assert retrieved.id == direction.id
    assert retrieved.slug == direction.slug


def test_get_direction_by_slug(db, sample_direction_data):
    """Test getting a direction by slug"""
    direction = create_direction(db, DirectionCreate(**sample_direction_data))
    retrieved = get_direction_by_slug(db, sample_direction_data["slug"])
    assert retrieved is not None
    assert retrieved.slug == sample_direction_data["slug"]


def test_get_directions(db, sample_direction_data):
    """Test getting all directions"""
    # Create multiple directions
    for i in range(3):
        data = sample_direction_data.copy()
        data["slug"] = f"test-direction-{i}"
        data["title"] = f"Test Direction {i}"
        create_direction(db, DirectionCreate(**data))
    
    directions = get_directions(db, skip=0, limit=10)
    assert len(directions) == 3


def test_create_appeal(db, sample_appeal_data):
    """Test creating an appeal"""
    appeal = create_appeal(db, AppealCreate(**sample_appeal_data))
    assert appeal.id is not None
    assert appeal.title == sample_appeal_data["title"]
    assert appeal.status == "new"
    assert appeal.public_token is not None


def test_get_appeal(db, sample_appeal_data):
    """Test getting an appeal by ID"""
    appeal = create_appeal(db, AppealCreate(**sample_appeal_data))
    retrieved = get_appeal(db, appeal.id)
    assert retrieved is not None
    assert retrieved.id == appeal.id
    assert retrieved.title == appeal.title


def test_get_appeal_by_token(db, sample_appeal_data):
    """Test getting an appeal by public token"""
    appeal = create_appeal(db, AppealCreate(**sample_appeal_data))
    retrieved = get_appeal_by_token(db, appeal.public_token)
    assert retrieved is not None
    assert retrieved.public_token == appeal.public_token


def test_get_appeals(db, sample_appeal_data):
    """Test getting all appeals"""
    # Create multiple appeals
    for i in range(3):
        data = sample_appeal_data.copy()
        data["title"] = f"Test Appeal {i}"
        create_appeal(db, AppealCreate(**data))
    
    appeals = get_appeals(db, skip=0, limit=10)
    assert len(appeals) == 3

