import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to get all units
  app.get("/api/units", async (req, res) => {
    try {
      const units = await storage.getAllUnits();
      res.json(units);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch units" });
    }
  });

  // API endpoint to get a specific unit
  app.get("/api/units/:id", async (req, res) => {
    try {
      const unit = await storage.getUnit(req.params.id);
      if (!unit) {
        return res.status(404).json({ error: "Unit not found" });
      }
      res.json(unit);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch unit" });
    }
  });

  // API endpoint to search units
  app.get("/api/units/search/:term", async (req, res) => {
    try {
      const units = await storage.searchUnits(req.params.term);
      res.json(units);
    } catch (error) {
      res.status(500).json({ error: "Failed to search units" });
    }
  });

  // API endpoint to filter units by status
  app.get("/api/units/filter/:status", async (req, res) => {
    try {
      const status = req.params.status as 'available' | 'sold';
      if (status !== 'available' && status !== 'sold') {
        return res.status(400).json({ error: "Invalid status filter" });
      }
      const units = await storage.getUnitsByStatus(status);
      res.json(units);
    } catch (error) {
      res.status(500).json({ error: "Failed to filter units" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
