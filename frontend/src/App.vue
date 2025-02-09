<script setup>
import { ref, onMounted } from "vue";
import GraphiqueComponent from "./components/GraphiqueComponent.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

// Data pour les graphiques
const topPrixData = ref({
  labels: [],
  datasets: [
    {
      label: "Prix des Articles",
      data: [],
      backgroundColor: ["purple", "blue", "green", "orange", "red"]
    }
  ]
});

const lowPrixData = ref({
  labels: [],
  datasets: [
    {
      label: "Prix des Articles",
      data: [],
      backgroundColor: ["purple", "blue", "green", "orange", "red"]
    }
  ]
});

const topVendusData = ref({
  labels: [],
  datasets: [
    {
      label: "Quantité Vendue",
      data: [],
      backgroundColor: ["purple", "blue", "green", "orange", "red"]
    }
  ]
});

// Variables pour calculer les totaux
const totalTopPrix = ref(0);
const totalLowPrix = ref(0);
const totalTopVendus = ref(0);

// Options des graphiques
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true
    }
  }
});

// Récupérer les données depuis l'API Node.js
onMounted(async () => {
  try {
    // Récupérer les articles les plus chers
    const topPrixResponse = await fetch("http://localhost:3000/articles");
    const topPrixArticles = await topPrixResponse.json();
    topPrixData.value.labels = topPrixArticles.map(a => a.nomA);
    topPrixData.value.datasets[0].data = topPrixArticles.map(a => parseFloat(a.prix));
    
    // Calcul du total des ventes pour les articles les plus chers
    totalTopPrix.value = topPrixArticles.reduce((acc, article) => acc + (parseFloat(article.prix) * article.quantiteVendue), 0);

    // Récupérer les articles les moins chers
    const lowPrixResponse = await fetch("http://localhost:3000/articles");
    const lowPrixArticles = await lowPrixResponse.json();
    lowPrixData.value.labels = lowPrixArticles.map(a => a.nomA);
    lowPrixData.value.datasets[0].data = lowPrixArticles.map(a => parseFloat(a.prix));

    // Calcul du total des ventes pour les articles les moins chers
    totalLowPrix.value = lowPrixArticles.reduce((acc, article) => acc + (parseFloat(article.prix) * article.quantiteVendue), 0);

    // Récupérer les articles les mieux vendus
    const topVendusResponse = await fetch("http://localhost:3000/articles");
    const topVendusArticles = await topVendusResponse.json();
    topVendusData.value.labels = topVendusArticles.map(a => a.nomA);
    topVendusData.value.datasets[0].data = topVendusArticles.map(a => a.quantiteVendue);

    // Calcul du total des ventes pour les articles les mieux vendus
    totalTopVendus.value = topVendusArticles.reduce((acc, article) => acc + (parseFloat(article.prix) * article.quantiteVendue), 0);
    
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
  }
});
</script>

<template>
  <div>
    <HeaderComponent/>

    <h1>Statistiques des Articles</h1>

    <!-- Top 5 des Articles les Plus Chers -->
    <div class="chart-container">
      <h2>📊 Top 5 des Articles les Plus Chers</h2>
      <GraphiqueComponent chartType="bar" :chartData="topPrixData" :chartOptions="chartOptions" />
      <p>Total des articles les plus chers : {{ totalTopPrix }} €</p>
    </div>

    <!-- Top 5 des Articles les Moins Chers -->
    <div class="chart-container">
      <h2>📉 Top 5 des Articles les Moins Chers</h2>
      <GraphiqueComponent chartType="line" :chartData="lowPrixData" :chartOptions="chartOptions" />
      <p>Total des articles les moins chers : {{ totalLowPrix }} €</p>
    </div>

    <!-- Top 5 des Articles les Mieux Vendus -->
    <div class="chart-container">
      <h2>📈 Top 5 des Articles les Mieux Vendus</h2>
      <GraphiqueComponent chartType="pie" :chartData="topVendusData" :chartOptions="chartOptions" />
      <p>Total des ventes des articles les mieux vendus : {{ totalTopVendus }} €</p>
    </div>
    <FooterComponent/>
  </div>
</template>
