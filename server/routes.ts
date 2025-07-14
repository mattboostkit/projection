import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertDonationSchema, insertProjectSchema } from "@shared/schema";
import { z } from "zod";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const { pillar, country } = req.query;
      let projects;
      
      if (pillar && typeof pillar === 'string') {
        projects = await storage.getProjectsByPillar(pillar);
      } else if (country && typeof country === 'string') {
        projects = await storage.getProjectsByLocation(country);
      } else {
        projects = await storage.getAllProjects();
      }
      
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get single project
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Create new project
  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // Update project
  app.put("/api/projects/:id", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.updateProject(projectId, validatedData);
      res.json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  // Delete project
  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      await storage.deleteProject(projectId);
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Seed database with sample projects
  app.post("/api/projects/seed", async (req, res) => {
    try {
      const sampleProjects = [
        {
          title: "Maasai Mara Elephant Protection Initiative",
          description: "Supporting local communities in elephant conservation efforts through education, anti-poaching measures, and sustainable tourism practices in the Maasai Mara ecosystem.",
          shortDescription: "Protecting elephant corridors and reducing human-wildlife conflict",
          pillar: "conservation",
          location: "Maasai Mara",
          country: "Kenya",
          goalAmount: "45000",
          partnerOrganisation: "Wildlife Works",
          partnerLogo: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=32&h=32&fit=crop&crop=face",
          projectImage: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&h=600&fit=crop",
        },
        {
          title: "Kilimanjaro Rural Schools Initiative",
          description: "Building classrooms, training teachers, and providing learning materials to remote schools in the Kilimanjaro region.",
          shortDescription: "Building classrooms and training teachers in rural Tanzania",
          pillar: "education",
          location: "Kilimanjaro",
          country: "Tanzania",
          goalAmount: "28500",
          partnerOrganisation: "Teach for Tanzania",
          partnerLogo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face",
          projectImage: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=600&fit=crop",
        },
        {
          title: "Mobile Health Clinics Programme",
          description: "Bringing essential healthcare services to remote communities through mobile clinics and telemedicine initiatives.",
          shortDescription: "Mobile healthcare services for remote communities",
          pillar: "health",
          location: "Eastern Cape",
          country: "South Africa",
          goalAmount: "52000",
          partnerOrganisation: "Health Connect",
          partnerLogo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=32&h=32&fit=crop&crop=face",
          projectImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
        },
        {
          title: "Serengeti Wildlife Conservation",
          description: "Protecting the Serengeti ecosystem through anti-poaching efforts and community engagement programmes.",
          shortDescription: "Anti-poaching and community engagement in the Serengeti",
          pillar: "conservation",
          location: "Serengeti",
          country: "Tanzania",
          goalAmount: "75000",
          partnerOrganisation: "Serengeti Trust",
          partnerLogo: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=32&h=32&fit=crop&crop=face",
          projectImage: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800&h=600&fit=crop",
        },
        {
          title: "Malawi Water Wells Project",
          description: "Providing clean water access to rural communities through sustainable well construction and maintenance programmes.",
          shortDescription: "Clean water access through sustainable well construction",
          pillar: "health",
          location: "Lilongwe District",
          country: "Malawi",
          goalAmount: "35000",
          partnerOrganisation: "Water for Life",
          partnerLogo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=32&h=32&fit=crop&crop=face",
          projectImage: "https://images.unsplash.com/photo-1541840504649-5b0329934c27?w=800&h=600&fit=crop",
        },
        {
          title: "Uganda Girls' Education Programme",
          description: "Empowering young women through education, mentorship, and vocational training in rural Ugandan communities.",
          shortDescription: "Empowering young women through education and mentorship",
          pillar: "education",
          location: "Gulu District",
          country: "Uganda",
          goalAmount: "22000",
          partnerOrganisation: "Educate Girls Uganda",
          partnerLogo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face",
          projectImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
        }
      ];

      const createdProjects = [];
      for (const projectData of sampleProjects) {
        const project = await storage.createProject(projectData);
        createdProjects.push(project);
      }

      res.json({ 
        message: "Sample projects created successfully", 
        projects: createdProjects 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to seed projects" });
    }
  });

  // Create user
  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(409).json({ message: "User already exists with this email" });
      }
      
      const user = await storage.createUser(validatedData);
      // Don't return password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  // User login (simplified)
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUserByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Don't return password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Create donation
  app.post("/api/donations", async (req, res) => {
    try {
      const validatedData = insertDonationSchema.parse(req.body);
      const donation = await storage.createDonation(validatedData);
      res.status(201).json(donation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid donation data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to process donation" });
    }
  });

  // Get user donations
  app.get("/api/users/:id/donations", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const donations = await storage.getUserDonations(userId);
      res.json(donations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user donations" });
    }
  });

  // Get user stats
  app.get("/api/users/:id/stats", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const stats = await storage.getUserStats(userId);
      
      if (!stats) {
        return res.status(404).json({ message: "User stats not found" });
      }
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user stats" });
    }
  });

  // Get project impact metrics
  app.get("/api/projects/:id/impact", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const metrics = await storage.getProjectImpactMetrics(projectId);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch impact metrics" });
    }
  });

  // Get global stats
  app.get("/api/stats/global", async (req, res) => {
    try {
      const stats = await storage.getGlobalStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch global stats" });
    }
  });

  // Stripe payment endpoints
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, projectId, donorEmail } = req.body;
      
      if (!amount || amount < 1) {
        return res.status(400).json({ message: "Invalid donation amount" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to pence
        currency: "gbp",
        metadata: {
          projectId: projectId?.toString() || '',
          donorEmail: donorEmail || '',
        },
      });

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      });
    } catch (error: any) {
      console.error("Payment intent creation error:", error);
      res.status(500).json({ 
        message: "Error creating payment intent: " + error.message 
      });
    }
  });

  // Webhook to handle successful payments
  app.post("/api/webhooks/stripe", async (req, res) => {
    try {
      const sig = req.headers['stripe-signature'] as string;
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || '');
      } catch (err: any) {
        console.log(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Create donation record
        const { projectId, donorEmail } = paymentIntent.metadata;
        if (projectId) {
          await storage.createDonation({
            projectId: parseInt(projectId),
            userId: 1, // Default user for now - will update when auth is complete
            amount: (paymentIntent.amount / 100).toString(), // Convert back to pounds
            message: `Donation via Stripe (${paymentIntent.id})`,
            isRecurring: false,
            recurringFrequency: null,
          });

          // Update project amount
          await storage.updateProjectAmount(
            parseInt(projectId),
            (paymentIntent.amount / 100).toString()
          );
        }
      }

      res.json({received: true});
    } catch (error: any) {
      console.error("Webhook error:", error);
      res.status(500).json({ message: "Webhook processing failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
