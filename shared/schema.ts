import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const scamReports = pgTable("scam_reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  report: text("report").notNull(),
  type: text("type"),
  status: text("status").default("submitted"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const securityChecks = pgTable("security_checks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  url: text("url"),
  verdict: text("verdict"),
  type: text("type"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);
export const insertScamReportSchema = createInsertSchema(scamReports).omit({ id: true });
export const insertSecurityCheckSchema = createInsertSchema(securityChecks).omit({ id: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type ScamReport = typeof scamReports.$inferSelect;
export type SecurityCheck = typeof securityChecks.$inferSelect;
