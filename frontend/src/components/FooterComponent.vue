<template>
    <footer class="footer">
        <nav>
            &copy; buddl.io
            <a href="https://www.linkedin.com/company/buddl/" target="_blank" class="image-button">
            <img src="/images/LogoLinkedin.jpeg" alt="Logo de Linkedin" />
    </a>
        </nav>
    </footer>
  </template>
  
  <style scoped>
  .footer {
    background-color: #020C33;
    color: white;
    text-align: center;
    padding: 15px;
    position: relative;
    bottom: 0;
    width: 100%;
    font-family: "Quicksand", sans-serif;
  }

.image-button img {
  width: 30px;  /* Taille de l'image */
  height: auto;
}

/* Effet de survol (hover) */
.image-button:hover img {
  transform: scale(1.1); /* Agrandissement de l'image au survol */
}
  </style>