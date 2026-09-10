/* =========================================================
   OM SHETE — PORTFOLIO JAVASCRIPT
   ========================================================= */

(() => {
  "use strict";


  /* =======================================================
     HELPERS
     ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


  /* =======================================================
     CUSTOM CURSOR
     ======================================================= */

  const cursor = $("#cursor");
  const cursorFollower = $("#cursor-follower");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let followerX = mouseX;
  let followerY = mouseY;

  if (cursor && cursorFollower) {

    window.addEventListener(
      "mousemove",
      (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
      },
      { passive: true }
    );


    const animateCursor = () => {

      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;

      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;

      requestAnimationFrame(animateCursor);
    };

    animateCursor();


    const interactiveElements = $$(
      "a, button, input, .proj-card, .stat-card, .skill-group, .lang-card, .ccard"
    );

    interactiveElements.forEach((element) => {

      element.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-hover");
      });

      element.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-hover");
      });

    });

  }


  /* =======================================================
     NAVIGATION
     ======================================================= */

  const nav = $("#nav");

  const handleNavScroll = () => {

    if (!nav) return;

    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

  };

  window.addEventListener(
    "scroll",
    handleNavScroll,
    { passive: true }
  );

  handleNavScroll();


  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const navToggle = $("#navToggle");
  const mobileMenu = $("#mobileMenu");

  if (navToggle && mobileMenu) {

    const closeMobileMenu = () => {

      navToggle.classList.remove("open");
      mobileMenu.classList.remove("open");

      navToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    };


    navToggle.addEventListener("click", () => {

      const isOpen =
        mobileMenu.classList.toggle("open");

      navToggle.classList.toggle(
        "open",
        isOpen
      );

      navToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });


    $$(".mobile-link").forEach((link) => {

      link.addEventListener("click", () => {
        closeMobileMenu();
      });

    });


    document.addEventListener("click", (event) => {

      if (
        !mobileMenu.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        closeMobileMenu();
      }

    });

  }


  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  const navAnchors =
    $$(".nav-links a[href^='#']");

  const pageSections =
    $$("section[id]");


  function updateActiveNav() {

    if (!navAnchors.length) return;

    const position =
      window.scrollY + 180;

    let current = "";

    pageSections.forEach((section) => {

      if (
        position >= section.offsetTop &&
        position <
          section.offsetTop +
          section.offsetHeight
      ) {
        current = section.id;
      }

    });


    navAnchors.forEach((link) => {

      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );

    });

  }

  window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    updateActiveNav
  );

  updateActiveNav();


  /* =======================================================
     SMOOTH SCROLLING
     ======================================================= */

  $$("a[href^='#']").forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =======================================================
     TYPEWRITER
     ======================================================= */

  const typewriter =
    $("#typewriter");

  const lines = [
    "Machine Learning Enthusiast",
    "Data Science Explorer",
    "MSc AI DS Student",
    "BCA 26 @ MIT-WPU Pune"
  ];

  if (typewriter) {

    let lineIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    const typeSpeed = 75;
    const deleteSpeed = 38;
    const pauseAfterTyping = 1600;
    const pauseAfterDeleting = 450;


    const typeWriterLoop = () => {

      const currentLine =
        lines[lineIndex];


      if (!deleting) {

        typewriter.textContent =
          currentLine.slice(
            0,
            characterIndex + 1
          );

        characterIndex++;


        if (
          characterIndex >=
          currentLine.length
        ) {

          deleting = true;

          setTimeout(
            typeWriterLoop,
            pauseAfterTyping
          );

          return;
        }


        setTimeout(
          typeWriterLoop,
          typeSpeed
        );

        return;
      }


      typewriter.textContent =
        currentLine.slice(
          0,
          characterIndex - 1
        );

      characterIndex--;


      if (characterIndex <= 0) {

        deleting = false;

        lineIndex =
          (lineIndex + 1) %
          lines.length;

        setTimeout(
          typeWriterLoop,
          pauseAfterDeleting
        );

        return;
      }


      setTimeout(
        typeWriterLoop,
        deleteSpeed
      );

    };


    typeWriterLoop();

  }


  /* =======================================================
     THREE.JS — UNIVERSE
     ======================================================= */

  const canvas =
    $("#universe-canvas");

  if (
    canvas &&
    typeof THREE !== "undefined"
  ) {

    const scene =
      new THREE.Scene();


    const camera =
      new THREE.PerspectiveCamera(
        60,
        window.innerWidth /
          window.innerHeight,
        0.1,
        3000
      );

    camera.position.z = 700;


    const renderer =
      new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
      });


    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        2
      )
    );

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );


    /* -----------------------------------------------------
       STAR FIELD
       ----------------------------------------------------- */

    const starCount = 4200;

    const starGeometry =
      new THREE.BufferGeometry();

    const starPositions =
      new Float32Array(
        starCount * 3
      );

    const starSizes =
      new Float32Array(
        starCount
      );


    for (
      let i = 0;
      i < starCount;
      i++
    ) {

      const radius =
        300 +
        Math.random() * 1300;

      const theta =
        Math.random() *
        Math.PI *
        2;

      const phi =
        Math.acos(
          2 * Math.random() - 1
        );


      const x =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

      const y =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

      const z =
        radius *
        Math.cos(phi);


      const index =
        i * 3;

      starPositions[index] = x;
      starPositions[index + 1] = y;
      starPositions[index + 2] = z;

      starSizes[i] =
        Math.random() * 2.2 + 0.35;

    }


    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        starPositions,
        3
      )
    );

    starGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(
        starSizes,
        1
      )
    );


    const starMaterial =
      new THREE.PointsMaterial({
        color: 0x8ebeff,
        size: 1.5,
        transparent: true,
        opacity: 0.68,
        sizeAttenuation: true,
        blending:
          THREE.AdditiveBlending,
        depthWrite: false
      });


    const stars =
      new THREE.Points(
        starGeometry,
        starMaterial
      );

    scene.add(stars);


    /* -----------------------------------------------------
       SECOND STAR FIELD
       ----------------------------------------------------- */

    const smallStarCount = 2500;

    const smallStarGeometry =
      new THREE.BufferGeometry();

    const smallStarPositions =
      new Float32Array(
        smallStarCount * 3
      );


    for (
      let i = 0;
      i < smallStarCount;
      i++
    ) {

      const radius =
        500 +
        Math.random() * 1100;

      const theta =
        Math.random() *
        Math.PI *
        2;

      const phi =
        Math.acos(
          2 * Math.random() - 1
        );


      const index =
        i * 3;

      smallStarPositions[index] =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

      smallStarPositions[index + 1] =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

      smallStarPositions[index + 2] =
        radius *
        Math.cos(phi);

    }


    smallStarGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        smallStarPositions,
        3
      )
    );


    const smallStarMaterial =
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.8,
        transparent: true,
        opacity: 0.4,
        sizeAttenuation: true,
        blending:
          THREE.AdditiveBlending,
        depthWrite: false
      });


    const smallStars =
      new THREE.Points(
        smallStarGeometry,
        smallStarMaterial
      );

    scene.add(smallStars);


    /* -----------------------------------------------------
       NEBULA PARTICLES
       ----------------------------------------------------- */

    const nebulaCount = 900;

    const nebulaGeometry =
      new THREE.BufferGeometry();

    const nebulaPositions =
      new Float32Array(
        nebulaCount * 3
      );


    for (
      let i = 0;
      i < nebulaCount;
      i++
    ) {

      const angle =
        Math.random() *
        Math.PI *
        2;

      const radius =
        Math.random() *
        430;

      const index =
        i * 3;

      nebulaPositions[index] =
        Math.cos(angle) *
        radius;

      nebulaPositions[index + 1] =
        (Math.random() - 0.5) *
        180;

      nebulaPositions[index + 2] =
        Math.sin(angle) *
        radius;

    }


    nebulaGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        nebulaPositions,
        3
      )
    );


    const nebulaMaterial =
      new THREE.PointsMaterial({
        color: 0x6e5bff,
        size: 1.4,
        transparent: true,
        opacity: 0.12,
        blending:
          THREE.AdditiveBlending,
        depthWrite: false
      });


    const nebula =
      new THREE.Points(
        nebulaGeometry,
        nebulaMaterial
      );

    scene.add(nebula);


    /* -----------------------------------------------------
       SHOOTING STARS
       ----------------------------------------------------- */

    const shootingStars = [];

    function createShootingStar() {

      const geometry =
        new THREE.BufferGeometry();

      const positions =
        new Float32Array(6);

      const material =
        new THREE.LineBasicMaterial({
          color: 0x8bbcff,
          transparent: true,
          opacity: 0
        });

      const line =
        new THREE.Line(
          geometry,
          material
        );


      const startX =
        (Math.random() - 0.5) *
        1500;

      const startY =
        Math.random() *
        800 + 100;

      const startZ =
        (Math.random() - 0.5) *
        900;


      line.position.set(
        startX,
        startY,
        startZ
      );


      line.userData = {
        velocity:
          new THREE.Vector3(
            -4 -
              Math.random() * 3,
            -3 -
              Math.random() * 2,
            0
          ),
        life: 0,
        maxLife:
          70 +
          Math.random() * 50
      };


      scene.add(line);
      shootingStars.push(line);

    }


    /* -----------------------------------------------------
       MOUSE PARALLAX
       ----------------------------------------------------- */

    let targetMouseX = 0;
    let targetMouseY = 0;

    window.addEventListener(
      "mousemove",
      (event) => {

        targetMouseX =
          (event.clientX /
            window.innerWidth -
            0.5) *
          2;

        targetMouseY =
          (event.clientY /
            window.innerHeight -
            0.5) *
          2;

      },
      { passive: true }
    );


    /* -----------------------------------------------------
       RESIZE
       ----------------------------------------------------- */

    window.addEventListener(
      "resize",
      () => {

        camera.aspect =
          window.innerWidth /
          window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
          window.innerWidth,
          window.innerHeight
        );

        renderer.setPixelRatio(
          Math.min(
            window.devicePixelRatio,
            2
          )
        );

      }
    );


    /* -----------------------------------------------------
       ANIMATION
       ----------------------------------------------------- */

    let universeTime = 0;

    const animateUniverse = () => {

      requestAnimationFrame(
        animateUniverse
      );

      universeTime += 0.001;


      stars.rotation.y += 0.00012;
      stars.rotation.x += 0.000035;

      smallStars.rotation.y -= 0.000055;
      smallStars.rotation.x += 0.000018;

      nebula.rotation.y += 0.00018;


      const parallaxX =
        targetMouseX * 10;

      const parallaxY =
        targetMouseY * 7;


      camera.position.x +=
        (parallaxX -
          camera.position.x) *
        0.008;

      camera.position.y +=
        (-parallaxY -
          camera.position.y) *
        0.008;


      camera.lookAt(
        scene.position
      );


      /* Shooting stars */

      if (
        Math.random() < 0.004
      ) {
        createShootingStar();
      }


      for (
        let i =
          shootingStars.length - 1;
        i >= 0;
        i--
      ) {

        const star =
          shootingStars[i];

        star.userData.life++;

        const velocity =
          star.userData.velocity;

        star.position.add(
          velocity
        );


        const lifeProgress =
          star.userData.life /
          star.userData.maxLife;


        star.material.opacity =
          Math.sin(
            Math.PI *
            lifeProgress
          ) * 0.75;


        const p =
          star.position;

        const length = 32;

        const positions =
          new Float32Array([
            0,
            0,
            0,
            -velocity.x * length / 5,
            -velocity.y * length / 5,
            0
          ]);


        star.geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(
            positions,
            3
          )
        );


        if (
          star.userData.life >=
          star.userData.maxLife
        ) {

          scene.remove(star);

          star.geometry.dispose();
          star.material.dispose();

          shootingStars.splice(
            i,
            1
          );

        }

      }


      renderer.render(
        scene,
        camera
      );

    };


    animateUniverse();

  }


  /* =======================================================
     GSAP / SCROLLTRIGGER
     ======================================================= */

  if (
    typeof gsap !== "undefined"
  ) {

    if (
      typeof ScrollTrigger !==
      "undefined"
    ) {
      gsap.registerPlugin(
        ScrollTrigger
      );
    }


    /* -----------------------------------------------------
       HERO ENTRANCE
       ----------------------------------------------------- */

    const heroElements =
      $$(".hero-inner > *");


    if (heroElements.length) {

      gsap.fromTo(
        heroElements,
        {
          opacity: 0,
          y: 22
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.1
        }
      );

    }


    /* -----------------------------------------------------
       REVEAL ELEMENTS
       ----------------------------------------------------- */

    if (
      typeof ScrollTrigger !==
      "undefined"
    ) {

      $$(".reveal").forEach(
        (element) => {

          gsap.to(
            element,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true
              }
            }
          );

        }
      );

    } else {

      $$(".reveal").forEach(
        (element) => {
          element.classList.add(
            "revealed"
          );
        }
      );

    }


    /* -----------------------------------------------------
       SECTION HEADINGS
       ----------------------------------------------------- */

    if (
      typeof ScrollTrigger !==
      "undefined"
    ) {

      $$(".sec-title").forEach(
        (element) => {

          gsap.fromTo(
            element,
            {
              opacity: 0,
              y: 25
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true
              }
            }
          );

        }
      );

    }


    /* -----------------------------------------------------
       HERO PARALLAX
       ----------------------------------------------------- */

    const heroInner =
      $("#heroInner");

    if (
      heroInner &&
      typeof ScrollTrigger !==
      "undefined"
    ) {

      gsap.to(
        heroInner,
        {
          y: 90,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        }
      );

    }

  }


  /* =======================================================
     COUNT-UP STATS
     ======================================================= */

  const countElements =
    $$(".count-up");


  if (
    countElements.length
  ) {

    const animateCounter =
      (element) => {

        const target =
          Number(
            element.dataset.target
          ) || 0;

        const duration = 1000;

        const startTime =
          performance.now();


        const updateCounter =
          (currentTime) => {

            const elapsed =
              currentTime -
              startTime;

            const progress =
              Math.min(
                elapsed / duration,
                1
              );

            const eased =
              1 -
              Math.pow(
                1 - progress,
                3
              );


            element.textContent =
              Math.floor(
                eased * target
              );


            if (
              progress < 1
            ) {

              requestAnimationFrame(
                updateCounter
              );

            } else {

              element.textContent =
                target;

            }

          };


        requestAnimationFrame(
          updateCounter
        );

      };


    if (
      typeof IntersectionObserver !==
      "undefined"
    ) {

      const observer =
        new IntersectionObserver(
          (entries, obs) => {

            entries.forEach(
              (entry) => {

                if (
                  !entry.isIntersecting
                ) {
                  return;
                }

                animateCounter(
                  entry.target
                );

                obs.unobserve(
                  entry.target
                );

              }
            );

          },
          {
            threshold: 0.5
          }
        );


      countElements.forEach(
        (element) => {
          observer.observe(
            element
          );
        }
      );

    } else {

      countElements.forEach(
        animateCounter
      );

    }

  }


  /* =======================================================
     VANILLA TILT
     ======================================================= */

  if (
    typeof VanillaTilt !==
    "undefined"
  ) {

    const tiltElements =
      $$("[data-tilt]");


    if (tiltElements.length) {

      VanillaTilt.init(
        tiltElements,
        {
          max: 8,
          speed: 400,
          perspective: 1000,
          scale: 1.01,
          glare: true,
          "max-glare": 0.12,
          gyroscope: false
        }
      );

    }

  }


  /* =======================================================
     EDUCATION — CHATBOT KNOWLEDGE
     ======================================================= */

  const assistantKnowledge = {

    name: "Om Shete",

    education:
      "Om completed his BCA from MIT World Peace University, Pune (2023–2026) and is currently pursuing an MSc in Artificial Intelligence & Data Science (2026–2028).",

    projects:
      "Om has two featured machine learning projects: Credit Card Fraud Detection and Student Performance Prediction.",

    skills:
      "Om's technical toolkit includes Python, SQL, Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, Jupyter, Git, GitHub, VS Code, Google Colab, SMOTE, feature engineering, EDA, cross-validation, Precision, Recall, F1-score and ROC-AUC.",

    languages:
      "Om is proficient in English at C1+ level and German at B1 level.",

    contact:
      "You can contact Om through WhatsApp, email, GitHub, or LinkedIn in the Contact section.",

    current:
      "Om is currently pursuing his MSc in AI & Data Science and is focused on Machine Learning, Data Science and predictive modeling."

  };


  /* =======================================================
     CHATBOT
     ======================================================= */

  const aiAssistant =
    $("#aiAssistant");

  const aiChatTrigger =
    $("#aiChatTrigger");

  const aiChatWindow =
    $("#aiChatWindow");

  const aiChatClose =
    $("#aiChatClose");

  const aiChatMessages =
    $("#aiChatMessages");

  const aiChatForm =
    $("#aiChatForm");

  const aiChatInput =
    $("#aiChatInput");

  const aiSuggestions =
    $$(".ai-suggestion");


  if (
    aiAssistant &&
    aiChatTrigger &&
    aiChatWindow &&
    aiChatClose &&
    aiChatMessages &&
    aiChatForm &&
    aiChatInput
  ) {


    /* -----------------------------------------------------
       OPEN / CLOSE
       ----------------------------------------------------- */

    const openAssistant = () => {

      aiAssistant.classList.add(
        "open"
      );

      aiChatTrigger.setAttribute(
        "aria-expanded",
        "true"
      );

      aiChatWindow.setAttribute(
        "aria-hidden",
        "false"
      );


      setTimeout(() => {

        aiChatInput.focus();

      }, 250);

    };


    const closeAssistant = () => {

      aiAssistant.classList.remove(
        "open"
      );

      aiChatTrigger.setAttribute(
        "aria-expanded",
        "false"
      );

      aiChatWindow.setAttribute(
        "aria-hidden",
        "true"
      );

    };


    aiChatTrigger.addEventListener(
      "click",
      () => {

        if (
          aiAssistant.classList.contains(
            "open"
          )
        ) {
          closeAssistant();
        } else {
          openAssistant();
        }

      }
    );


    aiChatClose.addEventListener(
      "click",
      closeAssistant
    );


    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Escape" &&
          aiAssistant.classList.contains(
            "open"
          )
        ) {

          closeAssistant();

        }

      }
    );


    /* -----------------------------------------------------
       MESSAGE HELPERS
       ----------------------------------------------------- */

    const scrollMessagesToBottom =
      () => {

        aiChatMessages.scrollTop =
          aiChatMessages.scrollHeight;

      };


    const addMessage =
      (
        message,
        sender = "assistant"
      ) => {

        const wrapper =
          document.createElement("div");

        wrapper.className =
          `ai-message ${sender === "user" ? "user" : ""}`;


        const avatar =
          document.createElement("span");

        avatar.className =
          "ai-message-avatar";

        avatar.textContent =
          sender === "user"
            ? "U"
            : "✦";


        const content =
          document.createElement("div");

        content.className =
          "ai-message-content";


        const paragraphs =
          String(message)
            .split(/\n+/)
            .filter(Boolean);


        paragraphs.forEach(
          (paragraph) => {

            const p =
              document.createElement("p");

            p.textContent =
              paragraph;

            content.appendChild(p);

          }
        );


        wrapper.appendChild(
          avatar
        );

        wrapper.appendChild(
          content
        );


        aiChatMessages.appendChild(
          wrapper
        );


        scrollMessagesToBottom();

        return wrapper;

      };


    /* -----------------------------------------------------
       TYPING INDICATOR
       ----------------------------------------------------- */

    const addTypingIndicator =
      () => {

        const wrapper =
          document.createElement("div");

        wrapper.className =
          "ai-message ai-typing";


        const avatar =
          document.createElement("span");

        avatar.className =
          "ai-message-avatar";

        avatar.textContent =
          "✦";


        const content =
          document.createElement("div");

        content.className =
          "ai-message-content";


        const p =
          document.createElement("p");

        p.textContent =
          "Thinking...";


        content.appendChild(p);

        wrapper.appendChild(
          avatar
        );

        wrapper.appendChild(
          content
        );


        aiChatMessages.appendChild(
          wrapper
        );

        scrollMessagesToBottom();

        return wrapper;

      };


    /* -----------------------------------------------------
       BOT RESPONSE
       ----------------------------------------------------- */

    const getBotResponse =
      (question) => {

        const t =
          question
            .toLowerCase()
            .trim();


        if (!t) {

          return "Ask me something about Om's portfolio.";

        }


        /* GREETING */

        if (
          t === "hi" ||
          t === "hello" ||
          t === "hey" ||
          t.includes("good morning") ||
          t.includes("good evening")
        ) {

          return (
            "Hey! I'm Om's portfolio assistant. " +
            "You can ask me about his education, projects, skills, languages, or how to contact him."
          );

        }


        /* NAME */

        if (
          t.includes("who is om") ||
          t.includes("about om") ||
          t.includes("who are you")
        ) {

          return (
            "Om Shete is an MSc AI & Data Science student focused on Machine Learning, Data Science and predictive modeling. " +
            "He completed his BCA from MIT World Peace University, Pune."
          );

        }


        /* EDUCATION */

        if (
          t.includes("education") ||
          t.includes("degree") ||
          t.includes("university") ||
          t.includes("college") ||
          t.includes("bca") ||
          t.includes("msc") ||
          t.includes("study") ||
          t.includes("studying")
        ) {

          return assistantKnowledge.education;

        }


        /* PROJECTS */

        if (
          t.includes("project") ||
          t.includes("projects") ||
          t.includes("work") ||
          t.includes("built")
        ) {

          return (
            "Om has two featured ML projects: " +
            "Credit Card Fraud Detection and Student Performance Prediction. " +
            "Both are available on his GitHub."
          );

        }


        /* FRAUD PROJECT */

        if (
          t.includes("fraud") ||
          t.includes("credit card")
        ) {

          return (
            "Om built a Credit Card Fraud Detection project using machine learning. " +
            "It focuses on highly imbalanced transaction data, preprocessing, feature scaling, class imbalance handling, and evaluating models using metrics such as Precision, Recall, F1-score and ROC-AUC."
          );

        }


        /* STUDENT PROJECT */

        if (
          t.includes("student performance") ||
          t.includes("student prediction") ||
          t.includes("academic performance")
        ) {

          return (
            "Om built a Student Performance Prediction project using machine learning. " +
            "The project covers exploratory data analysis, preprocessing, feature engineering, model building and evaluation."
          );

        }


        /* SKILLS */

        if (
          t.includes("skill") ||
          t.includes("technical") ||
          t.includes("technology") ||
          t.includes("tech stack") ||
          t.includes("tools")
        ) {

          return assistantKnowledge.skills;

        }


        /* PYTHON */

        if (
          t.includes("python")
        ) {

          return (
            "Python is one of Om's core programming languages. " +
            "He uses it for data analysis, preprocessing, visualization and machine learning."
          );

        }


        /* MACHINE LEARNING */

        if (
          t.includes("machine learning") ||
          t === "ml" ||
          t.includes("model")
        ) {

          return (
            "Om is focused on Machine Learning and predictive modeling. " +
            "His current work includes classification, feature engineering, cross-validation, class imbalance handling, and model evaluation."
          );

        }


        /* DATA SCIENCE */

        if (
          t.includes("data science") ||
          t.includes("data analysis") ||
          t.includes("eda")
        ) {

          return (
            "Om is developing his Data Science skills across the complete workflow — data cleaning, exploratory data analysis, feature engineering, visualization, machine learning and evaluation."
          );

        }


        /* LANGUAGES */

        if (
          t.includes("language") ||
          t.includes("english") ||
          t.includes("german") ||
          t.includes("deutsch") ||
          t.includes("ielts")
        ) {

          return assistantKnowledge.languages;

        }


        /* GERMAN */

        if (
          t.includes("german") ||
          t.includes("deutsch")
        ) {

          return (
            "Om's German proficiency is B1."
          );

        }


        /* ENGLISH */

        if (
          t.includes("english") ||
          t.includes("ielts")
        ) {

          return (
            "Om's English proficiency is C1+ and he has an IELTS Academic background."
          );

        }


        /* CURRENT STATUS */

        if (
          t.includes("currently") ||
          t.includes("now") ||
          t.includes("what is he doing") ||
          t.includes("what does he do")
        ) {

          return assistantKnowledge.current;

        }


        /* CONTACT */

        if (
          t.includes("contact") ||
          t.includes("email") ||
          t.includes("linkedin") ||
          t.includes("github") ||
          t.includes("whatsapp") ||
          t.includes("reach")
        ) {

          return (
            "You can connect with Om through WhatsApp, email, GitHub, or LinkedIn. " +
            "All four options are available in the Contact section of the portfolio."
          );

        }


        /* RESUME */

        if (
          t.includes("resume") ||
          t.includes("cv")
        ) {

          return (
            "Om's resume is available through the Resume button in the hero section."
          );

        }


        /* INTERNSHIP */

        if (
          t.includes("internship") ||
          t.includes("job") ||
          t.includes("hire") ||
          t.includes("hiring")
        ) {

          return (
            "Om is currently open to internships and opportunities related to Machine Learning, Data Science and AI."
          );

        }


        /* LOCATION */

        if (
          t.includes("pune") ||
          t.includes("location") ||
          t.includes("where")
        ) {

          return (
            "Om is based in Pune and is open to relevant opportunities in Pune or remotely."
          );

        }


        /* DEFAULT */

        return (
          "I can help with information about Om's education, projects, skills, languages, current focus, resume, or contact details."
        );

      };


    /* -----------------------------------------------------
       SEND MESSAGE
       ----------------------------------------------------- */

    const processQuestion =
      (question) => {

        const cleanQuestion =
          String(question)
            .trim();


        if (!cleanQuestion) {
          return;
        }


        addMessage(
          cleanQuestion,
          "user"
        );


        aiChatInput.value = "";


        const typing =
          addTypingIndicator();


        const delay =
          350 +
          Math.random() * 450;


        setTimeout(
          () => {

            if (typing) {
              typing.remove();
            }


            addMessage(
              getBotResponse(
                cleanQuestion
              ),
              "assistant"
            );

          },
          delay
        );

      };


    aiChatForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        processQuestion(
          aiChatInput.value
        );

      }
    );


    /* -----------------------------------------------------
       SUGGESTIONS
       ----------------------------------------------------- */

    aiSuggestions.forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            const question =
              button.dataset.question;

            if (!question) {
              return;
            }

            processQuestion(
              question
            );

          }
        );

      }
    );


    /* -----------------------------------------------------
       ENTER KEY
       ----------------------------------------------------- */

    aiChatInput.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Enter" &&
          !event.shiftKey
        ) {

          event.preventDefault();

          aiChatForm.requestSubmit();

        }

      }
    );

  }


  /* =======================================================
     ACCESSIBILITY / REDUCED MOTION
     ======================================================= */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (prefersReducedMotion) {

    document.documentElement.style
      .scrollBehavior = "auto";

  }


  /* =======================================================
     PAGE READY
     ======================================================= */

  document.body.classList.add(
    "page-ready"
  );

})();
