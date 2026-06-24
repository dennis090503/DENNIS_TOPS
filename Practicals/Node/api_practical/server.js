const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('./db');

const app = express();
const PORT = 3000;

app.use(express.json());

// 1. CREATE USER (POST)
app.post('/users', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { name, email, age } = req.body;

        if (!name || !email || age === undefined) {
            return res.status(400).json({ error: 'Missing required fields: name, email, and age are mandatory.' });
        }

        const newUser = { name, email, age: Number(age) };
        const result = await db.collection('users').insertOne(newUser);

        return res.status(201).json({
            message: 'User created successfully',
            userId: result.insertedId,
            user: { _id: result.insertedId, ...newUser }
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

// 2. GET ALL USERS (GET)
app.get('/users', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const users = await db.collection('users').find({}).toArray();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

// 3. GET SINGLE USER BY ID (GET)
app.get('/users/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const userId = req.params.id;

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid ID format. Must be a 24-character hex string.' });
        }

        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

// 4. UPDATE SINGLE USER BY ID (PUT)
app.put('/users/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const userId = req.params.id;
        const { name, email, age } = req.body;

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid ID format.' });
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (age !== undefined) updateData.age = Number(age);

        const result = await db.collection('users').findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { $set: updateData },
            { returnDocument: 'after' }
        );

        if (!result) {
            return res.status(404).json({ error: 'User not found.' });
        }

        return res.status(200).json({ message: 'User updated successfully', user: result });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

// 5. DELETE SINGLE USER BY ID (DELETE)
app.delete('/users/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const userId = req.params.id;

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid ID format.' });
        }

        const result = await db.collection('users').findOneAndDelete({ _id: new ObjectId(userId) });

        if (!result) {
            return res.status(404).json({ error: 'User not found.' });
        }

        return res.status(200).json({ message: 'User deleted successfully', deletedUser: result });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running smoothly on http://localhost:${PORT}`);
});