/* =============================================
   NexusVault — Interactive JavaScript
   Three.js 3D Building, Particles, Scroll FX
   ============================================= */

// ---- Three.js Scene: Futuristic Building ----
(function initThreeScene() {
    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 3, 12);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x222244, 0.5);
    scene.add(ambientLight);

    // Directional light
    const dirLight = new THREE.DirectionalLight(0x00f0ff, 0.8);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // Point lights for neon effect
    const pointLight1 = new THREE.PointLight(0x00f0ff, 1.5, 25);
    pointLight1.position.set(-4, 5, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 1.2, 25);
    pointLight2.position.set(4, 3, -3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xf472b6, 0.8, 20);
    pointLight3.position.set(0, 8, 0);
    scene.add(pointLight3);

    // Building material
    const buildingMat = new THREE.MeshPhongMaterial({
        color: 0x0a0e1a,
        emissive: 0x030510,
        specular: 0x00f0ff,
        shininess: 100,
        transparent: true,
        opacity: 0.9,
    });

    const glowEdgeMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.3,
    });

    // Main tower
    const towerGeo = new THREE.BoxGeometry(2, 6, 2);
    const tower = new THREE.Mesh(towerGeo, buildingMat);
    tower.position.set(0, 3, 0);
    scene.add(tower);

    // Tower wireframe glow
    const towerEdges = new THREE.EdgesGeometry(towerGeo);
    const towerLine = new THREE.LineSegments(towerEdges, new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.4 }));
    towerLine.position.copy(tower.position);
    scene.add(towerLine);

    // Side building left
    const sideGeo1 = new THREE.BoxGeometry(1.5, 3.5, 1.8);
    const sideBuilding1 = new THREE.Mesh(sideGeo1, buildingMat);
    sideBuilding1.position.set(-2.2, 1.75, 0.3);
    scene.add(sideBuilding1);

    const sideEdges1 = new THREE.EdgesGeometry(sideGeo1);
    const sideLine1 = new THREE.LineSegments(sideEdges1, new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.35 }));
    sideLine1.position.copy(sideBuilding1.position);
    scene.add(sideLine1);

    // Side building right
    const sideGeo2 = new THREE.BoxGeometry(1.8, 4.2, 1.5);
    const sideBuilding2 = new THREE.Mesh(sideGeo2, buildingMat);
    sideBuilding2.position.set(2.5, 2.1, -0.2);
    scene.add(sideBuilding2);

    const sideEdges2 = new THREE.EdgesGeometry(sideGeo2);
    const sideLine2 = new THREE.LineSegments(sideEdges2, new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.35 }));
    sideLine2.position.copy(sideBuilding2.position);
    scene.add(sideLine2);

    // Small accent buildings
    const accentGeo = new THREE.BoxGeometry(0.8, 2, 0.8);
    const accent1 = new THREE.Mesh(accentGeo, buildingMat);
    accent1.position.set(-3.8, 1, 1.5);
    scene.add(accent1);

    const accent2 = new THREE.Mesh(accentGeo, buildingMat);
    accent2.position.set(4.2, 1, 1);
    scene.add(accent2);

    // Window lights (small emissive boxes)
    const windowMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.6 });
    const windowMat2 = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.5 });
    const windowGeo = new THREE.BoxGeometry(0.15, 0.12, 0.01);

    for (let y = 0.5; y < 5.8; y += 0.6) {
        for (let x = -0.7; x <= 0.7; x += 0.35) {
            const w = new THREE.Mesh(windowGeo, Math.random() > 0.3 ? windowMat : windowMat2);
            w.position.set(x, y, 1.01);
            if (Math.random() > 0.25) scene.add(w);
        }
    }

    // Ground plane with grid
    const groundGeo = new THREE.PlaneGeometry(30, 30, 30, 30);
    const groundMat = new THREE.MeshBasicMaterial({
        color: 0x06080f,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    scene.add(ground);

    // Security perimeter ring
    const perimeterGeo = new THREE.RingGeometry(5.5, 5.7, 64);
    const perimeterMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
    });
    const perimeter = new THREE.Mesh(perimeterGeo, perimeterMat);
    perimeter.rotation.x = -Math.PI / 2;
    perimeter.position.y = 0.05;
    scene.add(perimeter);

    // Outer perimeter ring
    const outerPerimGeo = new THREE.RingGeometry(7, 7.15, 64);
    const outerPerimMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
    });
    const outerPerim = new THREE.Mesh(outerPerimGeo, outerPerimMat);
    outerPerim.rotation.x = -Math.PI / 2;
    outerPerim.position.y = 0.03;
    scene.add(outerPerim);

    // Rotating scan line
    const scanGeo = new THREE.PlaneGeometry(0.05, 5.5);
    const scanMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
    });
    const scanLine = new THREE.Mesh(scanGeo, scanMat);
    scanLine.rotation.x = -Math.PI / 2;
    scanLine.position.y = 0.06;
    scanLine.position.z = 2.75;
    const scanPivot = new THREE.Group();
    scanPivot.add(scanLine);
    scene.add(scanPivot);

    // Vertical scan beams
    const beamGeo = new THREE.CylinderGeometry(0.02, 0.02, 8, 8);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.15 });
    const beamPositions = [
        [-3, 4, 3], [3, 4, 3], [-3, 4, -3], [3, 4, -3]
    ];
    const beams = beamPositions.map(pos => {
        const beam = new THREE.Mesh(beamGeo, beamMat);
        beam.position.set(...pos);
        scene.add(beam);
        return beam;
    });

    // Floating data nodes
    const nodeGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.8 });
    const nodes = [];
    for (let i = 0; i < 20; i++) {
        const node = new THREE.Mesh(nodeGeo, nodeMat.clone());
        const angle = (i / 20) * Math.PI * 2;
        const radius = 4 + Math.random() * 3;
        node.position.set(
            Math.cos(angle) * radius,
            0.5 + Math.random() * 5,
            Math.sin(angle) * radius
        );
        node.userData = { angle, radius, speed: 0.2 + Math.random() * 0.3, yBase: node.position.y };
        scene.add(node);
        nodes.push(node);
    }

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    let targetRotY = 0, targetRotX = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Animation loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        // Camera follows mouse subtly
        targetRotY = mouseX * 0.3;
        targetRotX = -mouseY * 0.15;
        camera.position.x += (targetRotY * 3 - camera.position.x) * 0.02;
        camera.position.y += (3 + targetRotX * 2 - camera.position.y) * 0.02;
        camera.lookAt(0, 1.5, 0);

        // Rotate scan
        scanPivot.rotation.y = t * 0.5;

        // Pulse perimeter
        perimeter.material.opacity = 0.2 + Math.sin(t * 2) * 0.1;
        outerPerim.material.opacity = 0.12 + Math.sin(t * 1.5 + 1) * 0.08;

        // Animate beams
        beams.forEach((beam, i) => {
            beam.material.opacity = 0.1 + Math.sin(t * 3 + i) * 0.08;
        });

        // Animate nodes
        nodes.forEach(node => {
            const nd = node.userData;
            nd.angle += nd.speed * 0.005;
            node.position.x = Math.cos(nd.angle) * nd.radius;
            node.position.z = Math.sin(nd.angle) * nd.radius;
            node.position.y = nd.yBase + Math.sin(t * nd.speed + nd.angle) * 0.5;
            node.material.opacity = 0.5 + Math.sin(t * 2 + nd.angle) * 0.3;
        });

        // Subtle building animation
        tower.position.y = 3 + Math.sin(t * 0.5) * 0.05;
        towerLine.position.y = tower.position.y;

        renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();


// ---- Floating Data Particles ----
(function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const PARTICLE_COUNT = 40;
    const colors = ['#00f0ff', '#a855f7', '#f472b6', '#22c55e'];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');

        const size = 2 + Math.random() * 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 12;
        const delay = Math.random() * 10;
        const drift = (Math.random() - 0.5) * 200;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            box-shadow: 0 0 ${size * 2}px ${color};
            left: ${left}%;
            bottom: -10px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --drift: ${drift}px;
        `;

        container.appendChild(particle);
    }
})();


// ---- Scroll Reveal (IntersectionObserver) ----
(function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-up');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
    });

    reveals.forEach(el => observer.observe(el));
})();


// ---- Navbar Scroll Effect ----
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.scrollY > 60);
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            const spans = menuBtn.querySelectorAll('span');
            const isOpen = mobileMenu.classList.contains('open');
            spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
            spans[1].style.opacity = isOpen ? '0' : '1';
            spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                const spans = menuBtn.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            });
        });
    }
})();


// ---- Counter Animation ----
(function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const pad = parseInt(el.getAttribute('data-pad')) || 0;
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(ease * target);
            el.textContent = pad ? String(current).padStart(pad, '0') : current.toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }
})();


// ---- CTA Form Handler ----
(function initForm() {
    const form = document.getElementById('betaForm');
    const emailInput = document.getElementById('emailInput');
    const submitBtn = document.getElementById('submitBtn');

    if (!form || !emailInput || !submitBtn) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        if (!email) return;

        submitBtn.innerHTML = `<span style="display:inline-flex;align-items:center;gap:8px">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            You're In!
        </span>`;
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        emailInput.value = '';
        emailInput.disabled = true;
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = `<span>Request Access</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
            submitBtn.style.background = '';
            emailInput.disabled = false;
            submitBtn.disabled = false;
        }, 3000);
    });
})();


// ---- Smooth Scroll for Anchor Links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
