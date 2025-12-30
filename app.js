// Verbs are loaded from verbs-new-database.js
// Verb list will be initialized when DOM loads
let verbList = [];

// 100 Essential Greek Verbs List
const essentialVerbs = [
  {verb: "είμαι", meaning: "to be"},
  {verb: "έχω", meaning: "to have"},
  {verb: "κάνω", meaning: "to do, make"},
  {verb: "πάω", meaning: "to go"},
  {verb: "έρχομαι", meaning: "to come"},
  {verb: "θέλω", meaning: "to want"},
  {verb: "μπορώ", meaning: "can, to be able"},
  {verb: "ξέρω", meaning: "to know"},
  {verb: "βλέπω", meaning: "to see"},
  {verb: "λέω", meaning: "to say, tell"},
  {verb: "τρώω", meaning: "to eat"},
  {verb: "πίνω", meaning: "to drink"},
  {verb: "δουλεύω", meaning: "to work"},
  {verb: "μιλώ", meaning: "to speak"},
  {verb: "ακούω", meaning: "to hear, listen"},
  {verb: "διαβάζω", meaning: "to read"},
  {verb: "γράφω", meaning: "to write"},
  {verb: "μένω", meaning: "to stay, live"},
  {verb: "αγαπώ", meaning: "to love"},
  {verb: "περπατώ", meaning: "to walk"},
  {verb: "κοιμάμαι", meaning: "to sleep"},
  {verb: "ξυπνώ", meaning: "to wake up"},
  {verb: "φεύγω", meaning: "to leave"},
  {verb: "παίρνω", meaning: "to take, get"},
  {verb: "δίνω", meaning: "to give"},
  {verb: "βρίσκω", meaning: "to find"},
  {verb: "ζω", meaning: "to live"},
  {verb: "πιστεύω", meaning: "to believe"},
  {verb: "καταλαβαίνω", meaning: "to understand"},
  {verb: "πηγαίνω", meaning: "to go"},
  {verb: "μαθαίνω", meaning: "to learn"},
  {verb: "σκέφτομαι", meaning: "to think"},
  {verb: "νομίζω", meaning: "to think, believe"},
  {verb: "περιμένω", meaning: "to wait"},
  {verb: "ψάχνω", meaning: "to search, look for"},
  {verb: "χρειάζομαι", meaning: "to need"},
  {verb: "αρέσω", meaning: "to like, please"},
  {verb: "φοβάμαι", meaning: "to fear, be afraid"},
  {verb: "θυμάμαι", meaning: "to remember"},
  {verb: "ξεχνώ", meaning: "to forget"},
  {verb: "αρχίζω", meaning: "to begin, start"},
  {verb: "τελειώνω", meaning: "to finish, end"},
  {verb: "ανοίγω", meaning: "to open"},
  {verb: "κλείνω", meaning: "to close"},
  {verb: "στέλνω", meaning: "to send"},
  {verb: "φέρνω", meaning: "to bring"},
  {verb: "βάζω", meaning: "to put"},
  {verb: "βγάζω", meaning: "to take out"},
  {verb: "πετώ", meaning: "to throw, fly"},
  {verb: "πέφτω", meaning: "to fall"},
  {verb: "σηκώνω", meaning: "to lift, raise"},
  {verb: "κάθομαι", meaning: "to sit"},
  {verb: "στέκομαι", meaning: "to stand"},
  {verb: "τρέχω", meaning: "to run"},
  {verb: "οδηγώ", meaning: "to drive"},
  {verb: "ταξιδεύω", meaning: "to travel"},
  {verb: "επιστρέφω", meaning: "to return"},
  {verb: "φτάνω", meaning: "to arrive"},
  {verb: "μπαίνω", meaning: "to enter"},
  {verb: "βγαίνω", meaning: "to exit, go out"},
  {verb: "ρωτώ", meaning: "to ask"},
  {verb: "απαντώ", meaning: "to answer"},
  {verb: "βοηθώ", meaning: "to help"},
  {verb: "πληρώνω", meaning: "to pay"},
  {verb: "αγοράζω", meaning: "to buy"},
  {verb: "πουλώ", meaning: "to sell"},
  {verb: "δοκιμάζω", meaning: "to try, taste"},
  {verb: "χρησιμοποιώ", meaning: "to use"},
  {verb: "ζητώ", meaning: "to ask for, seek"},
  {verb: "προσπαθώ", meaning: "to try, attempt"},
  {verb: "αλλάζω", meaning: "to change"},
  {verb: "συνεχίζω", meaning: "to continue"},
  {verb: "σταματώ", meaning: "to stop"},
  {verb: "γεννιέμαι", meaning: "to be born"},
  {verb: "πεθαίνω", meaning: "to die"},
  {verb: "παντρεύομαι", meaning: "to marry"},
  {verb: "γνωρίζω", meaning: "to know, meet"},
  {verb: "συναντώ", meaning: "to meet"},
  {verb: "χαιρετώ", meaning: "to greet"},
  {verb: "ευχαριστώ", meaning: "to thank"},
  {verb: "συγχωρώ", meaning: "to forgive"},
  {verb: "υπόσχομαι", meaning: "to promise"},
  {verb: "αποφασίζω", meaning: "to decide"},
  {verb: "επιλέγω", meaning: "to choose"},
  {verb: "προτιμώ", meaning: "to prefer"},
  {verb: "ονειρεύομαι", meaning: "to dream"},
  {verb: "ελπίζω", meaning: "to hope"},
  {verb: "χάνω", meaning: "to lose"},
  {verb: "κερδίζω", meaning: "to win, earn"},
  {verb: "παίζω", meaning: "to play"},
  {verb: "τραγουδώ", meaning: "to sing"},
  {verb: "χορεύω", meaning: "to dance"},
  {verb: "μαγειρεύω", meaning: "to cook"},
  {verb: "καθαρίζω", meaning: "to clean"},
  {verb: "πλένω", meaning: "to wash"},
  {verb: "ντύνομαι", meaning: "to dress"},
  {verb: "φορώ", meaning: "to wear"},
  {verb: "κόβω", meaning: "to cut"},
  {verb: "σπάω", meaning: "to break"},
  {verb: "φτιάχνω", meaning: "to fix, make"}
];

// Navigation history
let navigationHistory = [];
let currentPage = 'search';

// DOM Elements
let input, result, suggestions, sidebar, menuToggle;

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize verb list from loaded database
  verbList = Object.keys(verbs);
  
  // Get DOM elements
  input = document.getElementById("verbInput");
  result = document.getElementById("result");
  suggestions = document.getElementById("suggestions");
  sidebar = document.getElementById("sidebar");
  menuToggle = document.getElementById("menuToggle");

  // Setup navigation
  setupNavigation();
  
  // Setup search functionality
  setupSearch();
  
  // Setup mobile menu
  setupMobileMenu();
  
  // Add glow animation to menu toggle on page load (mobile only)
  if (window.innerWidth <= 768) {
    menuToggle.classList.add('glow-animation');
  }
});

// Setup navigation
function setupNavigation() {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      navigateTo(page);
      
      // Close mobile menu
      sidebar.classList.remove('open');
      menuToggle.classList.remove('open');
    });
  });
}

function navigateTo(page, saveHistory = true) {
  // Save current state to history before navigating
  if (saveHistory && currentPage !== page) {
    navigationHistory.push({
      page: currentPage,
      scrollPosition: window.scrollY
    });
  }
  
  currentPage = page;
  
  // Update nav active state
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.querySelector(`[data-page="${page}"]`).classList.add('active');
  
  // Show correct page
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');
  
  // Initialize page content
  if (page === 'alphabetical') renderAlphabeticalList();
  if (page === 'essential') renderEssentialList();
  
  // Hide back button when navigating via menu
  if (saveHistory) {
    hideBackButton();
  }
}

function goBack() {
  if (navigationHistory.length === 0) return;
  
  const previousState = navigationHistory.pop();
  navigateTo(previousState.page, false);
  
  // Clear search input and result
  input.value = '';
  result.innerHTML = '';
  suggestions.innerHTML = '';
  
  // Restore scroll position
  setTimeout(() => {
    window.scrollTo(0, previousState.scrollPosition);
  }, 0);
  
  hideBackButton();
}

function showBackButton() {
  let backBtn = document.getElementById('backButton');
  if (!backBtn) {
    backBtn = document.createElement('button');
    backBtn.id = 'backButton';
    backBtn.className = 'back-button';
    backBtn.innerHTML = '← Back';
    backBtn.addEventListener('click', goBack);
    document.querySelector('.main-content').prepend(backBtn);
  }
  backBtn.style.display = 'block';
}

function hideBackButton() {
  const backBtn = document.getElementById('backButton');
  if (backBtn) {
    backBtn.style.display = 'none';
  }
}

// Mobile menu setup function
function setupMobileMenu() {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    menuToggle.classList.toggle('open');
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('open');
        menuToggle.classList.remove('open');
      }
    }
  });
}

// Function to remove Greek accents for search
function removeGreekAccents(text) {
  const accentMap = {
    'ά': 'α', 'έ': 'ε', 'ή': 'η', 'ί': 'ι', 'ό': 'ο', 'ύ': 'υ', 'ώ': 'ω',
    'Ά': 'Α', 'Έ': 'Ε', 'Ή': 'Η', 'Ί': 'Ι', 'Ό': 'Ο', 'Ύ': 'Υ', 'Ώ': 'Ω',
    'ΐ': 'ι', 'ΰ': 'υ', 'ϊ': 'ι', 'ϋ': 'υ', 'ΐ': 'ι', 'ΰ': 'υ'
  };
  return text.split('').map(char => accentMap[char] || char).join('');
}

// Function to convert Greek to Latin transliteration for search
function greekToLatin(text) {
  text = removeGreekAccents(text.toLowerCase());
  
  // Handle two-letter combinations first
  text = text.replace(/θ/g, 'th')
           .replace(/χ/g, 'ch')
           .replace(/ψ/g, 'ps')
           .replace(/ου/g, 'ou')
           .replace(/αι/g, 'ai')
           .replace(/ει/g, 'ei')
           .replace(/οι/g, 'oi');
  
  // Single letter mappings
  const latinMap = {
    'α': 'a', 'β': 'v', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z',
    'η': 'i', 'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n',
    'ξ': 'x', 'ο': 'o', 'π': 'p', 'ρ': 'r', 'σ': 's', 'ς': 's',
    'τ': 't', 'υ': 'y', 'φ': 'f', 'ω': 'o'
  };
  
  return text.split('').map(char => latinMap[char] || char).join('');
}

// Search functionality setup
function setupSearch() {
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    const queryNoAccents = removeGreekAccents(query);
    suggestions.innerHTML = "";
    
    if (query.length === 0) {
      result.innerHTML = "";
      return;
    }
    
    // Check if input is Latin characters (not Greek)
    const isLatinInput = /^[a-z]+$/.test(query);
    
    // Match verbs with or without accents, or via Latin transliteration
    const matches = verbList.filter(v => {
      const verbNoAccents = removeGreekAccents(v.toLowerCase());
      
      if (isLatinInput) {
        // Convert Greek verb to Latin and compare
        const verbLatin = greekToLatin(v);
        return verbLatin.startsWith(query);
      } else {
        // Greek input - match with or without accents
        return verbNoAccents.startsWith(queryNoAccents);
      }
    });
    
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
    
    // Try exact match with or without accents
    if (verbs[query]) {
      showVerb(query);
    } else {
      let exactMatch;
      
      if (isLatinInput) {
        // Find verb that matches Latin transliteration
        exactMatch = verbList.find(v => greekToLatin(v) === query);
      } else {
        // Find verb that matches without accents
        exactMatch = verbList.find(v => removeGreekAccents(v.toLowerCase()) === queryNoAccents);
      }
      
      if (exactMatch) {
        showVerb(exactMatch);
      } else {
        result.innerHTML = "";
      }
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
}

// Tense color mapping
const tenseClasses = {
  "Ενεστώτας (Present)": "tense-present",
  "Μέλλοντας Στιγμιαίος (Simple Future)": "tense-simple-future",
  "Αόριστος (Simple Past)": "tense-aorist",
  "Παρατατικός (Continuous Past)": "tense-continuous-past",
  "Προστακτική (Imperative)": "tense-imperative",
  "Υποτακτική Ενεστώτα (Present Subjunctive)": "tense-subjunctive",
  "Μετοχή Ενεστώτα (Present Participle)": "tense-participle",
  "Παρακείμενος (Present Perfect)": "tense-perfect",
  "Μέλλοντας Εξακολουθητικός (Continuous Future)": "tense-continuous-future",
  "Υποτακτική Αορίστου (Past Subjunctive)": "tense-past-subjunctive",
  "Απαρέμφατο (Simple Infinitive)": "tense-infinitive",
  "Υπερσυντέλικος (Past Perfect)": "tense-past-perfect",
  "Υποτακτική Παρακειμένου (Perfect Subjunctive)": "tense-perfect-subjunctive",
  "Συντελεσμένος Μέλλοντας (Future Perfect)": "tense-future-perfect"
};

// Default tenses to show (in order)
const defaultTenseOrder = [
  'Ενεστώτας (Present)',
  'Μέλλοντας Στιγμιαίος (Simple Future)',
  'Αόριστος (Simple Past)',
  'Παρατατικός (Continuous Past)',
  'Προστακτική Στιγμιαία (Simple Imperative)',
  'Προστακτική Εξακολουθητική (Cont. Imperative)'
];

// Additional tenses to show when "Show More" is clicked
const additionalTenseOrder = [
  'Μέλλοντας Εξακολουθητικός (Continuous Future)',
  'Υποτακτική Ενεστώτα (Present Subjunctive)',
  'Υποτακτική Αορίστου (Past Subjunctive)',
  'Παρακείμενος (Present Perfect)',
  'Υπερσυντέλικος (Past Perfect)',
  'Υποτακτική Παρακειμένου (Perfect Subjunctive)',
  'Συντελεσμένος Μέλλοντας (Future Perfect)',
  'Μετοχή Ενεστώτα (Present Participle)',
  'Απαρέμφατο (Simple Infinitive)'
];

// Imperative tense names that should be combined
const imperativeTenses = [
  'Προστακτική Στιγμιαία (Simple Imperative)',
  'Προστακτική Εξακολουθητική (Cont. Imperative)'
];

// Special forms (single value forms)
const specialForms = [
  'Μετοχή Ενεστώτα (Present Participle)',
  'Απαρέμφατο (Simple Infinitive)'
];

function showVerb(verb) {
  result.innerHTML = "";

  if (!verbs[verb]) {
    result.innerHTML = `<p class="not-found">Verb "${verb}" not found</p>`;
    return;
  }

  const data = verbs[verb];

  // Create header with verb name and meaning
  const header = document.createElement("div");
  header.className = "verb-header";
  let headerHTML = `<h2>${verb}</h2><span class="meaning">${data.meaning}</span>`;
  
  // Add voice badge if available
  if (data.voice) {
    const voiceBadge = data.voice === 'Active' ? 'Ενεργητική' : 'Παθητική';
    headerHTML += `<span class="voice-badge ${data.voice.toLowerCase()}">${voiceBadge}</span>`;
  }
  
  header.innerHTML = headerHTML;
  result.appendChild(header);

  // Container for default tenses
  const defaultContainer = document.createElement("div");
  defaultContainer.className = "tenses-container default-tenses";
  
  // Process default tenses
  let hasImperative = false;
  const imperativeData = {};
  
  defaultTenseOrder.forEach(tense => {
    // Check if this tense exists in the verb data
    if (!data[tense]) return;
    
    // Handle imperatives - collect them for combined table
    if (imperativeTenses.includes(tense)) {
      hasImperative = true;
      imperativeData[tense] = data[tense];
      return;
    }
    
    // Create table for regular tenses
    const table = createTenseTable(tense, data[tense]);
    defaultContainer.appendChild(table);
  });
  
  // Add combined imperative table if we have imperative data
  if (hasImperative) {
    const imperativeTable = createCombinedImperativeTable(imperativeData);
    defaultContainer.appendChild(imperativeTable);
  }
  
  result.appendChild(defaultContainer);
  
  // Check if there are additional tenses
  const hasAdditionalTenses = additionalTenseOrder.some(tense => data[tense]);
  
  if (hasAdditionalTenses) {
    // Container for additional tenses (hidden by default)
    const additionalContainer = document.createElement("div");
    additionalContainer.className = "tenses-container additional-tenses";
    additionalContainer.style.display = "none";
    
    additionalTenseOrder.forEach(tense => {
      if (!data[tense]) return;
      
      // Handle special forms (participles, infinitives)
      if (specialForms.includes(tense)) {
        const table = createSpecialFormTable(tense, data[tense]);
        additionalContainer.appendChild(table);
      } else {
        const table = createTenseTable(tense, data[tense]);
        additionalContainer.appendChild(table);
      }
    });
    
    result.appendChild(additionalContainer);
    
    // Add "Show More Tenses" button
    const toggleButton = document.createElement("button");
    toggleButton.className = "toggle-tenses-btn";
    toggleButton.innerHTML = `
      <span class="btn-text-show">Show More Tenses</span>
      <span class="btn-text-hide" style="display: none;">Show Less</span>
      <svg class="btn-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 10.5l-4-4h8l-4 4z"/>
      </svg>
    `;
    
    toggleButton.addEventListener("click", () => {
      const isHidden = additionalContainer.style.display === "none";
      additionalContainer.style.display = isHidden ? "block" : "none";
      toggleButton.querySelector(".btn-text-show").style.display = isHidden ? "none" : "inline";
      toggleButton.querySelector(".btn-text-hide").style.display = isHidden ? "inline" : "none";
      toggleButton.classList.toggle("expanded", isHidden);
      
      // Toggle 3rd person imperative rows
      const thirdPersonRows = result.querySelectorAll('.imperative-third-person');
      thirdPersonRows.forEach(row => {
        row.style.display = isHidden ? 'table-row' : 'none';
      });
    });
    
    result.appendChild(toggleButton);
  }
}

// Helper function to extract English name from tense name
function getEnglishTenseName(tenseName) {
  const match = tenseName.match(/\(([^)]+)\)/);
  return match ? match[1] : tenseName;
}

// Helper function to create a tense table
function createTenseTable(tenseName, tenseData) {
  const table = document.createElement("table");
  const tenseClass = tenseClasses[tenseName] || "";
  table.className = tenseClass;
  
  const caption = document.createElement("caption");
  caption.textContent = getEnglishTenseName(tenseName);
  table.appendChild(caption);

  for (const person in tenseData) {
    const row = table.insertRow();
    row.insertCell().textContent = person;
    row.insertCell().textContent = tenseData[person];
  }

  return table;
}

// Helper function to create combined imperative table
function createCombinedImperativeTable(imperativeData) {
  const table = document.createElement("table");
  table.className = tenseClasses["Προστακτική (Imperative)"] || "tense-imperative";
  
  const caption = document.createElement("caption");
  caption.textContent = "Imperative";
  table.appendChild(caption);

  // Get the two imperative types
  const simpleImperative = imperativeData['Προστακτική Στιγμιαία (Simple Imperative)'];
  const contImperative = imperativeData['Προστακτική Εξακολουθητική (Cont. Imperative)'];
  
  // Create header row
  const headerRow = table.insertRow();
  headerRow.insertCell(); // Empty cell for person label
  if (simpleImperative) {
    const simpleHeader = headerRow.insertCell();
    simpleHeader.textContent = "Simple";
    simpleHeader.className = "imperative-header";
  }
  if (contImperative) {
    const contHeader = headerRow.insertCell();
    contHeader.textContent = "Continuous";
    contHeader.className = "imperative-header";
  }

  // Get all persons (from whichever imperative exists)
  const persons = Object.keys(simpleImperative || contImperative);
  
  // Create rows for each person
  persons.forEach((person, index) => {
    const row = table.insertRow();
    
    // Add class to 3rd person rows (index 1 and 3)
    if (person === 'αυτός/ή/ό' || person === 'αυτοί/ές/ά') {
      row.className = 'imperative-third-person';
    }
    
    row.insertCell().textContent = person;
    
    if (simpleImperative) {
      row.insertCell().textContent = simpleImperative[person] || '—';
    }
    if (contImperative) {
      row.insertCell().textContent = contImperative[person] || '—';
    }
  });

  return table;
}

// Helper function to create special form table (participle, infinitive)
function createSpecialFormTable(tenseName, tenseData) {
  const table = document.createElement("table");
  const tenseClass = tenseClasses[tenseName] || "";
  table.className = `${tenseClass} special-form`;
  
  const caption = document.createElement("caption");
  caption.textContent = getEnglishTenseName(tenseName);
  table.appendChild(caption);

  const row = table.insertRow();
  const cell = row.insertCell();
  cell.textContent = tenseData.form || tenseData;
  cell.colSpan = 2; // Make it span the full width

  return table;
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
  // Save current page to history before navigating
  if (currentPage !== 'search') {
    navigationHistory.push({
      page: currentPage,
      scrollPosition: window.scrollY
    });
  }
  
  navigateTo('search', false);
  input.value = verb;
  showVerb(verb);
  showBackButton();
  
  // Scroll to top on mobile
  window.scrollTo(0, 0);
}
