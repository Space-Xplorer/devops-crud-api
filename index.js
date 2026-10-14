const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let nextId = 1;
let items = [];

app.get("/", (_req, res) => {
  res.json({ message: "DevOps CRUD API is running" });
});

app.get("/items", (_req, res) => res.json(items));

app.get("/items/:id", (req, res) => {
  const item = items.find(x => x.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

app.post("/items", (req, res) => {
  const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
  if (!name) return res.status(400).json({ error: "name is required" });
  const item = { id: nextId++, name };
  items.push(item);
  res.status(201).json(item);
});

app.patch("/items/:id", (req, res) => {
  const item = items.find(x => x.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });
  if (typeof req.body.name !== "string" || !req.body.name.trim()) {
    return res.status(400).json({ error: "name must be a non-empty string" });
  }
  item.name = req.body.name.trim();
  res.json(item);
});

app.delete("/items/:id", (req, res) => {
  const index = items.findIndex(x => x.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Item not found" });
  const deleted = items.splice(index, 1)[0];
  res.json({ message: "Item deleted", item: deleted });
});

// Export app for testing (Lab 11)
module.exports = app;
