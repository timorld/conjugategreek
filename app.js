// Merge all extra verb data into main verbs object
Object.assign(verbs, verbsExtra1, verbsExtra2, verbsExtra3, verbsExtra4);

// Get all verb names for autocomplete
const verbList = Object.keys(verbs);

// DOM Elements
const input = document.getElementById("verbInput");
const result = document.getElementById("result");
const suggestions = document.getElementById("suggestions");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");

// Navigation
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    navigateTo(page);
    
    // Close mobile menu
    sidebar.classList.remove('open');
  });
});

function navigateTo(page) {
  // Update nav active state
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.querySelector(`[data-page="${page}"]`).classList.add('active');
  
  // Show correct page
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');
  
  // Initialize page content
  if (page === 'alphabetical') renderAlphabeticalList();
  if (page === 'essential') renderEssentialList();
}

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  }
});

// Search functionality
input.addEventListener("input", () => {
  const query = input.value.trim().toLowerCase();
  suggestions.innerHTML = "";
  
  if (query.length === 0) {
    result.innerHTML = "";
    return;
  }
  
  const matches = verbList.filter(v => v.startsWith(query));
  
  matches.slice(0, 5).forEach(verb => {
    const div = document.createElement("div");
    div.className = "suggestion";
    div.textContent = `${verb} — ${verbs[verb].meaning}`;
    div.addEventListener("click", () => {
      input.value = verb;
      suggestions.innerHTML = "";
      showVerb(verb);
    });
    suggestions.appendChild(div);
  });
  
  if (verbs[query]) {
    showVerb(query);
  } else {
    result.innerHTML = "";
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const verb = input.value.trim();
    suggestions.innerHTML = "";
    showVerb(verb);
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-container")) {
    suggestions.innerHTML = "";
  }
});

// Tense color mapping
const tenseClasses = {
  "Ενεστώτας (Present)": "tense-present",
  "Μέλλοντας Στιγμιαίος (Simple Future)": "tense-simple-future",
  "Αόριστος (Simple Past)": "tense-aorist",
  "Μέλλοντας Εξακολουθητικός (Continuous Future)": "tense-continuous-future",
  "Παρατατικός (Imperfect Past)": "tense-imperfect"
};

function showVerb(verb) {
  result.innerHTML = "";

  if (!verbs[verb]) {
    result.innerHTML = `<p class="not-found">Verb "${verb}" not found</p>`;
    return;
  }

  const data = verbs[verb];

  const header = document.createElement("div");
  header.className = "verb-header";
  header.innerHTML = `<h2>${verb}</h2><span class="meaning">${data.meaning}</span>`;
  result.appendChild(header);

  for (const tense in data) {
    if (tense === "meaning") continue;
    
    const table = document.createElement("table");
    const tenseClass = tenseClasses[tense] || "";
    table.className = tenseClass;
    
    const caption = document.createElement("caption");
    caption.textContent = tense;
    table.appendChild(caption);

    for (const person in data[tense]) {
      const row = table.insertRow();
      row.insertCell().textContent = person;
      row.insertCell().textContent = data[tense][person];
    }

    result.appendChild(table);
  }
}

// Alphabetical List Page
function renderAlphabeticalList() {
  const container = document.getElementById("alphabetical-list");
  if (container.innerHTML) return; // Already rendered
  
  // Sort verbs alphabetically
  const sorted = [...verbList].sort((a, b) => a.localeCompare(b, 'el'));
  
  // Group by first letter
  const groups = {};
  sorted.forEach(verb => {
    const letter = verb.charAt(0).toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(verb);
  });
  
  // Render
  let html = '';
  for (const letter in groups) {
    html += `<div class="letter-section">
      <div class="letter-header">${letter}</div>
      <div class="verb-grid">`;
    
    groups[letter].forEach(verb => {
      html += `<div class="verb-card" onclick="selectVerb('${verb}')">
        <div class="verb-name">${verb}</div>
        <div class="verb-meaning">${verbs[verb].meaning}</div>
      </div>`;
    });
    
    html += '</div></div>';
  }
  
  container.innerHTML = html;
}

// Essential Verbs Page
function renderEssentialList() {
  const container = document.getElementById("essential-list");
  if (container.innerHTML) return; // Already rendered
  
  let html = `
    <div class="essential-intro">
      <h3>Master These First!</h3>
      <p>These 100 verbs cover the majority of everyday Greek conversation</p>
    </div>
    <div class="legend">
      <div class="legend-item">
        <div class="legend-dot available"></div>
        <span>Available (click to conjugate)</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot unavailable"></div>
        <span>Coming soon</span>
      </div>
    </div>
  `;
  
  // Group into categories
  const categories = {
    "Basic & Essential (1-20)": essentialVerbs.slice(0, 20),
    "Actions & Movement (21-40)": essentialVerbs.slice(20, 40),
    "Communication & Cognition (41-60)": essentialVerbs.slice(40, 60),
    "Daily Life (61-80)": essentialVerbs.slice(60, 80),
    "More Common Verbs (81-100)": essentialVerbs.slice(80, 100)
  };
  
  for (const category in categories) {
    html += `<div class="essential-category">
      <div class="category-header">${category}</div>
      <div class="essential-grid">`;
    
    categories[category].forEach((item, idx) => {
      const available = verbs[item.verb] !== undefined;
      const globalIdx = essentialVerbs.indexOf(item) + 1;
      
      html += `<div class="essential-card ${available ? 'available' : 'unavailable'}" 
                   ${available ? `onclick="selectVerb('${item.verb}')"` : ''}>
        <span class="rank">${globalIdx}</span>
        <div class="verb-info">
          <div class="verb-name">${item.verb}</div>
          <div class="verb-meaning">${item.meaning}</div>
        </div>
      </div>`;
    });
    
    html += '</div></div>';
  }
  
  container.innerHTML = html;
}

// Navigate to verb from other pages
function selectVerb(verb) {
  navigateTo('search');
  input.value = verb;
  showVerb(verb);
  
  // Scroll to top on mobile
  window.scrollTo(0, 0);
}
