document.addEventListener('DOMContentLoaded', function() {

    // Menú Hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    hamburger.addEventListener('click', toggleMenu);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Animación de Partículas
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x; this.y = y; this.directionX = directionX;
                this.directionY = directionY; this.size = size; this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color; ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                this.x += this.directionX; this.y += this.directionY;
                this.draw();
            }
        }

        const init = () => {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2.5) + 1;
                let x = (Math.random() * (window.innerWidth - size * 2));
                let y = (Math.random() * (window.innerHeight - size * 2));
                let directionX = (Math.random() * .4) - .2;
                let directionY = (Math.random() * .4) - .2;
                particlesArray.push(new Particle(x, y, directionX, directionY, size, 'rgba(0, 168, 255, 0.5)'));
            }
        };

        const animate = () => {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
        };

        resizeCanvas();
        init();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            init();
        });
    }

    // Animación de Scroll
    const contentSections = document.querySelectorAll('.content-section, .timeline'); 
    
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    contentSections.forEach(section => sectionObserver.observe(section));


    // Cursor Personalizado
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        if (cursorDot && cursorOutline) {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        }
    });

    document.querySelectorAll('a, button, .hamburger').forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });


    // Botones Flotantes
    const backToTopButton = document.getElementById('back-to-top');
    const downloadCvBtn = document.getElementById('download-cv-btn');
    const whatsappBtn = document.getElementById('whatsapp-btn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            if (backToTopButton) backToTopButton.classList.add('active');
            if (downloadCvBtn) downloadCvBtn.classList.add('active');
            if (whatsappBtn) whatsappBtn.classList.add('active');
        } else {
            if (backToTopButton) backToTopButton.classList.remove('active');
            if (downloadCvBtn) downloadCvBtn.classList.remove('active');
            if (whatsappBtn) whatsappBtn.classList.remove('active');
        }
    });


    // Navegación Activa
    const pageSections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });

    pageSections.forEach(section => navObserver.observe(section));

    // Botón de WhatsApp
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = "573155055971";
            const message = "🤝 Estimado Javier, espero que se encuentre muy bien. He revisado su portafolio profesional y me ha parecido excelente su trayectoria y proyectos. Me encantaría conversar con usted acerca de una posible oportunidad de colaboración. 📅 ¿Podríamos coordinar una reunión?";
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // --- Lógica de Traducción Final ---
    const translations = {
        'es': {
            'page-title': 'Javier Alexander Garcia Mariño | Desarrollador Full-Stack',
            'nav-home': 'Inicio',
            'nav-about': 'Perfil',
            'nav-experience': 'Experiencia',
            'nav-education': 'Educación',
            'nav-skills': 'Habilidades',
            'nav-contact': 'Contacto',
            'hero-title': 'Javier Alexander Garcia Mariño',
            'hero-subtitle': 'Estudiante de 8º Semestre de Ingeniería de Sistemas y Desarrollador Full-Stack',
            'download-cv': 'Descargar CV',
            'about-title': 'Perfil Profesional',
            'about-text-1': 'Estudiante avanzado de Ingeniería de Sistemas (8º semestre) con un sólido perfil como Desarrollador Full-Stack. Mi formación combina una fuerte base en ingeniería de software con habilidades prácticas en el ciclo de vida completo del desarrollo, incluyendo modelado de datos, ciberseguridad y la creación de soluciones tecnológicas eficientes.',
            'about-text-2': 'Mi objetivo es aplicar mis conocimientos para construir aplicaciones robustas e innovadoras, aportando una mentalidad de mejora continua y una gran capacidad de adaptación para colaborar eficazmente en equipos dinámicos.',
            'about-text-3': 'Gracias a mi formación, estoy preparado para asumir roles como Ingeniero de Desarrollo, Arquitecto de Software, Analista Funcional o Líder de Proyectos de TI, entre otras posiciones estratégicas en el sector tecnológico.',
            'experience-title': 'Experiencia Profesional',
            'experience-job-1': 'Desarrollador y Soporte Remoto (México)',
            'experience-date-1': '2024',
            'experience-desc-1': 'Desarrollo web enfocado en la mejora continua del rendimiento y funcionalidad. Soporte técnico remoto, mantenimiento evolutivo y correctivo.',
            'experience-job-2': 'Soporte Técnico',
            'experience-date-2': '2023',
            'experience-desc-2': 'Instalación y configuración de hardware/software. Monitoreo de sistemas y resolución de incidentes técnicos.',
            'experience-job-3': 'Desarrollador Frontend Freelancer',
            'experience-date-3': '2021 - 2022',
            'experience-desc-3': 'Diseño y desarrollo de sitios web personalizados, interfaces modernas, funcionales y responsivas.',
            'education-title': 'Educación y Formación',
            'education-degree-1': 'Ingeniería de Sistemas',
            'education-date-4': 'Actualmente cursando octavo semestre.',
            'education-degree-2': 'Cisco Networking Academy',
            'education-desc-2': 'Formación en redes, fundamentos de TI y ciberseguridad.',
            'education-degree-3': 'Oracle Next Education (ONE)',
            'education-desc-3': 'Programa de formación en desarrollo Frontend y Backend.',
            'education-degree-4': 'MinTIC 2022 - UTP',
            'education-desc-4': 'Fundamentos de programación y formación en inglés técnico.',
            'education-degree-5': 'Programación de Software (SENA)',
            'education-desc-5': 'Formación en desarrollo de aplicaciones con App Inventor, Java y PHP.',
            'education-degree-6': 'Desarrollo y Programación (Platzi)',
            'education-desc-6': 'Cursos de Python y desarrollo web con HTML, CSS y JavaScript.',
            'education-degree-7': 'Técnico laboral en producción de palma de aceite',
            'education-desc-7': 'IETAB - Institución Educativa Técnica Andrés Bello',
            'skills-title': 'Herramientas, Tecnologías y Valores',
            'skills-category-1': 'Lenguajes y Frameworks',
            'skills-category-2': 'Bases de Datos',
            'skills-category-3': 'Otras Herramientas',
            'skills-category-4': 'Valores Personales y Habilidades Blandas',
            'value-1': 'Responsabilidad',
            'value-2': 'Creatividad',
            'value-3': 'Autoaprendizaje',
            'value-4': 'Trabajo en equipo',
            'value-5': 'Proactividad',
            'value-6': 'Comunicación',
            'value-7': 'Adaptabilidad',
            'value-8': 'Resolución de problemas',
            'contact-title': 'Contacto',
            'contact-subtitle': 'Siempre estoy abierto a nuevas oportunidades y colaboraciones.',
            'footer-copy': '&copy; 2025 Javier Garcia. Todos los derechos reservados.',
        },
        'en': {
            'page-title': 'Javier Alexander Garcia Mariño | Full-Stack Developer',
            'nav-home': 'Home',
            'nav-about': 'Profile',
            'nav-experience': 'Experience',
            'nav-education': 'Education',
            'nav-skills': 'Skills',
            'nav-contact': 'Contact',
            'hero-title': 'Javier Alexander Garcia Mariño',
            'hero-subtitle': '8th Semester Systems Engineering Student and Full-Stack Developer',
            'download-cv': 'Download CV',
            'about-title': 'Professional Profile',
            'about-text-1': 'Advanced Systems Engineering student (8th semester) with a strong profile as a Full-Stack Developer. My education combines a solid foundation in software engineering with practical skills in the complete development lifecycle, including data modeling, cybersecurity, and the creation of efficient technological solutions.',
            'about-text-2': 'My goal is to apply my knowledge to build robust and innovative applications, contributing a continuous improvement mindset and a great capacity for adaptation to collaborate effectively in dynamic teams.',
            'about-text-3': 'Thanks to my training, I am prepared to take on roles such as Development Engineer, Software Architect, Functional Analyst, or IT Project Leader, among other strategic positions in the technology sector.',
            'experience-title': 'Professional Experience',
            'experience-job-1': 'Developer and Remote Support (Mexico)',
            'experience-date-1': '2024',
            'experience-desc-1': 'Web development focused on continuous improvement of performance and functionality. Remote technical support, evolutionary and corrective maintenance.',
            'experience-job-2': 'Technical Support',
            'experience-date-2': '2023',
            'experience-desc-2': 'Installation and configuration of hardware/software. System monitoring and resolution of technical incidents.',
            'experience-job-3': 'Freelance Frontend Developer',
            'experience-date-3': '2021 - 2022',
            'experience-desc-3': 'Design and development of custom websites, modern, functional, and responsive interfaces.',
            'education-title': 'Education and Training',
            'education-degree-1': 'Systems Engineering',
            'education-date-4': 'Currently in the eighth semester.',
            'education-degree-2': 'Cisco Networking Academy',
            'education-desc-2': 'Training in networking, IT fundamentals, and cybersecurity.',
            'education-degree-3': 'Oracle Next Education (ONE)',
            'education-desc-3': 'Training program in Frontend and Backend development.',
            'education-degree-4': 'MinTIC 2022 - UTP',
            'education-desc-4': 'Fundamentals of programming and training in technical English.',
            'education-degree-5': 'Software Programming (SENA)',
            'education-desc-5': 'Training in application development with App Inventor, Java, and PHP.',
            'education-degree-6': 'Development and Programming (Platzi)',
            'education-desc-6': 'Courses in Python and web development with HTML, CSS, and JavaScript.',
            'education-degree-7': 'Technical professional in oil palm production',
            'education-desc-7': 'IETAB - Andrés Bello Technical Educational Institution',
            'skills-title': 'Tools, Technologies, and Values',
            'skills-category-1': 'Languages and Frameworks',
            'skills-category-2': 'Databases',
            'skills-category-3': 'Other Tools',
            'skills-category-4': 'Personal Values and Soft Skills',
            'value-1': 'Responsibility',
            'value-2': 'Creativity',
            'value-3': 'Self-learning',
            'value-4': 'Teamwork',
            'value-5': 'Proactivity',
            'value-6': 'Communication',
            'value-7': 'Adaptability',
            'value-8': 'Problem-solving',
            'contact-title': 'Contact',
            'contact-subtitle': 'I am always open to new opportunities and collaborations.',
            'footer-copy': '&copy; 2025 Javier Garcia. All Rights Reserved.',
        }
    };
    
    let currentLang = localStorage.getItem('language') || 'es';
    const languageToggleBtns = document.querySelectorAll('#language-toggle');

    function updateLanguage() {
        // Actualiza todos los elementos con la traducción
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            const translationText = translations[currentLang][key];
            if (translationText) {
                if (element.tagName === 'TITLE') {
                    document.title = translationText;
                } else {
                    element.innerHTML = translationText;
                }
            }
        });
        
        // Actualiza el texto del botón de idioma
        languageToggleBtns.forEach(btn => {
            btn.textContent = (currentLang === 'es') ? 'EN/ES' : 'ES/EN';
        });
    }

    if (languageToggleBtns.length > 0) {
        languageToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentLang = (currentLang === 'es') ? 'en' : 'es';
                localStorage.setItem('language', currentLang);
                updateLanguage();
            });
        });
    }

    updateLanguage();
});
