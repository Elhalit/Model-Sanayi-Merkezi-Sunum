import { type User, type InsertUser, type Unit } from "@shared/schema";
import { randomUUID } from "crypto";
import unitData from "../client/src/data/unitData.json";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUnits(): Promise<Unit[]>;
  getUnit(id: string): Promise<Unit | undefined>;
  searchUnits(term: string): Promise<Unit[]>;
  getUnitsByStatus(status: 'available' | 'sold'): Promise<Unit[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private units: Unit[];

  constructor() {
    this.users = new Map();
    this.units = unitData.map((unit) => ({
      id: randomUUID(),
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
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllUnits(): Promise<Unit[]> {
    return this.units;
  }

  async getUnit(id: string): Promise<Unit | undefined> {
    return this.units.find((unit) => unit.id === id);
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
}

export const storage = new MemStorage();
