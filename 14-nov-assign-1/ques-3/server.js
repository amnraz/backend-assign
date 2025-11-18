const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

// Helper: read from db.json
function readDB() {
    const data = fs.readFileSync('./db.json', 'utf-8');
    return JSON.parse(data);
}

// Helper: write to db.json
function writeDB(data) {
    fs.writeFileSync('./db.json', JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * POST /dishes → Add a new dish
 */
app.post('/dishes', (req, res) => {
    const newDish = req.body;

    if (!newDish.name) {
        return res.status(400).json({ msg: "Dish must have a 'name' field" });
    }

    const data = readDB();
    const dishes = data.dishes;

    // generate auto id
    const newId = dishes.length > 0 ? dishes[dishes.length - 1].id + 1 : 1;
    newDish.id = newId;

    dishes.push(newDish);
    writeDB(data);

    res.json({ msg: "Dish Added", dish: newDish });
});

/**
 * GET /dishes → Retrieve all dishes
 */
app.get('/all-dishes', (req, res) => {
    const data = readDB();
    res.json({ msg: "All Dishes", dishes: data.dishes });
});

/**
 * GET /dishes/:id → Retrieve a dish by ID
 */
app.get('/dishes/:id', (req, res) => {
    const id = Number(req.params.id);
    const data = readDB();

    const dish = data.dishes.find(d => d.id === id);
    if (!dish) return res.status(404).json({ msg: "Dish not found" });

    res.json(dish);
});

/**
 * PUT /dishes/:id → Update a dish by ID
 */
app.put('/dishes/:id', (req, res) => {
    const id = Number(req.params.id);
    const updates = req.body;
    const data = readDB();

    const index = data.dishes.findIndex(d => d.id === id);
    if (index === -1) return res.status(404).json({ msg: "Dish not found" });

    // Merge old + new (without changing id)
    data.dishes[index] = { ...data.dishes[index], ...updates, id };
    writeDB(data);

    res.json({ msg: "Dish updated", dish: data.dishes[index] });
});

/**
 * DELETE /dishes/:id → Delete a dish by ID
 */
app.delete('/dishes/:id', (req, res) => {
    const id = Number(req.params.id);
    const data = readDB();

    const index = data.dishes.findIndex(d => d.id === id);
    if (index === -1) return res.status(404).json({ msg: "Dish not found" });

    const deletedDish = data.dishes.splice(index, 1);
    writeDB(data);

    res.json({ msg: "Dish deleted", deleted: deletedDish[0] });
});

app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
});
