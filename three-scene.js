// ===================================
// Three.js 3D Background Scene
// Animated particles and geometry
// ===================================

(function() {
    let scene, camera, renderer, particles, geometryParticles;
    let mouseX = 0, mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let scrollY = 0;

    function init() {
        const canvas = document.getElementById('three-canvas');

        // Scene setup
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0xf8f9fa, 0.0008);

        // Camera setup
        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            2000
        );
        camera.position.z = 500;

        // Renderer setup
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Create particle system
        createParticles();

        // Create floating geometry
        createFloatingGeometry();

        // Event listeners
        document.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('scroll', onScroll, false);
        window.addEventListener('resize', onWindowResize, false);

        // Start animation
        animate();
    }

    function createParticles() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];

        // Create 2000 particles
        for (let i = 0; i < 2000; i++) {
            const x = Math.random() * 2000 - 1000;
            const y = Math.random() * 2000 - 1000;
            const z = Math.random() * 2000 - 1000;

            vertices.push(x, y, z);

            // Color gradient (blue to white)
            const color = new THREE.Color();
            color.setHSL(0.6 + Math.random() * 0.1, 0.5, 0.7 + Math.random() * 0.3);
            colors.push(color.r, color.g, color.b);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 3,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        particles = new THREE.Points(geometry, material);
        scene.add(particles);
    }

    function createFloatingGeometry() {
        geometryParticles = [];

        // Create geometric shapes that float around
        const shapes = [
            new THREE.TorusGeometry(30, 10, 16, 100),
            new THREE.OctahedronGeometry(40, 0),
            new THREE.TetrahedronGeometry(35, 0),
            new THREE.IcosahedronGeometry(30, 0)
        ];

        const material = new THREE.MeshPhongMaterial({
            color: 0x4a90e2,
            transparent: true,
            opacity: 0.15,
            wireframe: true
        });

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        shapes.forEach((shape, i) => {
            const mesh = new THREE.Mesh(shape, material.clone());

            // Random positions
            mesh.position.x = Math.random() * 1000 - 500;
            mesh.position.y = Math.random() * 1000 - 500;
            mesh.position.z = Math.random() * 500 - 750;

            // Random rotation
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;

            // Store initial position for animation
            mesh.userData.initialX = mesh.position.x;
            mesh.userData.initialY = mesh.position.y;
            mesh.userData.velocityX = (Math.random() - 0.5) * 0.2;
            mesh.userData.velocityY = (Math.random() - 0.5) * 0.2;

            scene.add(mesh);
            geometryParticles.push(mesh);
        });
    }

    function onMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) * 0.5;
        mouseY = (event.clientY - windowHalfY) * 0.5;
    }

    function onScroll() {
        scrollY = window.pageYOffset;
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);

        // Rotate particle system based on mouse position
        if (particles) {
            particles.rotation.x += 0.0003;
            particles.rotation.y += 0.0003;

            // Mouse parallax effect
            particles.rotation.x += (mouseY * 0.00005);
            particles.rotation.y += (mouseX * 0.00005);

            // Scroll effect
            particles.position.y = scrollY * 0.3;
        }

        // Animate floating geometry
        geometryParticles.forEach((mesh, i) => {
            // Rotation
            mesh.rotation.x += 0.002 + (i * 0.0001);
            mesh.rotation.y += 0.003 + (i * 0.0001);

            // Floating motion
            mesh.position.x += mesh.userData.velocityX;
            mesh.position.y += mesh.userData.velocityY;

            // Boundary check - reverse direction
            if (Math.abs(mesh.position.x - mesh.userData.initialX) > 100) {
                mesh.userData.velocityX *= -1;
            }
            if (Math.abs(mesh.position.y - mesh.userData.initialY) > 100) {
                mesh.userData.velocityY *= -1;
            }

            // Mouse interaction
            const distance = Math.sqrt(
                Math.pow(mouseX - mesh.position.x, 2) +
                Math.pow(mouseY - mesh.position.y, 2)
            );

            if (distance < 200) {
                mesh.material.opacity = 0.3;
                mesh.scale.set(1.2, 1.2, 1.2);
            } else {
                mesh.material.opacity = 0.15;
                mesh.scale.set(1, 1, 1);
            }

            // Scroll interaction
            mesh.position.z = mesh.userData.initialZ || mesh.position.z;
            mesh.position.y -= scrollY * 0.05;
        });

        // Camera movement based on mouse
        camera.position.x += (mouseX - camera.position.x) * 0.02;
        camera.position.y += (-mouseY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
