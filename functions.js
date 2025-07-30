// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
const navigation = document.getElementById('navigation');
const projectsGrid = document.getElementById('projectsGrid');
const reviewsTrack = document.getElementById('reviewsTrack');
const reviewsDots = document.getElementById('reviewsDots');
const prevReviewBtn = document.getElementById('prevReview');
const nextReviewBtn = document.getElementById('nextReview');
const contactForm = document.getElementById('contactForm');

//Archivo de Logo para la animacion del hero section
document.getElementById('labIconWrapper').innerHTML = `
  <img src="img/Camolablogo2.svg" class="logo-icon" alt="CamoLab Logo" />
`;

//Animaciones del hero section 
const labIconWrapper = document.getElementById('labIconWrapper');
const labText = document.getElementById('labText');

  const iconSequence = [
    { icon: true, text: 'Camo Lab', logo: true}, //Logo en loop
    { icon: 'box', text: 'Structure' },
    { icon: 'origami', text: 'Adaptability' },
    { icon: 'wand-2', text: 'Creativity' },
    { icon: 'brain', text: 'Innovation' },
    { icon: 'biceps-flexed', text: 'Proactivity' },
    { icon: 'pen-tool', text: 'Design' },
    { icon: 'check-square', text: 'Quality' },
    { icon: 'clock', text: 'Efficiency' },
    { icon: 'heart', text: 'Passion' }
  ];
  // Animacion pulso iconos
let currentIndex = 0;

setInterval(() => {
  currentIndex = (currentIndex + 1) % iconSequence.length;
  const { icon, text, logo } = iconSequence[currentIndex];

  if (logo) {
    labIconWrapper.innerHTML = `<img src="img/Camolablogo2.svg" class="logo-icon" alt="CamoLab Logo" />`;
  } else {
    labIconWrapper.innerHTML = `<span class="pulse-icon" data-lucide="${icon}"></span>`;
    lucide.createIcons();
  }

  labText.textContent = text;
  labText.classList.remove('fade');
  void labText.offsetWidth;
  labText.classList.add('fade');
}, 3000);

  // State [Controles globales del codigo]
let currentReviewIndex = 0; //indice actual del carrusel 
let autoPlayInterval; // ID del setInterval para el carrusel 
let isAutoPlaying = true; // este controla el autoplay del carruse
let showingAllProjects = false; 

//Los proyectos destinan en JS 
// Sample Data
const projects = [
    {
        id: 1,
        title: "Garden Decor Collection",
        description: "Full 3D design and prototyping of garden ornaments, including plant pots, figurines, and path markers, tailored for aesthetic and functional outdoor decoration.",
        category: "mass-production",
        image: "https://static.designboom.com/wp-content/uploads/2023/06/pure-plants-living-sculptures-designboom-1800.jpg",
        materials: ["PLA", "PETG"],
        duration: "95 hours",
        location: "Santa Ana, San José",
        price: "$620",
        deliveryDate: "April 2, 2024",
        shippingDate: "April 4, 2024"
    },
    {
        id: 2,
        title: "Jinx Shark Rocket Replica",
        description: "High-detail 3D replica of Jinx's shark-shaped bazooka from Netflix’s Arcane. Includes painting, assembly, and reinforced inner structure for cosplay use.",
        category: "custom-design",
        image: "https://images.cults3d.com/1HnKJ5FpxWtiewwYPl2E45YB4n8=/516x516/filters:no_upscale():format(webp)/https://fbi.cults3d.com/uploaders/12510347/illustration-file/e238ce1b-19f2-432b-8a60-ff932d6572e3/PXL_20250304_123458818.jpg",
        materials: ["PLA","Epoxy Resin","Acrylic Paint"],
        duration: "160 hours",
        location: "Escazú, San José",
        price: "$1,260",
        deliveryDate: "May 17, 2024",
        shippingDate: "May 23, 2024"
    },
    {
        id: 3,
        title: "Adjustable Bookends Set",
        description: " Modular 3D-printed bookends with adjustable width for different shelf sizes. Created for home and office use, with matte black finish, in colaboration with 'La Libreria Internacional'.",
        category: "industrial",
        image: "https://fbi.cults3d.com/uploads/collection/shot_en/185/Hanging-Cat-Book-Nook-KrakDrag-5.jpg",
        materials: ["PETG"],
        duration: "45 hours",
        location: "Curridabat, San José",
        price: "$220",
        deliveryDate: "March 25, 2024",
        shippingDate: "March 28, 2024"
    },
    {
        id: 4,
        title: "Hive Lamps Collection",
        description: "Collection of 3D-printed lamps with a beehive-inspired structure. Designed to diffuse warm light patterns and serve as decorative interior lighting.",
        category: "prototyping",
        image: "https://fbi.cults3d.com/uploads/collection/shot_en/149/3D_printed_candle_holder_1.jpg",
        materials: ["PLA", "Translucent", "LED System"],
        duration: "80 hours",
        location: "San Pedro, Montes de Oca",
        price: "$480",
        deliveryDate: "June 10, 2024",
        shippingDate: "June 14, 2024"
    },
    {
      //https://fbi.cults3d.com/uploads/collection/shot_en/186/fidget_toys_collection_3D_printing_2.jpg
        id: 5,
        title: "Custom Mecha Snake Sculpture",
        description: "Large-scale 3D-printed robotic snake with articulated segments, created according to client references. Features hand-painted metallic details and custom box.",
        category: "custom-design",
        image: "https://fbi.cults3d.com/uploads/slide/shot_en/501/RoboRattler_mtl_2_wide.jpg",
        materials: ["PLA", "ABS", "Metallic Paint"],
        duration: "140 hours",
        location: "Mercedes Norte, Heredia",
        price: "$980",
        deliveryDate: "July 1, 2024",
        shippingDate: "July 9, 2024"
    },
    {
        id: 6,
        title: "Pokéball Collector's Set",
        description: "Complete collection of iconic Pokéballs from the Pokémon series, 3D-modeled and painted for display purposes. Includes stand and magnetic assembly.",
        category: "prototyping",
        image: "https://img-new.cgtrader.com/items/3982949/07a2e805e6/pokemon-assorted-poke-ball-set-24-opening-and-closing-models-3d-model-07a2e805e6.jpg",
        materials: ["Carbon Fiber PLA", "PETG", "Enamel Paint"],
        duration: "100 hours",
        location: "Zapote, San José",
        price: "$680",
        deliveryDate: "May 30, 2024",
        shippingDate: "June 6, 2024"
    },
    {
        id: 7,
        title: "Wall-Mounted Medusa Face",
        description: "CLarge-scale 3D sculpture of the mythological creature Medusa, designed for wall mounting. High-detail finish with realistic textures and stone-like paint.",
        category: "custom-design",
        image: "https://img-new.cgtrader.com/items/4946932/bc09a08604/medusa-wall-decor-3d-model-bc09a08604.jpg",
        materials: ["PLA", "Textured Paint", "Mounting Hardware"],
        duration: "110 hours",
        location: "Rohrmoser, San José",
        price: "$720",
        deliveryDate: "September 3, 2023",
        shippingDate: "June 6, 2024"
    },
    {
        id: 8,
        title: "Demon Mouth Mask",
        description: "Partial facial mask covering only the mouth and jaw, with stylized fangs and aggressive expression. Inspired by oni/demon themes from Japanese culture.",
        category: "prototyping",
        image: "https://img-new.cgtrader.com/items/3999318/804a2e41fe/traditional-japanese-hannya-half-mask-2-oni-half-mask-samurai-3d-model-804a2e41fe.jpg",
        materials: ["PLA", "Acrylic Paint"],
        duration: "35 hours",
        location: "Tibas, San José",
        price: "$180",
        deliveryDate: "April 15, 2023",
        shippingDate: "June 6, 2024"
    },
    {
        id: 9,
        title: "Zelda Master Sword & Sheath",
        description: "Replica of the iconic Master Sword and its sheath from The Legend of Zelda: The Twilight Princess, including a custom-built tabletop stand for elegant display.",
        category: "custom-design",
        image: "https://img-new.cgtrader.com/items/2861591/d85c4eebaf/mastersword-sheath-stand-3d-print-ready-3d-model-d85c4eebaf.jpg",
        materials: ["PLA", "Wood Base", "Metalic Paint"],
        duration: "180 hours",
        location: "Grecia, Alajuela",
        price: "$890",
        deliveryDate: "Octuber 28, 2024",
        shippingDate: "June 6, 2024"
    },  
    {
        id: 10,
        title: "Dragon Phone Stands",
        description: "Custom-designed phone stands in the shape of a dragon for corporate gifting. Batch production for a full department in a local company.",
        category: "mass-production",
        image: "https://img-new.cgtrader.com/items/5735002/f6b96c7e2c/dragon-phone-stand-219-3d-model-f6b96c7e2c.jpg",
        materials: ["PETG", "Matte Finish"],
        duration: "75 hours",
        location: "Lindora, Santa Ana",
        price: "$600",
        deliveryDate: "May 9, 2023",
        shippingDate: "June 6, 2024"
    },
    {
        id: 11,
        title: "Commercial Planter Set",
        description: "Batch production of 50 durable and stylish 3D-printed plant pots for use in mall interiors and promotional activations. Order from EPA complex",
        category: "industrial",
        image: "https://img-new.cgtrader.com/items/5088544/9f3ed2bbe3/74-huge-pot-vase-collection-3d-print-model-a01-3d-model-9f3ed2bbe3.jpg",
        materials: ["PLA+"],
        duration: "145 hours",
        location: "Escazú, San José",
        price: "$1,300",
        deliveryDate: "March 19, 2023",
        shippingDate: "June 6, 2024"
    },
    {
        id: 12,
        title: " Interlocking Anti-Stress Screws",
        description: "CEducational tool developed for a primary school: a set of interlocking screw-and-nut toys, designed to help children with anxiety and attention focus.",
        category: "prototyping",
        image: "https://fbi.cults3d.com/uploads/collection/shot_en/186/fidget_toys_collection_3D_printing_2.jpg",
        materials: ["PLA(non-toxic)", "Soft Finish"],
        duration: "30 hours",
        location: "San Ramón, Alajuela",
        price: "$120",
        deliveryDate: "February 10, 2024",
        shippingDate: "June 6, 2024"
    },
];
//Comentarios de los clientes, area del review
const reviews = [
    {
        id: 1,
        name: "María González",
        company: "Tech Startup",
        location: "Curridabat, San José",
        rating: 5,
        text: "Camo Lab transformed our product prototype from concept to reality in just 2 days. The quality exceeded our expectations and the delivery was right on time. Highly recommended!",
        project: "Mobile App Accessory Prototype",
        avatar: "MG"
    },
    {
        id: 2,
        name: "Carlos Rodríguez",
        company: "Architecture Firm",
        location: "La Unión, Cartago",
        rating: 5,
        text: "The architectural models they created for our client presentations were incredibly detailed. The precision and finish quality helped us win three major projects.",
        project: "Residential Complex Models",
        avatar: "CR"
    },
    {
        id: 3,
        name: "Ana Herrera",
        company: "Medical Device Company",
        location: "Belén, Heredia",
        rating: 5,
        text: "Working with Camo Lab on our medical device prototypes was seamless. Their expertise in material selection and attention to detail made all the difference.",
        project: "Medical Equipment Prototype",
        avatar: "AH"
    },
    {
        id: 4,
        name: "José Morales",
        company: "Educational Institution",
        location: "San Rafael, Alajuela",
        rating: 5,
        text: "The biology models they printed for our university are being used daily by hundreds of students. Durable, accurate, and delivered exactly when promised.",
        project: "Educational Models",
        avatar: "JM"
    },
    {
        id: 5,
        name: "Laura Castillo",
        company: "Fashion Brand",
        location: "Escazú, San José",
        rating: 5,
        text: "Custom jewelry prototypes that helped launch our new collection. The team understood our vision perfectly and delivered beyond expectations.",
        project: "Jewelry Prototypes",
        avatar: "LC"
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize components
    initMobileMenu();
    initScrollEffects();
    initProjectFilters();
    initProjects();
    initReviews();
    initContactForm();
    initSmoothScrolling();
});

// Mobile Menu
function initMobileMenu() {
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('active');
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    mobileMenu.classList.add('active');
    menuIcon.setAttribute('data-lucide', 'x');
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    menuIcon.setAttribute('data-lucide', 'menu');
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Scroll Effects
function initScrollEffects() {
    if (!navigation) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navigation.classList.add('scrolled');
        } else {
            navigation.classList.remove('scrolled');
        }
    });
}

// Project Filters
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Filter projects
            const filter = btn.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
}

//Para filtrar los proyectos 
function filterProjects(filter) {
    showingAllProjects = false; // reset al aplicar filtro

    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.category === filter);
    
    renderProjects(filteredProjects.slice(0, 6)); //muestra solo 6 proyectos por filtrado
    
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const viewMoreText = document.getElementById('viewMoreText');

    // Oculta el botón si hay pocos resultados
    if (filteredProjects.length <= 6) {
        viewMoreBtn.style.display = "none";
    } else {
        viewMoreBtn.style.display = "inline-flex";
        viewMoreText.textContent = "View More";
        viewMoreBtn.classList.remove("expanded");
    }
}

//Projects 
function initProjects() {
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const viewMoreText = document.getElementById('viewMoreText');

    // Inicialmente mostrar solo 6
    renderProjects(projects.slice(0, 6));

    // Acción del botón "Ver más"
    if (viewMoreBtn && viewMoreText) {
        viewMoreBtn.addEventListener('click', () => {
            showingAllProjects = !showingAllProjects;

            if (showingAllProjects) {
                renderProjects(projects);
                viewMoreText.textContent = "View Less";
                viewMoreBtn.classList.add('expanded');
            } else {
                renderProjects(projects.slice(0, 6));
                viewMoreText.textContent = "View More";
                viewMoreBtn.classList.remove('expanded');
            }

            // Re-render icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    }
}

function renderProjects(projectsToRender) {
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = projectsToRender.map(project => `
        <div class="project-card" data-category="${project.category}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-badge">${getCategoryLabel(project.category)}</div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                
                <div class="project-materials">
                    <h4>Materials Used:</h4>
                    <div class="material-tags">
                        ${project.materials.map(material => `<span class="material-tag">${material}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-details">
                    <div class="project-detail">
                        <i data-lucide="clock"></i>
                        <span>Duration: ${project.duration}</span>
                    </div>
                    <div class="project-detail">
                        <i data-lucide="map-pin"></i>
                        <span>Location: ${project.location}</span>
                    </div>
                    <div class="project-detail">
                        <i data-lucide="package"></i>
                        <span>Delivered: ${project.deliveryDate}</span>
                    </div>
                </div>
                
                <div class="project-footer">
                    <div class="project-price">
                        <i data-lucide="dollar-sign"></i>
                        <span>${project.price.replace('$', '')}</span>
                    </div>
                    <button class="btn btn-outline" onclick="scrollToSection('#contact')">
                        Learn More
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function getCategoryLabel(category) {
    const labels = {
        'prototyping': 'Prototyping',
        'mass-production': 'Mass Production',
        'custom-design': 'Custom Design',
        'industrial': 'Industrial'
    };
    return labels[category] || category;
}

// Reviews Carousel
function initReviews() {
    if (!reviewsTrack || !reviewsDots) return;
    
    renderReviews();
    renderReviewsDots();
    startAutoPlay();
    
    if (prevReviewBtn) {
        prevReviewBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevReview();
        });
    }
    
    if (nextReviewBtn) {
        nextReviewBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextReview();
        });
    }
}

function renderReviews() {
    reviewsTrack.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-quote-icon">
                <i data-lucide="quote"></i>
            </div>
            
            <div class="review-stars">
                ${Array(review.rating).fill('<span class="star">★</span>').join('')}
            </div>
            
            <blockquote class="review-text">
                "${review.text}"
            </blockquote>
            
            <div class="review-project">
                Project: ${review.project}
            </div>
            
            <div class="review-author">
                <div class="review-avatar">${review.avatar}</div>
                <div class="review-author-info">
                    <div class="review-author-name">${review.name}</div>
                    <div class="review-author-company">${review.company}</div>
                    <div class="review-author-location">${review.location}</div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function renderReviewsDots() {
    reviewsDots.innerHTML = reviews.map((_, index) => `
        <button class="carousel-dot ${index === 0 ? 'active' : ''}" onclick="goToReview(${index})"></button>
    `).join('');
}

function updateReviewsCarousel() {
    if (!reviewsTrack) return;
    
    const translateX = -currentReviewIndex * 100;
    reviewsTrack.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentReviewIndex);
    });
}

function nextReview() {
    currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
    updateReviewsCarousel();
}

function prevReview() {
    currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
    updateReviewsCarousel();
}

function goToReview(index) {
    currentReviewIndex = index;
    updateReviewsCarousel();
    stopAutoPlay();
}

function startAutoPlay() {
    if (!isAutoPlaying) return;
    
    autoPlayInterval = setInterval(() => {
        nextReview();
    }, 5000);
}

function stopAutoPlay() {
    isAutoPlaying = false;
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
}

// Contact Form
//No aparece el 'Please fill out this field.' 
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleContactSubmit);
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = `
        <div style="width: 1rem; height: 1rem; border: 2px solid white; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 0.5rem;"></div>
        Sending...
    `;
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showToast('Message Sent Successfully!', 'We\'ll get back to you within 24 hours with a detailed quote.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 2000);
}

// Toast notifications
function showToast(title, description, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-description">${description}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i data-lucide="x"></i>
        </button>
    `;
    
    // Add toast styles if not already present
    if (!document.querySelector('#toast-styles')) {
        const styles = document.createElement('style');
        styles.id = 'toast-styles';
        styles.textContent = `
            .toast {
                position: fixed;
                top: 1rem;
                right: 1rem;
                background: white;
                border: 1px solid var(--border);
                border-radius: var(--radius);
                padding: 1rem;
                box-shadow: var(--shadow-lg);
                z-index: 1000;
                display: flex;
                align-items: flex-start;
                gap: 1rem;
                max-width: 24rem;
                animation: slideInRight 0.3s ease;
            }
            
            .toast-success {
                border-left: 4px solid #22c55e;
            }
            
            .toast-content {
                flex: 1;
            }
            
            .toast-title {
                font-weight: 600;
                color: var(--foreground);
                margin-bottom: 0.25rem;
            }
            
            .toast-description {
                font-size: 0.875rem;
                color: var(--muted-foreground);
            }
            
            .toast-close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 0.25rem;
                transition: background-color 0.2s;
            }
            
            .toast-close:hover {
                background: var(--muted);
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(toast);
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Handle navigation clicks
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            scrollToSection(href);
        });
    });
}

function scrollToSection(href) {
    const element = document.querySelector(href);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
    }
}

// Global function for buttons
window.scrollToSection = scrollToSection;
window.goToReview = goToReview;

// Active menu highlighting on scroll
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function activateMenu() {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80; // adjust offset if you have a fixed header
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
        mobileLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
      }
    });
  }

  window.addEventListener('scroll', activateMenu);
  activateMenu(); // Run on page load
});

// File upload icon change
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileUpload');
  const uploadIcon = document.getElementById('uploadIcon');

  if (fileInput && uploadIcon) {
    fileInput.addEventListener('change', function () {
      if (fileInput.files && fileInput.files.length > 0) {
        uploadIcon.setAttribute('data-lucide', 'shield-check');
      } else {
        uploadIcon.setAttribute('data-lucide', 'upload');
      }
      lucide.createIcons();
    });
  }
});

//Parte de Jeff [modificada]
function initImageCarousel() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevCarouselBtn');
  const nextBtn = document.getElementById('nextCarouselBtn');
  const slides = track ? track.querySelectorAll('.carousel-slide') : [];
  let currentIndex = 0;

  if (!track || slides.length <= 1) return;

  function updateCarousel() {
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
  }

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  updateCarousel();
}

document.addEventListener('DOMContentLoaded', function () {
  initImageCarousel();
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
