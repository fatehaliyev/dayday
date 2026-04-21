document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Sticky Header ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- 2. Mobile Menu Toggle ---
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileBtn.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // --- 3. Scroll Animations (Intersection Observer) ---
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Sadece bir kere çalışsın
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -20px 0px"
  });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // --- 4. Counter Animation ---
  const counters = document.querySelectorAll('.counter');
  let started = false;

  const startCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // ms
      const increment = target / (duration / 16); // 60fps

      let current = 0;
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
          // Eğer "+" işareti varsa (örn. 20+)
          if(counter.getAttribute('data-plus') === 'true') {
              counter.innerText = target + "+";
          }
        }
      };
      updateCounter();
    });
  };

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          startCounters();
          started = true;
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }

  // --- 5. CSS Accordion Toggle (Eğer CSS pure yetmezse destek için) ---
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const title = item.querySelector('.accordion-title');
    if(title) {
      title.addEventListener('click', () => {
        // Toggle current
        item.classList.toggle('active');
        // İsteğe bağlı: Diğerlerini kapat (exclusive accordion)
        /*
        accordionItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
          }
        });
        */
      });
    }
  });

  // --- 6. Form to WhatsApp ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;
      
      // WhatsApp numarası (+905436031212)
      const targetNumber = "905436031212";
      
      const text = `Merhaba, web sitenizden ulaşıyorum.\n\nİsim: ${name}\nTelefon: ${phone}\nMesaj: ${message}`;
      const encodedText = encodeURIComponent(text);
      
      const url = `https://wa.me/${targetNumber}?text=${encodedText}`;
      window.open(url, '_blank');
      
      // Formu temizle
      contactForm.reset();
    });
  }
});
