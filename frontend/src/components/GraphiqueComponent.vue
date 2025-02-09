<template>
  <canvas ref="chartCanvas" width="400" height="400"></canvas> <!-- Ajouter un width et height -->
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import { Chart, registerables } from "chart.js";

// Enregistrement des types de graphiques disponibles
Chart.register(...registerables);

// Définir les propriétés reçues du parent
const props = defineProps({
  chartType: String, // Type de graphique (bar, line, pie, etc.)
  chartData: Object,
  chartOptions: Object
});

// Référence au canvas où le graphique sera dessiné
const chartCanvas = ref(null);

onMounted(() => {
  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: props.chartType, // Type de graphique dynamique (bar, line, pie, etc.)
      data: props.chartData,  // Données pour le graphique
      options: props.chartOptions  // Options du graphique (par ex. la légende)
    });
  }
});
</script>

<style scoped>
canvas {
  display: block; /* Assurez-vous que le canvas prend correctement l'espace */
  margin: 0 auto; /* Centrer le canvas dans son conteneur */
  max-width: 100%; /* Empêche le canvas de dépasser la largeur de son conteneur */
}
</style>
