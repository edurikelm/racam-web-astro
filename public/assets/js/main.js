/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
   navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
   })
}

/* Menu hidden */
if(navClose){
   navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
   })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
   const navMenu = document.getElementById('nav-menu')
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const bgHeader = () =>{
   const header = document.getElementById('header')
   // Add a class if the bottom offset is greater than 50 of the viewport
   this.scrollY >= 50 ? header.classList.add('bg-header') 
                      : header.classList.remove('bg-header')
}
window.addEventListener('scroll', bgHeader)
bgHeader()

/*=============== SWIPER SERVICES ===============*/ 
const swiperServices = new Swiper('.services__swiper', {
   loop: true,
   grabCursor: true,
   spaceBetween: 24,
   slidesPerView: 'auto',
   
   // Autoplay configuration
   autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
   },

   navigation: {
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev',
   },
   
   // Responsive breakpoints
   breakpoints: {
      640: {
         slidesPerView: 1,
         spaceBetween: 20,
      },
      768: {
         slidesPerView: 2,
         spaceBetween: 24,
      },
      1024: {
         slidesPerView: 'auto',
         spaceBetween: 24,
      },
   },
   
   // Event callbacks
   on: {
      slideChange: function () {
         updateServiceIndicators(this.realIndex);
      },
   },
})

// Function to update service indicators
function updateServiceIndicators(activeIndex) {
   const indicators = document.querySelectorAll('.services__indicator-dot');
   indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === activeIndex);
   });
}

// Add click functionality to indicators
document.querySelectorAll('.services__indicator-dot').forEach((dot, index) => {
   dot.addEventListener('click', () => {
      swiperServices.slideToLoop(index);
   });
});

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
   // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)
scrollUp()

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
   origin: 'top',
   distance: '100px',
   duration: 2500,
   delay: 400,
   // reset: true, // Animations repeat
})

sr.reveal(`.home__content, .services__data, .services__swiper, .footer__container`)
sr.reveal(`.home__images`, {origin: 'bottom', delay: 1000})
sr.reveal(`.about__images, .contact__img`, {origin: 'left'})
sr.reveal(`.about__data, .contact__data`, {origin: 'right'})
sr.reveal(`.projects__card`, {interval: 100})
sr.reveal(`.gallery-photo-card`, {interval: 200})

/*=============== PROJECT MODAL ===============*/
let modalSwiper;

// Datos de los proyectos con sus imágenes
const projectsData = {
   project1: {
      title: "Two Story House",
      images: [
         "assets/img/projects-img-1.png",
         "assets/img/home-img-1.png",
         "assets/img/about-img-1.png"
      ]
   },
   project2: {
      title: "Stairs & Columns",
      images: [
         "assets/img/projects-img-2.png",
         "assets/img/home-img-2.png",
         "assets/img/about-img-2.png"
      ]
   },
   project3: {
      title: "Kitchen Room",
      images: [
         "assets/img/projects-img-3.png",
         "assets/img/contact-img.png",
         "assets/img/home-img-1.png"
      ]
   }
}

// Función para abrir el modal
function openProjectModal(projectId) {
   const modal = document.getElementById('project-modal');
   const modalTitle = document.getElementById('modal-title');
   const swiperWrapper = document.getElementById('modal-swiper-wrapper');
   
   // Obtener datos del proyecto
   const project = projectsData[projectId];
   
   if (!project) return;
   
   // Actualizar título
   modalTitle.textContent = `Fotos - ${project.title}`;
   
   // Limpiar slides anteriores
   swiperWrapper.innerHTML = '';
   
   // Agregar nuevas imágenes
   project.images.forEach((imageSrc, index) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `<img src="${imageSrc}" alt="Foto ${index + 1} del proyecto">`;
      swiperWrapper.appendChild(slide);
   });
   
   // Mostrar modal
   modal.classList.add('show');
   document.body.style.overflow = 'hidden';
   
   // Inicializar o actualizar Swiper
   if (modalSwiper) {
      modalSwiper.destroy(true, true);
   }
   
   modalSwiper = new Swiper('.modal__swiper', {
      loop: true,
      grabCursor: true,
      spaceBetween: 10,
      centeredSlides: true,
      
      navigation: {
         nextEl: '.modal__swiper-next',
         prevEl: '.modal__swiper-prev',
      },
      
      pagination: {
         el: '.modal__swiper-pagination',
         clickable: true,
      },
   });
}

// Función para cerrar el modal
function closeProjectModal() {
   const modal = document.getElementById('project-modal');
   modal.classList.remove('show');
   document.body.style.overflow = '';
   
   // Destruir Swiper
   if (modalSwiper) {
      modalSwiper.destroy(true, true);
      modalSwiper = null;
   }
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(event) {
   if (event.key === 'Escape') {
      closeProjectModal();
      closeServiceJobsModal();
   }
});

// ================= SERVICIOS: MODAL DE TRABAJOS Y FOTOS =================
const serviceJobsData = {
   'media-tension': [
      'Tendido de alimentadores en media tensión aéreos y soterrados.',
      'Instalación de transformadores de distribución tipos aéreos y pad mounted.',
      'Instalación de equipos Reconectadores.',
      'Instalación de transformadores reductores.',
      'Instalación de equipos compactos de medida.',
      'Empalmes en media tensión.',
      'Mantenimiento preventivo y correctivo de instalaciones eléctricas en media tensión.'
   ],
   'baja-tension': [
      'Instalaciones eléctricas industriales (trifásicas).',
      'Instalación de grupos generador con tableros de transferencia automática.',
      'Instalación de banco de condensadores.',
      'Instalaciones eléctricas domiciliarias en EMT, Conduit y bandejas porta conductoras.',
      'Empalmes en baja tensión.',
   ],
   'ingenieria-estudios': [
      'Declaraciones eléctricas TE1, TE2, TE3, TE4 Y TE6.',
      'Planos electricos.',
      'Memorias de cálculos.',
      'Mediciones de suelos.',
      'Medición de mallas a tierra.',
      'Verificaciones iniciales eléctricas.',
   ],
   'foto-clima': [
      'Instalación de sistemas de energía fotovoltaica para viviendas y comercios.',
      'Instalación de sistemas de climatización eléctrica (aire acondicionado).',
   ]
};

const servicePhotosData = {
   'media-tension': [
      'assets/img/media-tension/6e840dd7-8917-4d86-9c8d-ae223bc590b2.jpg',
      'assets/img/media-tension/b10d20c4-2499-480c-b496-3dfd22edc906.jpg',
      'assets/img/media-tension/ce1fd11d-b955-4afc-b858-ebd8c2647150.jpg',
      'assets/img/media-tension/b6d88839-1d27-4f3e-8911-fb9d14bf5254.jpg',
   ],
   'baja-tension': [
      'assets/img/baja-tension/89d22723-74aa-4db9-8c4e-09312807dcee.jpg',
      'assets/img/baja-tension/e5841adc-a69d-40b2-afaa-d30f93ad2811.jpg',
      'assets/img/baja-tension/d044af0c-0ca1-4726-aea5-e8439169aa38.jpg',
      'assets/img/baja-tension/c5331e4a-4be3-4af8-92d4-419b777ffbe9.jpg'
   ],
   'ingenieria-estudios': [
      'assets/img/ingenieria-estudios/96db83fd-47da-4a07-b7a5-ec3e64b4d48d.jpg',
      'assets/img/ingenieria-estudios/23c54153-c6fe-41f9-a2b9-f902879dc155.jpg',
      'assets/img/ingenieria-estudios/bca786e0-0278-4ab9-afbb-7b127feede64.jpg',
      'assets/img/ingenieria-estudios/f68fd330-b25b-499c-906f-f45fa073d9f2.jpg'
   ],
   'foto-clima': []
};

function showServiceJobs(serviceId) {
   const modal = document.getElementById('service-jobs-modal');
   const title = document.getElementById('service-jobs-title');
   const list = document.getElementById('service-jobs-list');
   let serviceName = '';
   let serviceIcon = '';
   
   switch(serviceId) {
      case 'media-tension': 
         serviceName = 'Media Tensión'; 
         serviceIcon = 'ri-flashlight-line';
         break;
      case 'baja-tension': 
         serviceName = 'Baja Tensión'; 
         serviceIcon = 'ri-plug-line';
         break;
      case 'ingenieria-estudios': 
         serviceName = 'Ingeniería y Estudios'; 
         serviceIcon = 'ri-file-text-line';
         break;
      case 'foto-clima': 
         serviceName = 'Fotovoltaica y Climatización'; 
         serviceIcon = 'ri-sun-line';
         break;
      default: 
         serviceName = 'Servicio';
         serviceIcon = 'ri-service-line';
   }
   
   title.innerHTML = `<i class="${serviceIcon}"></i> Trabajos de ${serviceName}`;
   list.innerHTML = '';
   list.className = 'service-jobs-list enhanced-list';
   
   const jobs = serviceJobsData[serviceId] || [];
   jobs.forEach((job, index) => {
      const li = document.createElement('li');
      li.className = 'service-job-item';
      li.innerHTML = `
         <div class="service-job-content">
            <div class="service-job-icon">
               <i class="ri-check-line"></i>
            </div>
            <div class="service-job-text">
               ${job}
            </div>
         </div>
      `;
      
      // Agregar animación escalonada
      li.style.animationDelay = `${index * 0.1}s`;
      list.appendChild(li);
   });
   
   modal.style.display = 'block';
   setTimeout(() => modal.classList.add('show'), 10);
   document.body.style.overflow = 'hidden';
}

function closeServiceJobsModal() {
   const modal = document.getElementById('service-jobs-modal');
   modal.classList.remove('show');
   setTimeout(() => { modal.style.display = 'none'; }, 300);
   document.body.style.overflow = '';
}

function showServicePhotos(serviceId) {
   const modal = document.getElementById('project-modal');
   const modalTitle = document.getElementById('modal-title');
   const swiperWrapper = document.getElementById('modal-swiper-wrapper');
   let serviceName = '';
   switch(serviceId) {
      case 'media-tension': serviceName = 'Media Tensión'; break;
      case 'baja-tension': serviceName = 'Baja Tensión'; break;
      case 'ingenieria-estudios': serviceName = 'Ingeniería y Estudios'; break;
      default: serviceName = 'Servicio';
   }
   modalTitle.textContent = `Fotos de ${serviceName}`;
   swiperWrapper.innerHTML = '';
   const images = servicePhotosData[serviceId] || [];
   images.forEach((imageSrc, index) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `<img src="${imageSrc}" alt="Foto ${index + 1} de ${serviceName}">`;
      swiperWrapper.appendChild(slide);
   });
   modal.classList.add('show');
   document.body.style.overflow = 'hidden';
   if (modalSwiper) {
      modalSwiper.destroy(true, true);
   }
   modalSwiper = new Swiper('.modal__swiper', {
      loop: true,
      grabCursor: true,
      spaceBetween: 10,
      centeredSlides: true,
      navigation: {
         nextEl: '.modal__swiper-next',
         prevEl: '.modal__swiper-prev',
      },
      pagination: {
         el: '.modal__swiper-pagination',
         clickable: true,
      },
   });
}

/*=============== GALLERY ===============*/
// Variables del modal de galería
const galleryModal = document.getElementById('gallery-modal');
const galleryModalImage = document.getElementById('gallery-modal-image');
const galleryCloseModal = document.getElementById('gallery-close-modal');
const galleryPhotoCards = document.querySelectorAll('.gallery-photo-card');

// Funcionalidad del modal de galería
galleryPhotoCards.forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('.gallery-photo-image');
        galleryModalImage.src = img.src;
        galleryModalImage.alt = img.alt;
        galleryModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Cerrar modal con botón
galleryCloseModal.addEventListener('click', () => {
    galleryModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Cerrar modal clickeando fuera de la imagen
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Funcionalidad de filtros
const galleryFilterButtons = document.querySelectorAll('.gallery-filter-btn');
const galleryGrid = document.getElementById('gallery-grid');

galleryFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover clase active de todos los botones
        galleryFilterButtons.forEach(btn => btn.classList.remove('active'));
        // Agregar clase active al botón clickeado
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        
        galleryPhotoCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInScale 0.6s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Animación de entrada escalonada
galleryPhotoCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryModal.style.display === 'block') {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
