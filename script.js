(function () {
  "use strict";

  /* =========================================================
     CUSTOM CURSOR
  ========================================================= */

  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursor-follower");

  let fx = 0;
  let fy = 0;
  let mx = 0;
  let my = 0;

  if (cursor && follower) {
    document.addEventListener(
      "mousemove",
      (e) => {
        mx = e.clientX;
        my = e.clientY;

        cursor.style.left = mx + "px";
        cursor.style.top = my + "px";
      },
      { passive: true }
    );

    (function animFollower() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;

      follower.style.left = fx + "px";
      follower.style.top = fy + "px";

      requestAnimationFrame(animFollower);
    })();
  }


  /* =========================================================
     NAVIGATION
  ========================================================= */

  const nav = document.getElementById("nav");

  if (nav) {
    window.addEventListener(
      "scroll",
      () => {
        nav.classList.toggle(
          "scrolled",
          window.scrollY > 40
        );
      },
      { passive: true }
    );
  }


  /* =========================================================
     MOBILE NAVIGATION
  ========================================================= */

  const toggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  function closeMenu() {
    if (toggle) {
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }

    if (mobileMenu) {
      mobileMenu.classList.remove("open");
    }

    document.body.style.overflow = "";
  }

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");

      toggle.classList.toggle("open", open);
      toggle.setAttribute(
        "aria-expanded",
        String(open)
      );

      document.body.style.overflow =
        open ? "hidden" : "";
    });
  }

  document
    .querySelectorAll(".mobile-link")
    .forEach((link) => {
      link.addEventListener(
        "click",
        closeMenu
      );
    });


  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((anchor) => {
      anchor.addEventListener(
        "click",
        function (e) {
          const href =
            this.getAttribute("href");

          if (
            !href ||
            href === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(href);

          if (target) {
            e.preventDefault();

            closeMenu();

            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        }
      );
    });


  /* =========================================================
     TYPEWRITER
  ========================================================= */

  const tw =
    document.getElementById("typewriter");

  const lines = [
    "Machine Learning Enthusiast",
    "Data Science Explorer",
    "MSc AI DS Student",
    "BCA 26 @ MIT-WPU Pune"
  ];

  let li = 0;
  let ci = 0;
  let deleting = false;

  const SPEED_TYPE = 80;
  const SPEED_DEL = 40;
  const PAUSE = 1800;

  function typeTick() {
    if (!tw) return;

    const current = lines[li];

    if (!deleting) {
      ci++;

      tw.textContent =
        current.slice(0, ci);

      if (ci >= current.length) {
        deleting = true;

        setTimeout(
          typeTick,
          PAUSE
        );

        return;
      }
    } else {
      ci--;

      tw.textContent =
        current.slice(0, ci);

      if (ci <= 0) {
        deleting = false;

        li =
          (li + 1) %
          lines.length;

        setTimeout(
          typeTick,
          300
        );

        return;
      }
    }

    setTimeout(
      typeTick,
      deleting
        ? SPEED_DEL
        : SPEED_TYPE
    );
  }

  if (tw) {
    setTimeout(
      typeTick,
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

    camera.position.z = 1;

    const renderer =
      new THREE.WebGLRenderer({
        canvas,
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


    /* ---------------------------------------------------------
       STAR GENERATOR
    --------------------------------------------------------- */

    function makeStars(
      count,
      spread,
      size,
      color,
      opacity
    ) {
      const pos =
        new Float32Array(
          count * 3
        );

      for (
        let i = 0;
        i < count * 3;
        i++
      ) {
        pos[i] =
          (
            Math.random() -
            0.5
          ) *
          spread;
      }

      const geo =
        new THREE.BufferGeometry();

      geo.setAttribute(
        "position",
        new THREE.BufferAttribute(
          pos,
          3
        )
      );

      const mat =
        new THREE.PointsMaterial({
          color,
          size,
          transparent: true,
          opacity,
          sizeAttenuation: true,
          blending:
            THREE.AdditiveBlending,
          depthWrite: false
        });

      return new THREE.Points(
        geo,
        mat
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


    /* ---------------------------------------------------------
       NEBULA
    --------------------------------------------------------- */

    function makeNebula(
      x,
      y,
      z,
      scale,
      color,
      opacity
    ) {
      const geo =
        new THREE.PlaneGeometry(
          1,
          1
        );

      const mat =
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity,
          blending:
            THREE.AdditiveBlending,
          depthWrite: false,
          side:
            THREE.DoubleSide
        });

      const mesh =
        new THREE.Mesh(
          geo,
          mat
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
      const geo =
        new THREE.BufferGeometry();

      const len =
        Math.random() *
          4 +
        2;

      const x =
        (
          Math.random() -
          0.5
        ) *
        300;

      const y =
        (
          Math.random() -
          0.5
        ) *
          150 +
        60;

      const z =
        -Math.random() *
          50 -
        5;

      geo.setAttribute(
        "position",
        new THREE.BufferAttribute(
          new Float32Array([
            x,
            y,
            z,

            x - len,
            y - len * 0.4,
            z
          ]),
          3
        )
      );

      const mat =
        new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.9,
          blending:
            THREE.AdditiveBlending
        });

      const line =
        new THREE.Line(
          geo,
          mat
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

    let tmx = 0;
    let tmy = 0;

    let camX = 0;
    let camY = 0;

    document.addEventListener(
      "mousemove",
      (e) => {
        tmx =
          (
            e.clientX /
              window.innerWidth -
            0.5
          ) *
          2;

        tmy =
          (
            e.clientY /
              window.innerHeight -
            0.5
          ) *
          2;
      },
      { passive: true }
    );


    /* ---------------------------------------------------------
       ANIMATION
    --------------------------------------------------------- */

    const clock =
      new THREE.Clock();

    function animate() {
      requestAnimationFrame(
        animate
      );

      const t =
        clock.getElapsedTime();

      starGroup.rotation.y =
        t * 0.012;

      starGroup.rotation.x =
        Math.sin(
          t * 0.007
        ) *
        0.08;

      nebulaGroup.rotation.z =
        t * 0.005;


      camX +=
        (
          tmx * 8 -
          camX
        ) *
        0.025;

      camY +=
        (
          -tmy * 5 -
          camY
        ) *
        0.025;

      camera.position.x =
        camX;

      camera.position.y =
        camY;

      camera.lookAt(
        0,
        0,
        0
      );


      /* Shooting stars */

      for (
        let i =
          shooters.length - 1;
        i >= 0;
        i--
      ) {
        const s =
          shooters[i];

        s.userData.life -=
          0.018;

        s.material.opacity =
          s.userData.life *
          0.9;

        const pos =
          s.geometry
            .attributes
            .position
            .array;

        pos[0] +=
          s.userData.vx;

        pos[1] +=
          s.userData.vy;

        pos[3] +=
          s.userData.vx;

        pos[4] +=
          s.userData.vy;

        s.geometry
          .attributes
          .position
          .needsUpdate =
          true;

        if (
          s.userData.life <=
          0
        ) {
          scene.remove(s);

          s.geometry.dispose();

          s.material.dispose();

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

    animate();


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
      },
      { passive: true }
    );
  }


  try {
    initUniverse();
  } catch (error) {
    console.error(
      "Universe initialization failed:",
      error
    );
  }


  /* =========================================================
     GSAP SCROLL ANIMATIONS
  ========================================================= */

  function initGSAP() {

    if (
      typeof gsap ===
        "undefined" ||
      typeof ScrollTrigger ===
        "undefined"
    ) {
      const obs =
        new IntersectionObserver(
          (entries) => {
            entries.forEach(
              (entry, i) => {
                if (
                  entry.isIntersecting
                ) {
                  setTimeout(
                    () => {
                      entry.target.classList.add(
                        "in"
                      );
                    },
                    i * 60
                  );

                  obs.unobserve(
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
          (el) =>
            obs.observe(el)
        );

      return;
    }


    gsap.registerPlugin(
      ScrollTrigger
    );


    /* Hero */

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
          ease:
            "power3.out",
          delay: 0.2
        }
      );
    }


    /* Sections */

    document
      .querySelectorAll(
        ".section"
      )
      .forEach(
        (section) => {

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
              ease:
                "power3.out",

              scrollTrigger: {
                trigger: section,
                start:
                  "top 80%",
                toggleActions:
                  "play none none none"
              }
            }
          );
        }
      );


    /* Section titles */

    document
      .querySelectorAll(
        ".sec-title"
      )
      .forEach(
        (el) => {

          gsap.fromTo(
            el,

            {
              scale: 0.95,
              opacity: 0
            },

            {
              scale: 1,
              opacity: 1,
              duration: 0.9,
              ease:
                "power3.out",

              scrollTrigger: {
                trigger: el,
                start:
                  "top 85%"
              }
            }
          );
        }
      );


    /* Stat cards */

    gsap
      .utils
      .toArray(
        ".stat-card"
      )
      .forEach(
        (card, i) => {

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
                i * 0.1,
              ease:
                "back.out(1.4)",

              scrollTrigger: {
                trigger: card,
                start:
                  "top 85%"
              }
            }
          );
        }
      );


    /* Project cards */

    gsap
      .utils
      .toArray(
        ".proj-card"
      )
      .forEach(
        (card, i) => {

          gsap.fromTo(
            card,

            {
              x:
                i % 2 === 0
                  ? -60
                  : 60,
              opacity: 0
            },

            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease:
                "power3.out",

              scrollTrigger: {
                trigger: card,
                start:
                  "top 85%"
              }
            }
          );
        }
      );


    /* Skill pills */

    gsap
      .utils
      .toArray(
        ".spill"
      )
      .forEach(
        (pill, i) => {

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
                i * 0.03,
              ease:
                "back.out(1.7)",

              scrollTrigger: {
                trigger: pill,
                start:
                  "top 90%"
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

  const countEls =
    document.querySelectorAll(
      ".count-up"
    );

  if (countEls.length) {

    const countObs =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }

              const el =
                entry.target;

              const target =
                parseInt(
                  el.dataset.target,
                  10
                );

              const duration =
                1200;

              const start =
                performance.now();


              function step(now) {

                const pct =
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
                    1 - pct,
                    3
                  );

                el.textContent =
                  Math.floor(
                    eased * target
                  );

                if (
                  pct < 1
                ) {
                  requestAnimationFrame(
                    step
                  );
                } else {
                  el.textContent =
                    target;
                }
              }

              requestAnimationFrame(
                step
              );

              countObs.unobserve(
                el
              );
            }
          );
        },
        {
          threshold: 0.6
        }
      );

    countEls.forEach(
      (el) =>
        countObs.observe(el)
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

    const barObs =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

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
                () => {
                  element.style.width =
                    width;
                },
                250
              );

              barObs.unobserve(
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
      (bar) =>
        barObs.observe(bar)
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

    const elements =
      document.querySelectorAll(
        "[data-tilt]"
      );

    if (!elements.length) {
      return;
    }

    VanillaTilt.init(
      elements,
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
     SKILL PILL HOVER GLOW
  ========================================================= */

  document
    .querySelectorAll(
      ".spill"
    )
    .forEach(
      (pill) => {

        pill.addEventListener(
          "mouseenter",
          () => {
            pill.style.boxShadow =
              "0 0 12px currentColor";
          }
        );

        pill.addEventListener(
          "mouseleave",
          () => {
            pill.style.boxShadow =
              "";
          }
        );
      }
    );


  /* =========================================================
     ASK ASSISTANT
  ========================================================= */

  function initChatbot() {

    const trigger =
      document.getElementById(
        "aiChatTrigger"
      );

    const win =
      document.getElementById(
        "aiChatWindow"
      );

    const close =
      document.getElementById(
        "aiChatClose"
      );

    const form =
      document.getElementById(
        "aiChatForm"
      );

    const input =
      document.getElementById(
        "aiChatInput"
      );

    const messages =
      document.getElementById(
        "aiChatMessages"
      );

    if (
      !trigger ||
      !win ||
      !close ||
      !form ||
      !input ||
      !messages
    ) {
      console.warn(
        "Ask Assistant elements not found."
      );

      return;
    }


    /* ---------------------------------------------------------
       RESPONSE ENGINE
    --------------------------------------------------------- */

    function response(question) {

      const t =
        question
          .toLowerCase()
          .trim()
          .replace(
            /[?!.,]/g,
            ""
          );


      /* Greetings */

      if (
        /^(hi|hello|hey)$/.test(t)
      ) {
        return (
          "Hey! I'm Om's portfolio assistant. " +
          "Ask me about his education, skills, projects, " +
          "Machine Learning, Data Science, or current focus."
        );
      }


      /* Current study */

      if (
        t.includes("study") ||
        t.includes("studying") ||
        t.includes("msc") ||
        t.includes("master")
      ) {
        return (
          "Om is currently a First Year MSc " +
          "Artificial Intelligence & Data Science student."
        );
      }


      /* Education */

      if (
        t.includes("education") ||
        t.includes("degree") ||
        t.includes("university") ||
        t.includes("college") ||
        t.includes("bca")
      ) {
        return (
          "Om completed his BCA from MIT World Peace " +
          "University, Pune and is currently pursuing " +
          "an MSc in Artificial Intelligence & Data Science."
        );
      }


      /* Skills */

      if (
        t.includes("skill") ||
        t.includes("technology") ||
        t.includes("tech stack")
      ) {
        return (
          "Om's current technical focus includes Python, SQL, " +
          "NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, " +
          "data preprocessing, EDA, feature engineering, " +
          "classification, and model evaluation."
        );
      }


      /* Machine Learning */

      if (
        t.includes("machine learning") ||
        t === "ml" ||
        t.includes("classification") ||
        t.includes("model")
      ) {
        return (
          "Machine Learning is one of Om's main areas of interest. " +
          "He has worked with classification, imbalanced datasets, " +
          "preprocessing, feature scaling, precision, recall, " +
          "F1-score and ROC-AUC."
        );
      }


      /* Data Science */

      if (
        t.includes("data science") ||
        t.includes("data analysis") ||
        t.includes("pandas") ||
        t.includes("numpy")
      ) {
        return (
          "Om is interested in the complete Data Science workflow — " +
          "data cleaning, EDA, feature engineering, modelling and evaluation."
        );
      }


      /* Fraud */

      if (
        t.includes("fraud") ||
        t.includes("credit card")
      ) {
        return (
          "Om's Credit Card Fraud Detection project explores an " +
          "imbalanced transaction dataset, Logistic Regression, " +
          "Random Forest, precision, recall, F1-score and ROC-AUC."
        );
      }


      /* Student Performance */

      if (
        t.includes("student performance") ||
        t.includes("student prediction")
      ) {
        return (
          "Om built a Student Performance Prediction classification " +
          "project involving data cleaning, feature selection, " +
          "EDA and machine learning."
        );
      }


      /* Projects */

      if (
        t.includes("project") ||
        t.includes("work") ||
        t.includes("built")
      ) {
        return (
          "Om's portfolio features Credit Card Fraud Detection " +
          "and Student Performance Prediction, with more projects " +
          "and experiments being developed."
        );
      }


      /* GitHub */

      if (
        t.includes("github") ||
        t.includes("code") ||
        t.includes("repository")
      ) {
        return (
          "Om's GitHub contains his machine learning projects " +
          "and code. Use the GitHub links in the portfolio to explore them."
        );
      }


      /* Contact */

      if (
        t.includes("contact") ||
        t.includes("email") ||
        t.includes("linkedin")
      ) {
        return (
          "You can connect with Om through the GitHub and LinkedIn " +
          "links in the Contact section."
        );
      }


      /* Default */

      return (
        "I don't have an answer for that yet. " +
        "Try asking about Om's education, skills, projects, " +
        "Machine Learning, Data Science, or current study."
      );
    }


    /* ---------------------------------------------------------
       ADD MESSAGE
    --------------------------------------------------------- */

    function addMessage(
      text,
      user = false
    ) {

      const el =
        document.createElement(
          "div"
        );

      el.className =
        user
          ? "ai-message ai-message-user"
          : "ai-message";


      if (user) {

        el.innerHTML = `
          <div class="ai-message-content">
            <p></p>
          </div>
        `;

      } else {

        el.innerHTML = `
          <span class="ai-message-avatar">✦</span>
          <div class="ai-message-content">
            <p></p>
          </div>
        `;

      }


      const paragraph =
        el.querySelector("p");

      if (paragraph) {
        paragraph.textContent =
          text;
      }


      messages.appendChild(
        el
      );

      messages.scrollTop =
        messages.scrollHeight;
    }


    /* ---------------------------------------------------------
       SEND
    --------------------------------------------------------- */

    function send(question) {

      const q =
        String(
          question || ""
        ).trim();

      if (!q) {
        return;
      }


      addMessage(
        q,
        true
      );

      input.value =
        "";


      /* Typing */

      const typing =
        document.createElement(
          "div"
        );

      typing.className =
        "ai-message ai-typing";

      typing.innerHTML = `
        <span class="ai-message-avatar">✦</span>
        <div class="ai-message-content">
          <div class="ai-typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      `;

      messages.appendChild(
        typing
      );

      messages.scrollTop =
        messages.scrollHeight;


      setTimeout(
        () => {

          typing.remove();

          addMessage(
            response(q)
          );

        },
        500
      );
    }


    /* ---------------------------------------------------------
       OPEN / CLOSE
    --------------------------------------------------------- */

    function openChat() {

      win.classList.add(
        "open"
      );

      win.setAttribute(
        "aria-hidden",
        "false"
      );

      trigger.classList.add(
        "active"
      );

      trigger.setAttribute(
        "aria-expanded",
        "true"
      );


      setTimeout(
        () => {
          input.focus();
        },
        200
      );
    }


    function shutChat() {

      win.classList.remove(
        "open"
      );

      win.setAttribute(
        "aria-hidden",
        "true"
      );

      trigger.classList.remove(
        "active"
      );

      trigger.setAttribute(
        "aria-expanded",
        "false"
      );
    }


    /* ---------------------------------------------------------
       TRIGGER
    --------------------------------------------------------- */

    trigger.addEventListener(
      "click",
      () => {

        if (
          win.classList.contains(
            "open"
          )
        ) {
          shutChat();
        } else {
          openChat();
        }

      }
    );


    /* ---------------------------------------------------------
       CLOSE BUTTON
    --------------------------------------------------------- */

    close.addEventListener(
      "click",
      () => {
        shutChat();
      }
    );


    /* ---------------------------------------------------------
       FORM
    --------------------------------------------------------- */

    form.addEventListener(
      "submit",
      (e) => {

        e.preventDefault();

        send(
          input.value
        );

      }
    );


    /* ---------------------------------------------------------
       QUICK QUESTIONS
    --------------------------------------------------------- */

    document
      .querySelectorAll(
        ".ai-suggestion"
      )
      .forEach(
        (button) => {

          button.type =
            "button";

          button.setAttribute(
            "tabindex",
            "0"
          );


          button.addEventListener(
            "click",
            (e) => {

              e.preventDefault();

              e.stopPropagation();

              const question =
                button.dataset.question ||
                button.textContent.trim();

              openChat();

              send(
                question
              );
            }
          );


          /* Keyboard */

          button.addEventListener(
            "keydown",
            (e) => {

              if (
                e.key ===
                  "Enter" ||
                e.key ===
                  " "
              ) {

                e.preventDefault();

                e.stopPropagation();

                const question =
                  button.dataset.question ||
                  button.textContent.trim();

                openChat();

                send(
                  question
                );
              }
            }
          );

        }
      );


    /* ---------------------------------------------------------
       ESCAPE
    --------------------------------------------------------- */

    document.addEventListener(
      "keydown",
      (e) => {

        if (
          e.key ===
            "Escape" &&
          win.classList.contains(
            "open"
          )
        ) {
          shutChat();
        }


        /* "/" opens assistant */

        const active =
          document.activeElement;

        const isTyping =
          active &&
          (
            active.tagName ===
              "INPUT" ||
            active.tagName ===
              "TEXTAREA" ||
            active.isContentEditable
          );


        if (
          e.key === "/" &&
          !isTyping
        ) {

          e.preventDefault();

          openChat();
        }

      }
    );


    /* Initial state */

    win.setAttribute(
      "aria-hidden",
      "true"
    );

    trigger.setAttribute(
      "aria-expanded",
      "false"
    );


    console.log(
      "Ask Assistant initialized successfully."
    );
  }


  /* =========================================================
     INITIALIZE CHATBOT
  ========================================================= */

  try {
    initChatbot();
  } catch (error) {
    console.error(
      "Ask Assistant initialization failed:",
      error
    );
  }

})();
