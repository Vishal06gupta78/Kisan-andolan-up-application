kisan-andolan-up/
│
├── docker-compose.yml          # Docker orchestration
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── deploy.sh                   # Deployment script
├── README.md                   # Project documentation
│
├── backend/                    # Node.js + Express Backend
│   ├── Dockerfile              # Backend container config
│   ├── package.json            # Backend dependencies
│   └── src/
│       ├── server.js           # Express server entry
│       ├── models/
│       │   ├── Member.js       # Member schema
│       │   ├── Media.js        # Media schema
│       │   └── Achievement.js  # Achievement schema
│       ├── routes/
│       │   ├── members.js      # Member registration API
│       │   ├── media.js        # Media gallery API
│       │   ├── achievements.js # Achievements API
│       │   └── upload.js       # S3 upload API
│       └── utils/
│           ├── s3.js           # AWS S3 utilities
│           └── cardGenerator.js # Membership card generator
│
├── frontend/                   # Next.js 14 Frontend
│   ├── Dockerfile              # Frontend container config
│   ├── package.json            # Frontend dependencies
│   ├── next.config.js          # Next.js configuration
│   ├── tailwind.config.js      # Tailwind CSS config
│   ├── postcss.config.js       # PostCSS config
│   ├── tsconfig.json           # TypeScript config
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── HeroSection.tsx     # Hero with parallax
│   │   ├── AboutSection.tsx    # Leader profile
│   │   ├── StatsSection.tsx    # Animated counters
│   │   ├── AchievementsSection.tsx # Achievements grid
│   │   ├── MediaGallery.tsx    # Image carousel
│   │   ├── VideoSection.tsx    # Video gallery
│   │   ├── ImpactSection.tsx   # Impact cards
│   │   ├── TestimonialsSection.tsx # Testimonials slider
│   │   ├── MembershipSection.tsx # Registration form
│   │   └── Footer.tsx          # Footer
│   ├── lib/
│   │   └── api.ts              # API utilities
│   └── public/
│       └── images/             # Static images
│
└── nginx/
    └── nginx.conf              # Reverse proxy config
