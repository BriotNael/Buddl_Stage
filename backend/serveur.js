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

// Route API pour ajouter un nouveau Article
app.post('/articles', async (req, res) => {
  const { _id, nomA, description, prix, quantiteStock, quantiteVendue } = req.body;
  const nouvelArticle = new Article({ _id, nomA, description, prix, quantiteStock, quantiteVendue });

  try {
    await nouvelArticle.save();
    res.status(201).json(nouvelArticle);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'article', error });
  }
});

// Route API pour mettre à jour un article par son _id
app.put('/articles/:id', async (req, res) => {
  const { id } = req.params;
  const { nomA, description, prix, quantiteStock, quantiteVendue } = req.body;

  try {
    const ArticleMisAJour = await Article.findByIdAndUpdate(
      id, 
      { nomA, description, prix, quantiteStock, quantiteVendue }, 
      { new: true }
    );
    if (!ArticleMisAJour) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    res.json(ArticleMisAJour); // Retourne l'Article mis à jour
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'Article', error });
  }
});

// Route API pour supprimer un Article par son _id
app.delete('/articles/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const ArticleSupprime = await Article.findByIdAndDelete(id);
    if (!ArticleSupprime) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    res.json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'Article', error });
  }
});

app.get('/articles/top-prix', async (req, res) => {
  try {
    const articlesTop = await Article.find().sort({ prix: -1 }).limit(5); // Trie par prix décroissant et limite à 5 articles
    res.json(articlesTop); // Renvoie les articles sous forme JSON
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
});

// Route API pour récupérer les 5 articles les plus chers
app.get('/articles/top-prix', async (req, res) => {
  try {
    const articlesTop = await Article.find()
      .sort({ prix: -1 }) // Trie par prix décroissant
      .limit(5); // Limite à 5 articles
    res.json(articlesTop); // Renvoie les articles sous forme JSON
  } catch (error) {
    res.status(500).json({error:error});
  }
});

// Route API pour récupérer les 5 articles les moins chers
app.get('/articles/low-prix', async (req, res) => {
  try {
    const articlesLow = await Article.find()
      .sort({ prix: 1 }) // Trie par prix croissant
      .limit(5); // Limite à 5 articles
    res.json(articlesLow); // Renvoie les articles sous forme JSON
  } catch (error) {
    res.status(500).json({error:error});
  }
});

// Route API pour récupérer les 5 articles dont le stock est le plus bas
app.get('/articles/low-stock', async (req, res) => {
  try {
    const articlesLowStock = await Article.find()
      .sort({ quantiteStock: 1 }) // Trie par stock croissant
      .limit(5); // Limite à 5 articles
    res.json(articlesLowStock); // Renvoie les articles sous forme JSON
  } catch (error) {
    res.status(500).json({error:error});
  }
});

// Lancer le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Serveur API lancé sur http://localhost:3000');
});