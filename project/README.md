# SkillLink 🚀

**A Modern Freelance Marketplace Platform**

SkillLink is a full-stack freelance job marketplace that connects clients with skilled freelancers worldwide. Built with modern web technologies, it provides a seamless experience for job posting, bidding, hiring, project delivery, and secure payments.

![SkillLink Demo](https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🌟 Overview

SkillLink solves the core problem of connecting businesses with skilled freelancers for projects of any size. Whether you're a startup looking for a quick logo design or an enterprise needing a full-stack application, SkillLink provides the tools and security you need.

### Key Benefits
- **For Clients**: Post projects, receive competitive bids, and hire top talent
- **For Freelancers**: Find opportunities, showcase skills, and build reputation
- **For Everyone**: Secure payments, real-time communication, and dispute resolution

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Next.js 14** for server-side rendering and optimal performance
- **Tailwind CSS** for responsive, utility-first styling
- **Zustand** for lightweight state management
- **Socket.io Client** for real-time features

### Backend
- **Node.js** with Express.js framework
- **Prisma ORM** for type-safe database operations
- **PostgreSQL** for robust data storage
- **Socket.io** for real-time chat and notifications
- **JWT** for secure authentication

### Infrastructure & Services
- **Stripe Connect** for secure payment processing
- **Cloudinary** for file upload and image optimization
- **Redis** for session management and caching
- **Docker** for containerized deployment

## ✨ Features

### 🔐 Authentication & Authorization
- Role-based authentication (Client/Freelancer)
- JWT token-based security
- OAuth integration (Google, GitHub)
- Password reset and email verification

### 👥 User Management
- **Freelancer Profiles**: Bio, skills, portfolio, hourly rates
- **Client Profiles**: Company information, project history
- Rating and review system
- Profile verification badges

### 💼 Job Management
- **Job Posting**: Rich text descriptions, budget ranges, deadlines
- **Advanced Search**: Filter by skills, budget, location, rating
- **Job Categories**: Web development, design, writing, marketing
- **Saved Jobs**: Bookmark interesting opportunities

### 💰 Bidding System
- **Smart Bidding**: Proposal templates and bid analytics
- **Bid Management**: Track submitted bids and responses
- **Automatic Matching**: AI-powered job recommendations
- **Bid Protection**: Secure bid submission process

### 📋 Contract Management
- **Milestone-based Contracts**: Break projects into phases
- **Deliverable Tracking**: File uploads and version control
- **Time Tracking**: Built-in timer for hourly projects
- **Contract Templates**: Standardized terms and conditions

### 💳 Payment System
- **Stripe Connect Integration**: Secure payment processing
- **Escrow Protection**: Funds held until project completion
- **Multiple Payment Methods**: Cards, bank transfers, digital wallets
- **Automatic Invoicing**: Generate professional invoices

### 💬 Real-Time Communication
- **Live Chat**: Instant messaging between clients and freelancers
- **File Sharing**: Share documents, images, and project files
- **Notification System**: Real-time updates on bids, messages, payments
- **Video Call Integration**: Built-in video conferencing

### 📊 Analytics & Reporting
- **Freelancer Dashboard**: Earnings, active projects, performance metrics
- **Client Dashboard**: Project status, budget tracking, team management
- **Admin Panel**: Platform analytics, user management, dispute resolution

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL 14+
- Redis (for session management)
- Stripe account (for payments)
- Cloudinary account (for file uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/skilllink.git
cd skilllink
```

2. **Install dependencies**
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. **Environment Setup**

Create `.env` files in both frontend and backend directories:

**Backend `.env`:**
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/skilllink"

# Authentication
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Redis
REDIS_URL="redis://localhost:6379"

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
NEXT_PUBLIC_SOCKET_URL="http://localhost:3001"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

4. **Database Setup**
```bash
cd backend
npx prisma migrate dev
npx prisma db seed
```

5. **Start Development Servers**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit `http://localhost:3000` to see the application!

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
POST   /api/auth/logout       # User logout
POST   /api/auth/refresh      # Refresh JWT token
POST   /api/auth/forgot       # Password reset request
POST   /api/auth/reset        # Password reset confirmation
```

### Users
```
GET    /api/users/profile     # Get current user profile
PUT    /api/users/profile     # Update user profile
GET    /api/users/:id         # Get public user profile
POST   /api/users/avatar      # Upload profile picture
GET    /api/users/stats       # Get user statistics
```

### Jobs
```
GET    /api/jobs              # List jobs with filters
POST   /api/jobs              # Create new job
GET    /api/jobs/:id          # Get job details
PUT    /api/jobs/:id          # Update job
DELETE /api/jobs/:id          # Delete job
GET    /api/jobs/:id/bids     # Get job bids
```

### Bids
```
POST   /api/bids              # Submit bid
GET    /api/bids/my-bids      # Get user's bids
PUT    /api/bids/:id          # Update bid
DELETE /api/bids/:id          # Withdraw bid
POST   /api/bids/:id/accept   # Accept bid (create contract)
```

### Contracts
```
GET    /api/contracts         # List user contracts
GET    /api/contracts/:id     # Get contract details
PUT    /api/contracts/:id     # Update contract status
POST   /api/contracts/:id/deliverables  # Upload deliverables
POST   /api/contracts/:id/complete      # Mark contract complete
```

### Chat
```
GET    /api/chat/conversations # Get user conversations
GET    /api/chat/:id/messages  # Get conversation messages
POST   /api/chat/:id/messages  # Send message
POST   /api/chat/upload        # Upload file to chat
```

### Payments
```
POST   /api/payments/setup-intent     # Create payment intent
POST   /api/payments/process          # Process payment
GET    /api/payments/history          # Payment history
POST   /api/payments/refund           # Request refund
```

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Using Docker
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Manual Deployment

**Backend (Railway/Render):**
1. Set environment variables
2. Deploy from GitHub
3. Run database migrations

**Frontend (Vercel):**
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

- **Project Maintainer**: [Your Name](mailto:your.email@example.com)
- **GitHub Issues**: [Report bugs or request features](https://github.com/yourusername/skilllink/issues)
- **Documentation**: [Full documentation](https://skilllink-docs.vercel.app)
- **Discord Community**: [Join our Discord](https://discord.gg/skilllink)

## 🙏 Acknowledgments

- [Stripe](https://stripe.com) for payment processing
- [Cloudinary](https://cloudinary.com) for media management
- [Prisma](https://prisma.io) for database tooling
- [Vercel](https://vercel.com) for hosting and deployment

---

**Built with ❤️ by the SkillLink Team**

[⭐ Star this repo](https://github.com/yourusername/skilllink) | [🐛 Report Bug](https://github.com/yourusername/skilllink/issues) | [💡 Request Feature](https://github.com/yourusername/skilllink/issues)