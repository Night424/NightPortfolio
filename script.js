document.addEventListener('DOMContentLoaded', () => {
  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .contact-link');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.backgroundColor = 'white';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.backgroundColor = '#b388ff';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });

  const intro = document.querySelector('.intro-animation');
  
  // Remove intro after animation completes
  setTimeout(() => {
    intro.classList.add('hide');
    
    // Remove from DOM after fade out completes
    setTimeout(() => {
      intro.remove();
      
      // Start typing animation after intro
      startTypingAnimation();
      
      // Initialize particles AFTER intro completes
      initParticles();
    }, 500);
  }, 2000);
});

function initParticles() {
  const canvas = document.getElementById("bg-particles");
  const ctx = canvas.getContext("2d");
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 50 : 100;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles(particleCount);
  });

  function createParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.5
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.strokeStyle = `rgba(179, 136, 255, ${1 - distance/150})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(179, 136, 255, ${p.alpha})`;
      ctx.fill();
      
      // Update position
      p.x += p.dx;
      p.y += p.dy;
      
      // Bounce off edges
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    
    requestAnimationFrame(drawParticles);
  }

  // Initialize
  resizeCanvas();
  createParticles(particleCount);
  drawParticles();
}

  // Typing animation
function startTypingAnimation() {
  const texts = ["Hi, I'm Night.", "Full-stack Developer.", "Minecraft App Creator.", "JavaScript & .NET Enthusiast."];
  let i = 0, j = 0, currentText = "", isDeleting = false;
  let typingSpeed = 150;
  let deletingSpeed = 30;
  let pauseBetween = 1000;

  function type() {
    const typedText = document.getElementById("typed-text");
    
    // Add cursor effect
    typedText.innerHTML = currentText + '<span class="blinking-cursor">|</span>';
    
    if (!isDeleting && j < texts[i].length) {
      currentText += texts[i][j++];
      setTimeout(type, typingSpeed);
    } else if (isDeleting && j > 0) {
      currentText = currentText.slice(0, --j);
      setTimeout(type, deletingSpeed);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        i = (i + 1) % texts.length;
      }
      setTimeout(type, pauseBetween);
    }
  }
  
  // Start typing animation
  type();
}
  
  // Start typing animation after a short delay
  setTimeout(type, 1000);

  // Smooth scroll for navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        document.getElementById('nav-toggle').checked = false;
      }
    });
  });

  // Scroll-triggered animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Add special animations for project cards
        if (entry.target.classList.contains('project-card')) {
          entry.target.style.transitionDelay = `${entry.target.dataset.delay || '0'}ms`;
        }
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.fade-in').forEach((el, index) => {
    if (el.classList.contains('project-card')) {
      el.dataset.delay = index * 100;
    }
    observer.observe(el);
  });

  // Particle background
  const canvas = document.getElementById("bg-particles");
  const ctx = canvas.getContext("2d");
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 50 : 100;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles(particleCount);
  });

  function createParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.5
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.strokeStyle = `rgba(179, 136, 255, ${1 - distance/150})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(179, 136, 255, ${p.alpha})`;
      ctx.fill();
      
      // Update position
      p.x += p.dx;
      p.y += p.dy;
      
      // Bounce off edges
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    
    requestAnimationFrame(drawParticles);
  }

  // Initialize
  resizeCanvas();
  createParticles(particleCount);
  drawParticles();

  // Active nav link on scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Here you would typically send the form data to a server
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }
});