// Merge all extra verb data into main verbs object
Object.assign(verbs, verbsExtra1, verbsExtra2, verbsExtra3, verbsExtra4);
// Merge newly extracted verbs (600 verbs from the book)
Object.assign(verbs, verbs_new, verbs_new_new_1, verbs_new_new_2, verbs_new_new_3);

// Get all verb names for autocomplete
const verbList = Object.keys(verbs);

// Most common Greek verbs to show when clicking empty search
const commonVerbs = [
  'είμαι',    // to be
  'έχω',      // to have
  'κάνω',     // to do/make
  'πάω',      // to go
  'λέω',      // to say
  'βλέπω',    // to see
  'θέλω',     // to want
  'ξέρω',     // to know
  'έρχομαι',  // to come
  'δίνω'      // to give
];

// Navigation history
let navigationHistory = [];
let currentPage = 'search';

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
    menuToggle.classList.remove('open');
  });
});

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
  if (page === 'flashcards') initFlashcards();
  
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

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  menuToggle.classList.toggle('open');
  // Stop the pulse animation after first click
  menuToggle.classList.add('clicked');
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

// Build reverse lookup: conjugated form -> infinitive verb
const conjugatedLookup = {};
verbList.forEach(infinitive => {
  const verbData = verbs[infinitive];
  // Loop through all tenses
  for (const tense in verbData) {
    if (tense === "meaning") continue;
    // Loop through all persons in each tense
    for (const person in verbData[tense]) {
      const conjugatedForm = verbData[tense][person];
      // Map this conjugated form to its infinitive (store without accents)
      if (conjugatedForm && conjugatedForm.trim()) {
        const formNoAccents = removeGreekAccents(conjugatedForm.toLowerCase());
        conjugatedLookup[formNoAccents] = infinitive;
        
        // Also create Latin transliteration lookup
        const formLatin = greekToLatin(conjugatedForm);
        conjugatedLookup[formLatin] = infinitive;
      }
    }
  }
});

// Show common verbs when clicking on empty search
input.addEventListener("focus", () => {
  if (input.value.trim() === "") {
    showCommonVerbs();
  }
});

function showCommonVerbs() {
  suggestions.innerHTML = "";
  
  commonVerbs.forEach(verb => {
    if (verbs[verb]) {
      const div = document.createElement("div");
      div.className = "suggestion common-verb";
      div.innerHTML = `<strong>${verb}</strong> — ${verbs[verb].meaning}`;
      div.addEventListener("click", () => {
        input.value = verb;
        suggestions.innerHTML = "";
        showVerb(verb);
      });
      suggestions.appendChild(div);
    }
  });
}

// Search functionality
input.addEventListener("input", () => {
  const query = input.value.trim().toLowerCase();
  const queryNoAccents = removeGreekAccents(query);
  suggestions.innerHTML = "";
  
  if (query.length === 0) {
    result.innerHTML = "";
    showCommonVerbs();
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
      // Check if it's a conjugated form (works for both Greek and Latin)
      const lookupKey = isLatinInput ? query : queryNoAccents;
      const infinitive = conjugatedLookup[lookupKey];
      if (infinitive) {
        showVerb(infinitive, query);
      } else {
        result.innerHTML = "";
      }
    }
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = input.value.trim();
    const queryLower = query.toLowerCase();
    const queryNoAccents = removeGreekAccents(queryLower);
    const isLatinInput = /^[a-z]+$/.test(queryLower);
    suggestions.innerHTML = "";
    
    // Try direct match first
    if (verbs[query]) {
      showVerb(query);
    } else {
      // Check if it's infinitive without accents or Latin
      let exactMatch;
      if (isLatinInput) {
        exactMatch = verbList.find(v => greekToLatin(v) === queryLower);
      } else {
        exactMatch = verbList.find(v => removeGreekAccents(v.toLowerCase()) === queryNoAccents);
      }
      
      if (exactMatch) {
        showVerb(exactMatch);
      } else {
        // Check if it's a conjugated form (works for both Greek and Latin)
        const lookupKey = isLatinInput ? queryLower : queryNoAccents;
        const infinitive = conjugatedLookup[lookupKey];
        if (infinitive) {
          showVerb(infinitive, query);
        } else {
          showVerb(query); // Will show "not found" message
        }
      }
    }
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

function showVerb(verb, searchedConjugation = null) {
  result.innerHTML = "";

  if (!verbs[verb]) {
    result.innerHTML = `<p class="not-found">Verb "${verb}" not found</p>`;
    return;
  }

  const data = verbs[verb];

  // Show helpful message if user searched for a conjugated form
  if (searchedConjugation) {
    const notice = document.createElement("div");
    notice.className = "conjugation-notice";
    notice.innerHTML = `<span class="notice-icon">ℹ️</span> You searched for "<strong>${searchedConjugation}</strong>" — showing infinitive: <strong>${verb}</strong>`;
    result.appendChild(notice);
  }

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

// =====================================================
// FLASH CARDS
// =====================================================

let flashcardState = {
  cards: [],
  missedCards: [],
  currentIndex: 0,
  correct: 0,
  wrong: 0,
  completed: false,
  isPracticeMode: false
};

function initFlashcards() {
  // Reset state
  flashcardState = {
    cards: [],
    missedCards: [],
    currentIndex: 0,
    correct: 0,
    wrong: 0,
    completed: false,
    isPracticeMode: false
  };
  
  // Get 20 random verbs from available verbs
  const availableVerbs = verbList.filter(v => verbs[v] !== undefined);
  const shuffled = [...availableVerbs].sort(() => Math.random() - 0.5);
  flashcardState.cards = shuffled.slice(0, 20);
  
  renderFlashcards();
  updateFlashcardStats();
  updateFlashcardProgress();
}

function practiceMissedCards() {
  if (flashcardState.missedCards.length === 0) return;
  
  // Set up practice mode with missed cards
  flashcardState.cards = [...flashcardState.missedCards];
  flashcardState.missedCards = [];
  flashcardState.currentIndex = 0;
  flashcardState.correct = 0;
  flashcardState.wrong = 0;
  flashcardState.completed = false;
  flashcardState.isPracticeMode = true;
  
  renderFlashcards();
  updateFlashcardStats();
  updateFlashcardProgress();
}

function renderFlashcards() {
  const track = document.getElementById('flashcardTrack');
  if (!track) return;
  
  track.innerHTML = flashcardState.cards.map((verb, index) => `
    <div class="flashcard" data-index="${index}">
      <div class="flashcard-inner">
        <div class="flashcard-face flashcard-front" onclick="flipCard(${index})">
          <div class="flashcard-verb">${verb}</div>
          <div class="flashcard-hint">What does this mean?</div>
          <div class="flashcard-tap">Tap to reveal</div>
        </div>
        <div class="flashcard-face flashcard-back" onclick="flipCard(${index})">
          <div class="flashcard-meaning">${verbs[verb].meaning}</div>
          <div class="flashcard-tap">Tap to flip back</div>
        </div>
      </div>
    </div>
  `).join('');
  
  // Reset position
  track.style.transform = 'translateX(0)';
}

function flipCard(index) {
  const cards = document.querySelectorAll('.flashcard');
  if (cards[index]) {
    cards[index].classList.toggle('flipped');
  }
}

function goToCard(index) {
  const track = document.getElementById('flashcardTrack');
  if (!track) return;
  
  flashcardState.currentIndex = index;
  track.style.transform = `translateX(-${index * 100}%)`;
}

function markCard(isCorrect) {
  if (flashcardState.completed) return;
  
  const currentCard = document.querySelectorAll('.flashcard')[flashcardState.currentIndex];
  const currentVerb = flashcardState.cards[flashcardState.currentIndex];
  
  if (isCorrect) {
    flashcardState.correct++;
    currentCard?.classList.add('swipe-right');
  } else {
    flashcardState.wrong++;
    flashcardState.missedCards.push(currentVerb); // Track missed card
    currentCard?.classList.add('swipe-left');
  }
  
  updateFlashcardStats();
  updateFlashcardProgress();
  
  // Move to next card after animation
  setTimeout(() => {
    if (flashcardState.currentIndex < flashcardState.cards.length - 1) {
      flashcardState.currentIndex++;
      goToCard(flashcardState.currentIndex);
    } else {
      // All cards completed
      showFlashcardComplete();
    }
  }, 300);
}

function updateFlashcardStats() {
  const correctEl = document.getElementById('correctCount');
  const wrongEl = document.getElementById('wrongCount');
  const remainingEl = document.getElementById('remainingCount');
  
  if (correctEl) correctEl.textContent = flashcardState.correct;
  if (wrongEl) wrongEl.textContent = flashcardState.wrong;
  if (remainingEl) {
    const remaining = flashcardState.cards.length - flashcardState.correct - flashcardState.wrong;
    remainingEl.textContent = remaining;
  }
}

function updateFlashcardProgress() {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;
  
  const total = flashcardState.cards.length;
  const completed = flashcardState.correct + flashcardState.wrong;
  const percentage = (completed / total) * 100;
  progressBar.style.width = `${percentage}%`;
}

function showFlashcardComplete() {
  flashcardState.completed = true;
  
  const track = document.getElementById('flashcardTrack');
  if (!track) return;
  
  const percentage = Math.round((flashcardState.correct / flashcardState.cards.length) * 100);
  let emoji = '🎉';
  let message = 'Great job!';
  
  if (percentage === 100) {
    emoji = '🏆';
    message = 'Perfect Score!';
  } else if (percentage >= 80) {
    emoji = '🌟';
    message = 'Excellent!';
  } else if (percentage >= 60) {
    emoji = '👍';
    message = 'Good work!';
  } else if (percentage < 40) {
    emoji = '💪';
    message = 'Keep practicing!';
  }
  
  // Build practice missed button if there are missed cards
  let practiceButton = '';
  if (flashcardState.missedCards.length > 0) {
    practiceButton = `
      <button class="fc-practice-missed" onclick="practiceMissedCards()">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 2v6h-6"></path>
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
          <path d="M3 22v-6h6"></path>
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
        </svg>
        Practice ${flashcardState.missedCards.length} Missed Card${flashcardState.missedCards.length > 1 ? 's' : ''}
      </button>
    `;
  }
  
  // Show different message if this was practice mode and they got 100%
  let celebrationMessage = '';
  if (flashcardState.isPracticeMode && percentage === 100) {
    celebrationMessage = `<div class="mastery-message">🎊 You've mastered all the cards! 🎊</div>`;
  }
  
  track.innerHTML = `
    <div class="flashcard" style="flex: 0 0 100%; min-width: 100%;">
      <div class="flashcard-complete">
        <div class="emoji">${emoji}</div>
        <h2>${message}</h2>
        <div class="score">
          You got <strong>${flashcardState.correct}</strong> out of <strong>${flashcardState.cards.length}</strong> correct
          <br>(${percentage}%)
        </div>
        ${celebrationMessage}
        ${practiceButton}
      </div>
    </div>
  `;
  track.style.transform = 'translateX(0)';
}

// Flash card button event listeners
document.addEventListener('DOMContentLoaded', () => {
  const btnCorrect = document.getElementById('btnCorrect');
  const btnWrong = document.getElementById('btnWrong');
  const btnFlip = document.getElementById('btnFlip');
  const btnRestart = document.getElementById('btnRestart');
  
  if (btnCorrect) btnCorrect.addEventListener('click', () => markCard(true));
  if (btnWrong) btnWrong.addEventListener('click', () => markCard(false));
  if (btnFlip) btnFlip.addEventListener('click', () => flipCard(flashcardState.currentIndex));
  if (btnRestart) btnRestart.addEventListener('click', initFlashcards);
});