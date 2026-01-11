"""
Tests for API endpoints
"""
import pytest
from fastapi import status


def test_get_directions(client):
    """Test GET /api/directions"""
    response = client.get("/api/directions")
    assert response.status_code == status.HTTP_200_OK
    assert isinstance(response.json(), list)


def test_create_appeal(client, sample_appeal_data):
    """Test POST /api/appeals"""
    response = client.post("/api/appeals", json=sample_appeal_data)
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["title"] == sample_appeal_data["title"]
    assert "id" in data
    assert "public_token" in data


def test_get_appeal_by_token(client, sample_appeal_data):
    """Test GET /api/appeals/token/{token}"""
    # Create appeal first
    create_response = client.post("/api/appeals", json=sample_appeal_data)
    assert create_response.status_code == status.HTTP_201_CREATED
    token = create_response.json()["public_token"]
    
    # Get by token
    response = client.get(f"/api/appeals/token/{token}")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["public_token"] == token


def test_get_appeals_with_filters(client, sample_appeal_data):
    """Test GET /api/appeals with filters"""
    # Create appeal
    client.post("/api/appeals", json=sample_appeal_data)
    
    # Get with status filter
    response = client.get("/api/appeals?status=new")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert isinstance(data, list)
    
    # Get with priority filter
    response = client.get("/api/appeals?priority=normal")
    assert response.status_code == status.HTTP_200_OK


def test_update_appeal(client, sample_appeal_data):
    """Test PATCH /api/appeals/{id}"""
    # Create appeal
    create_response = client.post("/api/appeals", json=sample_appeal_data)
    appeal_id = create_response.json()["id"]
    
    # Update appeal
    update_data = {"status": "in_progress", "priority": "high"}
    response = client.patch(f"/api/appeals/{appeal_id}", json=update_data)
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["status"] == "in_progress"
    assert data["priority"] == "high"


def test_get_appeal_not_found(client):
    """Test GET /api/appeals/{id} with non-existent ID"""
    fake_id = "00000000-0000-0000-0000-000000000000"
    response = client.get(f"/api/appeals/{fake_id}")
    assert response.status_code == status.HTTP_404_NOT_FOUND

