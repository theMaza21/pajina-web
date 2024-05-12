const { connectDB } = require('./db'); 


const { MongoClient } = require('mongodb');

// URL de conexión a tu base de datos MongoDB
const uri = 'mongodb://localhost:27017'; // Cambia esta URL según tu configuración

// Nombre de la base de datos y de la colección
const dbName = 'tu_base_de_datos';
const collectionName = 'usuarios';

async function agregarConexion(usuarioId, direccionIP) {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Insertar la conexión del usuario en la colección
    const result = await collection.insertOne({ usuarioId, direccionIP });
    console.log(`Se ha agregado la conexión del usuario ${usuarioId} en la dirección IP ${direccionIP}`);

    return result;
  } finally {
    await client.close();
  }
}

// Ejemplo de uso
const usuarioId = 'id_del_usuario';
const direccionIP = '192.168.1.1';

agregarConexion(usuarioId, direccionIP)
  .catch(console.error);