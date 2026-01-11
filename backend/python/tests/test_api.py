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
