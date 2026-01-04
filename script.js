// Page Loader - Shows for 5 seconds then hides
document.addEventListener('DOMContentLoaded', () => {
    const pageLoader = document.getElementById('pageLoader');
    document.body.classList.add('loading');
    
    if (pageLoader) {
        // Keep loader visible for 5 seconds
        setTimeout(() => {
            // Add fade-out class for smooth transition
            pageLoader.classList.add('fade-out');
            
            // Remove loading class from body
            document.body.classList.remove('loading');
            
            // Remove loader from DOM after fade animation completes
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 800); // Match this with CSS transition duration
        }, 5000); // 5 seconds delay
    }
});

// ===========================================
// Galaxy Particle System with Mouse Interaction
// ===========================================
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouse = { x: null, y: null, radius: 150 };
        // Reduce particle count on mobile for better performance
        this.isMobile = window.innerWidth <= 768;
        this.particleCount = this.isMobile ? 20 : 80;
        this.connectionDistance = 150;
        this.mouseConnectionDistance = 200;
        
        this.init();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        this.resize();
        this.createParticles();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 2 + 1,
                color: this.getRandomColor(),
                starColor: this.getStarColor(),
                originalSize: Math.random() * 2 + 1,
                twinkleOffset: Math.random() * Math.PI * 2
            });
        }
    }
    
    getRandomColor() {
        // Only use blueish-purple colors for star-like effect
        const colors = [
            'rgba(139, 92, 246, ',   // Purple
            'rgba(109, 40, 217, ',   // Dark Purple
            'rgba(124, 58, 237, ',   // Violet
            'rgba(91, 33, 182, ',    // Deep Purple
            'rgba(76, 29, 149, '     // Indigo
        ];
        const opacity = Math.random() * 0.3 + 0.5;
        return colors[Math.floor(Math.random() * colors.length)] + opacity + ')';
    }
    
    getStarColor() {
        // White center for stars
        return 'rgba(255, 255, 255, 0.9)';
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        
        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
        
        window.addEventListener('touchmove', (e) => {
            this.mouse.x = e.touches[0].clientX;
            this.mouse.y = e.touches[0].clientY;
        });
        
        window.addEventListener('touchend', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
    
    update() {
        // Update particles
        for (let particle of this.particles) {
            // Move particle
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }
            
            // Mouse interaction - repel particles (skip on mobile for performance)
            if (this.mouse.x !== null && !this.isMobile) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const directionX = forceDirectionX * force * 2;
                    const directionY = forceDirectionY * force * 2;
                    
                    particle.vx -= directionX;
                    particle.vy -= directionY;
                }
                
                // Increase size near mouse
                const targetSize = particle.originalSize * 2;
                particle.size += (targetSize - particle.size) * 0.1;
            } else {
                // Return to original size
                particle.size += (particle.originalSize - particle.size) * 0.1;
            }
            
            // Limit velocity
            const maxVelocity = this.isMobile ? 1 : 2;
            const velocity = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (velocity > maxVelocity) {
                particle.vx = (particle.vx / velocity) * maxVelocity;
                particle.vy = (particle.vy / velocity) * maxVelocity;
            }
        }
        
        // Reset connections
        this.connections = [];
        
        // Skip connection drawing on mobile for better performance
        if (this.isMobile) {
            // Just update particle positions without drawing connections
            return;
        }
        
        // Create connections between nearby particles (desktop only)
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    this.connections.push({
                        from: i,
                        to: j,
                        opacity: 1 - distance / this.connectionDistance
                    });
                }
            }
            
            // Create connections to mouse
            if (this.mouse.x !== null) {
                const dx = this.mouse.x - this.particles[i].x;
                const dy = this.mouse.y - this.particles[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouseConnectionDistance) {
                    this.connections.push({
                        from: i,
                        to: 'mouse',
                        opacity: 1 - distance / this.mouseConnectionDistance,
                        mouseX: this.mouse.x,
                        mouseY: this.mouse.y
                    });
                }
            }
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections with blueish-purple colors
        for (let connection of this.connections) {
            const fromParticle = this.particles[connection.from];
            
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(139, 92, 246, ${connection.opacity * 0.4})`;
            this.ctx.lineWidth = 1;
            
            if (connection.to === 'mouse') {
                this.ctx.moveTo(fromParticle.x, fromParticle.y);
                this.ctx.lineTo(connection.mouseX, connection.mouseY);
            } else {
                const toParticle = this.particles[connection.to];
                this.ctx.moveTo(fromParticle.x, fromParticle.y);
                this.ctx.lineTo(toParticle.x, toParticle.y);
            }
            this.ctx.stroke();
        }
        
        // Draw particles as stars with white centers
        const time = Date.now() * 0.001;
        
        // Use simpler drawing on mobile for better performance
        if (this.isMobile) {
            // Mobile: Simple circles, no gradients
            for (let particle of this.particles) {
                const twinkle = Math.sin(time * 2 + particle.twinkleOffset) * 0.3 + 0.7;
                
                // Draw outer glow
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(139, 92, 246, ${0.3 * twinkle})`;
                this.ctx.fill();
                
                // Draw white center
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * twinkle})`;
                this.ctx.fill();
            }
        } else {
            // Desktop: Full gradient effects
            for (let particle of this.particles) {
                // Calculate twinkle effect
                const twinkle = Math.sin(time * 2 + particle.twinkleOffset) * 0.3 + 0.7;
                
                // Draw glow halo
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
                const gradient = this.ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 3
                );
                gradient.addColorStop(0, `rgba(139, 92, 246, ${0.6 * twinkle})`);
                gradient.addColorStop(0.3, `rgba(124, 58, 237, ${0.3 * twinkle})`);
                gradient.addColorStop(1, 'transparent');
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
                
                // Draw outer glow
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
                const outerGradient = this.ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 1.5
                );
                outerGradient.addColorStop(0, `rgba(139, 92, 246, ${0.8 * twinkle})`);
                outerGradient.addColorStop(1, 'transparent');
                this.ctx.fillStyle = outerGradient;
                this.ctx.fill();
                
                // Draw white star center
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * twinkle})`;
                this.ctx.fill();
                
                // Draw bright core
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size * 0.2, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
                this.ctx.fill();
            }
        }
    }
    
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    if (document.getElementById('particleCanvas')) {
        new ParticleSystem();
    }
});

// Mobile Navigation
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to section function (used in buttons)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 70,
            behavior: 'smooth'
        });
    }
}

// Contact form submission with Formspree
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
        
        try {
            const formData = new FormData(contactForm);
            
            // Send to Formspree
            const response = await fetch('https://formspree.io/f/xyzpleoa', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was a problem sending your message. Please try to Email me.');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}


// Scroll animation for sections - Fixed to target all section elements
const sections = document.querySelectorAll('section');
const windowHeight = window.innerHeight;

function checkScroll() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 150;
        
        if (sectionTop < windowHeight - sectionVisible) {
            section.classList.add('active');
        }
    });
}

// Initial check
checkScroll();

// Check on scroll
window.addEventListener('scroll', checkScroll);

// Download resume button
const downloadResumeBtn = document.querySelectorAll('.btn-outline');
downloadResumeBtn.forEach(btn => {
    if (btn.textContent.includes('Download Resume')) {
        btn.addEventListener('click', () => {
            alert('Resume download would start here. In a real implementation, this would download the PDF.');
        });
    }
});

// ===========================================
// Parallax Effect System
// ===========================================
class ParallaxHandler {
    constructor() {
        this.elements = [];
        this.mouse = { x: 0, y: 0 };
        this.targetMouse = { x: 0, y: 0 };
        this.isMobile = window.innerWidth <= 768;
        this.isRunning = !this.isMobile;
        this.animationId = null;
        
        if (this.isRunning) {
            this.init();
        }
    }
    
    init() {
        // Get all parallax elements
        this.elements = Array.from(document.querySelectorAll('[data-parallax]')).map(el => ({
            element: el,
            speed: parseFloat(el.dataset.parallax) || 0.1,
            originalX: 0,
            originalY: 0,
            currentX: 0,
            currentY: 0
        }));
        
        // Get hero floating elements
        const heroFloats = document.querySelectorAll('.hero-floating-element');
        heroFloats.forEach((el, index) => {
            this.elements.push({
                element: el,
                speed: 0.02 + (index * 0.01),
                originalX: 0,
                originalY: 0,
                currentX: 0,
                currentY: 0,
                floatOffset: index * 2
            });
        });
        
        // Get gradient orbs in sections
        const gradientOrbs = document.querySelectorAll('.bg-gradient-orb');
        gradientOrbs.forEach((el, index) => {
            this.elements.push({
                element: el,
                speed: 0.03 + (index * 0.01),
                originalX: 0,
                originalY: 0,
                currentX: 0,
                currentY: 0
            });
        });
        
        this.setupEventListeners();
        this.animate();
    }
    
    setupEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
            this.targetMouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
        });
        
        window.addEventListener('resize', () => {
            // Reset on resize
        });
    }
    
    animate() {
        if (!this.isRunning) return;
        
        // Smooth mouse follow
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.1;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.1;
        
        // Update elements
        this.elements.forEach(item => {
            const targetX = this.mouse.x * item.speed * 100;
            const targetY = this.mouse.y * item.speed * 100;
            
            item.currentX += (targetX - item.currentX) * 0.1;
            item.currentY += (targetY - item.currentY) * 0.1;
            
            if (item.floatOffset !== undefined) {
                const time = Date.now() * 0.001;
                item.element.style.transform = 
                    `translate(${item.currentX}px, ${item.currentY}px) translateY(${Math.sin(time + item.floatOffset) * 20}px)`;
            } else {
                item.element.style.transform = 
                    `translate(${item.currentX}px, ${item.currentY}px)`;
            }
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

// Initialize parallax when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParallaxHandler();
});
