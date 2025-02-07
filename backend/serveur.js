// Importation des dépendances
const express = require('express');
const mongoose = require('mongoose');

// Création de l'application Express
const app = express();

// Middleware pour parser les données JSON dans les requêtes
app.use(express.json());

// Connexion à MongoDB Atlas
const mongoURI = 'mongodb+srv://briotnael:Aurore1510@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connecté');
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB:', err);
  });

// Définir un modèle Mongoose correspondant à la structure de ta table
const Article = mongoose.model('Article', new mongoose.Schema({
  _id: String,
  nomA: String,
  description: String,
  prix: String,
  quantiteStock: Number
}));

// Définir un modèle Mongoose pour les Banques
const Banque = mongoose.model('Banque', new mongoose.Schema({
  _id: String,
  nomB: String,
  adresse: String,
  codePostal: String,
  ville: String,
  Coordonnees: [Number] // Tableau de coordonnées géographiques [longitude, latitude]
}));


// Route API pour récupérer tous les Articles
app.get('/articles', async (req, res) => {
  try {
    const Articles = await Article.find();
    res.json(Articles); // Retourne tous les Articles sous forme de JSON
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
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
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
});

// Route API pour ajouter un nouveau Article
app.post('/articles', async (req, res) => {
  const { _id, nomA, description, prix, quantiteStock } = req.body;
  const nouvelArticle = new Article({ _id, nomA, description, prix, quantiteStock });

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
  const { nomA, description, prix, quantiteStock } = req.body;

  try {
    const ArticleMisAJour = await Article.findByIdAndUpdate(
      id, 
      { nomA, description, prix, quantiteStock }, 
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

// Routes API pour les Banques

// Route pour récupérer toutes les banques
app.get('/banques', async (req, res) => {
  try {
    const banques = await Banque.find();
    res.json(banques); // Retourne toutes les banques sous forme de JSON
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
});

// Route pour récupérer une banque par son _id
app.get('/banques/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const banque = await Banque.findById(id);
    if (!banque) {
      return res.status(404).json({ message: 'Banque non trouvée' });
    }
    res.json(banque); // Retourne la banque
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
});

// Route pour ajouter une nouvelle banque
app.post('/banques', async (req, res) => {
  const { _id, nomB, adresse, codePostal, ville, Coordonnees } = req.body;
  const nouvelleBanque = new Banque({ _id, nomB, adresse, codePostal, ville, Coordonnees });

  try {
    await nouvelleBanque.save();
    res.status(201).json(nouvelleBanque);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la banque', error });
  }
});

// Route pour mettre à jour une banque par son _id
app.put('/banques/:id', async (req, res) => {
  const { id } = req.params;
  const { nomB, adresse, codePostal, ville, Coordonnees } = req.body;

  try {
    const banqueMisAJour = await Banque.findByIdAndUpdate(
      id, 
      { nomB, adresse, codePostal, ville, Coordonnees }, 
      { new: true }
    );
    if (!banqueMisAJour) {
      return res.status(404).json({ message: 'Banque non trouvée' });
    }
    res.json(banqueMisAJour); // Retourne la banque mise à jour
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la banque', error });
  }
});

// Route pour supprimer une banque par son _id
app.delete('/banques/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const banqueSupprime = await Banque.findByIdAndDelete(id);
    if (!banqueSupprime) {
      return res.status(404).json({ message: 'Banque non trouvée' });
    }
    res.json({ message: 'Banque supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la banque', error });
  }
});

// Lancer le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Serveur API lancé sur http://localhost:3000');
});