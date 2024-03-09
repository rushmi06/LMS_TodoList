const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const Item = require('./itemModal');

const app = express();
const PORT = 3002;

mongoose.connect('mongodb://127.0.0.1:27017/mynotes')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Enable CORS for requests from localhost:3000

app.listen(PORT, () => {
    console.log("Listening port", PORT);
});

// Create a new item
app.post('/item', async (req, res) => {
    const { title, description } = req.body;
    try {
        const newItem = new Item({ title, description });
        await newItem.save();
        res.send("Item created successfully");
    } catch (err) {
        console.error("Error creating item:", err);
        res.status(500).send("Error creating item");
    }
});

// Read all items
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).send("Error fetching items");
    }
});

// Read a single item by ID
app.get('/item/:id', async (req, res) => {
    const itemId = req.params.id;
    try {
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).send("Item not found");
        }
        res.json(item);
    } catch (err) {
        console.error("Error fetching item:", err);
        res.status(500).send("Error fetching item");
    }
});

// Update an item by ID
app.put('/item/:id', async (req, res) => {
    const itemId = req.params.id;
    try {
        const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).send("Item not found");
        }
        res.send("Item updated successfully");
    } catch (err) {
        console.error("Error updating item:", err);
        res.status(500).send("Error updating item");
    }
});

// Delete an item by ID
app.delete('/item/:id', async (req, res) => {
    const itemId = req.params.id;
    try {
        const deletedItem = await Item.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).send("Item not found");
        }
        res.send("Item deleted successfully");
    } catch (err) {
        console.error("Error deleting item:", err);
        res.status(500).send("Error deleting item");
    }
});
