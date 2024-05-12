const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'userDatabase'; // Nombre de la base de datos

let db = null;

async function connectDB() {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conexión establecida a MongoDB');
        db = client.db(dbName);
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        throw error;
    }
}

function getDB() {
    if (!db) {
        throw new Error('La conexión a la base de datos no ha sido establecida');
    }
    return db;
}

module.exports = { connectDB, getDB }