const express = require("express");
const router = express.Router();
const redis = require("../redisClient");
const db = require("../db");

const CACHE_KEY = "items:all";
const CACHE_TTL = 60; // 1 minute

// GET /items
router.get("/", async (req, res) => {
  try {
    const cachedItems = await redis.get(CACHE_KEY);

    if (cachedItems) {
      console.log("🟢 Cache HIT: Returning items from Redis");
      return res.json(JSON.parse(cachedItems));
    }

    console.log("🔴 Cache MISS: Fetching items from DB");
    const items = db.getItems();

    await redis.set(CACHE_KEY, JSON.stringify(items), "EX", CACHE_TTL);

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /items
router.post("/", async (req, res) => {
  const { name } = req.body;

  const newItem = {
    id: Date.now(),
    name,
  };

  db.addItem(newItem);

  // Invalidate cache
  await redis.del(CACHE_KEY);
  console.log("🗑️ Cache invalidated after ADD");

  res.status(201).json(newItem);
});

// PUT /items/:id
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = db.updateItem(id, req.body);

  if (!updatedItem) {
    return res.status(404).json({ message: "Item not found" });
  }

  // Invalidate cache
  await redis.del(CACHE_KEY);
  console.log("🗑️ Cache invalidated after UPDATE");

  res.json(updatedItem);
});

// DELETE /items/:id
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const deletedItem = db.deleteItem(id);

  if (!deletedItem) {
    return res.status(404).json({ message: "Item not found" });
  }

  // Invalidate cache
  await redis.del(CACHE_KEY);
  console.log("🗑️ Cache invalidated after DELETE");

  res.json({ message: "Item deleted" });
});

module.exports = router;
