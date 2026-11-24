/* Nagrik Sahayata — नागरिक सहायता
 * A Hindi-first civic-rights helper for India.
 * Core logic is pure and testable in Node; all browser/DOM code is
 * guarded so this file can be required by tests without a DOM.
 */
'use strict';

var GUIDES = [
  {
    id: 'rti',
    category: 'soochna',
    titleHi: 'RTI — सूचना का अधिकार',
    titleEn: 'RTI — Right to Information',
    feeHi: 'शुल्क: ₹10 (ऑनलाइन या IPO/नकद)',
    feeEn: 'Fee: ₹10 (online or IPO/cash)',
    timeHi: 'जवाब: 30 दिन के भीतर',
    timeEn: 'Reply: within 30 days',
    helpline: 'rtionline.gov.in',
    stepsHi: [
      'किस विभाग से जानकारी चाहिए, यह तय करें (जैसे नगर निगम, बिजली विभाग)।',
      'अपना सवाल साफ़-साफ़ लिखें — एक आवेदन में एक विषय रखें।',
      'rtionline.gov.in पर ऑनलाइन आवेदन करें या विभाग के PIO को पत्र भेजें।',
      '₹10 शुल्क ऑनलाइन भरें या IPO/नकद से जमा करें।',
      'आवेदन संख्या संभालकर रखें; 30 दिन में जवाब न मिले तो First Appeal करें।'
    ],
    stepsEn: [
      'Decide which department holds the information (e.g. municipal corporation, electricity department).',
      'Write your question clearly — keep one subject per application.',
      'Apply online at rtionline.gov.in or send a letter to the department PIO.',
      'Pay the ₹10 fee online or by IPO/cash.',
      'Keep your application number; if there is no reply in 30 days, file a First Appeal.'
    ],
    docsHi: ['पहचान पत्र (आधार/वोटर ID)', 'आवेदन की प्रति', 'शुल्क की रसीद'],
    docsEn: ['ID proof (Aadhaar/voter ID)', 'Copy of the application', 'Fee payment receipt'],
    links: [
      { label: 'RTI Online Portal', url: 'https://rtionline.gov.in/' },
      { label: 'Central Information Commission', url: 'https://cic.gov.in/' }
    ]
  },
  {
    id: 'consumer',
    category: 'upbhokta',
    titleHi: 'उपभोक्ता शिकायत — Consumer Complaint',
    titleEn: 'Consumer Complaint',
    feeHi: 'शुल्क: हेल्पलाइन मुफ़्त; e-Daakhil पर शुल्क मूल्य के अनुसार',
    feeEn: 'Fee: helpline is free; e-Daakhil fee depends on claim value',
    timeHi: 'हेल्पलाइन: 1915 (टोल-फ्री)',
    timeEn: 'Helpline: 1915 (toll-free)',
    helpline: '1915',
    stepsHi: [
      'बिल, रसीद, वारंटी कार्ड और विक्रेता से बातचीत का रिकॉर्ड संभालें।',
      'पहले विक्रेता/कंपनी को लिखित शिकायत दें और 7–15 दिन इंतज़ार करें।',
      'समाधान न मिले तो 1915 पर कॉल करें या consumerhelpline.gov.in पर शिकायत दर्ज करें।',
      'मुआवज़ा चाहिए तो edaakhil.nic.in पर उपभोक्ता आयोग में केस दर्ज करें।',
      'केस संख्या संभालें और सुनवाई की तारीख पर उपस्थित रहें।'
    ],
    stepsEn: [
      'Keep the bill, receipt, warranty card and a record of talks with the seller.',
      'First complain in writing to the seller/company and wait 7–15 days.',
      'If unresolved, call 1915 or file at consumerhelpline.gov.in.',
      'For compensation, file a case with the consumer commission at edaakhil.nic.in.',
      'Keep your case number and attend the hearing date.'
    ],
    docsHi: ['बिल/रसीद', 'वारंटी/गारंटी कार्ड', 'शिकायत की प्रति', 'पहचान पत्र'],
    docsEn: ['Bill/receipt', 'Warranty/guarantee card', 'Copy of the complaint', 'ID proof'],
    links: [
      { label: 'National Consumer Helpline', url: 'https://consumerhelpline.gov.in/' },
      { label: 'e-Daakhil — Consumer Commission', url: 'https://edaakhil.nic.in/' }
    ]
  },
  {
    id: 'police',
    category: 'police',
    titleHi: 'पुलिस शिकायत / FIR',
    titleEn: 'Police Complaint / FIR',
    feeHi: 'शुल्क: कोई शुल्क नहीं — FIR मुफ़्त है',
    feeEn: 'Fee: none — an FIR is free',
    timeHi: 'आपातकाल: 112 | FIR की प्रति मुफ़्त मिलती है',
    timeEn: 'Emergency: 112 | FIR copy is free',
    helpline: '112',
    stepsHi: [
      'घटना की तारीख, समय, स्थान और जो हुआ, उसे क्रम से लिख लें।',
      'नज़दीकी थाने जाएँ या राज्य की ऑनलाइन पुलिस पोर्टल पर शिकायत दर्ज करें।',
      'संज्ञेय अपराध (चोरी, मारपीट, धोखाधड़ी) पर FIR दर्ज करवाएँ — FIR लिखित में लें।',
      'FIR की मुफ़्त प्रति लें और FIR संख्या संभालें।',
      'FIR दर्ज न हो तो SP/DCP कार्यालय या ऑनलाइन शिकायत पोर्टल पर शिकायत करें।'
    ],
    stepsEn: [
      'Write down the date, time, place and what happened, in order.',
      'Visit the nearest police station or use your state police online portal.',
      'For cognisable offences (theft, assault, fraud), get an FIR registered — in writing.',
      'Take the free copy of the FIR and keep the FIR number.',
      'If the FIR is refused, complain to the SP/DCP office or the online grievance portal.'
    ],
    docsHi: ['पहचान पत्र', 'घटना से जुड़े सबूत (फोटो/बिल/चैट)', 'गवाहों के नाम (यदि हों)'],
    docsEn: ['ID proof', 'Evidence (photos/bills/chats)', 'Witness names (if any)'],
    links: [
      { label: 'Emergency Helpline', url: 'https://www.india.gov.in/' }
    ]
  },
  {
    id: 'cybercrime',
    category: 'cyber',
    titleHi: 'साइबर अपराध — Cybercrime Report',
    titleEn: 'Cybercrime Report',
    feeHi: 'शुल्क: कोई शुल्क नहीं',
    feeEn: 'Fee: none',
    timeHi: 'हेल्पलाइन: 1930 (ऑनलाइन ठगी) | पोर्टल: cybercrime.gov.in',
    timeEn: 'Helpline: 1930 (online fraud) | Portal: cybercrime.gov.in',
    helpline: '1930',
    stepsHi: [
      'पैसे गए हों तो तुरंत 1930 पर कॉल करें — जल्दी कॉल से पैसा रुक सकता है।',
      'बैंक को तुरंत सूचित करें और खाता/कार्ड ब्लॉक करवाएँ।',
      'स्क्रीनशॉट, लिंक, फ़ोन नंबर, UPI ID और ट्रांज़ैक्शन ID संभालें।',
      'cybercrime.gov.in पर शिकायत दर्ज करें — OTP/खाता विवरण किसी से साझा न करें।',
      'शिकायत संख्या संभालें और अपने बैंक/पुलिस से फॉलो-अप करें।'
    ],
    stepsEn: [
      'If money was lost, call 1930 immediately — a quick call can freeze the money.',
      'Inform your bank at once and get the account/card blocked.',
      'Save screenshots, links, phone numbers, UPI IDs and transaction IDs.',
      'File a complaint at cybercrime.gov.in — never share OTPs or account details with anyone.',
      'Keep the complaint number and follow up with your bank/police.'
    ],
    docsHi: ['ट्रांज़ैक्शन ID / बैंक स्टेटमेंट', 'स्क्रीनशॉट और लिंक', 'ठग का नंबर/UPI ID', 'पहचान पत्र'],
    docsEn: ['Transaction ID / bank statement', 'Screenshots and links', 'Fraudster number/UPI ID', 'ID proof'],
    links: [
      { label: 'National Cybercrime Reporting Portal', url: 'https://cybercrime.gov.in/' }
    ]
  },
  {
    id: 'cpgrams',
    category: 'shikayat',
    titleHi: 'सरकारी शिकायत — CPGRAMS',
    titleEn: 'Government Grievance — CPGRAMS',
    feeHi: 'शुल्क: कोई शुल्क नहीं',
    feeEn: 'Fee: none',
    timeHi: 'पोर्टल: pgportal.gov.in',
    timeEn: 'Portal: pgportal.gov.in',
    helpline: 'pgportal.gov.in',
    stepsHi: [
      'किस विभाग के खिलाफ शिकायत है, यह तय करें (केंद्र सरकार के लिए CPGRAMS)।',
      'pgportal.gov.in पर रजिस्टर करें और शिकायत विस्तार से लिखें।',
      'संबंधित दस्तावेज़ (आवेदन, रसीद, पत्र) अपलोड करें।',
      'शिकायत संख्या से स्टेटस ट्रैक करें; विभाग को जवाब देना होता है।',
      'जवाब से संतुष्ट न हों तो उसी पोर्टल पर अपील/रिमाइंडर भेजें।'
    ],
    stepsEn: [
      'Decide which department the grievance is against (CPGRAMS is for central government).',
      'Register at pgportal.gov.in and write the grievance in detail.',
      'Upload supporting documents (applications, receipts, letters).',
      'Track status with your grievance number; the department must reply.',
      'If unsatisfied with the reply, send an appeal/reminder on the same portal.'
    ],
    docsHi: ['पहचान पत्र', 'पहले के आवेदन/पत्र की प्रति', 'संबंधित रसीद/सबूत'],
    docsEn: ['ID proof', 'Copies of earlier applications/letters', 'Related receipts/evidence'],
    links: [
      { label: 'CPGRAMS — pgportal.gov.in', url: 'https://pgportal.gov.in/' }
    ]
  },
  {
    id: 'ration',
    category: 'shikayat',
    titleHi: 'राशन कार्ड / जन सेवा — Public Services',
    titleEn: 'Ration Card / Public Services',
    feeHi: 'शुल्क: सरकारी शुल्क अनुसार (आमतौर पर नाममात्र)',
    feeEn: 'Fee: as per government schedule (usually nominal)',
    timeHi: 'राज्य पोर्टल / जन सेवा केंद्र (CSC)',
    timeEn: 'State portal / Common Service Centre (CSC)',
    helpline: 'CSC / राज्य खाद्य विभाग',
    stepsHi: [
      'अपने राज्य का खाद्य/राशन पोर्टल या नज़दीकी जन सेवा केंद्र (CSC) खोजें।',
      'नया राशन कार्ड, नाम जोड़ना/हटाना या सुधार के लिए फॉर्म भरें।',
      'आधार, पते का प्रमाण और परिवार के सदस्यों के दस्तावेज़ जमा करें।',
      'रसीद/आवेदन संख्या संभालें और ऑनलाइन स्टेटस देखें।',
      'देरी हो तो CPGRAMS या राज्य शिकायत पोर्टल पर शिकायत करें।'
    ],
    stepsEn: [
      'Find your state food/ration portal or the nearest Common Service Centre (CSC).',
      'Fill the form for a new ration card, adding/removing a name, or a correction.',
      'Submit Aadhaar, address proof and family members’ documents.',
      'Keep the receipt/application number and check status online.',
      'If delayed, complain on CPGRAMS or your state grievance portal.'
    ],
    docsHi: ['आधार कार्ड', 'पते का प्रमाण', 'परिवार के सदस्यों के आधार', 'पासपोर्ट फोटो'],
    docsEn: ['Aadhaar card', 'Address proof', 'Family members’ Aadhaar', 'Passport photo'],
    links: [
      { label: 'National Food Security Portal', url: 'https://nfsa.gov.in/' }
    ]
  }
];

var CATEGORIES = [
  { id: 'all', labelHi: 'सभी', labelEn: 'All' },
  { id: 'soochna', labelHi: 'सूचना', labelEn: 'Information' },
  { id: 'upbhokta', labelHi: 'उपभोक्ता', labelEn: 'Consumer' },
  { id: 'police', labelHi: 'पुलिस', labelEn: 'Police' },
  { id: 'cyber', labelHi: 'साइबर', labelEn: 'Cyber' },
  { id: 'shikayat', labelHi: 'शिकायत', labelEn: 'Grievance' }
];

var TEMPLATES = [
  {
    id: 'rti-letter',
    titleHi: 'RTI आवेदन पत्र',
    titleEn: 'RTI Application Letter',
    guideId: 'rti',
    fields: [
      { key: 'name', labelHi: 'आपका नाम', labelEn: 'Your name', required: true },
      { key: 'address', labelHi: 'पता', labelEn: 'Address', required: true },
      { key: 'department', labelHi: 'विभाग का नाम', labelEn: 'Department name', required: true },
      { key: 'question', labelHi: 'जानकारी का सवाल', labelEn: 'Information requested', required: true },
      { key: 'date', labelHi: 'तारीख', labelEn: 'Date', required: false }
    ]
  },
  {
    id: 'consumer-letter',
    titleHi: 'उपभोक्ता शिकायत पत्र',
    titleEn: 'Consumer Complaint Letter',
    guideId: 'consumer',
    fields: [
      { key: 'name', labelHi: 'आपका नाम', labelEn: 'Your name', required: true },
      { key: 'address', labelHi: 'पता', labelEn: 'Address', required: true },
      { key: 'seller', labelHi: 'विक्रेता/कंपनी का नाम', labelEn: 'Seller/company name', required: true },
      { key: 'details', labelHi: 'समस्या का विवरण (बिल नं., तारीख, राशि)', labelEn: 'Problem details (bill no., date, amount)', required: true },
      { key: 'date', labelHi: 'तारीख', labelEn: 'Date', required: false }
    ]
  },
  {
    id: 'police-letter',
    titleHi: 'पुलिस शिकायत पत्र',
    titleEn: 'Police Complaint Letter',
    guideId: 'police',
    fields: [
      { key: 'name', labelHi: 'आपका नाम', labelEn: 'Your name', required: true },
      { key: 'address', labelHi: 'पता', labelEn: 'Address', required: true },
      { key: 'station', labelHi: 'थाने का नाम', labelEn: 'Police station name', required: true },
      { key: 'details', labelHi: 'घटना का विवरण (तारीख, समय, स्थान)', labelEn: 'Incident details (date, time, place)', required: true },
      { key: 'date', labelHi: 'तारीख', labelEn: 'Date', required: false }
    ]
  },
  {
    id: 'grievance-letter',
    titleHi: 'सरकारी शिकायत पत्र',
    titleEn: 'Government Grievance Letter',
    guideId: 'cpgrams',
    fields: [
      { key: 'name', labelHi: 'आपका नाम', labelEn: 'Your name', required: true },
      { key: 'address', labelHi: 'पता', labelEn: 'Address', required: true },
      { key: 'department', labelHi: 'विभाग का नाम', labelEn: 'Department name', required: true },
      { key: 'details', labelHi: 'शिकायत का विवरण', labelEn: 'Grievance details', required: true },
      { key: 'date', labelHi: 'तारीख', labelEn: 'Date', required: false }
    ]
  }
];

/* ---------- pure helpers ---------- */

function getGuide(id) {
  for (var i = 0; i < GUIDES.length; i++) if (GUIDES[i].id === id) return GUIDES[i];
  return null;
}

function getTemplate(id) {
  for (var i = 0; i < TEMPLATES.length; i++) if (TEMPLATES[i].id === id) return TEMPLATES[i];
  return null;
}

function normalise(q) {
  return String(q == null ? '' : q).trim().toLowerCase();
}

/* Search guides by free text (Hindi or English). Empty query returns all. */
function searchGuides(query, lang) {
  var q = normalise(query);
  if (!q) return GUIDES.slice();
  var out = [];
  for (var i = 0; i < GUIDES.length; i++) {
    var g = GUIDES[i];
    var hay = [
      g.titleHi, g.titleEn, g.feeHi, g.feeEn, g.helpline, g.category
    ].concat(g.stepsHi, g.stepsEn, g.docsHi, g.docsEn).join(' ').toLowerCase();
    if (hay.indexOf(q) !== -1) out.push(g);
  }
  return out;
}

function filterGuidesByCategory(category) {
  if (!category || category === 'all') return GUIDES.slice();
  var out = [];
  for (var i = 0; i < GUIDES.length; i++) if (GUIDES[i].category === category) out.push(GUIDES[i]);
  return out;
}

/* Build a letter from a template + user fields.
 * Returns { ok: true, text } or { ok: false, missing: [labels] }.
 * Never throws on empty/missing input. */
function buildLetter(templateId, fields, lang) {
  var tpl = getTemplate(templateId);
  if (!tpl) return { ok: false, missing: [], error: 'unknown-template' };
  fields = fields || {};
  var missing = [];
  var clean = {};
  for (var i = 0; i < tpl.fields.length; i++) {
    var f = tpl.fields[i];
    var v = String(fields[f.key] == null ? '' : fields[f.key]).trim();
    clean[f.key] = v;
    if (f.required && !v) missing.push(lang === 'en' ? f.labelEn : f.labelHi);
  }
  if (missing.length) return { ok: false, missing: missing };
  var date = clean.date || new Date().toISOString().slice(0, 10);
  var to = clean.department || clean.seller || clean.station || '';
  var body = clean.question || clean.details || '';
  var lines;
  if (lang === 'en') {
    lines = [
      'To,',
      to,
      '',
      'Subject: ' + (tpl.id === 'rti-letter' ? 'Application under the Right to Information Act, 2005'
        : tpl.id === 'consumer-letter' ? 'Complaint regarding defective product / deficient service'
        : tpl.id === 'police-letter' ? 'Complaint and request to register FIR'
        : 'Grievance regarding public service'),
      '',
      'Respected Sir/Madam,',
      '',
      body,
      '',
      'I request you to kindly take necessary action on the above and inform me of the outcome.',
      '',
      'Thanking you,',
      '',
      clean.name,
      clean.address,
      'Date: ' + date
    ];
  } else {
    lines = [
      'सेवा में,',
      to,
      '',
      'विषय: ' + (tpl.id === 'rti-letter' ? 'सूचना का अधिकार अधिनियम, 2005 के तहत आवेदन'
        : tpl.id === 'consumer-letter' ? 'दोषपूर्ण उत्पाद / सेवा में कमी के संबंध में शिकायत'
        : tpl.id === 'police-letter' ? 'शिकायत एवं FIR दर्ज करने हेतु अनुरोध'
        : 'जन सेवा के संबंध में शिकायत'),
      '',
      'माननीय महोदय/महोदया,',
      '',
      body,
      '',
      'अतः आपसे निवेदन है कि उपरोक्त पर आवश्यक कार्यवाही करें और मुझे परिणाम से अवगत कराएँ।',
      '',
      'सधन्यवाद,',
      '',
      clean.name,
      clean.address,
      'दिनांक: ' + date
    ];
  }
  return { ok: true, text: lines.join('\n') };
}

/* ---------- checklist (localStorage-backed, pure state core) ---------- */

function checklistKey(guideId, stepIndex) {
  return guideId + ':' + stepIndex;
}

/* state: plain object { "guideId:stepIndex": true }. Returns a NEW state object. */
function toggleChecklist(state, guideId, stepIndex) {
  state = state || {};
  var key = checklistKey(guideId, stepIndex);
  var next = {};
  for (var k in state) if (Object.prototype.hasOwnProperty.call(state, k)) next[k] = state[k];
  if (next[key]) delete next[key]; else next[key] = true;
  return next;
}

function checklistProgress(state, guideId) {
  var g = getGuide(guideId);
  if (!g) return { done: 0, total: 0, pct: 0 };
  var total = g.stepsHi.length;
  var done = 0;
  for (var i = 0; i < total; i++) if (state && state[checklistKey(guideId, i)]) done++;
  return { done: done, total: total, pct: total ? Math.round((done / total) * 100) : 0 };
}

function serializeChecklist(state) {
  try { return JSON.stringify(state || {}); } catch (e) { return '{}'; }
}

function parseChecklist(raw) {
  try {
    var v = JSON.parse(raw || '{}');
    if (v && typeof v === 'object' && !Array.isArray(v)) return v;
  } catch (e) { /* fall through */ }
  return {};
}

/* ---------- community help board (pure core) ---------- */

function validatePost(post) {
  var errors = [];
  post = post || {};
  if (!String(post.title || '').trim()) errors.push('title');
  if (!String(post.description || '').trim()) errors.push('description');
  if (post.type !== 'request' && post.type !== 'offer') errors.push('type');
  if (post.category && ['rti', 'consumer', 'police', 'cyber', 'general'].indexOf(post.category) === -1) errors.push('category');
  return errors;
}

/* Returns { ok, posts } — never mutates the input array. */
function addPost(posts, post) {
  var errors = validatePost(post);
  if (errors.length) return { ok: false, errors: errors, posts: posts };
  var entry = {
    id: 'p' + Date.now().toString(36) + Math.floor(Math.random() * 1000),
    type: post.type,
    category: post.category || 'general',
    title: String(post.title).trim(),
    description: String(post.description).trim(),
    location: String(post.location || '').trim(),
    name: String(post.name || '').trim() || 'Anonymous',
    createdAt: new Date().toISOString(),
    resolved: false
  };
  return { ok: true, posts: (posts || []).concat([entry]) };
}

function filterPosts(posts, opts) {
  opts = opts || {};
  var q = normalise(opts.query);
  var out = [];
  for (var i = 0; i < (posts || []).length; i++) {
    var p = posts[i];
    if (opts.type && p.type !== opts.type) continue;
    if (opts.category && opts.category !== 'all' && p.category !== opts.category) continue;
    if (opts.hideResolved && p.resolved) continue;
    if (q) {
      var hay = (p.title + ' ' + p.description + ' ' + (p.location || '') + ' ' + (p.name || '')).toLowerCase();
      if (hay.indexOf(q) === -1) continue;
    }
    out.push(p);
  }
  return out;
}

function toggleResolved(posts, id) {
  return (posts || []).map(function (p) {
    if (p.id !== id) return p;
    var copy = {};
    for (var k in p) copy[k] = p[k];
    copy.resolved = !p.resolved;
    return copy;
  });
}

function serializePosts(posts) {
  try { return JSON.stringify(posts || []); } catch (e) { return '[]'; }
}

function parsePosts(raw) {
  try {
    var v = JSON.parse(raw || '[]');
    if (Array.isArray(v)) return v;
  } catch (e) { /* fall through */ }
  return [];
}

/* ---------- Node export ---------- */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GUIDES: GUIDES, CATEGORIES: CATEGORIES, TEMPLATES: TEMPLATES,
    getGuide: getGuide, getTemplate: getTemplate,
    searchGuides: searchGuides, filterGuidesByCategory: filterGuidesByCategory,
    buildLetter: buildLetter,
    checklistKey: checklistKey, toggleChecklist: toggleChecklist,
    checklistProgress: checklistProgress, serializeChecklist: serializeChecklist,
    parseChecklist: parseChecklist,
    validatePost: validatePost, addPost: addPost, filterPosts: filterPosts,
    toggleResolved: toggleResolved, serializePosts: serializePosts, parsePosts: parsePosts
  };
}

/* ---------- browser UI (only when a DOM exists) ---------- */
if (typeof document !== 'undefined') {
  (function () {
    var lang = 'hi';
    var state = parseChecklist(localStorage.getItem('ns-checklist') || '{}');
    var posts = parsePosts(localStorage.getItem('ns-posts') || '[]');
    var activeCategory = 'all';
    var activeGuide = null;

    function t(hi, en) { return lang === 'en' ? en : hi; }
    function el(id) { return document.getElementById(id); }
    function esc(s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function saveState() { localStorage.setItem('ns-checklist', serializeChecklist(state)); }
    function savePosts() { localStorage.setItem('ns-posts', serializePosts(posts)); }

    function renderCategories() {
      el('cat-filters').innerHTML = CATEGORIES.map(function (c) {
        return '<button class="chip' + (c.id === activeCategory ? ' active' : '') + '" data-cat="' + c.id + '">' +
          esc(lang === 'en' ? c.labelEn : c.labelHi) + '</button>';
      }).join('');
    }

    function renderGuides() {
      var q = el('search').value;
      var list = searchGuides(q, lang).filter(function (g) {
        return activeCategory === 'all' || g.category === activeCategory;
      });
      if (!list.length) {
        el('guide-list').innerHTML = '<p class="empty">' + esc(t('कोई गाइड नहीं मिली। दूसरा शब्द खोजें।', 'No guide found. Try another search.')) + '</p>';
        return;
      }
      el('guide-list').innerHTML = list.map(function (g) {
        var p = checklistProgress(state, g.id);
        return '<article class="card" data-guide="' + g.id + '">' +
          '<h3>' + esc(lang === 'en' ? g.titleEn : g.titleHi) + '</h3>' +
          '<p class="meta">' + esc(lang === 'en' ? g.feeEn : g.feeHi) + ' · ' + esc(lang === 'en' ? g.timeEn : g.timeHi) + '</p>' +
          '<p class="meta">📞 ' + esc(g.helpline) + '</p>' +
          '<div class="progress"><div class="bar" style="width:' + p.pct + '%"></div></div>' +
          '<p class="meta">' + p.done + '/' + p.total + ' ' + esc(t('चरण पूरे', 'steps done')) + ' · ' + p.pct + '%</p>' +
          '<button class="btn" data-open="' + g.id + '">' + esc(t('गाइड खोलें →', 'Open guide →')) + '</button>' +
          '</article>';
      }).join('');
    }

    function renderGuideDetail() {
      var box = el('guide-detail');
      if (!activeGuide) { box.innerHTML = ''; box.hidden = true; return; }
      var g = getGuide(activeGuide);
      var steps = lang === 'en' ? g.stepsEn : g.stepsHi;
      var docs = lang === 'en' ? g.docsEn : g.docsHi;
      var p = checklistProgress(state, g.id);
      box.hidden = false;
      box.innerHTML =
        '<h2>' + esc(lang === 'en' ? g.titleEn : g.titleHi) + '</h2>' +
        '<p class="meta">' + esc(lang === 'en' ? g.feeEn : g.feeHi) + ' · ' + esc(lang === 'en' ? g.timeEn : g.timeHi) + ' · 📞 ' + esc(g.helpline) + '</p>' +
        '<h3>' + esc(t('चरण-दर-चरण', 'Step by step')) + ' (' + p.done + '/' + p.total + ')</h3>' +
        '<ol class="steps">' + steps.map(function (s, i) {
          var done = !!state[checklistKey(g.id, i)];
          return '<li><label><input type="checkbox" data-guide="' + g.id + '" data-step="' + i + '"' + (done ? ' checked' : '') + '> <span class="' + (done ? 'done' : '') + '">' + esc(s) + '</span></label></li>';
        }).join('') + '</ol>' +
        '<h3>' + esc(t('ज़रूरी दस्तावेज़', 'Documents needed')) + '</h3>' +
        '<ul>' + docs.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>' +
        '<h3>' + esc(t('आधिकारिक लिंक', 'Official links')) + '</h3>' +
        '<ul>' + g.links.map(function (l) { return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + '</a></li>'; }).join('') + '</ul>' +
        '<button class="btn secondary" id="close-guide">' + esc(t('बंद करें', 'Close')) + '</button>';
      el('close-guide').addEventListener('click', function () { activeGuide = null; renderGuideDetail(); });
    }

    function renderTemplates() {
      el('template-select').innerHTML = TEMPLATES.map(function (tpl) {
        return '<option value="' + tpl.id + '">' + esc(lang === 'en' ? tpl.titleEn : tpl.titleHi) + '</option>';
      }).join('');
      renderTemplateForm();
    }

    function renderTemplateForm() {
      var tpl = getTemplate(el('template-select').value) || TEMPLATES[0];
      el('template-fields').innerHTML = tpl.fields.map(function (f) {
        return '<label>' + esc(lang === 'en' ? f.labelEn : f.labelHi) + (f.required ? ' *' : '') +
          '<input data-field="' + f.key + '" type="text" placeholder="' + esc(lang === 'en' ? f.labelEn : f.labelHi) + '"></label>';
      }).join('');
      el('letter-output').value = '';
      el('letter-status').textContent = '';
    }

    function renderBoard() {
      var q = el('board-search').value;
      var type = el('board-type').value;
      var list = filterPosts(posts, { query: q, type: type === 'all' ? null : type });
      var box = el('board-list');
      if (!list.length) {
        box.innerHTML = '<p class="empty">' + esc(t('अभी कोई पोस्ट नहीं है — पहली मदद की पेशकश या अनुरोध लिखें।', 'No posts yet — write the first offer of help or request.')) + '</p>';
        return;
      }
      box.innerHTML = list.slice().reverse().map(function (p) {
        return '<article class="card' + (p.resolved ? ' resolved' : '') + '">' +
          '<span class="badge">' + (p.type === 'offer' ? esc(t('मदद की पेशकश', 'Offering help')) : esc(t('मदद चाहिए', 'Needs help'))) + '</span> ' +
          '<span class="badge">' + esc(p.category) + '</span>' +
          (p.resolved ? ' <span class="badge ok">' + esc(t('हल हो गया ✓', 'Resolved ✓')) + '</span>' : '') +
          '<h3>' + esc(p.title) + '</h3><p>' + esc(p.description) + '</p>' +
          '<p class="meta">' + esc(p.location || '') + ' · ' + esc(p.name) + ' · ' + esc(String(p.createdAt).slice(0, 10)) + '</p>' +
          '<button class="btn small" data-resolve="' + p.id + '">' + esc(p.resolved ? t('फिर से खोलें', 'Reopen') : t('हल हुआ — निशान लगाएँ', 'Mark resolved')) + '</button>' +
          '</article>';
      }).join('');
    }

    function applyLang() {
      document.documentElement.lang = lang === 'en' ? 'en' : 'hi';
      var dict = {
        'tagline': ['अपने अधिकार जानिए, सही कदम उठाइए — हिंदी और English में।', 'Know your rights, take the right step — in Hindi and English.'],
        'search-ph': ['', '']
      };
      var tag = el('tagline'); if (tag) tag.textContent = dict.tagline[lang === 'en' ? 1 : 0];
      el('lang-toggle').textContent = lang === 'en' ? 'हिंदी में देखें' : 'View in English';
      renderCategories(); renderGuides(); renderGuideDetail(); renderTemplates(); renderBoard();
    }

    document.addEventListener('DOMContentLoaded', function () {
      el('lang-toggle').addEventListener('click', function () { lang = lang === 'hi' ? 'en' : 'hi'; applyLang(); });
      el('search').addEventListener('input', renderGuides);
      el('cat-filters').addEventListener('click', function (e) {
        var b = e.target.closest('[data-cat]');
        if (!b) return;
        activeCategory = b.getAttribute('data-cat');
        renderCategories(); renderGuides();
      });
      el('guide-list').addEventListener('click', function (e) {
        var b = e.target.closest('[data-open]');
        if (!b) return;
        activeGuide = b.getAttribute('data-open');
        renderGuideDetail();
        el('guide-detail').scrollIntoView({ behavior: 'smooth' });
      });
      el('guide-detail').addEventListener('change', function (e) {
        var c = e.target.closest('input[type=checkbox][data-guide]');
        if (!c) return;
        state = toggleChecklist(state, c.getAttribute('data-guide'), parseInt(c.getAttribute('data-step'), 10));
        saveState(); renderGuides(); renderGuideDetail();
      });
      el('template-select').addEventListener('change', renderTemplateForm);
      el('gen-letter').addEventListener('click', function () {
        var fields = {};
        document.querySelectorAll('#template-fields [data-field]').forEach(function (inp) { fields[inp.getAttribute('data-field')] = inp.value; });
        var res = buildLetter(el('template-select').value, fields, lang);
        if (!res.ok) {
          el('letter-status').textContent = t('कृपया भरें: ', 'Please fill in: ') + res.missing.join(', ');
          el('letter-output').value = '';
          return;
        }
        el('letter-status').textContent = t('पत्र तैयार है — कॉपी करें या डाउनलोड करें।', 'Letter ready — copy or download it.');
        el('letter-output').value = res.text;
      });
      el('copy-letter').addEventListener('click', function () {
        var out = el('letter-output');
        if (!out.value) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(out.value).then(function () {
            el('letter-status').textContent = t('कॉपी हो गया ✓', 'Copied ✓');
          });
        } else { out.select(); document.execCommand('copy'); }
      });
      el('download-letter').addEventListener('click', function () {
        var out = el('letter-output');
        if (!out.value) return;
        var blob = new Blob([out.value], { type: 'text/plain;charset=utf-8' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'nagrik-sahayata-letter.txt';
        a.click();
        URL.revokeObjectURL(a.href);
      });
      el('board-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var post = {
          type: el('post-type').value,
          category: el('post-category').value,
          title: el('post-title').value,
          description: el('post-desc').value,
          location: el('post-location').value,
          name: el('post-name').value
        };
        var res = addPost(posts, post);
        if (!res.ok) {
          el('board-status').textContent = t('कृपया शीर्षक, विवरण और प्रकार भरें।', 'Please fill in title, description and type.');
          return;
        }
        posts = res.posts; savePosts();
        el('board-form').reset();
        el('board-status').textContent = t('पोस्ट प्रकाशित हो गई ✓ (केवल इसी ब्राउज़र में सहेजी जाती है)', 'Post published ✓ (saved only in this browser)');
        renderBoard();
      });
      el('board-search').addEventListener('input', renderBoard);
      el('board-type').addEventListener('change', renderBoard);
      el('board-list').addEventListener('click', function (e) {
        var b = e.target.closest('[data-resolve]');
        if (!b) return;
        posts = toggleResolved(posts, b.getAttribute('data-resolve'));
        savePosts(); renderBoard();
      });
      applyLang();
    });
  })();
}
