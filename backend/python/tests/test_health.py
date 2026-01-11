"""
Tests for health check endpoints
"""
import pytest
from fastapi import status


def test_health_check(client):
    """Test basic health check"""
    response = client.get("/health")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["status"] == "ok"
    assert "timestamp" in data
    assert "version" in data
    assert data["version"] == "2.0.0"


def test_detailed_health_check(client):
    """Test detailed health check"""
    response = client.get("/health/detailed")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "status" in data
