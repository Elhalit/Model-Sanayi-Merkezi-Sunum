import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
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
  tourUrl: text("tour_url"), // 3D virtual tour URL
});

export const insertUnitSchema = createInsertSchema(units).omit({
  id: true,
});

export const updateUnitSchema = createInsertSchema(units).pick({
  status: true,
  price: true,
  companyName: true,
}).partial();

export type InsertUnit = z.infer<typeof insertUnitSchema>;
export type UpdateUnit = z.infer<typeof updateUnitSchema>;
export type Unit = typeof units.$inferSelect;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("public"), // 'admin' or 'public'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const appointments = pgTable("appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  unitId: varchar("unit_id").references(() => units.id),
  preferredDate: timestamp("preferred_date").notNull(),
  message: text("message"),
  status: text("status").notNull().default("pending"), // 'pending', 'confirmed', 'cancelled'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
});

export const updateAppointmentSchema = createInsertSchema(appointments).pick({
  status: true,
}).partial();

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type UpdateAppointment = z.infer<typeof updateAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

export const analyticsEvents = pgTable("analytics_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventType: text("event_type").notNull(), // 'unit_view', 'unit_click', 'search', 'filter', 'brochure_download'
  unitId: varchar("unit_id").references(() => units.id),
  metadata: text("metadata"), // JSON string for additional data
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).omit({
  id: true,
  timestamp: true,
});

export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
