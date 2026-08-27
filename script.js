(function () {
  "use strict";

  /* =========================================================
     ASK ASSISTANT CHATBOT
     Initialized first so it is independent of other effects.
  ========================================================= */

  function initChatbot() {
    const chatTrigger = document.getElementById("aiChatTrigger");
    const chatWindow = document.getElementById("aiChatWindow");
    const chatClose = document.getElementById("aiChatClose");
    const chatForm = document.getElementById("aiChatForm");
    const chatInput = document.getElementById("aiChatInput");
    const chatMessages = document.getElementById("aiChatMessages");
    const suggestions = document.querySelectorAll(".ai-suggestion");

    if (!chatTrigger || !chatWindow || !chatMessages) {
      console.warn("Ask Assistant: chatbot elements not found.");
      return;
    }

    /* ---------------------------------------------------------
       OPEN
    --------------------------------------------------------- */

    function openChat() {
      chatWindow.classList.add("open");
      chatWindow.setAttribute("aria-hidden", "false");

      chatTrigger.classList.add("active");
      chatTrigger.setAttribute("aria-expanded", "true");

      if (chatInput) {
        setTimeout(function () {
          chatInput.focus();
        }, 200);
      }
    }

    /* ---------------------------------------------------------
       CLOSE
    --------------------------------------------------------- */

    function closeChat() {
      chatWindow.classList.remove("open");
      chatWindow.setAttribute("aria-hidden", "true");

      chatTrigger.classList.remove("active");
      chatTrigger.setAttribute("aria-expanded", "false");
    }

    /* ---------------------------------------------------------
       TOGGLE
    --------------------------------------------------------- */

    chatTrigger.addEventListener("click", function (event) {
      event.preventDefault();

      if (chatWindow.classList.contains("open")) {
        closeChat();
      } else {
        openChat();
      }
    });

    /* ---------------------------------------------------------
       CLOSE BUTTON
    --------------------------------------------------------- */

    if (chatClose) {
      chatClose.addEventListener("click", function (event) {
        event.preventDefault();
        closeChat();
      });
    }

    /* =========================================================
       PORTFOLIO KNOWLEDGE
    ========================================================= */

    const portfolio = {
      name: "Om Shete",

      currentStudy:
        "Om is currently a First Year MSc Artificial Intelligence & Data Science student.",

      education:
        "Om completed his BCA from MIT World Peace University, Pune. He is currently pursuing an MSc in Artificial Intelligence & Data Science.",

      bca:
        "Om completed his Bachelor of Computer Applications from MIT World Peace University, Pune.",

      interests:
        "Om is currently exploring Data Science, Machine Learning and Artificial Intelligence, with a focus on building practical skills through projects and experimentation.",

      skills:
        "Om's current technical focus includes Python, SQL, NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, data preprocessing, exploratory data analysis, feature engineering, classification, model evaluation and machine learning.",

      ml:
        "Machine Learning is one of Om's main areas of interest. He has worked with classification problems, imbalanced datasets, preprocessing, feature scaling and evaluation metrics such as precision, recall, F1-score and ROC-AUC.",

      dataScience:
        "Om is interested in the complete Data Science workflow — from data cleaning and exploratory data analysis to feature engineering, modelling and evaluation.",

      projects:
        "Om's current portfolio features projects including Credit Card Fraud Detection and Student Performance Prediction. More projects and experiments are being developed.",

      fraud:
        "Om built a Credit Card Fraud Detection project using machine learning on an imbalanced transaction dataset. The project explores preprocessing, class imbalance handling, Logistic Regression, Random Forest, precision, recall, F1-score and ROC-AUC.",

      studentProject:
        "Om built a Student Performance Prediction classification project involving data cleaning, feature selection, exploratory data analysis and machine learning.",

      github:
        "You can explore Om's code and projects through the GitHub links available throughout this portfolio.",

      contact:
        "You can connect with Om through the GitHub and LinkedIn links available in the Contact section of this portfolio.",

      future:
        "Om is currently building stronger foundations in AI, Data Science, Machine Learning and statistics while developing more practical projects."
    };

    /* =========================================================
       NORMALIZE
    ========================================================= */

    function normalize(text) {
      return String(text || "")
        .toLowerCase()
        .trim()
        .replace(/[?!.,]/g, "");
    }

    /* =========================================================
       RESPONSE ENGINE
    ========================================================= */

    function getResponse(question) {
      const text = normalize(question);

      /* Greeting */

      if (
        text === "hi" ||
        text === "hello" ||
        text === "hey" ||
        text.includes("hey om")
      ) {
        return (
          "Hey! I'm Om's portfolio assistant. " +
          "Ask me about his education, skills, projects, " +
          "Machine Learning, Data Science, or what he's currently studying."
        );
      }

      /* Current study */

      if (
        text.includes("what is om studying") ||
        text.includes("what is he studying") ||
        text.includes("what are you studying") ||
        text.includes("currently studying") ||
        text.includes("current study") ||
        text.includes("msc") ||
        text.includes("master")
      ) {
        return portfolio.currentStudy;
      }

      /* Education */

      if (
        text.includes("education") ||
        text.includes("degree") ||
        text.includes("college") ||
        text.includes("university")
      ) {
        return portfolio.education;
      }

      /* BCA */

      if (
        text.includes("bca") ||
        text.includes("mit wpu") ||
        text.includes("mit-wpu")
      ) {
        return portfolio.bca;
      }

      /* Skills */

      if (
        text.includes("skills") ||
        text.includes("skill") ||
        text.includes("technologies") ||
        text.includes("technology") ||
        text.includes("tech stack")
      ) {
        return portfolio.skills;
      }

      /* Machine Learning */

      if (
        text.includes("machine learning") ||
        text === "ml" ||
        text.includes("classification") ||
        text.includes("model")
      ) {
        return portfolio.ml;
      }

      /* Data Science */

      if (
        text.includes("data science") ||
        text.includes("data analysis") ||
        text.includes("pandas") ||
        text.includes("numpy")
      ) {
        return portfolio.dataScience;
      }

      /* Fraud */

      if (
        text.includes("fraud") ||
        text.includes("credit card")
      ) {
        return portfolio.fraud;
      }

      /* Student project */

      if (
        text.includes("student performance") ||
        text.includes("student prediction")
      ) {
        return portfolio.studentProject;
      }

      /* Projects */

      if (
        text.includes("project") ||
        text.includes("projects") ||
        text.includes("work") ||
        text.includes("built")
      ) {
        return portfolio.projects;
      }

      /* GitHub */

      if (
        text.includes("github") ||
        text.includes("code") ||
        text.includes("repository")
      ) {
        return portfolio.github;
      }

      /* Contact */

      if (
        text.includes("contact") ||
        text.includes("email") ||
        text.includes("linkedin") ||
        text.includes("reach")
      ) {
        return portfolio.contact;
      }

      /* Interests */

      if (
        text.includes("interest") ||
        text.includes("passion")
      ) {
        return portfolio.interests;
      }

      /* Future / current focus */

      if (
        text.includes("future") ||
        text.includes("goal") ||
        text.includes("focus") ||
        text.includes("currently") ||
        text.includes("now")
      ) {
        return portfolio.future;
      }

      /* Default */

      return (
        "I don't have an answer for that yet. " +
        "Try asking me about Om's education, skills, " +
        "projects, Machine Learning, Data Science, " +
        "or what he's currently studying."
      );
    }

    /* =========================================================
       ADD MESSAGE
    ========================================================= */

    function addMessage(text, type) {
      const wrapper = document.createElement("div");

      if (type === "user") {
        wrapper.className = "ai-message ai-message-user";

        wrapper.innerHTML = `
          <div class="ai-message-content">
            <p></p>
          </div>
        `;
      } else {
        wrapper.className = "ai-message";

        wrapper.innerHTML = `
          <span class="ai-message-avatar">✦</span>
          <div class="ai-message-content">
            <p></p>
          </div>
        `;
      }

      const paragraph = wrapper.querySelector("p");

      if (paragraph) {
        paragraph.textContent = text;
      }

      chatMessages.appendChild(wrapper);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      return wrapper;
    }

    /* =========================================================
       TYPING INDICATOR
    ========================================================= */

    function showTyping() {
      const wrapper = document.createElement("div");

      wrapper.className = "ai-message ai-typing";

      wrapper.innerHTML = `
        <span class="ai-message-avatar">✦</span>
        <div class="ai-message-content">
          <div class="ai-typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      `;

      chatMessages.appendChild(wrapper);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      return wrapper;
    }

    /* =========================================================
       SEND MESSAGE
    ========================================================= */

    function sendMessage(question) {
      const text = String(question || "").trim();

      if (!text) {
        return;
      }

      addMessage(text, "user");

      if (chatInput) {
        chatInput.value = "";
      }

      const typing = showTyping();

      setTimeout(function () {
        if (typing) {
          typing.remove();
        }

        addMessage(
          getResponse(text),
          "assistant"
        );
      }, 450);
    }

    /* =========================================================
       QUICK QUESTIONS
    ========================================================= */

    suggestions.forEach(function (button) {
      button.type = "button";
      button.setAttribute("tabindex", "0");

      button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const question =
          button.dataset.question ||
          button.textContent.trim();

        openChat();
        sendMessage(question);
      });

      button.addEventListener("keydown", function (event) {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          event.stopPropagation();

          const question =
            button.dataset.question ||
            button.textContent.trim();

          openChat();
          sendMessage(question);
        }
      });
    });

    /* =========================================================
       FORM
    ========================================================= */

    if (chatForm) {
      chatForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!chatInput) {
          return;
        }

        sendMessage(chatInput.value);
      });
    }

    /* =========================================================
       ESCAPE
    ========================================================= */

    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        chatWindow.classList.contains("open")
      ) {
        closeChat();
      }
    });

    /* =========================================================
       INITIAL STATE
    ========================================================= */

    chatWindow.setAttribute(
      "aria-hidden",
      "true"
    );

    chatTrigger.setAttribute(
      "aria-expanded",
      "false"
    );

    console.log("Ask Assistant initialized successfully.");
  }


  /* =========================================================
     START CHATBOT FIRST
  ========================================================= */

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initChatbot
    );
  } else {
    initChatbot();
  }


  /* =========================================================
     CUSTOM CURSOR
  ========================================================= */

  const cursor =
    document.getElementById("cursor");

  const follower =
    document.getElementById("cursor-follower");

  let fx = 0;
  let fy = 0;
  let mx = 0;
  let my = 0;

  if (cursor && follower) {

    document.addEventListener(
      "mousemove",
      function (event) {

        mx = event.clientX;
        my = event.clientY;

        cursor.style.left =
          mx + "px";

        cursor.style.top =
          my + "px";
      },
      { passive: true }
    );

    (function animateFollower() {

      fx +=
        (mx - fx) * 0.12;

      fy +=
        (my - fy) * 0.12;

      follower.style.left =
        fx + "px";

      follower.style.top =
        fy + "px";

      requestAnimationFrame(
        animateFollower
      );

    })();
  }


  /* =========================================================
     NAVIGATION
  ========================================================= */

  const nav =
    document.getElementById("nav");

  if (nav) {

    window.addEventListener(
      "scroll",
      function () {

        nav.classList.toggle(
          "scrolled",
          window.scrollY > 40
        );

      },
      { passive: true }
    );

  }


  const toggle =
    document.getElementById(
      "navToggle"
    );

  const mobileMenu =
    document.getElementById(
      "mobileMenu"
    );


  function closeMobileMenu() {

    if (toggle) {

      toggle.classList.remove(
        "open"
      );

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }

    if (mobileMenu) {

      mobileMenu.classList.remove(
        "open"
      );

    }

    document.body.style.overflow =
      "";

  }


  if (
    toggle &&
    mobileMenu
  ) {

    toggle.addEventListener(
      "click",
      function () {

        const isOpen =
          mobileMenu.classList.toggle(
            "open"
          );

        toggle.classList.toggle(
          "open",
          isOpen
        );

        toggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

        document.body.style.overflow =
          isOpen
            ? "hidden"
            : "";

      }
    );

  }


  document
    .querySelectorAll(
      ".mobile-link"
    )
    .forEach(
      function (link) {

        link.addEventListener(
          "click",
          closeMobileMenu
        );

      }
    );


  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(
      function (anchor) {

        anchor.addEventListener(
          "click",
          function (event) {

            const selector =
              this.getAttribute(
                "href"
              );

            if (
              !selector ||
              selector === "#"
            ) {
              return;
            }

            const target =
              document.querySelector(
                selector
              );

            if (target) {

              event.preventDefault();

              closeMobileMenu();

              target.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });

            }

          }
        );

      }
    );


  /* =========================================================
     TYPEWRITER
  ========================================================= */

  const tw =
    document.getElementById(
      "typewriter"
    );

  const lines = [
    "Machine Learning Enthusiast",
    "Data Science Explorer",
    "MSc AI DS Student",
    "BCA 26 @ MIT-WPU Pune"
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 80;
  const DELETE_SPEED = 40;
  const PAUSE = 1800;


  function typewriterTick() {

    if (!tw) {
      return;
    }

    const current =
      lines[lineIndex];

    if (!deleting) {

      charIndex++;

      tw.textContent =
        current.slice(
          0,
          charIndex
        );

      if (
        charIndex >=
        current.length
      ) {

        deleting = true;

        setTimeout(
          typewriterTick,
          PAUSE
        );

        return;
      }

    } else {

      charIndex--;

      tw.textContent =
        current.slice(
          0,
          charIndex
        );

      if (
        charIndex <= 0
      ) {

        deleting = false;

        lineIndex =
          (
            lineIndex + 1
          ) %
          lines.length;

        setTimeout(
          typewriterTick,
          300
        );

        return;
      }
    }

    setTimeout(
      typewriterTick,
      deleting
        ? DELETE_SPEED
        : TYPE_SPEED
    );
  }


  if (tw) {

    setTimeout(
      typewriterTick,
      600
    );

  }


  /* =========================================================
     THREE.JS UNIVERSE
  ========================================================= */

  function initUniverse() {

    if (
      typeof THREE ===
      "undefined"
    ) {
      return;
    }

    const canvas =
      document.getElementById(
        "universe-canvas"
      );

    if (!canvas) {
      return;
    }

    const scene =
      new THREE.Scene();

    const camera =
      new THREE.PerspectiveCamera(
        60,
        window.innerWidth /
          window.innerHeight,
        0.1,
        2000
      );

    camera.position.z =
      1;

    const renderer =
      new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
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

    renderer.setClearColor(
      0x000000,
      0
    );


    function makeStars(
      count,
      spread,
      size,
      color,
      opacity
    ) {

      const positions =
        new Float32Array(
          count * 3
        );

      for (
        let i = 0;
        i < count * 3;
        i++
      ) {

        positions[i] =
          (
            Math.random() -
            0.5
          ) * spread;

      }

      const geometry =
        new THREE.BufferGeometry();

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
          positions,
          3
        )
      );

      const material =
        new THREE.PointsMaterial({
          color: color,
          size: size,
          transparent: true,
          opacity: opacity,
          sizeAttenuation: true,
          blending:
            THREE.AdditiveBlending,
          depthWrite: false
        });

      return new THREE.Points(
        geometry,
        material
      );
    }


    const stars1 =
      makeStars(
        4000,
        1800,
        0.5,
        0xffffff,
        0.7
      );

    const stars2 =
      makeStars(
        1200,
        900,
        0.9,
        0x8ab4ff,
        0.6
      );

    const stars3 =
      makeStars(
        400,
        400,
        1.4,
        0xffffff,
        0.9
      );

    const stars4 =
      makeStars(
        600,
        700,
        0.7,
        0xc084fc,
        0.5
      );

    const stars5 =
      makeStars(
        300,
        500,
        1.1,
        0x67e8f9,
        0.6
      );


    const starGroup =
      new THREE.Group();

    starGroup.add(
      stars1,
      stars2,
      stars3,
      stars4,
      stars5
    );

    scene.add(
      starGroup
    );


    function makeNebula(
      x,
      y,
      z,
      scale,
      color,
      opacity
    ) {

      const geometry =
        new THREE.PlaneGeometry(
          1,
          1
        );

      const material =
        new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: opacity,
          blending:
            THREE.AdditiveBlending,
          depthWrite: false,
          side:
            THREE.DoubleSide
        });

      const mesh =
        new THREE.Mesh(
          geometry,
          material
        );

      mesh.position.set(
        x,
        y,
        z
      );

      mesh.scale.set(
        scale,
        scale,
        1
      );

      mesh.rotation.z =
        Math.random() *
        Math.PI;

      return mesh;
    }


    const nebulaGroup =
      new THREE.Group();

    nebulaGroup.add(

      makeNebula(
        -120,
        60,
        -600,
        400,
        0x3b82f6,
        0.04
      ),

      makeNebula(
        200,
        -80,
        -700,
        500,
        0x7c3aed,
        0.03
      ),

      makeNebula(
        0,
        100,
        -800,
        600,
        0x0e7490,
        0.025
      ),

      makeNebula(
        -200,
        -150,
        -500,
        350,
        0x6d28d9,
        0.035
      ),

      makeNebula(
        150,
        200,
        -600,
        450,
        0x1e40af,
        0.03
      )

    );

    scene.add(
      nebulaGroup
    );


    /* ---------------------------------------------------------
       SHOOTING STARS
    --------------------------------------------------------- */

    const shooters = [];


    function spawnShooter() {

      const geometry =
        new THREE.BufferGeometry();

      const length =
        Math.random() * 4 + 2;

      const x =
        (
          Math.random() -
          0.5
        ) * 300;

      const y =
        (
          Math.random() -
          0.5
        ) * 150 + 60;

      const z =
        -Math.random() *
          50 -
        5;

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
          new Float32Array([
            x,
            y,
            z,

            x - length,
            y - length * 0.4,
            z
          ]),
          3
        )
      );

      const material =
        new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.9,
          blending:
            THREE.AdditiveBlending
        });

      const line =
        new THREE.Line(
          geometry,
          material
        );

      line.userData = {
        vx:
          -(
            Math.random() *
              0.8 +
            0.4
          ),

        vy:
          -(
            Math.random() *
              0.3 +
            0.1
          ),

        life: 1
      };

      scene.add(line);

      shooters.push(line);
    }


    setInterval(
      spawnShooter,
      2500
    );


    /* ---------------------------------------------------------
       MOUSE PARALLAX
    --------------------------------------------------------- */

    let targetMouseX = 0;
    let targetMouseY = 0;

    let cameraX = 0;
    let cameraY = 0;


    document.addEventListener(
      "mousemove",
      function (event) {

        targetMouseX =
          (
            event.clientX /
              window.innerWidth -
            0.5
          ) * 2;

        targetMouseY =
          (
            event.clientY /
              window.innerHeight -
            0.5
          ) * 2;

      },
      { passive: true }
    );


    const clock =
      new THREE.Clock();


    function animateUniverse() {

      requestAnimationFrame(
        animateUniverse
      );

      const time =
        clock.getElapsedTime();

      starGroup.rotation.y =
        time * 0.012;

      starGroup.rotation.x =
        Math.sin(
          time * 0.007
        ) * 0.08;

      nebulaGroup.rotation.z =
        time * 0.005;

      cameraX +=
        (
          targetMouseX * 8 -
          cameraX
        ) * 0.025;

      cameraY +=
        (
          -targetMouseY * 5 -
          cameraY
        ) * 0.025;

      camera.position.x =
        cameraX;

      camera.position.y =
        cameraY;

      camera.lookAt(
        0,
        0,
        0
      );


      for (
        let i =
          shooters.length - 1;
        i >= 0;
        i--
      ) {

        const shooter =
          shooters[i];

        shooter.userData.life -=
          0.018;

        shooter.material.opacity =
          shooter.userData.life *
          0.9;

        const positions =
          shooter.geometry
            .attributes
            .position
            .array;

        positions[0] +=
          shooter.userData.vx;

        positions[1] +=
          shooter.userData.vy;

        positions[3] +=
          shooter.userData.vx;

        positions[4] +=
          shooter.userData.vy;

        shooter.geometry
          .attributes
          .position
          .needsUpdate =
          true;

        if (
          shooter.userData.life <=
          0
        ) {

          scene.remove(
            shooter
          );

          shooter.geometry.dispose();

          shooter.material.dispose();

          shooters.splice(
            i,
            1
          );
        }
      }


      renderer.render(
        scene,
        camera
      );
    }


    animateUniverse();


    window.addEventListener(
      "resize",
      function () {

        camera.aspect =
          window.innerWidth /
          window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
          window.innerWidth,
          window.innerHeight
        );

      },
      { passive: true }
    );

  }


  /* Run visual universe separately */

  try {
    initUniverse();
  } catch (error) {
    console.error(
      "Universe initialization failed:",
      error
    );
  }


  /* =========================================================
     GSAP / SCROLL ANIMATIONS
  ========================================================= */

  function initGSAP() {

    if (
      typeof gsap ===
        "undefined" ||
      typeof ScrollTrigger ===
        "undefined"
    ) {

      const observer =
        new IntersectionObserver(
          function (entries) {

            entries.forEach(
              function (entry, index) {

                if (
                  entry.isIntersecting
                ) {

                  setTimeout(
                    function () {

                      entry.target.classList.add(
                        "in"
                      );

                    },
                    index * 60
                  );

                  observer.unobserve(
                    entry.target
                  );
                }

              }
            );

          },
          {
            threshold: 0.1,
            rootMargin:
              "0px 0px -40px 0px"
          }
        );


      document
        .querySelectorAll(
          ".reveal"
        )
        .forEach(
          function (element) {
            observer.observe(
              element
            );
          }
        );

      return;
    }


    gsap.registerPlugin(
      ScrollTrigger
    );


    const hero =
      document.getElementById(
        "heroInner"
      );


    if (hero) {

      gsap.from(
        hero.children,
        {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.2
        }
      );

    }


    document
      .querySelectorAll(
        ".section"
      )
      .forEach(
        function (section) {

          const reveals =
            section.querySelectorAll(
              ".reveal"
            );

          if (
            !reveals.length
          ) {
            return;
          }

          gsap.fromTo(
            reveals,

            {
              y: 36,
              opacity: 0
            },

            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",

              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions:
                  "play none none none"
              }

            }
          );

        }
      );


    document
      .querySelectorAll(
        ".sec-title"
      )
      .forEach(
        function (element) {

          gsap.fromTo(
            element,

            {
              scale: 0.95,
              opacity: 0
            },

            {
              scale: 1,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",

              scrollTrigger: {
                trigger: element,
                start: "top 85%"
              }

            }
          );

        }
      );


    gsap
      .utils
      .toArray(
        ".stat-card"
      )
      .forEach(
        function (card, index) {

          gsap.fromTo(
            card,

            {
              scale: 0.8,
              opacity: 0
            },

            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              delay:
                index * 0.1,
              ease:
                "back.out(1.4)",

              scrollTrigger: {
                trigger: card,
                start: "top 85%"
              }

            }
          );

        }
      );


    gsap
      .utils
      .toArray(
        ".proj-card"
      )
      .forEach(
        function (card, index) {

          gsap.fromTo(
            card,

            {
              x:
                index % 2 === 0
                  ? -60
                  : 60,

              opacity: 0
            },

            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",

              scrollTrigger: {
                trigger: card,
                start: "top 85%"
              }

            }
          );

        }
      );


    gsap
      .utils
      .toArray(
        ".spill"
      )
      .forEach(
        function (pill, index) {

          gsap.fromTo(
            pill,

            {
              scale: 0,
              opacity: 0
            },

            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              delay:
                index * 0.03,
              ease:
                "back.out(1.7)",

              scrollTrigger: {
                trigger: pill,
                start: "top 90%"
              }

            }
          );

        }
      );

  }


  try {
    initGSAP();
  } catch (error) {
    console.error(
      "GSAP initialization failed:",
      error
    );
  }


  /* =========================================================
     COUNT-UP NUMBERS
  ========================================================= */

  const countElements =
    document.querySelectorAll(
      ".count-up"
    );

  if (
    countElements.length
  ) {

    const countObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(
            function (entry) {

              if (
                !entry.isIntersecting
              ) {
                return;
              }

              const element =
                entry.target;

              const target =
                parseInt(
                  element.dataset.target,
                  10
                );

              const duration =
                1200;

              const start =
                performance.now();


              function countStep(now) {

                const progress =
                  Math.min(
                    (
                      now - start
                    ) /
                      duration,
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
                    countStep
                  );

                } else {

                  element.textContent =
                    target;

                }

              }


              requestAnimationFrame(
                countStep
              );

              countObserver.unobserve(
                element
              );

            }
          );

        },
        {
          threshold: 0.6
        }
      );


    countElements.forEach(
      function (element) {
        countObserver.observe(
          element
        );
      }
    );

  }


  /* =========================================================
     CEFR BARS
  ========================================================= */

  const bars =
    document.querySelectorAll(
      ".cefr-fill"
    );


  if (bars.length) {

    const barObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(
            function (entry) {

              if (
                !entry.isIntersecting
              ) {
                return;
              }

              const element =
                entry.target;

              const width =
                element.style.width;

              element.style.width =
                "0%";

              setTimeout(
                function () {

                  element.style.width =
                    width;

                },
                250
              );

              barObserver.unobserve(
                element
              );

            }
          );

        },
        {
          threshold: 0.5
        }
      );


    bars.forEach(
      function (bar) {
        barObserver.observe(
          bar
        );
      }
    );

  }


  /* =========================================================
     VANILLA TILT
  ========================================================= */

  function initTilt() {

    if (
      typeof VanillaTilt ===
      "undefined"
    ) {
      return;
    }

    const tiltElements =
      document.querySelectorAll(
        "[data-tilt]"
      );

    if (
      !tiltElements.length
    ) {
      return;
    }

    VanillaTilt.init(
      tiltElements,
      {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
        perspective: 800
      }
    );

  }


  try {
    initTilt();
  } catch (error) {
    console.error(
      "Tilt initialization failed:",
      error
    );
  }


  /* =========================================================
     SKILL PILL HOVER
  ========================================================= */

  document
    .querySelectorAll(
      ".spill"
    )
    .forEach(
      function (pill) {

        pill.addEventListener(
          "mouseenter",
          function () {

            pill.style.boxShadow =
              "0 0 12px currentColor";

          }
        );

        pill.addEventListener(
          "mouseleave",
          function () {

            pill.style.boxShadow =
              "";

          }
        );

      }
    );

})();
