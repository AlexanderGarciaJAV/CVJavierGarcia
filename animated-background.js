/* Crea una animación de partículas interactivas dentro de un contenedor */
function createParticleAnimation(container) {
    if (!container) {
        console.error("No se encontró el contenedor para la animación de partículas.");
        return;
    }

    // --- Configuración del Canvas ---
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    container.prepend(canvas);
    const ctx = canvas.getContext('2d');

    // --- Variables de la Animación ---
    let backgroundParticles = [];
    let interactiveParticles = [];
    const numBackgroundParticles = 100;

    // --- Clase para las Partículas ---
    class Particle {
        constructor(x, y, size, speedX, speedY, color, life = Infinity) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speedX = speedX;
            this.speedY = speedY;
            this.color = color;
            this.life = life;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // --- Generación de Colores ---
    function getRandomColor() {
        const r = 0;
        const g = Math.floor(Math.random() * 50) + 168;
        const b = Math.floor(Math.random() * 50) + 255;
        const a = Math.random() * 0.2 + 0.05;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    // --- Inicialización de Partículas de Fondo ---
    function initBackgroundParticles() {
        backgroundParticles = [];
        for (let i = 0; i < numBackgroundParticles; i++) {
            const size = Math.random() * 3 + 1;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const speedX = Math.random() * 0.5 - 0.25;
            const speedY = Math.random() * 0.5 - 0.25;
            const color = getRandomColor();
            backgroundParticles.push(new Particle(x, y, size, speedX, speedY, color));
        }
    }

    // --- Creación de Estallido de Partículas ---
    function createBurst(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            const size = Math.random() * 4 + 2;
            const speedX = (Math.random() - 0.5) * 5;
            const speedY = (Math.random() - 0.5) * 5;
            const color = getRandomColor();
            interactiveParticles.push(new Particle(x, y, size, speedX, speedY, color, 150));
        }
    }

    // --- Dibujado de Líneas ---
    function connect() {
        const maxDistance = 100;
        const allParticles = backgroundParticles.concat(interactiveParticles);

        for (let a = 0; a < allParticles.length; a++) {
            for (let b = a; b < allParticles.length; b++) {
                const distance = Math.sqrt(
                    (allParticles[a].x - allParticles[b].x) ** 2 +
                    (allParticles[a].y - allParticles[b].y) ** 2
                );

                if (distance < maxDistance) {
                    // La opacidad de la línea ahora es más sutil
                    ctx.strokeStyle = `rgba(0, 198, 255, ${(1 - distance / maxDistance) * 0.5})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(allParticles[a].x, allParticles[a].y);
                    ctx.lineTo(allParticles[b].x, allParticles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // --- Bucle principal de la animación ---
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        backgroundParticles.forEach(p => {
            p.update();
            p.draw();
        });

        interactiveParticles = interactiveParticles.filter(p => p.life > 0);
        interactiveParticles.forEach(p => {
            p.update();
            p.draw();
            p.life--;
        });

        connect();
        requestAnimationFrame(animate);
    }

    // --- Manejo de Eventos y Lógica de Inicialización ---
    window.addEventListener('resize', () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        initBackgroundParticles();
    });

    function initialize() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        initBackgroundParticles();
        animate();
    }

    return {
        createBurst,
        addInteractiveParticle: (x, y) => {
            const size = Math.random() * 2 + 0.5;
            const speedX = Math.random() * 0.5 - 0.25;
            const speedY = Math.random() * 0.5 - 0.25;
            const color = getRandomColor();
            interactiveParticles.push(new Particle(x, y, size, speedX, speedY, color, 80));
        },
        initialize
    };
}

// --- Integración con el DOM ---
document.addEventListener('DOMContentLoaded', () => {
    const sectionsToAnimate = ['hero', 'contact'];
    
    const particleAnimations = {};

    sectionsToAnimate.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            particleAnimations[sectionId] = createParticleAnimation(section);
            particleAnimations[sectionId].initialize();
        }
    });

    window.addEventListener('mousemove', (e) => {
        for (const sectionId in particleAnimations) {
            const container = document.getElementById(sectionId);
            if (!container) continue;

            const rect = container.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                particleAnimations[sectionId].addInteractiveParticle(mouseX, mouseY);
            }
        }
    });

    window.addEventListener('click', (e) => {
        for (const sectionId in particleAnimations) {
            const container = document.getElementById(sectionId);
            if (!container) continue;

            const rect = container.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {

                const clickX = e.clientX - rect.left;
                const clickY = e.clientY - rect.top;
                particleAnimations[sectionId].createBurst(clickX, clickY, 10);
            }
        }
    });
});
