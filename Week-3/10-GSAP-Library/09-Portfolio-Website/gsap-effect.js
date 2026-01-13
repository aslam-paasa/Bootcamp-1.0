/**
 * 1. GSAP Scroll Animations:
 */
gsap.registerPlugin(ScrollTrigger);


/**
 * 2. Profile Section Animation:
 *    - Trigger when top hits center
 *    - End when bottom hits center
 *    - Play on scroll down, reverse on scroll up
 *    - x: -100,
 *    - opacity: 0,
 *    - duration: 1
*/

gsap.from("#profile .section__pic-container", {
  scrollTrigger: {
    trigger: "#profile",
    start: "top center",
    end: "bottom center",
    toggleActions: "play reverse play reverse"
  },
  x: -100,
  opacity: 0,
  duration: 1
});

gsap.from("#profile .section__text", {
  scrollTrigger: {
    trigger: "#profile",
    start: "top center",
    end: "bottom center",
    toggleActions: "play reverse play reverse"
  },
  x: 100,
  opacity: 0,
  duration: 1
});

/**
 * 3. About Section Animation:
 *    a. Section Container Animation:
 *    - Trigger when top hits center
 *    - End when bottom hits center
 *    - Play on scroll down, reverse on scroll up
 *    - y: 50,
 *    - opacity: 0,
 *    - duration: 1
 * 
 *    b. Details Container Animation:
 *    - Trigger when top hits center
 *    - End when bottom hits center
 *    - Play on scroll down, reverse on scroll up
 *    - y: 50,
 *    - opacity: 0,
 *    - stagger: 0.2,
 *    - duration: 1
*/
gsap.from("#about .section-container", {
  scrollTrigger: {
    trigger: "#about",
    start: "top center",
    end: "bottom center",
    toggleActions: "play reverse play reverse"
  },
  y: 50,
  opacity: 0,
  duration: 1
});

gsap.from("#experience .details-container", {
  scrollTrigger: {
    trigger: "#experience",
    start: "top center",
    end: "bottom center",
    toggleActions: "play reverse play reverse"
  },
  y: 50,
  opacity: 0,
  stagger: 0.2,
  duration: 1
});

/**
 * 4. Projects Section Animation:
 *    - Trigger when top hits center
 *    - End when bottom hits center
 *    - Play on scroll down, reverse on scroll up
 *    - scale: 0.8,
 *    - opacity: 0,
 *    - stagger: 0.2,
 *    - duration: 1
*/
gsap.from("#projects .color-container", {
  scrollTrigger: {
    trigger: "#projects",
    start: "top center",
    end: "bottom center",
    toggleActions: "play reverse play reverse"
  },
  scale: 0.8,
  opacity: 0,
  stagger: 0.2,
  duration: 1
});

/**
 * 5. Contact Section Animation:
 *    - Trigger when top hits center
 *    - End when bottom hits center
 *    - Play on scroll down, reverse on scroll up
 *    - y: 30,
 *    - opacity: 0,
 *    - stagger: 0.2,
 *    - duration: 1
*/
gsap.from("#contact .contact-info-container", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top center",
    end: "bottom center",
    toggleActions: "play reverse play reverse"
  },
  y: 30,
  opacity: 0,
  stagger: 0.2,
  duration: 1
});


/**
 * 6. Smooth Entrance Animations:
 *    - Name text animation with infinite pulse
 *    - Role text reveal with typing effect
*/  
window.addEventListener('load', () => {
  gsap.from(".title", {
    duration: 1.5,
    opacity: 0,
    y: 30,
    delay: 0.5,
    ease: "power3.out",
    onComplete: () => {
      gsap.to(".title", {
        duration: 1.2,
        scale: 1.02,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  });

  // const roleText = document.querySelector(".section__text__p2");
  // const text = roleText.textContent;
  // roleText.textContent = "";
  // roleText.style.opacity = 1;

  // let i = 0;
  // const typeWriter = () => {
  //   if (i < text.length) {
  //     roleText.textContent += text.charAt(i);
  //     i++;
  //     setTimeout(typeWriter, 100);
  //   }
  // };

  // setTimeout(typeWriter, 1500);
});
