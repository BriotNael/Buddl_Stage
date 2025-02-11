// Importation des dépendances
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Création de l'application Express
const app = express();

// Middleware pour parser les données JSON
app.use(express.json());

// Middleware pour autoriser toutes les origines (CORS)
app.use(cors());

// Connexion à MongoDB Atlas
const mongoURI = 'mongodb+srv://briotnael:Aurore1510@buddlstage.vunhb.mongodb.net/BuddlStage?retryWrites=true&w=majority';
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

// Route pour récupérer les 5 articles les plus chers
app.get("/articles/top-prix", async (req, res) => {
  console.log("Requête reçue pour /articles/top-prix");
  try {
    // Vérification que la base de données contient des articles
    const articles = await Article.find().sort({ prix: -1 }).limit(5);
    
    // Vérification que des articles ont été récupérés
    if (!articles || articles.length === 0) {
      console.log("Aucun article trouvé pour top-prix");
      throw new Error("Aucun article trouvé dans la base de données !");
    }

    console.log("Articles récupérés :", articles);
    res.json(articles);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    res.status(500).json({ message: "Erreur du serveur", error: error.message });
  }
});


// Route pour récupérer les 5 articles les moins chers
app.get("/articles/low-prix", async (req, res) => {
  console.log("Requête reçue pour /articles/low-prix");
  try {
    const articles = await Article.find().sort({ prix: 1 }).limit(5); // Tri croissant
    if (!articles || articles.length === 0) {
      console.log("Aucun article trouvé pour low-prix");
      throw new Error("Aucun article trouvé dans la base de données !");
    }
    console.log("Articles récupérés :", articles);
    res.json(articles);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    res.status(500).json({ message: "Erreur du serveur", error: error.message });
  }
});


// Route pour récupérer les 5 articles les mieux vendus
app.get("/articles/top-vendus", async (req, res) => {
  console.log("Requête reçue pour /articles/top-vendus");
  try {
    const articles = await Article.find().sort({ quantiteVendue: -1 }).limit(5);
    if (!articles || articles.length === 0) {
      console.log("Aucun article trouvé pour top-vendus");
      throw new Error("Aucun article trouvé dans la base de données !");
    }
    console.log("Articles récupérés :", articles);
    res.json(articles);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    res.status(500).json({ message: "Erreur du serveur", error: error.message });
  }
});

// Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur API lancé sur http://localhost:${PORT}`);
});
