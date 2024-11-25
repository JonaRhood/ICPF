<a id="readme-top"></a>

[![Netlify Status](https://api.netlify.com/api/v1/badges/87702591-a8f8-45d7-9447-8c3b43233c33/deploy-status)](https://app.netlify.com/sites/caminandoporfe/deploys)

# <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHlxZnUzc3NlZm95YzU3Z3psOG41eGY2dTFzd2NmZ3V4bTdlZzVpZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/gdTD9BIMWfPEnWmV4e/giphy.gif" width="30">&nbsp; Iglesia Caminando por Fe (ICPF)


<div align="center">
    <img src="/src/public/img/screenshotICPF.jpg" alt="Logo" width="800" >
</div>
<br />

Este proyecto es un sitio web personalizado desarrollado para la **Iglesia Cristiana Caminando por Fe**. Sirve como un espacio digital acogedor e informativo donde los miembros de la iglesia y los visitantes pueden acceder fácilmente a información sobre la iglesia, eventos y recursos comunitarios. Construido con **Vite** para un rendimiento optimizado, el sitio web incorpora **Barba.js** para transiciones fluidas entre páginas, **Swiper.js** para sliders interactivos, y **GSAP** para animaciones suaves, creando una experiencia dinámica y visualmente atractiva para el usuario.

El objetivo principal de este proyecto fue proporcionar un diseño moderno y fácil de usar que mejore la presencia en línea de la **Iglesia Cristiana Caminando por Fe**, reflejando su misión y fomentando la participación de la comunidad. Cada característica está cuidadosamente diseñada para facilitar la navegación y garantizar que el sitio sea un centro vibrante y acogedor para actividades y recursos relacionados con la iglesia.

<!-- **Enlace al proyecto en vivo:** <a href="web">web</a><br/> -->

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## 📋 &nbsp; Tabla de Contenidos

1. [Resumen del Proyecto](#project-overview)
2. [Características y Mejoras](#features)
3. [Instalación](#installation)
4. [Tecnologías Utilizadas](#technologies-used)
5. [Contacto](#contact)

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## ✏️ &nbsp; <a id="project-overview">Resumen del Proyecto</a>

El sitio web de la **Iglesia Cristiana Caminando por Fe** está diseñado para ser una plataforma en línea accesible y atractiva para los miembros de la iglesia, visitantes y la comunidad en general. Los objetivos principales del sitio web son compartir información importante sobre la misión, eventos y ministerios de la iglesia, mientras fomenta un sentido de comunidad en línea.

Este proyecto representa una combinación cuidadosa de diseño y funcionalidad, destinado a crear un espacio en línea que apoye la misión de la **Iglesia Cristiana Caminando por Fe**, ayudando a los usuarios a mantenerse conectados e informados con facilidad.

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## 💿 &nbsp; <a id="features">Características y Mejoras</a>

- **Centro Informativo**:
    - Diseñado como un recurso informativo integral, el sitio web proporciona contenido claro y accesible sobre la misión, ministerios y eventos comunitarios de la iglesia. Los visitantes pueden encontrar rápidamente horarios de servicios, aprender sobre programas de la iglesia y mantenerse actualizados sobre eventos próximos, convirtiéndolo en un punto central para información relacionada con la iglesia.
- **Integración con la API de YouTube v3**:  
    - La API de YouTube v3 se ha utilizado para obtener automáticamente información sobre los videos del canal de la iglesia. Esto permite crear y actualizar dinámicamente una página de sermones donde los usuarios pueden acceder fácilmente a los videos más recientes publicados en el canal de YouTube, proporcionando una experiencia automatizada y siempre actualizada para los visitantes.
- **Transiciones Suaves Entre Páginas**:
    - Implementado con **Barba.js**, ofreciendo una experiencia de navegación fluida que mejora la transición entre las diferentes secciones del sitio.
- **Sliders Interactivos**:
    - Integración de **Swiper.js** para sliders de imágenes y contenido visualmente atractivos e interactivos, ideales para destacar eventos y anuncios importantes.
- **Animaciones y Efectos Visuales**:
    - Con **GSAP**, el sitio presenta animaciones refinadas que crean un entorno dinámico y acogedor, mientras asegura un rendimiento optimizado.
- **Adaptación Móvil**:
    - El diseño es completamente responsivo, proporcionando una experiencia óptima en dispositivos de escritorio, tablets o smartphones.
- **Política de Privacidad y Control de Cookies**:
    - El sitio web respeta la privacidad del usuario con una política de cookies personalizable, permitiendo a los usuarios controlar la carga de contenido de terceros, como videos de YouTube y Google Maps. Esto garantiza que los usuarios puedan gestionar sus preferencias de privacidad de datos mientras acceden a toda la información disponible.

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

## 🛠️ &nbsp; <a id="installation">Instalación</a>

1. Clona el repositorio:
```bash
git clone https://github.com/JonaRhood/ICPF
```

2. Cambia la playlist actual de YouTube por la playlist correspondiente:
    - En el archivo .github/workflows/fetch_youtube_data.yml, añade tu playlist ID en el siguiente codigo:
```yml
steps:
    run: |
        curl "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=ID-DE-TU-PLAYLIST&key=${YOUTUBE_API_KEY}" -o src/public/data/youtubeData.json
```

3. Añade tu API Key de YouTube a tu repositorio en GitHub:
    - En tu nuevo repositorio, en GitHub, dirígete a Settings > Secrets and variables > Actions > Manage repository secrets (or New repository secret).
    - Crea un nuevo secreto de repositorio con el nombre: YOUTUBE_API_KEY
    - Ingresa tu clave API de YouTube y guarda los cambios.

4. Instala los paquetes de Vite:
```bash
npm install
```

4. Inicia la Aplicación localmente:
```bash
npm run dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⚙️ &nbsp; <a id="technologies-used">Tecnologías Utilizadas</a>

[![VITE][Vite.js]][Vite-url]
[![BARBA][BARBA.js]][BARBA-url]
[![SWIPER][SWIPER.js]][SWIPER-url]
[![GSAP][GSAP.js]][GSAP-url]
[![JAVASCRIPT][JAVASCRIPT.js]][JAVASCRIPT-url]
[![CSS][CSS.js]][CSS-url]
[![HTML5][HTML5.js]][HTML5-url]
[![GIT][GIT.js]][GIT-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 👤 &nbsp; <a id="contact">Contacto</a>

<a href="https://github.com/JonaRhood/reddit-client/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=JonaRhood/reddit-client" />
</a>

[![LinkedIn][linkedin-shield]][linkedin-url] <br />
Jonathan Cano -  jonathancanofreta@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[Vite.js]: https://img.shields.io/badge/VITE-20232A?style=for-the-badge&logo=vite&logoColor=yellow
[Vite-url]: https://vite.dev/
[Barba.js]: https://img.shields.io/badge/BARBA.JS-20232A?style=for-the-badge&logo=&logoColor=yellow
[Barba-url]: https://barba.js.org/
[Swiper.js]: https://img.shields.io/badge/SWIPER.JS-20232A?style=for-the-badge&logo=swiper&logoColor=blue
[Swiper-url]: https://swiperjs.com/
[GSAP.js]: https://img.shields.io/badge/GSAP-20232A?style=for-the-badge&logo=greensock&logoColor=lime
[GSAP-url]: https://gsap.com/
[Javascript.js]: https://img.shields.io/badge/Javascript-20232A?style=for-the-badge&logo=JavaScript&logoColor=Y
[Javascript-url]: https://developer.mozilla.org/es/docs/Web/JavaScript
[CSS.js]: https://img.shields.io/badge/CSS3-20232A?style=for-the-badge&logo=css3&logoColor=306af1
[CSS-url]: https://developer.mozilla.org/es/docs/Web/CSS
[HTML5.js]: https://img.shields.io/badge/HTML5-20232A?style=for-the-badge&logo=html5&logoColor=e8571f
[HTML5-url]: https://developer.mozilla.org/es/docs/Glossary/HTML5
[Git.js]: https://img.shields.io/badge/git-20232A?style=for-the-badge&logo=git&logoColor=e8571f
[Git-url]: https://git-scm.com/
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-blue.svg?style=for-the-badge&logo=linkedin&colorBlue
[linkedin-url]: https://www.linkedin.com/in/jonathancanocalduch
