import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())

// Types
interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

interface Service {
  id: string
  title: string
  description: string
  features: string[]
  icon: string
}

interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio: string
}

interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  content: string
  rating: number
}

// Mock Data
const services: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks and best practices for optimal performance.',
    features: ['React & Next.js', 'Node.js Backend', 'Database Design', 'API Development'],
    icon: 'Code2',
  },
  {
    id: '2',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
    features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Optimization'],
    icon: 'Smartphone',
  },
  {
    id: '3',
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and migration services for modern businesses.',
    features: ['AWS & Azure', 'Cloud Migration', 'DevOps', 'Serverless Architecture'],
    icon: 'Cloud',
  },
  {
    id: '4',
    title: 'AI & Machine Learning',
    description: 'Intelligent solutions powered by cutting-edge AI and machine learning technologies.',
    features: ['Custom AI Models', 'Data Analytics', 'NLP Solutions', 'Computer Vision'],
    icon: 'Brain',
  },
  {
    id: '5',
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your digital assets and data.',
    features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Incident Response'],
    icon: 'Shield',
  },
  {
    id: '6',
    title: 'Digital Transformation',
    description: 'End-to-end digital transformation services to modernize your business.',
    features: ['Process Automation', 'Legacy Modernization', 'Digital Strategy', 'Change Management'],
    icon: 'Zap',
  },
]

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'CEO & Founder',
    image: '/team/alex.jpg',
    bio: 'Visionary leader with 15+ years in tech industry.',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'CTO',
    image: '/team/sarah.jpg',
    bio: 'Expert in cloud architecture and AI solutions.',
  },
  {
    id: '3',
    name: 'Michael Brown',
    role: 'Lead Developer',
    image: '/team/michael.jpg',
    bio: 'Full-stack developer with passion for clean code.',
  },
  {
    id: '4',
    name: 'Emily Davis',
    role: 'Design Director',
    image: '/team/emily.jpg',
    bio: 'Creating beautiful and intuitive user experiences.',
  },
]

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'John Smith',
    company: 'TechStart Inc.',
    role: 'CEO',
    content: 'Quantix transformed our entire digital infrastructure. Their expertise and dedication are unmatched.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Lisa Wang',
    company: 'GlobalRetail',
    role: 'CTO',
    content: 'Working with Quantix was a game-changer for our e-commerce platform. Highly recommended!',
    rating: 5,
  },
  {
    id: '3',
    name: 'David Miller',
    company: 'FinanceFlow',
    role: 'VP of Technology',
    content: 'The team delivered our project on time and exceeded all expectations. True professionals.',
    rating: 5,
  },
]

const stats = {
  projectsDelivered: 500,
  happyClients: 150,
  yearsExperience: 10,
  teamMembers: 100,
  countriesServed: 30,
  clientRating: 4.9,
}

// Contact form submissions storage (in-memory)
const contactSubmissions: (ContactForm & { id: string; createdAt: Date })[] = []

// API Routes

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    service: 'Quantix Backend API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// Get all services
app.get('/api/services', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: services,
    count: services.length
  })
})

// Get single service
app.get('/api/services/:id', (req: Request, res: Response) => {
  const service = services.find(s => s.id === req.params.id)
  if (!service) {
    return res.status(404).json({
      success: false,
      error: 'Service not found'
    })
  }
  res.json({
    success: true,
    data: service
  })
})

// Get team members
app.get('/api/team', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: teamMembers,
    count: teamMembers.length
  })
})

// Get testimonials
app.get('/api/testimonials', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: testimonials,
    count: testimonials.length
  })
})

// Get stats
app.get('/api/stats', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: stats
  })
})

// Contact form submission
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body as ContactForm

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required'
    })
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format'
    })
  }

  // Create submission
  const submission = {
    id: `contact_${Date.now()}`,
    name,
    email,
    subject,
    message,
    createdAt: new Date()
  }

  contactSubmissions.push(submission)

  console.log('📧 New contact form submission:', submission)

  res.status(201).json({
    success: true,
    message: 'Message sent successfully! We will get back to you within 24 hours.',
    data: {
      id: submission.id,
      createdAt: submission.createdAt
    }
  })
})

// Get all contact submissions (admin endpoint)
app.get('/api/contact/submissions', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: contactSubmissions,
    count: contactSubmissions.length
  })
})

// Newsletter subscription
app.post('/api/newsletter', (req: Request, res: Response) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({
      success: false,
      error: 'Email is required'
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format'
    })
  }

  console.log('📬 New newsletter subscription:', email)

  res.status(201).json({
    success: true,
    message: 'Successfully subscribed to newsletter!'
  })
})

// Request quote
app.post('/api/quote', (req: Request, res: Response) => {
  const { name, email, company, phone, service, budget, timeline, description } = req.body

  if (!name || !email || !service || !description) {
    return res.status(400).json({
      success: false,
      error: 'Required fields missing'
    })
  }

  const quoteRequest = {
    id: `quote_${Date.now()}`,
    name,
    email,
    company,
    phone,
    service,
    budget,
    timeline,
    description,
    createdAt: new Date()
  }

  console.log('💰 New quote request:', quoteRequest)

  res.status(201).json({
    success: true,
    message: 'Quote request submitted! We will contact you within 48 hours.',
    data: {
      id: quoteRequest.id,
      createdAt: quoteRequest.createdAt
    }
  })
})

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Server error:', err)
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Quantix Backend API running on port ${PORT}`)
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`)
})
