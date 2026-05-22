// ============================================
// LE CROUSTY · Bonneuil — interactions
// 3D background, signature stage, menu, reveals
// ============================================

import * as THREE from "three";

/* ---------- Loader ---------- */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader")?.classList.add("hide");
    document.body.classList.add("ready");
  }, 1100);
});

/* ---------- Year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Nav scroll state ---------- */
const nav = document.getElementById("nav");
const onScroll = () => {
  if (window.scrollY > 30) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Smooth anchor scroll ---------- */
document.querySelectorAll("[data-link]").forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ---------- Custom cursor (desktop pointer only) ---------- */
const isFinePointer = window.matchMedia("(hover: hover)").matches;
if (isFinePointer) {
  const cursor = document.getElementById("cursor");
  const dot = document.getElementById("cursor-dot");
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;
  window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
  const loop = () => {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    requestAnimationFrame(loop);
  };
  loop();
  document.querySelectorAll("a, button, .dish, .tab").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });
}

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- Menu data ---------- */
const MENU = {
  burgers: [
    { name: "Méga Burger 180", price: "13,90 €", desc: "Notre signature. Double smash 180g, double cheddar, bacon de bœuf, sauce maison, oignons caramélisés, pain brioché toasté.", tag: "Signature" },
    { name: "Smash Crousty", price: "9,90 €", desc: "Steak smashé 120g, cheddar fondu, oignons grillés, cornichons, sauce Crousty, pain brioché." },
    { name: "Big New York", price: "11,90 €", desc: "Double steak, double cheddar, salade, tomate, oignon rouge, sauce burger maison." },
    { name: "Chicken Crousty", price: "10,50 €", desc: "Tenders de poulet panés maison, cheddar, salade, sauce algérienne." },
    { name: "Gourmet Truffe", price: "13,50 €", desc: "Steak 150g, brie fondu, oignons caramélisés, sauce truffe maison.", tag: "Édition" },
  ],
  tacos: [
    { name: "Tacos L · 1 viande", price: "8,50 €", desc: "Une viande au choix, frites maison, sauce fromagère gratinée, sauce au choix. Servi pressé." },
    { name: "Tacos XL · 2 viandes", price: "10,50 €", desc: "Double viande, frites, sauce fromagère, double sauce. Le format préféré du quartier.", tag: "Best" },
    { name: "Tacos XXL · 3 viandes", price: "12,50 €", desc: "Triple viande, frites, sauce fromagère gratinée, triple sauce. Pour les gros appétits." },
    { name: "Mégalo Crousty · 4 viandes", price: "15,90 €", desc: "Quatre viandes, frites maison, sauce fromagère gratinée, sauce signature." },
  ],
  gratines: [
    { name: "Sandwich Gratiné", price: "9,50 €", desc: "Pain traditionnel, viande au choix, mélange emmental & mozzarella, passé au four. Servi avec frites." },
    { name: "Mix 2 Luxe", price: "12,50 €", desc: "Deux viandes au choix, double fromage, sauce maison, pain gratiné au four.", tag: "Populaire" },
    { name: "Gratin Cheddar Bacon", price: "11,90 €", desc: "Bacon de bœuf, double cheddar fondu, oignons grillés, sauce barbecue, gratiné au four." },
    { name: "Gratin Veggie", price: "9,90 €", desc: "Légumes grillés, brie, mozzarella, sauce pesto, pain artisanal au four." },
  ],
  sides: [
    { name: "Frites maison", price: "3,90 €", desc: "Coupées épaisses, double cuisson, fleur de sel." },
    { name: "Cheddar Bacon Fries", price: "6,50 €", desc: "Frites maison, cheddar fondu coulant, bacon de bœuf croustillant.", tag: "Cultes" },
    { name: "Tenders maison", price: "5,90 €", desc: "Aiguillettes de poulet panées, sauce au choix. x5." },
    { name: "Nuggets", price: "4,90 €", desc: "x6, sauce au choix." },
    { name: "Onion Rings", price: "4,50 €", desc: "Anneaux d'oignon panés croustillants." },
  ],
  desserts: [
    { name: "Tiramisu maison", price: "4,50 €", desc: "Mascarpone, café, cacao amer. La recette qu'on refait chaque matin." },
    { name: "Donuts", price: "3,50 €", desc: "Glacé chocolat, vanille ou fraise. Moelleux comme il faut." },
    { name: "Cookie XL", price: "3,90 €", desc: "Pépites de chocolat, cœur fondant, sortie de four." },
    { name: "Milkshake", price: "5,50 €", desc: "Vanille · chocolat · fraise · spéculoos. Préparé minute." },
    { name: "Boissons", price: "2,50 €", desc: "Coca, Fanta, Oasis, Ice Tea, Perrier, eau." },
  ],
};

const grid = document.getElementById("menu-grid");
const renderMenu = (cat) => {
  const items = MENU[cat] || [];
  grid.innerHTML = items.map((d) => `
    <article class="dish">
      <div class="dish-shape"></div>
      <div class="dish-head">
        <h3 class="dish-name">${d.name}</h3>
        <span class="dish-price">${d.price}</span>
      </div>
      <p class="dish-desc">${d.desc}</p>
      ${d.tag ? `<span class="dish-tag">${d.tag}</span>` : ""}
    </article>
  `).join("");
};
renderMenu("burgers");

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const cat = tab.dataset.cat;
    grid.style.opacity = "0";
    grid.style.transform = "translateY(10px)";
    setTimeout(() => {
      renderMenu(cat);
      grid.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      grid.style.opacity = "1";
      grid.style.transform = "translateY(0)";
    }, 200);
  });
});

/* ============================================
   3D BACKGROUND SCENE
   Floating geometric food-tokens + warm fog
   ============================================ */

(() => {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0608, 0.04);

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 14;

  // Lights — warm rim + cool fill
  const key = new THREE.PointLight(0xff7a3a, 2.4, 60);
  key.position.set(8, 6, 8);
  scene.add(key);
  const fill = new THREE.PointLight(0xf4b860, 1.6, 60);
  fill.position.set(-10, -4, 6);
  scene.add(fill);
  const rim = new THREE.PointLight(0x7a4dff, 0.6, 60);
  rim.position.set(0, 10, -8);
  scene.add(rim);
  scene.add(new THREE.AmbientLight(0x2a1818, 0.6));

  /* ---- Food tokens (stylized geometric "burgers", "fries", "rings") ---- */
  const tokens = [];

  // Burger-like stack: bun (sphere), patty (cyl), cheese (box), bun bottom (sphere half)
  const makeBurger = () => {
    const group = new THREE.Group();
    const bun = new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0xd99657, roughness: 0.7, metalness: 0.05 })
    );
    bun.position.y = 0.25;
    const patty = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.55, 0.22, 24),
      new THREE.MeshStandardMaterial({ color: 0x4a1f10, roughness: 0.85 })
    );
    patty.position.y = 0.0;
    const cheese = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.06, 1.1),
      new THREE.MeshStandardMaterial({ color: 0xf4b860, roughness: 0.4, emissive: 0x4a2a10, emissiveIntensity: 0.2 })
    );
    cheese.position.y = -0.15;
    const bunBot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.55, 0.2, 24),
      new THREE.MeshStandardMaterial({ color: 0xc28148, roughness: 0.8 })
    );
    bunBot.position.y = -0.32;
    group.add(bun, patty, cheese, bunBot);
    return group;
  };

  // Stylized fries — small bundle of boxes
  const makeFries = () => {
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: 0xf4b860, roughness: 0.6, emissive: 0x331a08, emissiveIntensity: 0.15 });
    for (let i = 0; i < 7; i++) {
      const f = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.0 + Math.random() * 0.4, 0.1), mat);
      f.position.set((Math.random() - 0.5) * 0.4, Math.random() * 0.2, (Math.random() - 0.5) * 0.4);
      f.rotation.set(Math.random() * 0.3, Math.random() * 0.3, Math.random() * 0.3);
      group.add(f);
    }
    return group;
  };

  // Torus = onion ring
  const makeRing = () => {
    return new THREE.Mesh(
      new THREE.TorusGeometry(0.55, 0.18, 16, 40),
      new THREE.MeshStandardMaterial({ color: 0xff8a3d, roughness: 0.6, metalness: 0.05, emissive: 0x3a1408, emissiveIntensity: 0.25 })
    );
  };

  // Sphere = tomato / sesame
  const makeSphere = () => {
    return new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.45, 1),
      new THREE.MeshStandardMaterial({ color: 0xff5b2e, roughness: 0.5, metalness: 0.0, emissive: 0x4a0e08, emissiveIntensity: 0.15 })
    );
  };

  const factories = [makeBurger, makeFries, makeRing, makeSphere, makeRing, makeSphere];
  const N = 16;
  for (let i = 0; i < N; i++) {
    const obj = factories[i % factories.length]();
    const radius = 8 + Math.random() * 7;
    const angle = (i / N) * Math.PI * 2 + Math.random() * 0.5;
    obj.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 8,
      Math.sin(angle) * radius - Math.random() * 6
    );
    obj.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    const s = 0.8 + Math.random() * 0.8;
    obj.scale.setScalar(s);
    obj.userData = {
      floatSpeed: 0.2 + Math.random() * 0.4,
      floatPhase: Math.random() * Math.PI * 2,
      rotSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4
      ),
      baseY: obj.position.y,
      basePos: obj.position.clone(),
    };
    scene.add(obj);
    tokens.push(obj);
  }

  // Subtle particle dust
  const dustGeo = new THREE.BufferGeometry();
  const dustCount = 280;
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3 + 0] = (Math.random() - 0.5) * 40;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 4;
  }
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({ color: 0xf4b860, size: 0.04, transparent: true, opacity: 0.6 })
  );
  scene.add(dust);

  // Mouse parallax
  const target = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };
  window.addEventListener("mousemove", (e) => {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2;
    target.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Scroll position drives camera Z + tokens
  let scrollY = 0;
  window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });

  // Resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animate
  const clock = new THREE.Clock();
  const animate = () => {
    const t = clock.getElapsedTime();

    // ease cursor parallax
    eased.x += (target.x - eased.x) * 0.04;
    eased.y += (target.y - eased.y) * 0.04;

    // gentle camera move based on scroll + cursor
    const scrollNorm = Math.min(scrollY / (window.innerHeight * 4), 1);
    camera.position.x = eased.x * 1.2;
    camera.position.y = -eased.y * 0.8 - scrollNorm * 2;
    camera.position.z = 14 + scrollNorm * 4;
    camera.lookAt(0, -scrollNorm * 1.5, 0);

    tokens.forEach((obj) => {
      obj.position.y = obj.userData.baseY + Math.sin(t * obj.userData.floatSpeed + obj.userData.floatPhase) * 0.6;
      obj.rotation.x += obj.userData.rotSpeed.x * 0.01;
      obj.rotation.y += obj.userData.rotSpeed.y * 0.01;
      obj.rotation.z += obj.userData.rotSpeed.z * 0.01;
    });

    dust.rotation.y = t * 0.02;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
})();

/* ============================================
   SIGNATURE STAGE — rotating 3D burger
   ============================================ */
(() => {
  const canvas = document.getElementById("sig-canvas");
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  camera.position.set(0, 1.5, 6);
  camera.lookAt(0, 0, 0);

  // Lights
  scene.add(new THREE.AmbientLight(0x3a1e10, 0.6));
  const k = new THREE.SpotLight(0xff7a3a, 4, 20, Math.PI / 5, 0.6, 1);
  k.position.set(4, 6, 5);
  scene.add(k);
  const f = new THREE.PointLight(0xf4b860, 2, 20);
  f.position.set(-4, 3, 4);
  scene.add(f);
  const back = new THREE.PointLight(0xff5b2e, 1.2, 20);
  back.position.set(0, -2, -4);
  scene.add(back);

  // Build a fancier signature burger
  const burger = new THREE.Group();

  const sesameBunMat = new THREE.MeshStandardMaterial({ color: 0xe0a368, roughness: 0.6, metalness: 0.05 });
  const bun = new THREE.Mesh(new THREE.SphereGeometry(1.1, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2), sesameBunMat);
  bun.position.y = 0.7;
  burger.add(bun);

  // sesame
  const sesameMat = new THREE.MeshStandardMaterial({ color: 0xfff1c8, roughness: 0.5 });
  for (let i = 0; i < 22; i++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), sesameMat);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * (Math.PI / 2.4);
    const r = 1.08;
    s.position.set(Math.sin(phi) * Math.cos(theta) * r, 0.7 + Math.cos(phi) * r, Math.sin(phi) * Math.sin(theta) * r);
    burger.add(s);
  }

  // cheese (square slice tilted)
  const cheese = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.08, 2.2),
    new THREE.MeshStandardMaterial({ color: 0xf4b860, roughness: 0.35, emissive: 0x4a2a10, emissiveIntensity: 0.25 })
  );
  cheese.position.y = 0.5;
  cheese.rotation.y = 0.15;
  burger.add(cheese);

  // patty 1
  const pattyMat = new THREE.MeshStandardMaterial({ color: 0x4a1c0e, roughness: 0.9 });
  const patty1 = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.0, 0.32, 40), pattyMat);
  patty1.position.y = 0.3;
  burger.add(patty1);

  // cheese 2
  const cheese2 = cheese.clone();
  cheese2.position.y = 0.05;
  cheese2.rotation.y = -0.1;
  burger.add(cheese2);

  // patty 2
  const patty2 = patty1.clone();
  patty2.position.y = -0.18;
  burger.add(patty2);

  // lettuce frill
  const lettuce = new THREE.Mesh(
    new THREE.TorusGeometry(1.05, 0.1, 16, 60),
    new THREE.MeshStandardMaterial({ color: 0x4ea84a, roughness: 0.7 })
  );
  lettuce.position.y = -0.4;
  lettuce.rotation.x = Math.PI / 2;
  burger.add(lettuce);

  // bun bottom
  const bunBot = new THREE.Mesh(
    new THREE.CylinderGeometry(1.1, 0.95, 0.45, 40),
    new THREE.MeshStandardMaterial({ color: 0xb87838, roughness: 0.8 })
  );
  bunBot.position.y = -0.72;
  burger.add(bunBot);

  scene.add(burger);

  // Resize observer
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  // Hover tilt
  let targetTilt = { x: 0, y: 0 };
  canvas.parentElement.addEventListener("mousemove", (e) => {
    const r = canvas.getBoundingClientRect();
    targetTilt.x = ((e.clientY - r.top) / r.height - 0.5) * 0.5;
    targetTilt.y = ((e.clientX - r.left) / r.width - 0.5) * 1.2;
  });
  canvas.parentElement.addEventListener("mouseleave", () => {
    targetTilt = { x: 0, y: 0 };
  });

  const clock = new THREE.Clock();
  let tiltX = 0, tiltY = 0;
  const animate = () => {
    const t = clock.getElapsedTime();
    burger.rotation.y = t * 0.35 + tiltY;
    tiltX += (targetTilt.x - tiltX) * 0.08;
    tiltY += (targetTilt.y - tiltY) * 0.08;
    burger.rotation.x = tiltX;
    burger.position.y = Math.sin(t * 1.2) * 0.08;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
})();

/* ---------- Tilt on dish cards ---------- */
if (isFinePointer) {
  document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".dish").forEach((card) => {
      const r = card.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
        card.style.transform = "";
        return;
      }
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-py * 4}deg) rotateY(${px * 4}deg) translateZ(0)`;
    });
  });
}

/* ---------- Mobile burger menu (basic show/hide of links) ---------- */
const burgerBtn = document.getElementById("burger");
const navLinks = document.querySelector(".nav-links");
burgerBtn?.addEventListener("click", () => {
  const open = navLinks.style.display === "flex";
  if (open) {
    navLinks.style.display = "";
  } else {
    navLinks.style.position = "absolute";
    navLinks.style.top = "70px";
    navLinks.style.left = "0";
    navLinks.style.right = "0";
    navLinks.style.flexDirection = "column";
    navLinks.style.background = "rgba(10,6,8,0.95)";
    navLinks.style.backdropFilter = "blur(14px)";
    navLinks.style.padding = "24px";
    navLinks.style.borderBottom = "1px solid var(--line)";
    navLinks.style.display = "flex";
  }
});
navLinks?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  if (window.innerWidth <= 900) navLinks.style.display = "";
}));
