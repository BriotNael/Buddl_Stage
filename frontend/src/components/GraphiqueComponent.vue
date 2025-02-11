<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script setup>
import { defineProps, onMounted, ref, watch } from "vue";
import { Chart, registerables } from "chart.js";

// Enregistrer les types de graphiques (bar, line, pie, etc.)
Chart.register(...registerables);

const props = defineProps({
  chartType: String,   // Type de graphique
  chartData: Object,   // Données du graphique
  chartOptions: Object // Options du graphique
});

const chartCanvas = ref(null); // Référence au canvas
let chartInstance = null; // Stocker l'instance du graphique

// Fonction pour créer ou mettre à jour le graphique
const renderChart = () => {
  if (!chartCanvas.value || !props.chartData?.labels?.length) {
    console.warn("⏳ En attente de données valides...");
    return;
  }

  // Si un graphique existe déjà, on le détruit avant d’en créer un nouveau
  if (chartInstance) {
    chartInstance.destroy();
  }

  // Options spécifiques pour le graphique pie
  const customOptions = props.chartType === "pie"
    ? { ...props.chartOptions, scales: { x: { display: false }, y: { display: false } } }
    : props.chartOptions;

  chartInstance = new Chart(chartCanvas.value, {
    type: props.chartType,
    data: props.chartData,
    options: customOptions
  });
};


// Exécuter le rendu initial une fois le composant monté
onMounted(renderChart);

// Surveiller les changements des données et mettre à jour le graphique
watch(() => props.chartData, renderChart, { deep: true });
</script>

<style scoped>
canvas {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}
</style>
