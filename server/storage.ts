import { 
  type User, 
  type InsertUser, 
  type Unit, 
  type InsertUnit,
  type UpdateUnit,
  type Appointment,
  type InsertAppointment,
  type UpdateAppointment,
  type AnalyticsEvent,
  type InsertAnalyticsEvent,
  units as unitsTable,
  users as usersTable,
  appointments as appointmentsTable,
  analyticsEvents as analyticsEventsTable
} from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { eq, like, or, desc, sql as drizzleSql } from "drizzle-orm";
import { randomUUID } from "crypto";
import unitData from "../client/src/data/unitData.json";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUnits(): Promise<Unit[]>;
  getUnit(id: string): Promise<Unit | undefined>;
  getUnitByUnitNumber(unitNumber: string): Promise<Unit | undefined>;
  searchUnits(term: string): Promise<Unit[]>;
  getUnitsByStatus(status: 'available' | 'sold'): Promise<Unit[]>;
  updateUnit(id: string, data: UpdateUnit): Promise<Unit | undefined>;
  getAllAppointments(): Promise<Appointment[]>;
  getAppointment(id: string): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointment(id: string, data: UpdateAppointment): Promise<Appointment | undefined>;
  createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getAnalyticsSummary(): Promise<{ unitId: string; unitNumber: string; viewCount: number }[]>;
  seedUnits(): Promise<void>;
}

export class DbStorage implements IStorage {
  private db;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    this.db = drizzle(pool);
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(usersTable).where(eq(usersTable.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(usersTable).values(insertUser).returning();
    return result[0];
  }

  async getAllUnits(): Promise<Unit[]> {
    return await this.db.select().from(unitsTable);
  }

  async getUnit(id: string): Promise<Unit | undefined> {
    const result = await this.db.select().from(unitsTable).where(eq(unitsTable.id, id)).limit(1);
    return result[0];
  }

  async getUnitByUnitNumber(unitNumber: string): Promise<Unit | undefined> {
    const result = await this.db.select().from(unitsTable).where(eq(unitsTable.unitNumber, unitNumber)).limit(1);
    return result[0];
  }

  async searchUnits(term: string): Promise<Unit[]> {
    const searchTerm = `%${term.toLowerCase()}%`;
    return await this.db.select().from(unitsTable).where(
      or(
        drizzleSql`LOWER(${unitsTable.unitNumber}) LIKE ${searchTerm}`,
        drizzleSql`LOWER(${unitsTable.blockName}) LIKE ${searchTerm}`
      )
    );
  }

  async getUnitsByStatus(status: 'available' | 'sold'): Promise<Unit[]> {
    return await this.db.select().from(unitsTable).where(eq(unitsTable.status, status));
  }

  async updateUnit(id: string, data: UpdateUnit): Promise<Unit | undefined> {
    const result = await this.db.update(unitsTable).set(data).where(eq(unitsTable.id, id)).returning();
    return result[0];
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return await this.db.select().from(appointmentsTable).orderBy(desc(appointmentsTable.createdAt));
  }

  async getAppointment(id: string): Promise<Appointment | undefined> {
    const result = await this.db.select().from(appointmentsTable).where(eq(appointmentsTable.id, id)).limit(1);
    return result[0];
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const result = await this.db.insert(appointmentsTable).values(appointment).returning();
    return result[0];
  }

  async updateAppointment(id: string, data: UpdateAppointment): Promise<Appointment | undefined> {
    const result = await this.db.update(appointmentsTable).set(data).where(eq(appointmentsTable.id, id)).returning();
    return result[0];
  }

  async createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const result = await this.db.insert(analyticsEventsTable).values(event).returning();
    return result[0];
  }

  async getAnalyticsSummary(): Promise<{ unitId: string; unitNumber: string; viewCount: number }[]> {
    const result = await this.db
      .select({
        unitId: analyticsEventsTable.unitId,
        unitNumber: unitsTable.unitNumber,
        viewCount: drizzleSql<number>`COUNT(*)::int`,
      })
      .from(analyticsEventsTable)
      .innerJoin(unitsTable, eq(analyticsEventsTable.unitId, unitsTable.id))
      .where(eq(analyticsEventsTable.eventType, 'unit_view'))
      .groupBy(analyticsEventsTable.unitId, unitsTable.unitNumber)
      .orderBy(desc(drizzleSql`COUNT(*)`));

    return result.map(r => ({
      unitId: r.unitId!,
      unitNumber: r.unitNumber,
      viewCount: r.viewCount
    }));
  }

  async seedUnits(): Promise<void> {
    const existingUnits = await this.getAllUnits();
    if (existingUnits.length > 0) {
      console.log('Units already seeded, skipping...');
      return;
    }

    console.log('Seeding units from JSON...');
    const unitsToInsert: InsertUnit[] = unitData.map(unit => ({
      unitNumber: unit.unitNumber,
      blockName: unit.blockName,
      size: unit.size,
      status: unit.status as 'available' | 'sold',
      price: unit.price,
      companyName: unit.companyName || null,
      x: unit.x,
      y: unit.y,
      width: unit.width,
      height: unit.height,
      tourUrl: null,
    }));

    await this.db.insert(unitsTable).values(unitsToInsert);
    console.log(`Seeded ${unitsToInsert.length} units successfully!`);
  }
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private units: Unit[];
  private appointments: Map<string, Appointment>;
  private events: AnalyticsEvent[];

  constructor() {
    this.users = new Map();
    this.appointments = new Map();
    this.events = [];
    this.units = unitData.map((unit) => ({
      id: randomUUID(),
      tourUrl: null,
      ...unit
    })) as Unit[];
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser,
      role: insertUser.role || 'public',
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getAllUnits(): Promise<Unit[]> {
    return this.units;
  }

  async getUnit(id: string): Promise<Unit | undefined> {
    return this.units.find((unit) => unit.id === id);
  }

  async getUnitByUnitNumber(unitNumber: string): Promise<Unit | undefined> {
    return this.units.find((unit) => unit.unitNumber === unitNumber);
  }

  async searchUnits(term: string): Promise<Unit[]> {
    const searchTerm = term.toLowerCase();
    return this.units.filter((unit) => 
      unit.unitNumber.toLowerCase().includes(searchTerm) ||
      unit.blockName.toLowerCase().includes(searchTerm)
    );
  }

  async getUnitsByStatus(status: 'available' | 'sold'): Promise<Unit[]> {
    return this.units.filter((unit) => unit.status === status);
  }

  async updateUnit(id: string, data: UpdateUnit): Promise<Unit | undefined> {
    const unitIndex = this.units.findIndex(u => u.id === id);
    if (unitIndex === -1) return undefined;
    
    this.units[unitIndex] = { ...this.units[unitIndex], ...data };
    return this.units[unitIndex];
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getAppointment(id: string): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const id = randomUUID();
    const newAppointment: Appointment = {
      ...appointment,
      message: appointment.message || null,
      unitId: appointment.unitId || null,
      id,
      status: appointment.status || 'pending',
      createdAt: new Date(),
    };
    this.appointments.set(id, newAppointment);
    return newAppointment;
  }

  async updateAppointment(id: string, data: UpdateAppointment): Promise<Appointment | undefined> {
    const appointment = this.appointments.get(id);
    if (!appointment) return undefined;
    
    const updated = { ...appointment, ...data };
    this.appointments.set(id, updated);
    return updated;
  }

  async createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const newEvent: AnalyticsEvent = {
      ...event,
      unitId: event.unitId || null,
      metadata: event.metadata || null,
      id: randomUUID(),
      timestamp: new Date(),
    };
    this.events.push(newEvent);
    return newEvent;
  }

  async getAnalyticsSummary(): Promise<{ unitId: string; unitNumber: string; viewCount: number }[]> {
    const viewEvents = this.events.filter(e => e.eventType === 'unit_view' && e.unitId);
    const counts = new Map<string, number>();
    
    viewEvents.forEach(event => {
      if (event.unitId) {
        counts.set(event.unitId, (counts.get(event.unitId) || 0) + 1);
      }
    });

    return Array.from(counts.entries())
      .map(([unitId, viewCount]) => {
        const unit = this.units.find(u => u.id === unitId);
        return {
          unitId,
          unitNumber: unit?.unitNumber || 'Unknown',
          viewCount
        };
      })
      .sort((a, b) => b.viewCount - a.viewCount);
  }

  async seedUnits(): Promise<void> {
    console.log('MemStorage does not need seeding');
  }
}

export const storage = process.env.DATABASE_URL ? new DbStorage() : new MemStorage();

if (process.env.DATABASE_URL) {
  (async () => {
    try {
      await (storage as DbStorage).seedUnits();
    } catch (error) {
      console.error('Failed to seed units:', error);
    }
  })();
}
