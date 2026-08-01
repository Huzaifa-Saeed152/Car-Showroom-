/* =========================================================
   VELOCITY MOTORS — SCRIPT.JS
   Modular vanilla JS: data → render → interactions → utils
   ========================================================= */
'use strict';

/* ============================================================
   1. DATA
   ============================================================ */
const CAR_ICON_COLORS = ['#5b9bff', '#8fb0ff', '#e8506a', '#35c980', '#ffb648', '#a9b1c0'];

function carSVG(seed){
  const c = CAR_ICON_COLORS[seed % CAR_ICON_COLORS.length];
  return `<svg viewBox="0 0 300 130" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="150" cy="112" rx="115" ry="8" fill="${c}" opacity="0.18"/>
    <path d="M20 88 C 28 62, 55 50, 80 46 C 95 30, 115 22, 150 22 C 182 22, 205 31, 222 46 C 250 49, 272 57, 282 78 L 282 88 C 282 94, 277 97, 270 97 L 252 97 C 252 84, 242 75, 230 75 C 218 75, 208 84, 208 97 L 104 97 C 104 84, 94 75, 82 75 C 70 75, 60 84, 60 97 L 31 97 C 24 97, 20 93, 20 88 Z" fill="#161b24" stroke="${c}" stroke-width="1.2" opacity="0.95"/>
    <path d="M88 45 C 103 33, 118 27, 150 27 C 178 27, 196 33, 210 45 L 200 46 C 187 37, 169 33, 150 33 C 129 33, 111 37, 98 46 Z" fill="#0a0d13"/>
    <circle cx="82" cy="97" r="17" fill="#0a0c10" stroke="#414a5c" stroke-width="1.5"/>
    <circle cx="82" cy="97" r="7" fill="${c}" opacity="0.7"/>
    <circle cx="230" cy="97" r="17" fill="#0a0c10" stroke="#414a5c" stroke-width="1.5"/>
    <circle cx="230" cy="97" r="7" fill="${c}" opacity="0.7"/>
  </svg>`;
}

const CARS = [
  { id:1, brand:'BMW', model:'M4 Competition', price:78900, fuel:'Petrol', transmission:'Automatic', hp:503, mileage:'22 MPG', engine:'3.0L Twin-Turbo I6', rating:4.8, badge:'Hot', desc:"The BMW M4 Competition blends razor-sharp handling with everyday usability, delivering a driving experience that's as thrilling on the track as it is comfortable on the commute." },
  { id:2, brand:'Mercedes-Benz', model:'AMG GT 63', price:139900, fuel:'Petrol', transmission:'Automatic', hp:630, mileage:'19 MPG', engine:'4.0L Twin-Turbo V8', rating:4.9, badge:'New', desc:"A four-door grand tourer with supercar DNA — the AMG GT 63 pairs handcrafted luxury with a snarling twin-turbo V8 built for effortless power." },
  { id:3, brand:'Audi', model:'RS e-tron GT', price:104900, fuel:'Electric', transmission:'Automatic', hp:637, mileage:'232 mi range', engine:'Dual Electric Motor', rating:4.7, badge:'New', desc:"Audi's flagship electric performance sedan delivers silent, instant acceleration wrapped in a sculpted, low-slung silhouette." },
  { id:4, brand:'Toyota', model:'Supra GR', price:56900, fuel:'Petrol', transmission:'Manual', hp:382, mileage:'26 MPG', engine:'3.0L Turbo I6', rating:4.6, badge:'', desc:"A modern icon reborn — the GR Supra delivers a perfectly balanced chassis and a howling inline-six for pure driver engagement." },
  { id:5, brand:'Honda', model:'Civic Type R', price:44900, fuel:'Petrol', transmission:'Manual', hp:315, mileage:'28 MPG', engine:'2.0L Turbo I4', rating:4.7, badge:'', desc:"The benchmark hot hatch — track-honed aero, a razor-precise six-speed manual, and everyday practicality in one package." },
  { id:6, brand:'KIA', model:'EV6 GT', price:61900, fuel:'Electric', transmission:'Automatic', hp:576, mileage:'206 mi range', engine:'Dual Electric Motor', rating:4.5, badge:'New', desc:"KIA's performance EV flagship sprints to 60 in a claimed 3.4 seconds without sacrificing daily-driver comfort." },
  { id:7, brand:'Hyundai', model:'Ioniq 6', price:47900, fuel:'Electric', transmission:'Automatic', hp:320, mileage:'361 mi range', engine:'Dual Electric Motor', rating:4.6, badge:'', desc:"A streamlined, aerodynamic electric sedan built for effortless long-distance cruising and everyday efficiency." },
  { id:8, brand:'Lexus', model:'LC 500', price:97900, fuel:'Petrol', transmission:'Automatic', hp:471, mileage:'20 MPG', engine:'5.0L V8', rating:4.8, badge:'Hot', desc:"A hand-built grand tourer with a naturally aspirated V8 soundtrack and interior craftsmanship second to none." },
  { id:9, brand:'BMW', model:'X5 M', price:112900, fuel:'Petrol', transmission:'Automatic', hp:617, mileage:'17 MPG', engine:'4.4L Twin-Turbo V8', rating:4.6, badge:'', desc:"Full-size luxury SUV comfort meets supercar-baiting performance — the X5 M is BMW's most complete performance package." },
  { id:10, brand:'Mercedes-Benz', model:'C300 Sedan', price:47900, fuel:'Hybrid', transmission:'Automatic', hp:255, mileage:'32 MPG', engine:'2.0L Turbo Hybrid I4', rating:4.5, badge:'', desc:"An entry point to Mercedes luxury that doesn't compromise — refined ride quality, mild-hybrid efficiency, and cutting-edge cabin tech." },
  { id:11, brand:'Audi', model:'RS6 Avant', price:124900, fuel:'Petrol', transmission:'Automatic', hp:591, mileage:'18 MPG', engine:'4.0L Twin-Turbo V8', rating:4.9, badge:'Hot', desc:"The ultimate sleeper wagon — RS6 Avant hides supercar-slaying performance behind understated, practical bodywork." },
  { id:12, brand:'Toyota', model:'Land Cruiser', price:58900, fuel:'Hybrid', transmission:'Automatic', hp:326, mileage:'23 MPG', engine:'2.4L Turbo Hybrid I4', rating:4.7, badge:'', desc:"Legendary off-road capability meets modern hybrid efficiency and a thoroughly upgraded, tech-forward cabin." }
];

const BRANDS = [
  { name:'BMW', count:CARS.filter(c=>c.brand==='BMW').length },
  { name:'Mercedes-Benz', count:CARS.filter(c=>c.brand==='Mercedes-Benz').length },
  { name:'Audi', count:CARS.filter(c=>c.brand==='Audi').length },
  { name:'Toyota', count:CARS.filter(c=>c.brand==='Toyota').length },
  { name:'Honda', count:CARS.filter(c=>c.brand==='Honda').length },
  { name:'KIA', count:CARS.filter(c=>c.brand==='KIA').length },
  { name:'Hyundai', count:CARS.filter(c=>c.brand==='Hyundai').length },
  { name:'Lexus', count:CARS.filter(c=>c.brand==='Lexus').length }
];

const TESTIMONIALS = [
  { name:'Daniel Ortiz', role:'BMW M4 Owner', text:"The entire process was seamless — from the test drive to financing. Velocity Motors treated me like a VIP, not just another sale.", rating:5 },
  { name:'Priya Nair', role:'Audi RS e-tron GT Owner', text:"I've bought cars from three different dealers over the years. None came close to the transparency and speed of Velocity Motors.", rating:5 },
  { name:'Marcus Chen', role:'Lexus LC 500 Owner', text:"Their certified inspection report gave me total confidence. The car arrived exactly as described — better, honestly.", rating:5 },
  { name:'Sofia Reyes', role:'KIA EV6 GT Owner', text:"Fast delivery, fair trade-in value, and a support team that actually picks up the phone. Couldn't ask for more.", rating:4 },
  { name:'James Whitfield', role:'Mercedes AMG GT Owner', text:"Velocity Motors made a six-figure purchase feel effortless. The concierge team anticipated every question before I asked.", rating:5 }
];

const FAQS = [
  { q:'Do you offer financing for used and certified vehicles?', a:'Yes — we partner with multiple lenders to offer competitive rates on both new and certified pre-owned vehicles, with approval decisions typically within minutes.' },
  { q:'Can I trade in my current car?', a:'Absolutely. Get an instant online valuation or bring your vehicle in for an in-person appraisal — trade-in value can be applied directly to your purchase.' },
  { q:'What does your certification process include?', a:'Every vehicle undergoes a 200-point mechanical, electrical, and cosmetic inspection performed by factory-trained technicians before it is listed for sale.' },
  { q:'Is nationwide delivery available?', a:'Yes, we deliver to all 50 states. Most orders arrive within 48–72 hours of purchase confirmation, fully prepped and detailed.' },
  { q:'What warranty coverage comes with my purchase?', a:'All vehicles include a minimum 1-year limited warranty, with extended plans available up to 5 years for additional peace of mind.' }
];

/* ============================================================
   2. STATE
   ============================================================ */
let activeFilters = { brand:'all', price:'all', fuel:'all', transmission:'all', search:'' };
let testimonialIndex = 0;
let testimonialTimer = null;

/* ============================================================
   3. UTILITIES
   ============================================================ */
const $  = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];
const formatPrice = (n) => '$' + n.toLocaleString('en-US');

function showToast(message){
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=> toast.classList.remove('show'), 3200);
}

function starString(rating){
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5-full);
}

/* ============================================================
   4. LOADER
   ============================================================ */
window.addEventListener('load', () => {
  const loader = $('#loader');
  setTimeout(() => loader.classList.add('hide'), 500);
});

/* ============================================================
   5. NAVBAR: scroll state, mobile menu, active link, smooth scroll
   ============================================================ */
const navbar = $('#navbar');
const hamburger = $('#hamburger');
const navLinks = $('#navLinks');
const scrollProgress = $('#scrollProgress');
const backToTop = $('#backToTop');

function handleScrollEffects(){
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 40);
  backToTop.classList.toggle('show', y > 500);

  // scroll progress bar
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = docHeight > 0 ? `${(y / docHeight) * 100}%` : '0%';

  // active nav link (highlight section in view)
  const sections = $$('section[id]');
  let currentId = sections[0]?.id;
  for (const sec of sections){
    if (y >= sec.offsetTop - 140) currentId = sec.id;
  }
  $$('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}
window.addEventListener('scroll', handleScrollEffects, { passive:true });
handleScrollEffects();

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});
$$('.nav-link').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.classList.remove('active');
}));

backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
$('#navBookBtn').addEventListener('click', () => $('#contact').scrollIntoView({ behavior:'smooth' }));

/* ============================================================
   6. THEME TOGGLE
   ============================================================ */
const themeToggle = $('#themeToggle');
function applyTheme(theme){
  document.body.classList.toggle('light', theme === 'light');
  themeToggle.setAttribute('aria-pressed', theme === 'light');
}
let savedTheme = 'dark';
try { savedTheme = window.__velocityTheme || 'dark'; } catch(e){}
applyTheme(savedTheme);
themeToggle.addEventListener('click', () => {
  const next = document.body.classList.contains('light') ? 'dark' : 'light';
  applyTheme(next);
  window.__velocityTheme = next; // in-memory only (no localStorage per sandbox constraints)
});

/* ============================================================
   7. RIPPLE EFFECT ON BUTTONS
   ============================================================ */
$$('.ripple').forEach(btn => {
  btn.addEventListener('click', function(e){
    const rect = this.getBoundingClientRect();
    const circle = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    circle.className = 'ripple-circle';
    circle.style.width = circle.style.height = `${size}px`;
    circle.style.left = `${e.clientX - rect.left - size/2}px`;
    circle.style.top = `${e.clientY - rect.top - size/2}px`;
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 650);
  });
});

/* ============================================================
   8. ANIMATED COUNTERS
   ============================================================ */
function animateCounter(el){
  const target = parseInt(el.dataset.count, 10);
  const duration = 1600;
  const start = performance.now();
  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold:0.5 });
$$('.stat-number').forEach(el => counterObserver.observe(el));

/* ============================================================
   9. SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold:0.12 });
$$('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   10. RENDER: CAR CARDS
   ============================================================ */
function specIcon(type){
  const icons = {
    fuel: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3h8v18H6zM14 8h2l2 2v8a2 2 0 01-2 2"/><path d="M6 12h8"/></svg>',
    trans: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg>',
    hp: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>'
  };
  return icons[type] || '';
}

function renderCarCard(car){
  const badge = car.badge ? `<span class="car-badge ${car.badge === 'New' ? 'badge-new' : 'badge-hot'}">${car.badge}</span>` : '';
  return `
  <article class="car-card" data-id="${car.id}">
    <div class="car-media">
      ${badge}
      <div class="car-rating">★ ${car.rating}</div>
      ${carSVG(car.id)}
    </div>
    <div class="car-body">
      <span class="car-brand">${car.brand}</span>
      <h3 class="car-model">${car.model}</h3>
      <div class="car-price">${formatPrice(car.price)}<span>starting price</span></div>
      <div class="car-specs">
        <div class="car-spec">${specIcon('fuel')}<span>${car.fuel}</span></div>
        <div class="car-spec">${specIcon('trans')}<span>${car.transmission}</span></div>
        <div class="car-spec">${specIcon('hp')}<span>${car.hp} HP</span></div>
      </div>
      <button class="btn btn-outline car-detail-btn ripple" data-view="${car.id}">View Details</button>
    </div>
  </article>`;
}

function renderCarGrid(list){
  const grid = $('#carGrid');
  const count = $('#resultsCount');
  if (!list.length){
    grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--muted); padding:40px 0;">No vehicles match your filters. Try adjusting your search.</p>`;
  } else {
    grid.innerHTML = list.map(renderCarCard).join('');
  }
  count.textContent = `Showing ${list.length} of ${CARS.length} vehicles`;
  // re-attach reveal + ripple + view handlers
  $$('.car-card', grid).forEach(card => { card.classList.add('reveal','visible'); });
  $$('.ripple', grid).forEach(btn => {
    btn.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = `${size}px`;
      circle.style.left = `${e.clientX - rect.left - size/2}px`;
      circle.style.top = `${e.clientY - rect.top - size/2}px`;
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });
  $$('[data-view]', grid).forEach(btn => btn.addEventListener('click', () => openCarModal(Number(btn.dataset.view))));
}

/* ============================================================
   11. FILTERING
   ============================================================ */
function populateFilterOptions(){
  const brandSelect = $('#filterBrand');
  const fuelSelect = $('#filterFuel');
  const transSelect = $('#filterTransmission');

  [...new Set(CARS.map(c => c.brand))].sort().forEach(brand => {
    brandSelect.insertAdjacentHTML('beforeend', `<option value="${brand}">${brand}</option>`);
  });
  [...new Set(CARS.map(c => c.fuel))].sort().forEach(fuel => {
    fuelSelect.insertAdjacentHTML('beforeend', `<option value="${fuel}">${fuel}</option>`);
  });
  [...new Set(CARS.map(c => c.transmission))].sort().forEach(t => {
    transSelect.insertAdjacentHTML('beforeend', `<option value="${t}">${t}</option>`);
  });
}

function applyFilters(){
  const filtered = CARS.filter(car => {
    if (activeFilters.brand !== 'all' && car.brand !== activeFilters.brand) return false;
    if (activeFilters.price !== 'all' && car.price > Number(activeFilters.price)) return false;
    if (activeFilters.fuel !== 'all' && car.fuel !== activeFilters.fuel) return false;
    if (activeFilters.transmission !== 'all' && car.transmission !== activeFilters.transmission) return false;
    if (activeFilters.search){
      const q = activeFilters.search.toLowerCase();
      if (!car.brand.toLowerCase().includes(q) && !car.model.toLowerCase().includes(q)) return false;
    }
    return true;
  });
  renderCarGrid(filtered);
}

function initFilters(){
  populateFilterOptions();
  renderCarGrid(CARS);

  $('#filterBrand').addEventListener('change', e => { activeFilters.brand = e.target.value; applyFilters(); });
  $('#filterPrice').addEventListener('change', e => { activeFilters.price = e.target.value; applyFilters(); });
  $('#filterFuel').addEventListener('change', e => { activeFilters.fuel = e.target.value; applyFilters(); });
  $('#filterTransmission').addEventListener('change', e => { activeFilters.transmission = e.target.value; applyFilters(); });

  let searchDebounce;
  $('#filterSearch').addEventListener('input', e => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      activeFilters.search = e.target.value.trim();
      applyFilters();
    }, 220);
  });

  $('#resetFilters').addEventListener('click', () => {
    activeFilters = { brand:'all', price:'all', fuel:'all', transmission:'all', search:'' };
    $('#filterBrand').value = 'all';
    $('#filterPrice').value = 'all';
    $('#filterFuel').value = 'all';
    $('#filterTransmission').value = 'all';
    $('#filterSearch').value = '';
    applyFilters();
  });
}

/* ============================================================
   12. BRANDS
   ============================================================ */
function renderBrands(){
  const grid = $('#brandGrid');
  grid.innerHTML = BRANDS.map(b => `
    <div class="brand-card">
      <div class="brand-mark">${b.name}</div>
      <div class="brand-count">${b.count} model${b.count !== 1 ? 's' : ''} available</div>
    </div>
  `).join('');
}

/* ============================================================
   13. CAR COMPARISON
   ============================================================ */
function initComparison(){
  const selA = $('#compareA');
  const selB = $('#compareB');
  const options = CARS.map(c => `<option value="${c.id}">${c.brand} ${c.model}</option>`).join('');
  selA.innerHTML = options;
  selB.innerHTML = options;
  selB.selectedIndex = 1;

  function renderComparison(){
    const carA = CARS.find(c => c.id === Number(selA.value));
    const carB = CARS.find(c => c.id === Number(selB.value));
    const rows = [
      { label:'Price', a:formatPrice(carA.price), b:formatPrice(carB.price), winnerA: carA.price < carB.price, winnerB: carB.price < carA.price },
      { label:'Engine', a:carA.engine, b:carB.engine },
      { label:'Horsepower', a:`${carA.hp} HP`, b:`${carB.hp} HP`, winnerA: carA.hp > carB.hp, winnerB: carB.hp > carA.hp },
      { label:'Mileage / Range', a:carA.mileage, b:carB.mileage },
      { label:'Fuel Type', a:carA.fuel, b:carB.fuel },
      { label:'Transmission', a:carA.transmission, b:carB.transmission },
      { label:'Rating', a:`★ ${carA.rating}`, b:`★ ${carB.rating}`, winnerA: carA.rating > carB.rating, winnerB: carB.rating > carA.rating }
    ];
    $('#compareTable').innerHTML = `
      <thead><tr><th>Specification</th><th>${carA.brand} ${carA.model}</th><th>${carB.brand} ${carB.model}</th></tr></thead>
      <tbody>
        ${rows.map(r => `
          <tr>
            <th>${r.label}</th>
            <td class="value ${r.winnerA ? 'winner' : ''}">${r.a}</td>
            <td class="value ${r.winnerB ? 'winner' : ''}">${r.b}</td>
          </tr>
        `).join('')}
      </tbody>`;
  }

  selA.addEventListener('change', renderComparison);
  selB.addEventListener('change', renderComparison);
  renderComparison();
}

/* ============================================================
   14. TESTIMONIALS SLIDER (auto-sliding)
   ============================================================ */
function renderTestimonials(){
  const track = $('#testimonialTrack');
  const dots = $('#testimonialDots');
  track.innerHTML = TESTIMONIALS.map((t, i) => `
    <div class="testimonial-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
      <div class="testimonial-stars">${starString(t.rating)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-person">
        <div class="testimonial-avatar">${t.name.split(' ').map(n=>n[0]).join('')}</div>
        <div>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-role">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');
  dots.innerHTML = TESTIMONIALS.map((_, i) => `<button aria-label="Go to testimonial ${i+1}" class="${i===0?'active':''}" data-dot="${i}"></button>`).join('');

  $$('[data-dot]', dots).forEach(dot => dot.addEventListener('click', () => goToTestimonial(Number(dot.dataset.dot))));
  $('#testPrev').addEventListener('click', () => goToTestimonial(testimonialIndex - 1));
  $('#testNext').addEventListener('click', () => goToTestimonial(testimonialIndex + 1));

  startTestimonialAutoplay();
}

function goToTestimonial(index){
  const total = TESTIMONIALS.length;
  testimonialIndex = (index + total) % total;
  $$('.testimonial-slide').forEach((slide, i) => slide.classList.toggle('active', i === testimonialIndex));
  $$('[data-dot]').forEach((dot, i) => dot.classList.toggle('active', i === testimonialIndex));
  resetTestimonialAutoplay();
}

function startTestimonialAutoplay(){
  testimonialTimer = setInterval(() => goToTestimonialSilent(testimonialIndex + 1), 5000);
}
function goToTestimonialSilent(index){
  const total = TESTIMONIALS.length;
  testimonialIndex = (index + total) % total;
  $$('.testimonial-slide').forEach((slide, i) => slide.classList.toggle('active', i === testimonialIndex));
  $$('[data-dot]').forEach((dot, i) => dot.classList.toggle('active', i === testimonialIndex));
}
function resetTestimonialAutoplay(){
  clearInterval(testimonialTimer);
  startTestimonialAutoplay();
}

/* ============================================================
   15. FAQ ACCORDION
   ============================================================ */
function renderFAQ(){
  const list = $('#faqList');
  list.innerHTML = FAQS.map((f, i) => `
    <div class="faq-item" data-index="${i}">
      <button class="faq-question">
        <span>${f.q}</span>
        <span class="plus">+</span>
      </button>
      <div class="faq-answer"><p>${f.a}</p></div>
    </div>
  `).join('');

  $$('.faq-item', list).forEach(item => {
    const question = $('.faq-question', item);
    const answer = $('.faq-answer', item);
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      $$('.faq-item', list).forEach(other => {
        other.classList.remove('open');
        $('.faq-answer', other).style.maxHeight = null;
      });
      if (!isOpen){
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ============================================================
   16. CAR DETAILS MODAL
   ============================================================ */
function openCarModal(id){
  const car = CARS.find(c => c.id === id);
  if (!car) return;
  const modalContent = $('#modalContent');
  modalContent.innerHTML = `
    <div class="modal-media">${carSVG(car.id)}</div>
    <div class="modal-title-row">
      <div>
        <span class="car-brand">${car.brand}</span>
        <h3 id="modalTitle">${car.model}</h3>
      </div>
      <div class="modal-price">${formatPrice(car.price)}</div>
    </div>
    <p class="modal-desc">${car.desc}</p>
    <div class="modal-spec-grid">
      <div class="modal-spec"><strong>${car.engine}</strong><span>Engine</span></div>
      <div class="modal-spec"><strong>${car.hp} HP</strong><span>Horsepower</span></div>
      <div class="modal-spec"><strong>${car.transmission}</strong><span>Transmission</span></div>
      <div class="modal-spec"><strong>${car.fuel}</strong><span>Fuel Type</span></div>
      <div class="modal-spec"><strong>${car.mileage}</strong><span>Mileage / Range</span></div>
      <div class="modal-spec"><strong>★ ${car.rating}</strong><span>Customer Rating</span></div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-primary ripple" id="modalBookBtn">Book Test Drive</button>
      <button class="btn btn-outline ripple" id="modalCloseBtn2">Close</button>
    </div>
  `;
  $('#modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';

  $('#modalBookBtn').addEventListener('click', () => {
    closeModal();
    $('#contact').scrollIntoView({ behavior:'smooth' });
    $('#cInterest').value = 'test-drive';
    setTimeout(() => $('#cMessage').focus(), 500);
  });
  $('#modalCloseBtn2').addEventListener('click', closeModal);
}
function closeModal(){
  $('#modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
$('#modalClose').addEventListener('click', closeModal);
$('#modalOverlay').addEventListener('click', (e) => { if (e.target.id === 'modalOverlay') closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* ============================================================
   17. CONTACT FORM VALIDATION
   ============================================================ */
function validateField(id, condition, message){
  const field = $(`#${id}`);
  const errorEl = $(`#err-${id}`);
  const wrap = field.closest('.form-field');
  if (!condition){
    wrap.classList.add('error');
    errorEl.textContent = message;
    return false;
  }
  wrap.classList.remove('error');
  errorEl.textContent = '';
  return true;
}

function initContactForm(){
  const form = $('#contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#cName').value.trim();
    const email = $('#cEmail').value.trim();
    const phone = $('#cPhone').value.trim();
    const message = $('#cMessage').value.trim();

    const validName = validateField('cName', name.length >= 2, 'Please enter your full name.');
    const validEmail = validateField('cEmail', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), 'Enter a valid email address.');
    const validPhone = validateField('cPhone', /^[+\d][\d\s()-]{6,}$/.test(phone), 'Enter a valid phone number.');
    const validMessage = validateField('cMessage', message.length >= 10, 'Message should be at least 10 characters.');

    if (validName && validEmail && validPhone && validMessage){
      $('#formSuccess').textContent = `Thanks, ${name.split(' ')[0]}! Your message has been sent — our team will reach out shortly.`;
      showToast('Message sent successfully!');
      form.reset();
      setTimeout(() => { $('#formSuccess').textContent = ''; }, 6000);
    }
  });

  // live validation on blur
  ['cName','cEmail','cPhone','cMessage'].forEach(id => {
    $(`#${id}`).addEventListener('blur', () => {
      if ($(`#${id}`).value.trim()) form.dispatchEvent(new Event('submit', { cancelable:true }));
    });
  });
}

/* ============================================================
   18. NEWSLETTER FORMS
   ============================================================ */
function initNewsletters(){
  $('#newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#newsletterEmail').value.trim();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      $('#newsletterSuccess').textContent = "You're subscribed! Watch your inbox for exclusive drops.";
      showToast('Subscribed to newsletter!');
      e.target.reset();
      setTimeout(() => { $('#newsletterSuccess').textContent = ''; }, 5000);
    } else {
      $('#newsletterSuccess').textContent = 'Please enter a valid email address.';
      $('#newsletterSuccess').style.color = 'var(--danger)';
    }
  });

  $('#footerNewsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Subscribed to newsletter!');
    e.target.reset();
  });
}

/* ============================================================
   19. SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */
$$('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e){
    const targetId = this.getAttribute('href');
    if (targetId.length > 1 && $(targetId)){
      e.preventDefault();
      $(targetId).scrollIntoView({ behavior:'smooth' });
    }
  });
});

/* ============================================================
   20. INIT
   ============================================================ */
function init(){
  $('#year').textContent = new Date().getFullYear();
  initFilters();
  renderBrands();
  initComparison();
  renderTestimonials();
  renderFAQ();
  initContactForm();
  initNewsletters();
}

document.addEventListener('DOMContentLoaded', init);
