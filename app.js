const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// URL de conexión a tu base de datos MongoDB
const uri = 'mongodb://localhost:27017'; // Cambia esta URL según tu configuración

// Nombre de la base de datos y de la colección
const dbName = 'login';
const collectionName = 'usuarios'; // Nombre de la colección donde se almacenan los usuarios

// Middleware para manejar datos JSON
app.use(express.json());

// Servicio para iniciar sesión
app.get('/iniciarSesion', async (req, res) => {
    const { UserName, Password } = req.query;
  
    const client = new MongoClient(uri);
  
    try {
        await client.connect();
  
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
  
        // Verificar si ya existe un usuario con el mismo nombre de usuario y contraseña
        const usuarioExistente = await collection.findOne({
            $and: [
                { UserName: UserName },
                { Password: Password }
            ]
        });
  
        if (usuarioExistente) {
            res.status(200).json(usuarioExistente);
        } else {
            res.status(404).send('Credenciales inválidas. Por favor, inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    } finally {
        await client.close();
    }
});

// Endpoint para agregar un nuevo usuario
app.post('/agregarUsuario', async (req, res) => {
    const { UserName, Password } = req.body;

    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Verificar si ya existe un usuario con el mismo nombre de usuario
        const usuarioExistente = await collection.findOne({ UserName: UserName });

        if (usuarioExistente) {
            res.status(400).send('El nombre de usuario ya está en uso. Por favor, elige otro.');
            return;
        }

        // Insertar el nuevo usuario en la colección
        const result = await collection.insertOne({ UserName: UserName, Password: Password });
        console.log(`Usuario ${UserName} registrado correctamente.`);
        res.status(201).json(result.ops[0]); // Devolver el usuario recién registrado
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).send('Error al registrar el usuario. Por favor, inténtalo de nuevo más tarde.');
    } finally {
        await client.close();
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express iniciado en el puerto ${port}`);
});