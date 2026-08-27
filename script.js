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
    document.addEventListener("mousemove", e => {
      mx = e.clientX;
      my = e.clientY;

      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
    });

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


  const toggle =
    document.getElementById("navToggle");

  const mobileMenu =
    document.getElementById("mobileMenu");


  function closeMenu() {

    if (toggle) {
      toggle.classList.remove("open");
      toggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }

    if (mobileMenu) {
      mobileMenu.classList.remove("open");
    }

    document.body.style.overflow = "";
  }


  if (toggle && mobileMenu) {

    toggle.addEventListener(
      "click",
      () => {

        const open =
          mobileMenu.classList.toggle("open");

        toggle.classList.toggle(
          "open",
          open
        );

        toggle.setAttribute(
          "aria-expanded",
          String(open)
        );

        document.body.style.overflow =
          open ? "hidden" : "";

      }
    );

  }


  document
    .querySelectorAll(".mobile-link")
    .forEach(link => {

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
    .forEach(anchor => {

      anchor.addEventListener(
        "click",
        function (e) {

          const targetSelector =
            this.getAttribute("href");

          if (
            !targetSelector ||
            targetSelector === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(
              targetSelector
            );

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
    "MSc AI & Data Science Student",
    "Machine Learning Enthusiast",
    "Data Science Explorer",
    "BCA Graduate • MIT-WPU Pune"
  ];


  let li = 0;
  let ci = 0;
  let deleting = false;


  const SPEED_TYPE = 70;
  const SPEED_DEL = 35;
  const PAUSE = 1800;


  function typeTick() {

    if (!tw) {
      return;
    }

    const currentLine =
      lines[li];


    if (!deleting) {

      ci++;

      tw.textContent =
        currentLine.slice(
          0,
          ci
        );


      if (
        ci === currentLine.length
      ) {

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
        currentLine.slice(
          0,
          ci
        );


      if (ci === 0) {

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
     THREE.JS UNIVERSE / STARFIELD
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
          (Math.random() - 0.5) *
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


    /* ---------------------------------------------------------
       STAR LAYERS
    --------------------------------------------------------- */

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
       NEBULA CLOUDS
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
        Math.random() * 4 + 2;


      const x =
        (Math.random() - 0.5) *
        300;


      const y =
        (Math.random() - 0.5) *
          150 +
        60;


      const z =
        -Math.random() * 50 -
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
          -(Math.random() * 0.8 + 0.4),

        vy:
          -(Math.random() * 0.3 + 0.1),

        life: 1.0

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
      e => {

        tmx =
          (
            e.clientX /
              window.innerWidth -
            0.5
          ) * 2;


        tmy =
          (
            e.clientY /
              window.innerHeight -
            0.5
          ) * 2;

      },
      {
        passive: true
      }
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
        ) * 0.08;


      nebulaGroup.rotation.z =
        t * 0.005;


      camX +=
        (
          tmx * 8 -
          camX
        ) * 0.025;


      camY +=
        (
          -tmy * 5 -
          camY
        ) * 0.025;


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
          .needsUpdate = true;


        if (
          s.userData.life <= 0
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


    /* ---------------------------------------------------------
       RESIZE
    --------------------------------------------------------- */

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
      {
        passive: true
      }
    );

  }


  initUniverse();


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

          entries => {

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
          el =>
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


    /* Section reveals */

    document
      .querySelectorAll(
        ".section"
      )
      .forEach(
        section => {

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
        el => {

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


  initGSAP();


  /* =========================================================
     COUNT-UP NUMBERS
  ========================================================= */

  const countEls =
    document.querySelectorAll(
      ".count-up"
    );


  const countObs =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          entry => {

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


            const dur =
              1200;


            const start =
              performance.now();


            function step(now) {

              const pct =
                Math.min(
                  (
                    now - start
                  ) / dur,
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
                  eased *
                  target
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
    el =>
      countObs.observe(el)
  );


  /* =========================================================
     CEFR / SKILL BARS
  ========================================================= */

  const bars =
    document.querySelectorAll(
      ".cefr-fill"
    );


  const barObs =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          e => {

            if (
              !e.isIntersecting
            ) {
              return;
            }


            const width =
              e.target.style.width;


            e.target.style.width =
              "0%";


            setTimeout(
              () => {

                e.target.style.width =
                  width;

              },
              250
            );


            barObs.unobserve(
              e.target
            );

          }
        );

      },

      {
        threshold: 0.5
      }

    );


  bars.forEach(
    bar =>
      barObs.observe(bar)
  );


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

        "max-glare":
          0.15,

        perspective: 800

      }
    );

  }


  initTilt();


  /* =========================================================
     SKILL PILL HOVER GLOW
  ========================================================= */

  document
    .querySelectorAll(
      ".spill"
    )
    .forEach(
      pill => {

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
     FLOATING PORTFOLIO AI ASSISTANT
  ========================================================= */

  function initChatbot() {

    /*
      IMPORTANT:
      These IDs match the current index.html.
    */

    const chatTrigger =
      document.getElementById(
        "aiChatTrigger"
      );


    const chatWindow =
      document.getElementById(
        "aiChatWindow"
      );


    const chatClose =
      document.getElementById(
        "aiChatClose"
      );


    const chatForm =
      document.getElementById(
        "aiChatForm"
      );


    const chatInput =
      document.getElementById(
        "aiChatInput"
      );


    const chatMessages =
      document.getElementById(
        "aiChatMessages"
      );


    const suggestions =
      document.querySelectorAll(
        ".ai-suggestions button"
      );


    /* ---------------------------------------------------------
       SAFETY CHECK
    --------------------------------------------------------- */

    if (
      !chatTrigger ||
      !chatWindow ||
      !chatForm ||
      !chatInput ||
      !chatMessages
    ) {

      console.warn(
        "Om AI: chatbot elements were not found."
      );

      return;
    }


    /* ---------------------------------------------------------
       OPEN CHAT
    --------------------------------------------------------- */

    function openChat() {

      chatWindow.classList.add(
        "open"
      );


      chatWindow.setAttribute(
        "aria-hidden",
        "false"
      );


      chatTrigger.classList.add(
        "active"
      );


      chatTrigger.setAttribute(
        "aria-expanded",
        "true"
      );


      setTimeout(
        () => {
          chatInput.focus();
        },
        250
      );

    }


    /* ---------------------------------------------------------
       CLOSE CHAT
    --------------------------------------------------------- */

    function closeChat() {

      chatWindow.classList.remove(
        "open"
      );


      chatWindow.setAttribute(
        "aria-hidden",
        "true"
      );


      chatTrigger.classList.remove(
        "active"
      );


      chatTrigger.setAttribute(
        "aria-expanded",
        "false"
      );

    }


    /* ---------------------------------------------------------
       TOGGLE CHAT
    --------------------------------------------------------- */

    chatTrigger.addEventListener(
      "click",
      () => {

        if (
          chatWindow.classList.contains(
            "open"
          )
        ) {

          closeChat();

        } else {

          openChat();

        }

      }
    );


    /* ---------------------------------------------------------
       CLOSE BUTTON
    --------------------------------------------------------- */

    if (chatClose) {

      chatClose.addEventListener(
        "click",
        closeChat
      );

    }


    /* ---------------------------------------------------------
       OM'S PORTFOLIO KNOWLEDGE
    --------------------------------------------------------- */

    const portfolio = {

      name:
        "Om Shete",


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


    /* ---------------------------------------------------------
       NORMALIZE TEXT
    --------------------------------------------------------- */

    function normalize(text) {

      return text
        .toLowerCase()
        .trim()
        .replace(
          /[?!.,]/g,
          ""
        );

    }


    /* ---------------------------------------------------------
       RESPONSE ENGINE
    --------------------------------------------------------- */

    function getResponse(
      question
    ) {

      const text =
        normalize(
          question
        );


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
        text.includes(
          "what is om studying"
        ) ||
        text.includes(
          "what is he studying"
        ) ||
        text.includes(
          "what are you studying"
        ) ||
        text.includes(
          "currently studying"
        ) ||
        text.includes(
          "current study"
        ) ||
        text.includes(
          "msc"
        ) ||
        text.includes(
          "master"
        )
      ) {

        return portfolio.currentStudy;

      }


      /* Education */

      if (
        text.includes(
          "education"
        ) ||
        text.includes(
          "degree"
        ) ||
        text.includes(
          "college"
        ) ||
        text.includes(
          "university"
        )
      ) {

        return portfolio.education;

      }


      /* BCA */

      if (
        text.includes(
          "bca"
        ) ||
        text.includes(
          "mit wpu"
        ) ||
        text.includes(
          "mit-wpu"
        )
      ) {

        return portfolio.bca;

      }


      /* Skills */

      if (
        text.includes(
          "skills"
        ) ||
        text.includes(
          "skill"
        ) ||
        text.includes(
          "technologies"
        ) ||
        text.includes(
          "technology"
        ) ||
        text.includes(
          "tech stack"
        )
      ) {

        return portfolio.skills;

      }


      /* Machine Learning */

      if (
        text.includes(
          "machine learning"
        ) ||
        text === "ml" ||
        text.includes(
          "classification"
        ) ||
        text.includes(
          "model"
        )
      ) {

        return portfolio.ml;

      }


      /* Data Science */

      if (
        text.includes(
          "data science"
        ) ||
        text.includes(
          "data analysis"
        ) ||
        text.includes(
          "pandas"
        ) ||
        text.includes(
          "numpy"
        )
      ) {

        return portfolio.dataScience;

      }


      /* Fraud project */

      if (
        text.includes(
          "fraud"
        ) ||
        text.includes(
          "credit card"
        )
      ) {

        return portfolio.fraud;

      }


      /* Student project */

      if (
        text.includes(
          "student performance"
        ) ||
        text.includes(
          "student prediction"
        )
      ) {

        return portfolio.studentProject;

      }


      /* Projects */

      if (
        text.includes(
          "project"
        ) ||
        text.includes(
          "projects"
        ) ||
        text.includes(
          "work"
        ) ||
        text.includes(
          "built"
        )
      ) {

        return portfolio.projects;

      }


      /* GitHub */

      if (
        text.includes(
          "github"
        ) ||
        text.includes(
          "code"
        ) ||
        text.includes(
          "repository"
        )
      ) {

        return portfolio.github;

      }


      /* Contact */

      if (
        text.includes(
          "contact"
        ) ||
        text.includes(
          "email"
        ) ||
        text.includes(
          "linkedin"
        ) ||
        text.includes(
          "reach"
        )
      ) {

        return portfolio.contact;

      }


      /* Interests */

      if (
        text.includes(
          "interest"
        ) ||
        text.includes(
          "passion"
        )
      ) {

        return portfolio.interests;

      }


      /* Future / current focus */

      if (
        text.includes(
          "future"
        ) ||
        text.includes(
          "goal"
        ) ||
        text.includes(
          "focus"
        ) ||
        text.includes(
          "currently"
        ) ||
        text.includes(
          "now"
        )
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


    /* ---------------------------------------------------------
       ADD MESSAGE
    --------------------------------------------------------- */

    function addMessage(
      text,
      type
    ) {

      const wrapper =
        document.createElement(
          "div"
        );


      if (
        type === "user"
      ) {

        wrapper.className =
          "ai-message ai-message-user";


        wrapper.innerHTML = `
          <div class="ai-message-content">
            <p></p>
          </div>
        `;

      } else {

        wrapper.className =
          "ai-message";


        wrapper.innerHTML = `
          <span class="ai-message-avatar">
            ✦
          </span>

          <div class="ai-message-content">
            <p></p>
          </div>
        `;

      }


      const paragraph =
        wrapper.querySelector(
          "p"
        );


      paragraph.textContent =
        text;


      chatMessages.appendChild(
        wrapper
      );


      chatMessages.scrollTop =
        chatMessages.scrollHeight;


      return wrapper;

    }


    /* ---------------------------------------------------------
       TYPING INDICATOR
    --------------------------------------------------------- */

    function showTyping() {

      const wrapper =
        document.createElement(
          "div"
        );


      wrapper.className =
        "ai-message ai-typing";


      wrapper.innerHTML = `
        <span class="ai-message-avatar">
          ✦
        </span>

        <div class="ai-message-content">
          <div class="ai-typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      `;


      chatMessages.appendChild(
        wrapper
      );


      chatMessages.scrollTop =
        chatMessages.scrollHeight;


      return wrapper;

    }


    /* ---------------------------------------------------------
       SEND MESSAGE
    --------------------------------------------------------- */

    function sendMessage(
      question
    ) {

      const text =
        question.trim();


      if (!text) {
        return;
      }


      addMessage(
        text,
        "user"
      );


      chatInput.value =
        "";


      const typing =
        showTyping();


      setTimeout(
        () => {

          typing.remove();


          const response =
            getResponse(
              text
            );


          addMessage(
            response,
            "bot"
          );

        },

        500 +
          Math.random() *
            600

      );

    }


    /* ---------------------------------------------------------
       FORM SUBMIT
    --------------------------------------------------------- */

    chatForm.addEventListener(
      "submit",
      e => {

        e.preventDefault();


        sendMessage(
          chatInput.value
        );

      }
    );


    /* ---------------------------------------------------------
       SUGGESTION BUTTONS
    --------------------------------------------------------- */

    suggestions.forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const question =
              button.textContent.trim();


            sendMessage(
              question
            );

          }
        );

      }
    );


    /* ---------------------------------------------------------
       ESCAPE TO CLOSE
    --------------------------------------------------------- */

    document.addEventListener(
      "keydown",
      e => {

        if (
          e.key === "Escape" &&
          chatWindow.classList.contains(
            "open"
          )
        ) {

          closeChat();

        }

      }
    );


    /* ---------------------------------------------------------
       INITIAL GREETING
    --------------------------------------------------------- */

    if (
      chatMessages.children
        .length === 0
    ) {

      setTimeout(
        () => {

          addMessage(

            "Hi! I'm Om's portfolio assistant. Ask me about his skills, projects, education, or current focus.",

            "bot"

          );

        },

        700

      );

    }

  }


  initChatbot();


  /* =========================================================
     CHATBOT KEYBOARD SHORTCUT
     
     Press "/" to open the assistant
  ========================================================= */

  document.addEventListener(
    "keydown",
    e => {

      const active =
        document.activeElement;


      const typing =
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
        !typing
      ) {

        e.preventDefault();


        const button =
          document.getElementById(
            "aiChatTrigger"
          );


        if (button) {

          button.click();

        }

      }

    }
  );


  /* =========================================================
     REDUCE MOTION SUPPORT
  ========================================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  if (
    reducedMotion.matches
  ) {

    document.documentElement.classList.add(
      "reduce-motion"
    );

  }


})();
