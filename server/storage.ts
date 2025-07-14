import { 
  users, projects, donations, impactMetrics, userStats,
  type User, type InsertUser,
  type Project, type InsertProject,
  type Donation, type InsertDonation,
  type ImpactMetric, type InsertImpactMetric,
  type UserStats
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getAllProjects(): Promise<Project[]>;
  getProjectsByPillar(pillar: string): Promise<Project[]>;
  getProjectsByLocation(country: string): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: InsertProject): Promise<Project>;
  deleteProject(id: number): Promise<void>;
  updateProjectAmount(projectId: number, newAmount: string): Promise<void>;
  
  // Donation methods
  createDonation(donation: InsertDonation): Promise<Donation>;
  getUserDonations(userId: number): Promise<Donation[]>;
  getProjectDonations(projectId: number): Promise<Donation[]>;
  
  // Impact metrics methods
  getProjectImpactMetrics(projectId: number): Promise<ImpactMetric[]>;
  createImpactMetric(metric: InsertImpactMetric): Promise<ImpactMetric>;
  
  // User stats methods
  getUserStats(userId: number): Promise<UserStats | undefined>;
  updateUserStats(userId: number, stats: Partial<UserStats>): Promise<void>;
  
  // Analytics methods
  getGlobalStats(): Promise<{
    totalProjects: number;
    totalDonated: string;
    totalLivesImpacted: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private donations: Map<number, Donation>;
  private impactMetrics: Map<number, ImpactMetric>;
  private userStatsMap: Map<number, UserStats>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentDonationId: number;
  private currentMetricId: number;
  private currentStatsId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.donations = new Map();
    this.impactMetrics = new Map();
    this.userStatsMap = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentDonationId = 1;
    this.currentMetricId = 1;
    this.currentStatsId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed projects
    const sampleProjects: Omit<Project, 'id' | 'createdAt'>[] = [
      {
        title: "Maasai Mara Elephant Protection Initiative",
        description: "Supporting local communities in protecting elephant corridors and reducing human-wildlife conflict through sustainable tourism partnerships.",
        shortDescription: "Protecting elephant corridors and reducing human-wildlife conflict",
        pillar: "conservation",
        location: "Maasai Mara",
        country: "Kenya",
        goalAmount: "45000",
        currentAmount: "33300",
        partnerOrganisation: "Wildlife Works",
        partnerLogo: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=32&h=32&fit=crop&crop=face",
        projectImage: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&h=600&fit=crop",
        rating: "4.8",
        isActive: true,
      },
      {
        title: "Kilimanjaro Rural Schools Initiative",
        description: "Building classrooms, training teachers, and providing learning materials to remote schools in the Kilimanjaro region.",
        shortDescription: "Building classrooms and training teachers in rural Tanzania",
        pillar: "education",
        location: "Kilimanjaro",
        country: "Tanzania",
        goalAmount: "28500",
        currentAmount: "26220",
        partnerOrganisation: "Teach for Tanzania",
        partnerLogo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face",
        projectImage: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=600&fit=crop",
        rating: "4.9",
        isActive: true,
      },
      {
        title: "Mobile Health Clinics Programme",
        description: "Bringing essential healthcare services to remote communities through mobile clinics and telemedicine initiatives.",
        shortDescription: "Mobile healthcare services for remote communities",
        pillar: "health",
        location: "Eastern Cape",
        country: "South Africa",
        goalAmount: "52000",
        currentAmount: "30160",
        partnerOrganisation: "Health Connect",
        partnerLogo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=32&h=32&fit=crop&crop=face",
        projectImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
        rating: "4.7",
        isActive: true,
      },
      {
        title: "Serengeti Wildlife Conservation",
        description: "Protecting the Serengeti ecosystem through anti-poaching efforts and community engagement programmes.",
        shortDescription: "Anti-poaching and community engagement in the Serengeti",
        pillar: "conservation",
        location: "Serengeti",
        country: "Tanzania",
        goalAmount: "75000",
        currentAmount: "45000",
        partnerOrganisation: "Serengeti Trust",
        partnerLogo: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=32&h=32&fit=crop&crop=face",
        projectImage: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800&h=600&fit=crop",
        rating: "4.6",
        isActive: true,
      },
      {
        title: "Malawi Water Wells Project",
        description: "Providing clean water access to rural communities through sustainable well construction and maintenance programmes.",
        shortDescription: "Clean water access through sustainable well construction",
        pillar: "health",
        location: "Lilongwe",
        country: "Malawi",
        goalAmount: "35000",
        currentAmount: "21000",
        partnerOrganisation: "Water for Life",
        partnerLogo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=32&h=32&fit=crop&crop=face",
        projectImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop",
        rating: "4.8",
        isActive: true,
      },
      {
        title: "Ghana Digital Learning Centre",
        description: "Establishing computer labs and digital literacy programmes in rural Ghanaian schools.",
        shortDescription: "Computer labs and digital literacy in rural schools",
        pillar: "education",
        location: "Kumasi",
        country: "Ghana",
        goalAmount: "42000",
        currentAmount: "31500",
        partnerOrganisation: "Digital Ghana",
        partnerLogo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face",
        projectImage: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop",
        rating: "4.7",
        isActive: true,
      }
    ];

    sampleProjects.forEach(project => {
      const id = this.currentProjectId++;
      this.projects.set(id, {
        ...project,
        id,
        createdAt: new Date(),
      });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    
    // Initialize user stats
    const statsId = this.currentStatsId++;
    this.userStatsMap.set(id, {
      id: statsId,
      userId: id,
      totalDonated: "0",
      projectsSupported: 0,
      livesImpacted: 0,
      carbonOffset: "0",
      lastUpdated: new Date(),
    });
    
    return user;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(p => p.isActive);
  }

  async getProjectsByPillar(pillar: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(p => p.pillar === pillar && p.isActive);
  }

  async getProjectsByLocation(country: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(p => p.country === country && p.isActive);
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      ...insertProject,
      id,
      currentAmount: "0",
      rating: "4.5",
      isActive: true,
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProjectAmount(projectId: number, newAmount: string): Promise<void> {
    const project = this.projects.get(projectId);
    if (project) {
      this.projects.set(projectId, { ...project, currentAmount: newAmount });
    }
  }

  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const id = this.currentDonationId++;
    const donation: Donation = {
      ...insertDonation,
      id,
      donationDate: new Date(),
    };
    this.donations.set(id, donation);
    
    // Update project current amount
    const project = await this.getProject(donation.projectId);
    if (project) {
      const newAmount = (parseFloat(project.currentAmount) + parseFloat(donation.amount)).toString();
      await this.updateProjectAmount(donation.projectId, newAmount);
    }
    
    // Update user stats
    await this.updateUserStatsAfterDonation(donation.userId, donation.amount);
    
    return donation;
  }

  private async updateUserStatsAfterDonation(userId: number, amount: string): Promise<void> {
    let stats = this.userStatsMap.get(userId);
    if (!stats) {
      const statsId = this.currentStatsId++;
      stats = {
        id: statsId,
        userId,
        totalDonated: "0",
        projectsSupported: 0,
        livesImpacted: 0,
        carbonOffset: "0",
        lastUpdated: new Date(),
      };
    }
    
    const newTotalDonated = (parseFloat(stats.totalDonated) + parseFloat(amount)).toString();
    const userDonations = Array.from(this.donations.values()).filter(d => d.userId === userId);
    const uniqueProjects = new Set(userDonations.map(d => d.projectId)).size;
    
    this.userStatsMap.set(userId, {
      ...stats,
      totalDonated: newTotalDonated,
      projectsSupported: uniqueProjects,
      livesImpacted: Math.floor(parseFloat(newTotalDonated) * 0.1), // Mock calculation
      carbonOffset: (parseFloat(newTotalDonated) * 0.002).toFixed(1),
      lastUpdated: new Date(),
    });
  }

  async getUserDonations(userId: number): Promise<Donation[]> {
    return Array.from(this.donations.values()).filter(d => d.userId === userId);
  }

  async getProjectDonations(projectId: number): Promise<Donation[]> {
    return Array.from(this.donations.values()).filter(d => d.projectId === projectId);
  }

  async getProjectImpactMetrics(projectId: number): Promise<ImpactMetric[]> {
    return Array.from(this.impactMetrics.values()).filter(m => m.projectId === projectId);
  }

  async createImpactMetric(insertMetric: InsertImpactMetric): Promise<ImpactMetric> {
    const id = this.currentMetricId++;
    const metric: ImpactMetric = {
      ...insertMetric,
      id,
      recordedAt: new Date(),
    };
    this.impactMetrics.set(id, metric);
    return metric;
  }

  async getUserStats(userId: number): Promise<UserStats | undefined> {
    return this.userStatsMap.get(userId);
  }

  async updateUserStats(userId: number, stats: Partial<UserStats>): Promise<void> {
    const existing = this.userStatsMap.get(userId);
    if (existing) {
      this.userStatsMap.set(userId, { ...existing, ...stats, lastUpdated: new Date() });
    }
  }

  async getGlobalStats(): Promise<{
    totalProjects: number;
    totalDonated: string;
    totalLivesImpacted: number;
  }> {
    const projects = Array.from(this.projects.values()).filter(p => p.isActive);
    const totalDonated = projects.reduce((sum, p) => sum + parseFloat(p.currentAmount), 0);
    const totalLivesImpacted = Math.floor(totalDonated * 0.1); // Mock calculation
    
    return {
      totalProjects: projects.length,
      totalDonated: totalDonated.toString(),
      totalLivesImpacted,
    };
  }
}

import { db } from "./db";
import { eq } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.isActive, true));
  }

  async getProjectsByPillar(pillar: string): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.pillar, pillar));
  }

  async getProjectsByLocation(country: string): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.country, country));
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async updateProject(id: number, insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .update(projects)
      .set(insertProject)
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  async deleteProject(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  async updateProjectAmount(projectId: number, newAmount: string): Promise<void> {
    await db
      .update(projects)
      .set({ currentAmount: newAmount })
      .where(eq(projects.id, projectId));
  }

  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const [donation] = await db
      .insert(donations)
      .values(insertDonation)
      .returning();
    
    // Update user stats after donation
    await this.updateUserStatsAfterDonation(donation.userId, donation.amount.toString());
    
    return donation;
  }

  private async updateUserStatsAfterDonation(userId: number, amount: string): Promise<void> {
    const existingStats = await this.getUserStats(userId);
    const donationAmount = parseFloat(amount);
    
    if (existingStats) {
      const newTotal = parseFloat(existingStats.totalDonated || "0") + donationAmount;
      await db
        .update(userStats)
        .set({
          totalDonated: newTotal.toString(),
          projectsSupported: existingStats.projectsSupported + 1,
          lastUpdated: new Date(),
        })
        .where(eq(userStats.userId, userId));
    } else {
      await db.insert(userStats).values({
        userId,
        totalDonated: amount,
        projectsSupported: 1,
        livesImpacted: 0,
        carbonOffset: "0",
        lastUpdated: new Date(),
      });
    }
  }

  async getUserDonations(userId: number): Promise<Donation[]> {
    return await db.select().from(donations).where(eq(donations.userId, userId));
  }

  async getProjectDonations(projectId: number): Promise<Donation[]> {
    return await db.select().from(donations).where(eq(donations.projectId, projectId));
  }

  async getProjectImpactMetrics(projectId: number): Promise<ImpactMetric[]> {
    return await db.select().from(impactMetrics).where(eq(impactMetrics.projectId, projectId));
  }

  async createImpactMetric(insertMetric: InsertImpactMetric): Promise<ImpactMetric> {
    const [metric] = await db
      .insert(impactMetrics)
      .values(insertMetric)
      .returning();
    return metric;
  }

  async getUserStats(userId: number): Promise<UserStats | undefined> {
    const [stats] = await db.select().from(userStats).where(eq(userStats.userId, userId));
    return stats || undefined;
  }

  async updateUserStats(userId: number, statsUpdate: Partial<UserStats>): Promise<void> {
    await db
      .update(userStats)
      .set({ ...statsUpdate, lastUpdated: new Date() })
      .where(eq(userStats.userId, userId));
  }

  async getGlobalStats(): Promise<{
    totalProjects: number;
    totalDonated: string;
    totalLivesImpacted: number;
  }> {
    const projectCount = await db.select().from(projects).where(eq(projects.isActive, true));
    const allDonations = await db.select().from(donations);
    const allStats = await db.select().from(userStats);
    
    const totalDonated = allDonations.reduce((sum, donation) => 
      sum + parseFloat(donation.amount.toString()), 0
    );
    
    const totalLivesImpacted = allStats.reduce((sum, stat) => 
      sum + (stat.livesImpacted || 0), 0
    );

    return {
      totalProjects: projectCount.length,
      totalDonated: totalDonated.toString(),
      totalLivesImpacted,
    };
  }
}

export const storage = new DatabaseStorage();
