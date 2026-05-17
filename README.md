# किसान आंदोलन उत्तर प्रदेश - Official Website

A premium, production-ready website for Kisan Andolan Uttar Pradesh featuring:
- **Next.js 14** frontend with Tailwind CSS & Framer Motion animations
- **Node.js/Express** backend with MongoDB & Mongoose
- **AWS S3** integration for media storage
- **Docker** containerization for easy deployment
- **Membership system** with downloadable ID cards
- **SEO optimized** with Hindi content

## Architecture

```
kisan-andolan-up/
├── frontend/          # Next.js 14 + Tailwind + Framer Motion
├── backend/           # Node.js + Express + MongoDB + Mongoose
├── nginx/             # Reverse proxy configuration
├── docker-compose.yml # Docker orchestration
└── .env.example       # Environment variables template
```

## Quick Start

### Prerequisites
- Docker & Docker Compose
- AWS S3 Bucket (for media storage)
- MongoDB (included in Docker Compose)

### 1. Clone & Configure
```bash
git clone <repository-url>
cd kisan-andolan-up
cp .env.example .env
# Edit .env with your AWS credentials
```

### 2. Run with Docker
```bash
docker-compose up --build
```

### 3. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Nginx Proxy: http://localhost

## Features

### Frontend
- Responsive design for all devices
- Smooth scroll animations with Framer Motion
- Image carousel with Swiper.js
- Video gallery with React Player
- Membership registration form
- SEO optimized with Next.js metadata
- Hindi language support

### Backend
- RESTful API with Express.js
- MongoDB with Mongoose ODM
- JWT authentication ready
- AWS S3 file upload integration
- Membership card generation with Canvas
- Rate limiting & security headers

### Infrastructure
- Docker containerization
- Nginx reverse proxy
- MongoDB database
- Environment-based configuration

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| POST | /api/members/register | Register member |
| GET | /api/members/:id | Get member by ID |
| GET | /api/members/:id/card | Download member card |
| GET | /api/achievements | List achievements |
| GET | /api/media | List media files |
| POST | /api/upload/file | Upload file to S3 |

## Deployment

### Production Deployment
1. Set up AWS S3 bucket with public read access
2. Configure environment variables in `.env`
3. Run `docker-compose -f docker-compose.yml up -d`
4. Configure domain DNS to point to server
5. Set up SSL certificates (Let's Encrypt)

### Domain Configuration
Update `nginx/nginx.conf` with your domain:
```nginx
server_name kisanandolanup.org www.kisanandolanup.org;
```

## Customization

### Adding Images
Place images in `frontend/public/images/`:
- `hero-bg.jpg` - Hero section background
- `leader-photo.jpg` - Leader profile photo
- `gallery-*.jpg` - Gallery images
- `achievement-*.jpg` - Achievement images
- `video-thumb-*.jpg` - Video thumbnails
- `testimonial-*.jpg` - Testimonial photos

### Adding Videos
Update video URLs in `frontend/components/VideoSection.tsx`

### SEO
Update metadata in `frontend/app/layout.tsx`

## License

© 2024 किसान आंदोलन उत्तर प्रदेश. All rights reserved.
