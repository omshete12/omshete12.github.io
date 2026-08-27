(function () {
  "use strict";

  /* ── CUSTOM CURSOR ── */
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursor-follower");
  let fx = 0, fy = 0, mx = 0, my = 0;

  document.addEventListener("mousemove", e => {
    mx = e.clientX;
    my = e.clientY;

    if (cursor) {
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
    }
  });

  (function animFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;

    if (follower) {
      follower.style.left = fx + "px";
      follower.style.top = fy + "px";
    }

    requestAnimationFrame(animFollower);
  })();


  /* ── NAV ── */
  const nav = document.getElementById("nav");

  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    }, { passive: true });
  }

  const toggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  function closeMenu() {
    if (toggle) toggle.classList.remove("open");
    if (mobileMenu) mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      toggle.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
  }

  document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        e.preventDefault();
        closeMenu();

        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });


  /* ── TYPEWRITER ── */
  const tw = document.getElementById("typewriter");

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

    const cur = lines[li];

    if (!deleting) {
      ci++;
      tw.textContent = cur.slice(0, ci);

      if (ci === cur.length) {
        deleting = true;
        setTimeout(typeTick, PAUSE);
        return;
      }
    } else {
      ci--;
      tw.textContent = cur.slice(0, ci);

      if (ci === 0) {
        deleting = false;
        li = (li + 1) % lines.length;

        setTimeout(typeTick, 300);
        return;
      }
    }

    setTimeout(
      typeTick,
      deleting ? SPEED_DEL : SPEED_TYPE
    );
  }

  setTimeout(typeTick, 600);


  /* ── THREE.JS UNIVERSE STARFIELD ── */
  function initUniverse() {
    if (typeof THREE === "undefined") return;

    const canvas = document.getElementById("universe-canvas");

    if (!canvas) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );

    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.setClearColor(0x000000, 0);


    /* ── STAR LAYERS ── */

    function makeStars(count, spread, size, color, opacity) {
      const pos = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i++) {
        pos[i] = (Math.random() - 0.5) * spread;
      }

      const geo = new THREE.BufferGeometry();

      geo.setAttribute(
        "position",
        new THREE.BufferAttribute(pos, 3)
      );

      const mat = new THREE.PointsMaterial({
        color,
        size,
        transparent: true,
        opacity,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      return new THREE.Points(geo, mat);
    }

    const stars1 = makeStars(
      4000,
      1800,
      0.5,
      0xffffff,
      0.7
    );

    const stars2 = makeStars(
      1200,
      900,
      0.9,
      0x8ab4ff,
      0.6
    );

    const stars3 = makeStars(
      400,
      400,
      1.4,
      0xffffff,
      0.9
    );

    const stars4 = makeStars(
      600,
      700,
      0.7,
      0xc084fc,
      0.5
    );

    const stars5 = makeStars(
      300,
      500,
      1.1,
      0x67e8f9,
      0.6
    );

    const starGroup = new THREE.Group();

    starGroup.add(
      stars1,
      stars2,
      stars3,
      stars4,
      stars5
    );

    scene.add(starGroup);


    /* ── NEBULA CLOUDS ── */

    function makeNebula(
      x,
      y,
      z,
      scale,
      color,
      opacity
    ) {
      const geo = new THREE.PlaneGeometry(1, 1);

      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(
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
        Math.random() * Math.PI;

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

    scene.add(nebulaGroup);


    /* ── SHOOTING STARS ── */

    const shooters = [];

    function spawnShooter() {
      const geo =
        new THREE.BufferGeometry();

      const len =
        Math.random() * 4 + 2;

      const x =
        (Math.random() - 0.5) * 300;

      const y =
        (Math.random() - 0.5) * 150 + 60;

      const z =
        -Math.random() * 50 - 5;

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
        vx: -(Math.random() * 0.8 + 0.4),
        vy: -(Math.random() * 0.3 + 0.1),
        life: 1.0
      };

      scene.add(line);
      shooters.push(line);
    }

    setInterval(
      spawnShooter,
      2500
    );


    /* ── MOUSE PARALLAX ── */

    let tmx = 0;
    let tmy = 0;
    let camX = 0;
    let camY = 0;

    document.addEventListener(
      "mousemove",
      e => {
        tmx =
          (e.clientX / window.innerWidth - 0.5) * 2;

        tmy =
          (e.clientY / window.innerHeight - 0.5) * 2;
      },
      {
        passive: true
      }
    );


    /* ── ANIMATE ── */

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
        Math.sin(t * 0.007) * 0.08;

      nebulaGroup.rotation.z =
        t * 0.005;

      camX +=
        (tmx * 8 - camX) * 0.025;

      camY +=
        (-tmy * 5 - camY) * 0.025;

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
        let i = shooters.length - 1;
        i >= 0;
        i--
      ) {
        const s =
          shooters[i];

        s.userData.life -=
          0.018;

        s.material.opacity =
          s.userData.life * 0.9;

        const pos =
          s.geometry.attributes
            .position.array;

        pos[0] +=
          s.userData.vx;

        pos[1] +=
          s.userData.vy;

        pos[3] +=
          s.userData.vx;

        pos[4] +=
          s.userData.vy;

        s.geometry.attributes
          .position
          .needsUpdate = true;

        if (
          s.userData.life <= 0
        ) {
          scene.remove(s);

          s.geometry.dispose();
          s.material.dispose();

          shooters.splice(i, 1);
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
      {
        passive: true
      }
    );
  }

  initUniverse();


  /* ── GSAP SCROLL ANIMATIONS ── */

  function initGSAP() {
    if (
      typeof gsap === "undefined" ||
      typeof ScrollTrigger === "undefined"
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
                      entry.target.classList.add("in");
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
        .querySelectorAll(".reveal")
        .forEach(el =>
          obs.observe(el)
        );

      return;
    }

    gsap.registerPlugin(
      ScrollTrigger
    );


    /* Hero entrance */

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


    /* Section reveals */

    document
      .querySelectorAll(".section")
      .forEach(section => {
        const reveals =
          section.querySelectorAll(
            ".reveal"
          );

        if (!reveals.length)
          return;

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
      });


    /* Section titles */

    document
      .querySelectorAll(".sec-title")
      .forEach(el => {
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
            ease: "power3.out",

            scrollTrigger: {
              trigger: el,
              start: "top 85%"
            }
          }
        );
      });


    /* Stat cards */

    gsap
      .utils
      .toArray(".stat-card")
      .forEach((card, i) => {
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
            delay: i * 0.1,
            ease: "back.out(1.4)",

            scrollTrigger: {
              trigger: card,
              start: "top 85%"
            }
          }
        );
      });


    /* Project cards */

    gsap
      .utils
      .toArray(".proj-card")
      .forEach((card, i) => {
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
            ease: "power3.out",

            scrollTrigger: {
              trigger: card,
              start: "top 85%"
            }
          }
        );
      });


    /* Skill pills */

    gsap
      .utils
      .toArray(".spill")
      .forEach((pill, i) => {
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
            delay: i * 0.03,
            ease: "back.out(1.7)",

            scrollTrigger: {
              trigger: pill,
              start: "top 90%"
            }
          }
        );
      });
  }

  initGSAP();


  /* ── COUNT-UP NUMBERS ── */

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
            )
              return;

            const el =
              entry.target;

            const target =
              parseInt(
                el.dataset.target,
                10
              );

            const dur = 1200;

            const start =
              performance.now();

            function step(now) {
              const pct =
                Math.min(
                  (now - start) /
                    dur,
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

              if (pct < 1) {
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

  countEls.forEach(el =>
    countObs.observe(el)
  );


  /* ── CEFR BARS ── */

  const bars =
    document.querySelectorAll(
      ".cefr-fill"
    );

  const barObs =
    new IntersectionObserver(
      entries => {
        entries.forEach(
          entry => {
            if (
              entry.isIntersecting
            ) {
              const w =
                entry.target.style.width;

              entry.target.style.width =
                "0%";

              setTimeout(
                () => {
                  entry.target.style.width =
                    w;
                },
                250
              );

              barObs.unobserve(
                entry.target
              );
            }
          }
        );
      },
      {
        threshold: 0.5
      }
    );

  bars.forEach(b =>
    barObs.observe(b)
  );


  /* ── VANILLA TILT ── */

  function initTilt() {
    if (
      typeof VanillaTilt ===
      "undefined"
    )
      return;

    VanillaTilt.init(
      document.querySelectorAll(
        "[data-tilt]"
      ),
      {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
        perspective: 800
      }
    );
  }

  initTilt();


  /* ── SKILL PILL HOVER GLOW ── */

  document
    .querySelectorAll(".spill")
    .forEach(pill => {
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
    });


  /* =========================================================
     ASK ASSISTANT CHATBOT
     ========================================================= */

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

  const chatQuickButtons =
    document.querySelectorAll(
      ".ai-quick-btn"
    );


  /* If chatbot HTML isn't present,
     don't throw errors. */

  if (
    chatTrigger &&
    chatWindow
  ) {

    function openChat() {
      chatWindow.classList.add(
        "open"
      );

      chatTrigger.classList.add(
        "active"
      );

      setTimeout(() => {
        if (chatInput) {
          chatInput.focus();
        }
      }, 250);
    }


    function closeChat() {
      chatWindow.classList.remove(
        "open"
      );

      chatTrigger.classList.remove(
        "active"
      );
    }


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


    if (chatClose) {
      chatClose.addEventListener(
        "click",
        closeChat
      );
    }


    /* ── Assistant knowledge ── */

    const responses = {

      about: `
        <strong>About Om</strong><br><br>
        Om Shete is an MSc AI & Data Science student
        with a background in computer applications.
        His main interests are Machine Learning,
        Data Science and practical AI systems.
      `,

      skills: `
        <strong>Technical Skills</strong><br><br>
        Python, Machine Learning, Data Science,
        SQL, Statistics, Data Analysis and AI.
        He is currently strengthening his foundations
        and working toward deeper ML expertise.
      `,

      projects: `
        <strong>Projects</strong><br><br>
        The portfolio includes projects focused on
        Machine Learning, Data Science and practical
        problem-solving. Scroll to the Projects section
        to explore the available work.
      `,

      education: `
        <strong>Education</strong><br><br>
        Om is pursuing an MSc in Artificial Intelligence
        & Data Science and has a BCA background.
      `,

      contact: `
        <strong>Contact</strong><br><br>
        You can use the Contact section of this portfolio
        to connect with Om.
      `,

      languages: `
        <strong>Languages</strong><br><br>
        English — C1+<br>
        German — B1
      `

    };


    function getResponse(message) {

      const text =
        message
          .toLowerCase()
          .trim();


      if (
        text.includes("about") ||
        text.includes("who is") ||
        text.includes("om")
      ) {
        return responses.about;
      }


      if (
        text.includes("skill") ||
        text.includes("technology") ||
        text.includes("technologies")
      ) {
        return responses.skills;
      }


      if (
        text.includes("project") ||
        text.includes("work")
      ) {
        return responses.projects;
      }


      if (
        text.includes("education") ||
        text.includes("study") ||
        text.includes("degree") ||
        text.includes("college")
      ) {
        return responses.education;
      }


      if (
        text.includes("language") ||
        text.includes("german") ||
        text.includes("english")
      ) {
        return responses.languages;
      }


      if (
        text.includes("contact") ||
        text.includes("email") ||
        text.includes("reach")
      ) {
        return responses.contact;
      }


      return `
        I can help you explore Om's portfolio.
        Try asking about his <strong>skills</strong>,
        <strong>projects</strong>,
        <strong>education</strong>,
        <strong>languages</strong>, or
        <strong>contact</strong>.
      `;
    }


    function addMessage(
      content,
      type
    ) {

      if (!chatMessages)
        return;

      const message =
        document.createElement(
          "div"
        );

      message.className =
        "ai-message " +
        type;

      message.innerHTML =
        content;

      chatMessages.appendChild(
        message
      );

      chatMessages.scrollTop =
        chatMessages.scrollHeight;
    }


    function showTyping() {

      if (!chatMessages)
        return null;

      const typing =
        document.createElement(
          "div"
        );

      typing.className =
        "ai-message assistant ai-typing";

      typing.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
      `;

      chatMessages.appendChild(
        typing
      );

      chatMessages.scrollTop =
        chatMessages.scrollHeight;

      return typing;
    }


    function sendMessage(message) {

      if (!message.trim())
        return;

      addMessage(
        escapeHTML(message),
        "user"
      );

      if (chatInput) {
        chatInput.value = "";
      }

      const typing =
        showTyping();


      setTimeout(() => {

        if (typing) {
          typing.remove();
        }

        addMessage(
          getResponse(message),
          "assistant"
        );

      }, 700);
    }


    function escapeHTML(text) {

      const div =
        document.createElement(
          "div"
        );

      div.textContent =
        text;

      return div.innerHTML;
    }


    /* ── Form submission ── */

    if (chatForm) {

      chatForm.addEventListener(
        "submit",
        e => {

          e.preventDefault();

          if (!chatInput)
            return;

          sendMessage(
            chatInput.value
          );
        }
      );

    }


    /* ── Quick questions ── */

    chatQuickButtons.forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const question =
              button.dataset.question ||
              button.textContent;

            sendMessage(
              question
            );

          }
        );

      }
    );


    /* ── ESC closes chatbot ── */

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


    /* ── "/" opens chatbot ── */

    document.addEventListener(
      "keydown",
      e => {

        if (
          e.key === "/" &&
          document.activeElement !==
            chatInput &&
          document.activeElement.tagName !==
            "INPUT" &&
          document.activeElement.tagName !==
            "TEXTAREA"
        ) {

          e.preventDefault();

          openChat();
        }

      }
    );

  }


})();
