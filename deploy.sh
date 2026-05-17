#!/bin/bash

# Kisan Andolan UP - Deployment Script

echo "🌾 किसान आंदोलन उत्तर प्रदेश - Deployment"
echo "=========================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose not found. Please install Docker Compose first."
    exit 1
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please edit .env file with your AWS credentials before proceeding."
    exit 1
fi

# Build and start containers
echo "🐳 Building and starting Docker containers..."
docker-compose down
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check health
echo "🏥 Checking service health..."
if curl -s http://localhost/api/health > /dev/null; then
    echo "✅ Backend is healthy!"
else
    echo "⚠️  Backend health check failed. Check logs with: docker-compose logs backend"
fi

echo ""
echo "🎉 Deployment Complete!"
echo "======================="
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:5000/api"
echo "Nginx Proxy: http://localhost"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop: docker-compose down"
