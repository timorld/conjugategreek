"""
Greek Verb Conjugation Scraper
Scrapes from Cooljugator which has clean, consistent data
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re

# Tense mapping (English -> Greek format we use)
TENSE_MAP = {
    "Present": "Ενεστώτας (Present)",
    "θα + Aorist θέμα": "Μέλλοντας Στιγμιαίος (Simple Future)",
    "θα + Present θέμα": "Μέλλοντας Εξακολουθητικός (Continuous Future)",
    "Simple θα + Aorist θέμα": "Μέλλοντας Στιγμιαίος (Simple Future)",
    "Aorist": "Αόριστος (Simple Past)",
    "Past θέμα": "Αόριστος (Simple Past)",
    "Imperfect": "Παρατατικός (Imperfect Past)",
}

PERSONS = ["εγώ", "εσύ", "αυτός/ή/ό", "εμείς", "εσείς", "αυτοί/ές/ά"]


def scrape_cooljugator(verb):
    """Scrape verb conjugation from cooljugator.com"""
    url = f"https://cooljugator.com/gr/{verb}"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"  ✗ Error fetching {verb}: {e}")
        return None
    
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find the verb meaning
    meaning = ""
    meaning_elem = soup.find('div', class_='meta-description')
    if meaning_elem:
        text = meaning_elem.get_text()
        match = re.search(r'means?\s+"([^"]+)"', text, re.I)
        if match:
            meaning = match.group(1)
    
    if not meaning:
        # Try alternate method
        title = soup.find('title')
        if title:
            match = re.search(r'means?\s+(.+?)\s+in', title.get_text(), re.I)
            if match:
                meaning = match.group(1).strip('"').strip()
    
    conjugation_data = {"meaning": meaning or "to " + verb}
    
    # Find conjugation tables
    tense_blocks = soup.find_all('div', class_='conjugation-cell')
    
    # Alternative: look for specific patterns
    for block in soup.find_all(['div', 'ul'], class_=re.compile(r'conjugation|tense', re.I)):
        # Extract tense name
        tense_header = block.find_previous(['h2', 'h3', 'h4', 'div'], class_=re.compile(r'tense-title|heading'))
        if not tense_header:
            continue
            
        tense_name = tense_header.get_text(strip=True)
        
        # Map to our format
        our_tense = None
        for eng, greek in TENSE_MAP.items():
            if eng.lower() in tense_name.lower():
                our_tense = greek
                break
        
        if not our_tense:
            continue
            
        # Extract forms
        forms = block.find_all(['span', 'li'], class_=re.compile(r'form|conjugation'))
        if len(forms) >= 6:
            tense_data = {}
            for i, person in enumerate(PERSONS[:len(forms)]):
                form_text = forms[i].get_text(strip=True)
                if form_text:
                    tense_data[person] = form_text
            
            if tense_data:
                conjugation_data[our_tense] = tense_data
    
    return conjugation_data if len(conjugation_data) > 1 else None


def scrape_wiktionary(verb):
    """Scrape from Greek Wiktionary as backup"""
    url = f"https://el.wiktionary.org/wiki/{verb}"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"  ✗ Error fetching from Wiktionary: {e}")
        return None
    
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Wiktionary has complex structure, basic extraction
    conjugation_data = {"meaning": f"to {verb}"}
    
    # Find tables with conjugation data
    tables = soup.find_all('table', class_=re.compile(r'navbox|inflection'))
    
    for table in tables:
        rows = table.find_all('tr')
        for row in rows:
            cells = row.find_all(['td', 'th'])
            if len(cells) >= 2:
                # Basic extraction - would need refinement for production
                pass
    
    return conjugation_data if len(conjugation_data) > 1 else None


def load_existing_verbs(filename='verbs-data.js'):
    """Load existing verbs from JS file"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            # Extract JSON from JS
            match = re.search(r'const verbs = ({[\s\S]*?});', content)
            if match:
                json_str = match.group(1)
                # Fix trailing commas for valid JSON
                json_str = re.sub(r',\s*}', '}', json_str)
                json_str = re.sub(r',\s*]', ']', json_str)
                return json.loads(json_str)
    except Exception as e:
        print(f"Error loading existing verbs: {e}")
    return {}


def add_verb_manually():
    """Interactive manual verb entry"""
    print("\n" + "="*50)
    print("  MANUAL VERB ENTRY")
    print("="*50)
    
    verb = input("\nVerb (e.g., τρέχω): ").strip()
    if not verb:
        return None
        
    meaning = input("Meaning (e.g., to run): ").strip()
    
    verb_data = {"meaning": meaning}
    
    tenses = [
        ("Ενεστώτας (Present)", "Present"),
        ("Μέλλοντας Στιγμιαίος (Simple Future)", "Simple Future - θα + aorist stem"),
        ("Αόριστος (Simple Past)", "Aorist/Simple Past"),
        ("Μέλλοντας Εξακολουθητικός (Continuous Future)", "Continuous Future - θα + present"),
        ("Παρατατικός (Imperfect Past)", "Imperfect Past"),
    ]
    
    for tense_key, tense_desc in tenses:
        print(f"\n--- {tense_desc} ---")
        add = input(f"Add {tense_desc}? (y/n): ").strip().lower()
        
        if add == 'y':
            tense_data = {}
            for person in PERSONS:
                form = input(f"  {person}: ").strip()
                if form:
                    tense_data[person] = form
            
            if tense_data:
                verb_data[tense_key] = tense_data
    
    return {verb: verb_data}


def generate_js_output(verbs_dict):
    """Generate JavaScript file content"""
    
    # Essential verbs list
    essential_list = '''
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
  {verb: "μιλάω", meaning: "to speak"},
  {verb: "ακούω", meaning: "to hear, listen"},
  {verb: "διαβάζω", meaning: "to read"},
  {verb: "γράφω", meaning: "to write"},
  {verb: "μένω", meaning: "to stay, live"},
  {verb: "αγαπάω", meaning: "to love"},
  {verb: "περπατάω", meaning: "to walk"},
  {verb: "κοιμάμαι", meaning: "to sleep"},
  {verb: "ξυπνάω", meaning: "to wake up"},
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
  {verb: "ξεχνάω", meaning: "to forget"},
  {verb: "αρχίζω", meaning: "to begin, start"},
  {verb: "τελειώνω", meaning: "to finish, end"},
  {verb: "ανοίγω", meaning: "to open"},
  {verb: "κλείνω", meaning: "to close"},
  {verb: "στέλνω", meaning: "to send"},
  {verb: "φέρνω", meaning: "to bring"},
  {verb: "βάζω", meaning: "to put"},
  {verb: "βγάζω", meaning: "to take out"},
  {verb: "πετάω", meaning: "to throw, fly"},
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
  {verb: "ρωτάω", meaning: "to ask"},
  {verb: "απαντάω", meaning: "to answer"},
  {verb: "βοηθάω", meaning: "to help"},
  {verb: "πληρώνω", meaning: "to pay"},
  {verb: "αγοράζω", meaning: "to buy"},
  {verb: "πουλάω", meaning: "to sell"},
  {verb: "δοκιμάζω", meaning: "to try, taste"},
  {verb: "χρησιμοποιώ", meaning: "to use"},
  {verb: "ζητάω", meaning: "to ask for, seek"},
  {verb: "προσπαθώ", meaning: "to try, attempt"},
  {verb: "αλλάζω", meaning: "to change"},
  {verb: "συνεχίζω", meaning: "to continue"},
  {verb: "σταματάω", meaning: "to stop"},
  {verb: "γεννιέμαι", meaning: "to be born"},
  {verb: "πεθαίνω", meaning: "to die"},
  {verb: "παντρεύομαι", meaning: "to marry"},
  {verb: "γνωρίζω", meaning: "to know, meet"},
  {verb: "συναντάω", meaning: "to meet"},
  {verb: "χαιρετάω", meaning: "to greet"},
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
  {verb: "τραγουδάω", meaning: "to sing"},
  {verb: "χορεύω", meaning: "to dance"},
  {verb: "μαγειρεύω", meaning: "to cook"},
  {verb: "καθαρίζω", meaning: "to clean"},
  {verb: "πλένω", meaning: "to wash"},
  {verb: "ντύνομαι", meaning: "to dress"},
  {verb: "φοράω", meaning: "to wear"},
  {verb: "κόβω", meaning: "to cut"},
  {verb: "σπάω", meaning: "to break"},
  {verb: "φτιάχνω", meaning: "to fix, make"}
];
'''
    
    # Convert verbs dict to JS
    verbs_json = json.dumps(verbs_dict, ensure_ascii=False, indent=2)
    
    output = f"// Greek Verb Data\nconst verbs = {verbs_json};\n\n{essential_list}"
    
    return output


def save_verbs(verbs_dict, filename='verbs-data.js'):
    """Save verbs to JS file"""
    content = generate_js_output(verbs_dict)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\n✓ Saved {len(verbs_dict)} verbs to {filename}")


def main():
    print("="*60)
    print("  GREEK VERB CONJUGATION DATABASE BUILDER")
    print("="*60)
    
    # For now, just show instructions since scraping may not work perfectly
    print("""
This script helps you build the verb database.

RECOMMENDED APPROACH:
Since Greek verb conjugation is complex (many irregulars),
the most reliable method is to add verbs manually or use
a trusted source.

SOURCES FOR CONJUGATIONS:
1. cooljugator.com/gr/[verb]
2. el.wiktionary.org/wiki/[verb]  
3. lexigram.gr
4. Greek grammar textbooks

The script can:
1. Add verbs manually (most accurate)
2. Try to scrape from websites (may need fixes)
3. Export to verbs-data.js format

Would you like to:
[1] Add a verb manually
[2] Try scraping a verb
[3] View current verbs
[4] Exit
""")
    
    # Load existing
    existing = load_existing_verbs()
    print(f"\nCurrently have {len(existing)} verbs in database.\n")
    
    while True:
        choice = input("\nChoice (1-4): ").strip()
        
        if choice == '1':
            result = add_verb_manually()
            if result:
                existing.update(result)
                save_verbs(existing)
                print("✓ Verb added!")
                
        elif choice == '2':
            verb = input("Enter verb to scrape: ").strip()
            if verb:
                print(f"Trying cooljugator.com...")
                data = scrape_cooljugator(verb)
                if data and len(data) > 1:
                    print(f"✓ Found data for {verb}")
                    print(json.dumps(data, ensure_ascii=False, indent=2))
                    add = input("\nAdd to database? (y/n): ").strip().lower()
                    if add == 'y':
                        existing[verb] = data
                        save_verbs(existing)
                else:
                    print("✗ Could not scrape. Try manual entry.")
                    
        elif choice == '3':
            print(f"\nVerbs in database ({len(existing)}):")
            for v in sorted(existing.keys()):
                print(f"  • {v} - {existing[v].get('meaning', '?')}")
                
        elif choice == '4':
            print("Goodbye!")
            break
        else:
            print("Invalid choice")


if __name__ == "__main__":
    main()
