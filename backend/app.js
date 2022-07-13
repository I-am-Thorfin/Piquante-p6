const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

/* Correction de l'erreur de CORS */

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });

 /* Appel de Mongoose */

 mongoose.connect('mongodb+srv://Thorfin:MDPtest@clusterpiquante.g6rxl.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));




module.exports = app;