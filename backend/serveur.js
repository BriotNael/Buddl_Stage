// Importation des dépendances
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config({ path: "securite.env" });

// Création de l'application Express
const app = express();

// Middleware pour parser les données JSON
app.use(express.json());

// Middleware pour autoriser toutes les origines (CORS)
app.use(cors());

// Connexion à MongoDB Atlas
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB connecté avec succès'))
  .catch(err => console.error('❌ Erreur de connexion à MongoDB:', err));

// Définition du modèle Article
const Article = mongoose.model('Article', new mongoose.Schema({
  _id: String, // Identifiant sous forme de string
  nomA: String,
  description: String,
  prix: Number,  
  quantiteStock: Number,
  quantiteVendue: Number 
}));

// Route pour récupérer tous les Articles
app.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find().lean();
    res.json(articles);
  } catch (error) {
    console.error("Erreur dans /articles :", error);
    res.status(500).json({ message: "Erreur du serveur", error: error.message });
  }
});

// Route pour récupérer un article par son _id
app.get('/articles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findOne({ _id: id }).lean(); // Utilisation de findOne

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    res.json(article);
  } catch (error) {
    console.error(`Erreur dans /articles/${id} :`, error);
    res.status(500).json({ message: "Erreur du serveur", error: error.message });
  }
});

// Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur API lancé sur http://localhost:${PORT}`);
});
