# Greek Conjugation App 🇬🇷

A modern, responsive web application for conjugating Greek verbs with 599 verbs and 15 tenses.

---

## 🌟 Features

- **599 Greek Verbs** from authentic source material
- **15 Comprehensive Tenses** including Present, Future, Past, Subjunctive, Imperative, Perfect, and more
- **Smart Tense Display** - Shows 6 common tenses by default, expandable to all 15
- **Combined Imperative Table** - Simple and Continuous imperatives side-by-side
- **Voice Indicators** - Active and Passive voice badges
- **Search with Autocomplete** - Search in Greek or Latin transliteration
- **Alphabetical Verb List** - Browse all verbs A-Z
- **100 Essential Verbs** - Curated list of most common verbs
- **Responsive Design** - Works perfectly on mobile and desktop
- **Beautiful UI** - Color-coded tenses with smooth animations

---

## 📁 Project Structure

```
Greek Conjugation App/
├── index.html                    # Main HTML file
├── app.js                        # Application logic
├── style.css                     # Styles
├── verbs-new-database.js         # Database (599 verbs, 15 tenses)
├── favicon.svg                   # Site favicon
├── CNAME                         # Domain configuration
├── Icon/                         # App icons and images
├── Extracted 600 Verbs/          # Source database files
├── DEVELOPMENT_SCRIPTS/          # Conversion and test scripts
├── OLD_DATABASE_FILES_ARCHIVE_20251230/  # Archived old files
└── [Documentation files]
```

---

## 🚀 Quick Start

### View Locally
1. Open `index.html` in your web browser
2. Search for a verb (e.g., "αγαπω")
3. Explore conjugations!

### Deploy to Website
1. Upload all production files to your web server:
   - `index.html`
   - `app.js`
   - `style.css`
   - `verbs-new-database.js`
   - `favicon.svg`
   - `CNAME` (if using custom domain)
   - `Icon/` folder
2. Done!

---

## 📖 Documentation

- **UPDATE_SUMMARY.md** - Database integration details
- **UI_IMPROVEMENTS_SUMMARY.md** - UI changes and improvements
- **COLOR_PALETTE_OPTIONS.md** - 8 color palette options to choose from
- **FOLDER_CLEANUP_REPORT.md** - Folder organization details
- **Extracted 600 Verbs/README.md** - Database documentation

---

## 🎨 Customization

### Change Colors
1. Open `style.css`
2. Find the tense color section (around line 295)
3. Replace gradient values with colors from `COLOR_PALETTE_OPTIONS.md`
4. Save and refresh

### Update Database
1. Place new `greek_verbs.json` in `Extracted 600 Verbs/`
2. Run: `python DEVELOPMENT_SCRIPTS/convert_new_database.py`
3. New `verbs-new-database.js` will be generated
4. Refresh your website

---

## 💡 Default Tenses Display

The app shows these 6 tenses by default:

1. **Present** - Ενεστώτας
2. **Simple Future** - Μέλλοντας Στιγμιαίος
3. **Simple Past** - Αόριστος
4. **Continuous Past** - Παρατατικός
5. **Imperative** - Προστακτική (Combined: Simple & Continuous)

Click "Show More Tenses" to reveal:

6. Present Subjunctive
7. Present Participle
8. Present Perfect
9. Continuous Future
10. Past Subjunctive
11. Simple Infinitive
12. Past Perfect
13. Perfect Subjunctive
14. Future Perfect

---

## 📊 Database Statistics

- **Total Verbs**: 599
- **Active Voice Verbs**: 515
- **Passive Voice Verbs**: 84
- **Total Tenses**: 15
- **Conjugation Forms**: ~45,500
- **Data Quality**: 100% verified

---

## 🛠️ Technical Details

### Technologies Used
- Pure HTML5, CSS3, JavaScript (no frameworks)
- Responsive CSS Grid and Flexbox
- Client-side search with accent-insensitive matching
- Latin transliteration support

### Browser Support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Fast loading (database loads once)
- Instant search results
- Smooth animations
- No external dependencies

---

## 📱 Pages

1. **Search** - Search and conjugate any verb
2. **All Verbs A-Z** - Alphabetical list of all 599 verbs
3. **100 Essential Verbs** - Most common verbs for beginners
4. **Flash Cards** - Coming soon!

---

## 🎯 Key Features Explained

### Smart Tense Display
- Shows most common tenses first
- Expandable to see all 15 tenses
- Reduces visual clutter for beginners
- Advanced learners can access all tenses

### Combined Imperative Table
- Simple and Continuous forms side-by-side
- Easy comparison of imperative moods
- Shows 2nd person forms by default
- 3rd person forms revealed with "Show More"

### Voice Badges
- Active voice: Green badge (Ενεργητική)
- Passive voice: Orange badge (Παθητική)
- Helps learners distinguish verb types

### Accent-Insensitive Search
- Type with or without accents
- Latin transliteration supported
- Autocomplete suggestions
- Fuzzy matching for easier learning

---

## 📝 Version History

### v2.0 - December 30, 2025
- ✅ Integrated new 599-verb database
- ✅ Added 15 comprehensive tenses
- ✅ Implemented smart tense display
- ✅ Combined imperative table
- ✅ Enhanced UI with voice badges
- ✅ Improved color scheme
- ✅ Better typography (bold, larger titles)
- ✅ English-only tense names
- ✅ Cleaned up folder structure

### v1.0 - Previous Version
- Initial release with basic conjugation
- ~300 verbs, 5 tenses

---

## 🙏 Credits

- **Verb Database**: Extracted from "600 Modern Greek Verbs Fully Conjugated"
- **Development**: Greek Conjugation App Team
- **Testing**: Community contributors

---

## 📧 Contact

For questions, suggestions, or issues:
- Website: [conjugategreek.com](https://www.conjugategreek.com)
- Support: [Buy Me a Coffee](https://buymeacoffee.com/timor)

---

## 📄 License

This project is for educational purposes. Verb data extracted from published reference material.

---

**Happy Learning! 🎓**

*Learn Greek verb conjugations the easy way!*

