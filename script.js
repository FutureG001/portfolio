// ==========================================
// 1. THREE.JS 3D ANIMATED BACKGROUND
// ==========================================
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create 3D Wireframe Torus Knot
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x38bdf8, 
    wireframe: true,
    transparent: true,
    opacity: 0.35
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

camera.position.z = 30;

// Mouse Interaction for 3D Movement
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// Render Loop
function animate3D() {
    requestAnimationFrame(animate3D);

    // Continuous rotation
    torusKnot.rotation.x += 0.003;
    torusKnot.rotation.y += 0.005;

    // Smooth response to mouse movement
    torusKnot.rotation.y += mouseX * 0.02;
    torusKnot.rotation.x += mouseY * 0.02;

    renderer.render(scene, camera);
}
animate3D();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// ==========================================
// 2. DYNAMIC PROJECTS DATA & RENDERER
// ==========================================
// Replace YOUR_GITHUB_USERNAME with your actual GitHub username below
const projects = [
    {
        title: "Smart Library Management System",
        description: "A web application managing book borrowings, real-time inventory tracking, and database operations.",
        technologies: ["Python", "SQL", "JavaScript", "HTML/CSS"],
        githubLink: "https://github.com/FutureG001/smart-library",
        liveDemo: "https://smart-library-532x.onrender.com"
    },
    {
        title: "Igbo to Code Translator",
        description: "A localized programming utility translating logic components into native language syntax.",
        technologies: ["Python", "Flask", "Render Platform"],
        githubLink: "https://github.com/FutureG001/Igbo_to_code",
        liveDemo: "https://igbo-to-code.onrender.com"
    },
    {
        title: "Graphic Design Learning Platform",
        description: "An interactive learning framework built with modular asset loading and structured guide sections.",
        technologies: ["PHP", "MySQL", "JavaScript"],
        githubLink: "https://github.com/YOUR_GITHUB_USERNAME/Graphic-Design-Tutorial",
        liveDemo: "https://YOUR_GITHUB_USERNAME.github.io/Graphic-Design-Tutorial"
    }
];

const projectsContainer = document.getElementById("projects-container");

function loadProjects() {
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card">
            <div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-tags">
                    ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
            </div>
            <div class="project-links">
                <a href="${project.githubLink}" target="_blank"><i class="fab fa-github"></i> Code</a>
                <a href="${project.liveDemo}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
            </div>
        </div>
    `).join('');
}
loadProjects();


// ==========================================
// 3. GSAP SCROLL & TEXT ANIMATIONS
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// Hero Text Entrance
gsap.from(".animate-text", {
    duration: 1,
    y: 40,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out"
});

// Scroll-triggered animations for project and skill cards
gsap.from(".skill-card", {
    scrollTrigger: {
        trigger: "#skills",
        start: "top 80%",
    },
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.1,
    ease: "power2.out"
});

gsap.from(".project-card", {
    scrollTrigger: {
        trigger: "#projects",
        start: "top 80%",
    },
    duration: 0.8,
    y: 40,
    opacity: 0,
    stagger: 0.2,
    ease: "power2.out"
});



// 4. GMAIL FORMSFREE CONTACT FORM HANDLER

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const button = contactForm.querySelector("button[type='submit']");
        const originalText = button.innerText;
        
        button.innerText = "Sending...";
        button.disabled = true;

        const data = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert("Thank you! Your message has been sent directly to my Gmail inbox.");
                contactForm.reset();
            } else {
                alert("Oops! There was a problem submitting your form. Please verify your Formspree endpoint action URL.");
            }
        } catch (error) {
            alert("Oops! There was a network error sending your message.");
        } finally {
            button.innerText = originalText;
            button.disabled = false;
        }
    });
}