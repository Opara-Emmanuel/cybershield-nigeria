import { User, InsertUser, ScamReport, SecurityCheck, users, scamReports, securityChecks } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createScamReport(report: { userId: number; report: string; type: string }): Promise<ScamReport>;
  getScamReports(userId: number): Promise<ScamReport[]>;
  createSecurityCheck(check: { userId: number; url?: string | null; verdict: string; type?: string }): Promise<SecurityCheck>;
  getSecurityChecks(userId: number): Promise<SecurityCheck[]>;
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createScamReport(report: { userId: number; report: string; type: string }): Promise<ScamReport> {
    const [newReport] = await db.insert(scamReports).values(report).returning();
    return newReport;
  }

  async getScamReports(userId: number): Promise<ScamReport[]> {
    return db.select().from(scamReports).where(eq(scamReports.userId, userId));
  }

  async createSecurityCheck(check: { userId: number; url?: string | null; verdict: string; type?: string }): Promise<SecurityCheck> {
    const [newCheck] = await db.insert(securityChecks).values({
      userId: check.userId,
      url: check.url || null,
      verdict: check.verdict,
      type: check.type || null
    }).returning();
    return newCheck;
  }

  async getSecurityChecks(userId: number): Promise<SecurityCheck[]> {
    return db.select().from(securityChecks).where(eq(securityChecks.userId, userId));
  }
}

export const storage = new DatabaseStorage();