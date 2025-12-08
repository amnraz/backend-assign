const redis = require("../redis/redisClient");
const { items } = require("../db/itemsDB");

// Redis key for caching
const CACHE_KEY = "items:all";

// GET all items with caching
exports.getItems = async (req, res) => {
  try {
    const cachedData = await redis.get(CACHE_KEY);

    if (cachedData) {
      console.log("📦 Cache Hit!");
      return res.json(JSON.parse(cachedData));
    }

    console.log("❗ Cache Miss. Fetching from DB...");

    // Cache the data for 1 minute
    await redis.set(CACHE_KEY, JSON.stringify(items), "EX", 60);

    return res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST add item
exports.addItem = async (req, res) => {
  try {
    const newItem = {
      id: items.length + 1,
      name: req.body.name
    };

    items.push(newItem);

    // Invalidate cache
    await redis.del(CACHE_KEY);
    console.log("🗑 Cache invalidated after POST");

    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update item
exports.updateItem = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    const item = items.find((i) => i.id === id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.name = name;

    await redis.del(CACHE_KEY);
    console.log("🗑 Cache invalidated after PUT");

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE remove item
exports.deleteItem = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const index = items.findIndex((i) => i.id === id);
    if (index === -1) return res.status(404).json({ message: "Item not found" });

    const removed = items.splice(index, 1);

    await redis.del(CACHE_KEY);
    console.log("🗑 Cache invalidated after DELETE");

    res.json(removed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
