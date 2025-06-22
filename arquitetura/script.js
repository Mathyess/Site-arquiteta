document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Navigation ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.querySelector('i').classList.toggle('fa-bars');
        navToggle.querySelector('i').classList.toggle('fa-times');
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Portfolio Data & Dynamic Loading ---
    const projects = [
        {
            type: 'pdf',
            imgSrc: 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?q=80&w=1887&auto=format&fit=crop',
            title: 'Projeto de Interiores',
            pdfUrl: 'portfolio/projeto-interiores.pdf'
        },
        {
            type: 'pdf',
            imgSrc: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=2070&auto=format&fit=crop',
            title: 'Projeto de Computação Gráfica',
            pdfUrl: 'portfolio/projeto-computacao-grafica.pdf'
        }
    ];

    const portfolioGrid = document.querySelector('.portfolio-grid');
    projects.forEach(project => {
        const item = document.createElement('div');
        item.classList.add('portfolio-item');
        
        let itemHTML = `
            <img src="${project.imgSrc}" alt="${project.title}">
            <div class="portfolio-item-overlay">
                <h4 class="portfolio-item-title">${project.title}</h4>
            </div>
        `;
        
        item.innerHTML = itemHTML;

        // Store data based on type
        if (project.type === 'pdf') {
            item.dataset.type = 'pdf';
            item.dataset.pdfUrl = project.pdfUrl;
        } else {
            item.dataset.type = 'modal';
            item.dataset.title = project.title;
            item.dataset.client = project.client;
            item.dataset.year = project.year;
            item.dataset.description = project.description;
            item.dataset.imgSrc = project.imgSrc;
        }
        
        portfolioGrid.appendChild(item);
    });

    // --- Portfolio Modal / PDF Opening ---
    const modal = document.getElementById('portfolio-modal');
    const modalImg = modal.querySelector('.modal-img');
    const modalTitle = modal.querySelector('.modal-title');
    const modalClient = modal.querySelector('.modal-client');
    const modalYear = modal.querySelector('.modal-year');
    const modalDescription = modal.querySelector('.modal-description');
    const closeButton = modal.querySelector('.close-button');

    portfolioGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.portfolio-item');
        if (item) {
            if (item.dataset.type === 'pdf') {
                window.open(item.dataset.pdfUrl, '_blank');
            } else {
                modalImg.src = item.dataset.imgSrc;
                modalTitle.textContent = item.dataset.title;
                modalClient.textContent = item.dataset.client;
                modalYear.textContent = item.dataset.year;
                modalDescription.textContent = item.dataset.description;
                modal.style.display = 'block';
            }
        }
    });

    const closeModal = () => {
        modal.style.display = 'none';
    };

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- Scroll Animations ---
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.content-section, .resume-column, .portfolio-item').forEach(el => {
        el.classList.add('fade-in-up');
        scrollObserver.observe(el);
    });

    // --- Footer Year ---
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // --- Contact Form ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const message = this.querySelector('textarea[name="message"]').value;

        const intro = `Olá, Vitoria! Meu nome é ${name}.`;
        const contact = `Pode me contatar pelo email: ${email}.`;
        const body = `Gostaria de falar sobre o seguinte: \n\n"${message}"`;

        const fullMessage = `${intro}\n${contact}\n\n${body}`;
        const encodedMessage = encodeURIComponent(fullMessage);

        const whatsappURL = `https://wa.me/554498336561?text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');
    });
}); 