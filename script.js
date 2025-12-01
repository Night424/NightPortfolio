document.addEventListener('DOMContentLoaded', () => {
  const intro = document.querySelector('.intro-animation');
  
  // Remove intro after animation completes
  setTimeout(() => {
    intro.classList.add('hide');
    
    // Remove from DOM after fade out completes
    setTimeout(() => {
      intro.remove();
      
      // Start typing animation after intro
      startTypingAnimation();
    }, 500);
  }, 2000);

  // Smooth scroll for navigation links with better handling
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        document.getElementById('nav-toggle').checked = false;
      }
    });
  });

  // Enhanced scroll-triggered animations with staggered effect
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for cards
        const delay = index * 100;
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all fade-in elements
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Enhanced active nav link tracking with smooth updates
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  
  const updateActiveLink = () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      
      if (scrollY >= sectionTop - 200 && scrollY < sectionTop + sectionHeight - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };
  
  // Debounce scroll event for better performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Initial active link setup
  updateActiveLink();

  // Add smooth page load animation
  document.documentElement.style.scrollBehavior = 'smooth';
});

function startTypingAnimation() {
  const texts = ["Hi, I'm Keane.", "Cybersecurity Student.", "Aspiring SOC Analyst.", "Threat Detection."];
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