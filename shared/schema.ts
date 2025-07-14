import { pgTable, text, serial, integer, boolean, decimal, timestamp, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  userType: text("user_type").notNull(), // 'tour_operator', 'commercial_partner', 'private_donor'
  companyName: text("company_name"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  pillar: text("pillar").notNull(), // 'health', 'education', 'conservation'
  location: text("location").notNull(),
  country: text("country").notNull(),
  goalAmount: decimal("goal_amount", { precision: 10, scale: 2 }).notNull(),
  currentAmount: decimal("current_amount", { precision: 10, scale: 2 }).default("0"),
  partnerOrganisation: text("partner_organisation").notNull(),
  partnerLogo: text("partner_logo"),
  projectImage: text("project_image").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("4.5"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  projectId: integer("project_id").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  isRecurring: boolean("is_recurring").default(false),
  recurringFrequency: text("recurring_frequency"), // 'monthly', 'quarterly', 'annually'
  donationDate: timestamp("donation_date").defaultNow(),
  message: text("message"),
});

export const impactMetrics = pgTable("impact_metrics", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  metricType: text("metric_type").notNull(), // 'lives_impacted', 'carbon_offset', 'schools_built', etc.
  value: decimal("value", { precision: 10, scale: 2 }).notNull(),
  unit: text("unit").notNull(), // 'people', 'tonnes', 'schools', etc.
  description: text("description"),
  recordedAt: timestamp("recorded_at").defaultNow(),
});

export const userStats = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  totalDonated: decimal("total_donated", { precision: 10, scale: 2 }).default("0"),
  projectsSupported: integer("projects_supported").default(0),
  livesImpacted: integer("lives_impacted").default(0),
  carbonOffset: decimal("carbon_offset", { precision: 5, scale: 1 }).default("0"),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  currentAmount: true,
  rating: true,
  isActive: true,
  createdAt: true,
});

export const insertDonationSchema = createInsertSchema(donations).omit({
  id: true,
  donationDate: true,
});

export const insertImpactMetricSchema = createInsertSchema(impactMetrics).omit({
  id: true,
  recordedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Donation = typeof donations.$inferSelect;
export type InsertDonation = z.infer<typeof insertDonationSchema>;

export type ImpactMetric = typeof impactMetrics.$inferSelect;
export type InsertImpactMetric = z.infer<typeof insertImpactMetricSchema>;

export type UserStats = typeof userStats.$inferSelect;

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  donations: many(donations),
  stats: one(userStats, {
    fields: [users.id],
    references: [userStats.userId],
  }),
}));

export const projectsRelations = relations(projects, ({ many }) => ({
  donations: many(donations),
  impactMetrics: many(impactMetrics),
}));

export const donationsRelations = relations(donations, ({ one }) => ({
  user: one(users, {
    fields: [donations.userId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [donations.projectId],
    references: [projects.id],
  }),
}));

export const impactMetricsRelations = relations(impactMetrics, ({ one }) => ({
  project: one(projects, {
    fields: [impactMetrics.projectId],
    references: [projects.id],
  }),
}));

export const userStatsRelations = relations(userStats, ({ one }) => ({
  user: one(users, {
    fields: [userStats.userId],
    references: [users.id],
  }),
}));
