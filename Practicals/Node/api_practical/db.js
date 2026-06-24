const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'keyword_system';

let dbConnection = null;

async function connectToDatabase() {
    if (dbConnection) {
        return dbConnection;
    }

    try {
        const client = await MongoClient.connect(url);
        console.log('Successfully connected to MongoDB local instance.');
        dbConnection = client.db(dbName);
        return dbConnection;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error;
    }
}

module.exports = { connectToDatabase };