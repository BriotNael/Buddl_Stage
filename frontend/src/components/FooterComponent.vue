<template>
    <footer class="footer">
        <nav>
            <div class="left-content">&copy; buddl.io</div>
            <a href="https://www.linkedin.com/company/buddl/" target="_blank" class="image-button">
            <img src="/images/LogoLinkedin.png" alt="Logo de Linkedin" />
    </a>
        </nav>
    </footer>
  </template>
  
  <style scoped>
  .footer {
    background-color: #020C33;
    color: white;
    justify-content: space-between;
    padding: 15px;
    position: relative;
    bottom: 0;
    width: 100%;
    font-family: "Quicksand", sans-serif;
  }

.image-button img {
  width: 50px;  /* Taille de l'image */
  height: auto;
  justify-self: right;
}

/* Effet de survol (hover) */
.image-button:hover img {
  transform: scale(1.1); /* Agrandissement de l'image au survol */
}

.left-content {
  justify-self: start;
}
  </style>