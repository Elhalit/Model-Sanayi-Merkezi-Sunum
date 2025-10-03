import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const units = pgTable("units", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  unitNumber: text("unit_number").notNull().unique(),
  blockName: text("block_name").notNull(),
  size: integer("size").notNull(), // in square meters
  status: text("status").notNull(), // 'available' or 'sold'
  price: integer("price").notNull(), // in Turkish Lira
  companyName: text("company_name"), // null if available
  x: integer("x").notNull(), // SVG coordinates
  y: integer("y").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
});

export const insertUnitSchema = createInsertSchema(units).omit({
  id: true,
});

export type InsertUnit = z.infer<typeof insertUnitSchema>;
export type Unit = typeof units.$inferSelect;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
