// Importation des dépendances
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Création de l'application Express
const app = express();

// Middleware pour parser les données JSON dans les requêtes
app.use(express.json());

//Permet à toutes origines d'accéder à l'API
app.use(cors());

// Connexion à MongoDB Atlas
const mongoURI = 'mongodb+srv://briotnael:Aurore1510@buddlstage.vunhb.mongodb.net/BuddlStage?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ MongoDB connecté avec succès');
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion à MongoDB:', err);
  });

  const Article = mongoose.model('Article', new mongoose.Schema({
    _id: String,
    nomA: String,
    description: String,
    prix: Number,  
    quantiteStock: Number,
    quantiteVendue: Number 
}));

// Route API pour récupérer tous les Articles
app.get('/articles', async (req, res) => {
  try {
    const Articles = await Article.find();
    res.json(Articles); // Retourne tous les Articles sous forme de JSON
  } catch (error) {
    res.status(500).json({error:error});
  }
});

// Route API pour récupérer un article par son _id
app.get('/articles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const Article = await Article.findById(id);
    if (!Article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    res.json(Article); // Retourne l'article
  } catch (error) {
    res.status(500).json({error:error});
  }
});

app.get('/articles/top-prix', async (req, res) => {
  try {
    const articlesTop = await Article.find().sort({ prix: -1 }).limit(5); // Trie par prix décroissant et limite à 5 articles
    res.json(articlesTop); 
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
});

// Lancer le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Serveur API lancé sur http://localhost:3000');
});