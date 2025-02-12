<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import GraphiqueComponent from "./components/GraphiqueComponent.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

// Données des graphiques
const topPrixData = ref({
  labels: [],
  datasets: [{ label: "Prix des Articles", data: [], backgroundColor: ["purple", "blue", "green", "orange", "red"] }]
});

const lowPrixData = ref({
  labels: [],
  datasets: [{ label: "Prix des Articles", data: [], backgroundColor: ["purple", "blue", "green", "orange", "red"] }]
});

const topVendusData = ref({
  labels: [],
  datasets: [{ label: "Quantité Vendue", data: [], backgroundColor: ["purple", "blue", "green", "orange", "red"] }]
});

// Options des graphiques
const chartOptions = ref({
  responsive: true,
  plugins: { legend: { display: true } }
});

onMounted(async () => {
  try {
    const { data: articles } = await axios.get("http://localhost:3000/articles");

    if (!Array.isArray(articles) || articles.length === 0) {
      throw new Error("Données reçues invalides ou vides !");
    }

    console.log("📡 Articles reçus :", articles);

    // Trier et sélectionner les 5 articles les plus chers
    const topPrixArticles = [...articles].sort((a, b) => b.prix - a.prix);
      topPrixData.value = {
      labels: topPrixArticles.map(a => a.nomA),
      datasets: [{ label: "Prix des Articles", data: topPrixArticles.map(a => parseFloat(a.prix)), backgroundColor: ["purple", "blue", "green", "orange", "red"] }]
    };

    // Trier et sélectionner les 5 articles les moins chers
    const lowPrixArticles = [...articles].sort((a, b) => a.prix - b.prix).slice(0, 5);
    lowPrixData.value = {
      labels: lowPrixArticles.map(a => a.nomA),
      datasets: [{ label: "Prix des Articles", data: lowPrixArticles.map(a => parseFloat(a.prix)), backgroundColor: ["purple", "blue", "green", "orange", "red"] }]
    };

    // Trier et sélectionner les 5 articles les plus vendus
    const topVendusArticles = [...articles].sort((a, b) => b.quantiteVendue - a.quantiteVendue).slice(0, 5);
    topVendusData.value = {
      labels: topVendusArticles.map(a => a.nomA),
      datasets: [{ label: "Quantité Vendue", data: topVendusArticles.map(a => a.quantiteVendue), backgroundColor: ["purple", "blue", "green", "orange", "red"] }]
    };

  } catch (error) {
    console.error("❌ Erreur lors de la récupération des articles :", error);
  }
});
</script>

<template>
  <div>
    <HeaderComponent/>

    <h1>📊 Statistiques des Articles</h1>

    <!-- Top 5 des Articles les Plus Chers -->
    <div class="chart-container">
      <h2>💰 Top 5 des Articles les Plus Chers</h2>
      <GraphiqueComponent chartType="bar" :chartData="topPrixData" :chartOptions="chartOptions" />
    </div>

    <!-- Top 5 des Articles les Moins Chers -->
    <div class="chart-container">
      <h2>📉 Top 5 des Articles les Moins Chers</h2>
      <GraphiqueComponent chartType="line" :chartData="lowPrixData" :chartOptions="chartOptions" />
    </div>

    <!-- Top 5 des Articles les Mieux Vendus -->
    <div class="chart-container">
      <h2>📈 Top 5 des Articles les Mieux Vendus</h2>
      <GraphiqueComponent chartType="pie" :chartData="topVendusData" :chartOptions="chartOptions" />
    </div>

    <FooterComponent/>
  </div>
</template>

<style scoped>

h2 {
  color: #333;
}
p {
  font-weight: bold;
}
</style>
