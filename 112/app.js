// ==========================================
// KPSS Coğrafya Quiz - Application Logic
// GeoJSON Province-Based Map
// Timer, Speed Mode, Badges, Dark/Light
// ==========================================

(function () {
  'use strict';

  // ---- GeoJSON URL ----
  const GEOJSON_URLS = [
    'https://raw.githubusercontent.com/cihadturhan/tr-geojson/master/geo/tr-cities-utf8.json',
    'https://raw.githubusercontent.com/alpers/Turkey-Maps-GeoJSON/master/tr-cities-utf8.json'
  ];

  // ---- CartoDB Tile URLs ----
  const TILE_URLS = {
    dark: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
    light: 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png'
  };

  // ---- State ----
  const state = {
    selectedCategories: [],
    mode: 'find',          // 'find' | 'name' | 'speed'
    questions: [],
    currentIndex: 0,
    correctCount: 0,
    wrongCount: 0,
    streak: 0,
    bestStreak: 0,
    hintUsed: false,
    answered: false,
    map: null,
    tileLayer: null,
    geoJsonData: null,
    geoJsonLayer: null,
    provinceLayers: {},
    provinceNameMap: {},
    questionCount: 20,
    isLoading: false,
    mapFillColor: '#1e3a5f',
    displayMode: 'dark',       // 'dark' | 'light'
    // Timer
    timer: null,
    timeLeft: 60,
    // Per-category tracking
    categoryStats: {},         // { catKey: { correct: N, wrong: N } }
    // Badge
    newBadges: []
  };

  // ---- DOM ----
  const dom = {
    splashScreen: document.getElementById('splashScreen'),
    quizScreen: document.getElementById('quizScreen'),
    resultScreen: document.getElementById('resultScreen'),
    categoryButtons: document.getElementById('categoryButtons'),
    startBtn: document.getElementById('startBtn'),
    backBtn: document.getElementById('backBtn'),
    modeButtons: document.querySelectorAll('.mode-btn'),
    progressText: document.getElementById('progressText'),
    progressBar: document.getElementById('progressBar'),
    scoreText: document.getElementById('scoreText'),
    qCategory: document.getElementById('questionCategory'),
    questionText: document.getElementById('questionText'),
    questionInstruction: document.getElementById('instructionText'),
    hintBtn: document.getElementById('hintBtn'),
    hintBox: document.getElementById('hintBox'),
    choicesContainer: document.getElementById('choicesContainer'),
    choiceFeedback: document.getElementById('choiceFeedback'),
    streakIndicator: document.getElementById('streakIndicator'),
    feedbackOverlay: document.getElementById('feedbackOverlay'),
    feedbackCard: document.getElementById('feedbackCard'),
    feedbackIcon: document.getElementById('feedbackIcon'),
    feedbackTitle: document.getElementById('feedbackTitle'),
    feedbackDesc: document.getElementById('feedbackDesc'),
    nextBtn: document.getElementById('nextBtn'),
    finalTitle: document.getElementById('finalTitle'),
    finalScore: document.getElementById('finalScore'),
    finalCorrect: document.getElementById('finalCorrect'),
    finalWrong: document.getElementById('finalWrong'),
    finalStreak: document.getElementById('finalStreak'),
    restartBtn: document.getElementById('restartBtn'),
    homeBtn: document.getElementById('homeBtn'),
    bestStreakDisplay: document.getElementById('bestStreakDisplay'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    settingsBtn: document.getElementById('settingsBtn'),
    settingsOverlay: document.getElementById('settingsOverlay'),
    settingsCloseBtn: document.getElementById('settingsCloseBtn'),
    themeOptions: document.getElementById('themeOptions'),
    questionCountOptions: document.getElementById('questionCountOptions'),
    mapColorOptions: document.getElementById('mapColorOptions'),
    displayModeOptions: document.getElementById('displayModeOptions'),
    timerBadge: document.getElementById('timerBadge'),
    timerText: document.getElementById('timerText'),
    weakCategoryBox: document.getElementById('weakCategoryBox'),
    badgeBox: document.getElementById('badgeBox'),
    purchaseOverlay: document.getElementById('purchaseOverlay'),
    purchaseCloseBtn: document.getElementById('purchaseCloseBtn'),
    purchaseBtn: document.getElementById('purchaseBtn'),
    giftCodeInput: document.getElementById('giftCodeInput'),
    giftCodeBtn: document.getElementById('giftCodeBtn'),
    giftCodeMsg: document.getElementById('giftCodeMsg')
  };

  // ========== Province Name Normalization ==========

  function normalizeProvinceName(name) {
    if (!name) return '';
    return name.trim().toLowerCase()
      .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u')
      .replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/İ/g, 'i').replace(/Ğ/g, 'g').replace(/Ü/g, 'u')
      .replace(/Ş/g, 's').replace(/Ö/g, 'o').replace(/Ç/g, 'c');
  }

  function getFeatureProvinceName(feature) {
    const p = feature.properties;
    return p.name || p.NAME || p.NAME_1 || p.il_adi || p.iladi || p.Name || '';
  }

  function doesProvinceMatch(clickedNormalized, questionProvinces) {
    return questionProvinces.some(prov => normalizeProvinceName(prov) === clickedNormalized);
  }

  // ========== localStorage ==========

  function loadStats() {
    try {
      const s = localStorage.getItem('kpss_geo_stats');
      return s ? JSON.parse(s) : { played: 0, correct: 0, bestStreak: 0 };
    } catch { return { played: 0, correct: 0, bestStreak: 0 }; }
  }

  function saveStats(stats) {
    try { localStorage.setItem('kpss_geo_stats', JSON.stringify(stats)); } catch { }
  }

  function updateStatsDisplay() {
    const stats = loadStats();
    if (dom.bestStreakDisplay) dom.bestStreakDisplay.textContent = stats.bestStreak;
  }

  // ========== Badges ==========

  function loadBadges() {
    try {
      const b = localStorage.getItem('kpss_badges');
      return b ? JSON.parse(b) : {};
    } catch { return {}; }
  }

  function saveBadges(badges) {
    try { localStorage.setItem('kpss_badges', JSON.stringify(badges)); } catch { }
  }

  function checkAndAwardBadges() {
    const badges = loadBadges();
    state.newBadges = [];

    Object.keys(state.categoryStats).forEach(catKey => {
      const s = state.categoryStats[catKey];
      const total = s.correct + s.wrong;
      if (total >= 3 && s.correct === total && !badges[catKey]) {
        // 100% accuracy with at least 3 questions
        badges[catKey] = { date: new Date().toISOString(), score: total };
        const catData = GEOGRAPHY_DATA[catKey];
        if (catData) {
          state.newBadges.push({ key: catKey, label: catData.label, icon: catData.icon });
        }
      }
    });

    saveBadges(badges);
  }

  // ========== Settings ==========

  const MAP_COLORS = {
    default: '#1e3a5f',
    dark: '#0f1729',
    green: '#1a3a2a',
    purple: '#2d1b4e'
  };

  function initSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem('kpss_settings') || '{}');
      if (saved.theme) applyTheme(saved.theme);
      if (saved.questionCount) {
        state.questionCount = parseInt(saved.questionCount);
        setActiveOption(dom.questionCountOptions, '[data-count]', saved.questionCount.toString());
      }
      if (saved.mapColor) {
        state.mapFillColor = MAP_COLORS[saved.mapColor] || MAP_COLORS.default;
        setActiveOption(dom.mapColorOptions, '[data-map-color]', saved.mapColor);
      }
      if (saved.displayMode) {
        state.displayMode = saved.displayMode;
        applyDisplayMode(saved.displayMode);
        setActiveOption(dom.displayModeOptions, '[data-display]', saved.displayMode);
      }
    } catch {}

    // Theme dots
    if (dom.themeOptions) {
      dom.themeOptions.addEventListener('click', (e) => {
        const dot = e.target.closest('.theme-dot');
        if (!dot) return;
        applyTheme(dot.dataset.theme);
        dom.themeOptions.querySelectorAll('.theme-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        saveSettings();
      });
    }

    // Question count
    if (dom.questionCountOptions) {
      dom.questionCountOptions.addEventListener('click', (e) => {
        const btn = e.target.closest('.setting-opt');
        if (!btn) return;
        state.questionCount = parseInt(btn.dataset.count);
        dom.questionCountOptions.querySelectorAll('.setting-opt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        saveSettings();
      });
    }

    // Map color
    if (dom.mapColorOptions) {
      dom.mapColorOptions.addEventListener('click', (e) => {
        const btn = e.target.closest('.setting-opt');
        if (!btn) return;
        state.mapFillColor = MAP_COLORS[btn.dataset.mapColor] || MAP_COLORS.default;
        dom.mapColorOptions.querySelectorAll('.setting-opt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        saveSettings();
      });
    }

    // Display mode (dark/light)
    if (dom.displayModeOptions) {
      dom.displayModeOptions.addEventListener('click', (e) => {
        const btn = e.target.closest('.setting-opt');
        if (!btn) return;
        state.displayMode = btn.dataset.display;
        applyDisplayMode(state.displayMode);
        dom.displayModeOptions.querySelectorAll('.setting-opt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        saveSettings();
      });
    }
  }

  function applyTheme(theme) {
    // Remove only theme- classes, keep display- classes
    document.body.classList.forEach(cls => {
      if (cls.startsWith('theme-')) document.body.classList.remove(cls);
    });
    if (theme && theme !== 'default') {
      document.body.classList.add('theme-' + theme);
    }
  }

  function applyDisplayMode(mode) {
    document.body.classList.remove('display-light', 'display-dark');
    if (mode === 'light') {
      document.body.classList.add('display-light');
    }
    // Update tile layer if map exists
    if (state.map && state.tileLayer) {
      state.tileLayer.setUrl(TILE_URLS[mode] || TILE_URLS.dark);
    }
  }

  function setActiveOption(container, selector, value) {
    if (!container) return;
    container.querySelectorAll(selector).forEach(el => {
      const attrVal = el.dataset.count || el.dataset.mapColor || el.dataset.theme || el.dataset.display;
      el.classList.toggle('active', attrVal === value);
    });
  }

  function saveSettings() {
    const settings = {
      theme: document.querySelector('.theme-dot.active')?.dataset.theme || 'default',
      questionCount: state.questionCount,
      mapColor: document.querySelector('#mapColorOptions .setting-opt.active')?.dataset.mapColor || 'default',
      displayMode: state.displayMode
    };
    try { localStorage.setItem('kpss_settings', JSON.stringify(settings)); } catch {}
  }

  function openSettings() {
    if (dom.settingsOverlay) dom.settingsOverlay.classList.remove('hidden');
  }
  function closeSettings() {
    if (dom.settingsOverlay) dom.settingsOverlay.classList.add('hidden');
  }

  // ========== Timer ==========

  function startTimer() {
    state.timeLeft = 60;
    updateTimerDisplay();
    if (dom.timerBadge) dom.timerBadge.classList.remove('hidden');

    state.timer = setInterval(() => {
      state.timeLeft--;
      updateTimerDisplay();

      if (state.timeLeft <= 10) {
        if (dom.timerBadge) dom.timerBadge.classList.add('urgent');
      }

      if (state.timeLeft <= 0) {
        stopTimer();
        // Time's up — end quiz
        showResults();
      }
    }, 1000);
  }

  function stopTimer() {
    if (state.timer) {
      clearInterval(state.timer);
      state.timer = null;
    }
    if (dom.timerBadge) {
      dom.timerBadge.classList.add('hidden');
      dom.timerBadge.classList.remove('urgent');
    }
  }

  function updateTimerDisplay() {
    if (dom.timerText) dom.timerText.textContent = state.timeLeft;
  }

  // ========== Category Buttons ==========

  function initCategoryButtons() {
    dom.categoryButtons.innerHTML = '';
    state.selectedCategories = [];

    CATEGORY_GROUPS.forEach(grp => {
      const header = document.createElement('div');
      header.className = 'cat-group-header';
      header.textContent = grp.group;
      header.addEventListener('click', () => {
        // Only toggle unlocked categories in group
        const unlockedCats = grp.categories.filter(c => !isCategoryLocked(c));
        if (unlockedCats.length === 0) { showPurchaseModal(); return; }
        const isAllActive = unlockedCats.every(c => state.selectedCategories.includes(c));
        unlockedCats.forEach(catKey => {
          const btn = dom.categoryButtons.querySelector(`[data-category="${catKey}"]`);
          if (isAllActive) {
            state.selectedCategories = state.selectedCategories.filter(c => c !== catKey);
            if (btn) btn.classList.remove('active');
          } else {
            if (!state.selectedCategories.includes(catKey)) state.selectedCategories.push(catKey);
            if (btn) btn.classList.add('active');
          }
        });
        if (state.selectedCategories.length === 0) {
          const first = unlockedCats[0];
          state.selectedCategories.push(first);
          const btn = dom.categoryButtons.querySelector(`[data-category="${first}"]`);
          if (btn) btn.classList.add('active');
        }
      });
      dom.categoryButtons.appendChild(header);

      const row = document.createElement('div');
      row.className = 'cat-group-row';
      grp.categories.forEach(catKey => {
        const cat = GEOGRAPHY_DATA[catKey];
        if (!cat) return;
        const locked = isCategoryLocked(catKey);
        const btn = document.createElement('button');
        btn.className = locked ? 'cat-btn locked' : 'cat-btn active';
        btn.dataset.category = catKey;
        if (!locked) state.selectedCategories.push(catKey);
        btn.innerHTML = `<span class="cat-icon">${cat.icon}</span><span class="cat-name">${cat.label}</span><span class="cat-count">${cat.items.length}</span>`;
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (locked) { showPurchaseModal(); return; }
          toggleCategory(btn, catKey);
        });
        row.appendChild(btn);
      });
      dom.categoryButtons.appendChild(row);
    });

    state.selectedCategories = [...new Set(state.selectedCategories)];
  }

  function toggleCategory(btn, catKey) {
    if (btn.classList.contains('active')) {
      if (state.selectedCategories.length <= 1) return;
      state.selectedCategories = state.selectedCategories.filter(c => c !== catKey);
      btn.classList.remove('active');
    } else {
      state.selectedCategories.push(catKey);
      btn.classList.add('active');
    }
  }

  // ========== Mode Selection ==========

  function initModeButtons() {
    dom.modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const modeVal = btn.dataset.mode;
        if (modeVal === 'find_on_map') state.mode = 'find';
        else if (modeVal === 'guess_name') state.mode = 'name';
        else if (modeVal === 'speed_round') state.mode = 'speed';
        dom.modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  // ========== GeoJSON Loading ==========

  async function loadGeoJSON() {
    for (const url of GEOJSON_URLS) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data && data.features && data.features.length > 0) return data;
        }
      } catch (e) {
        console.warn('GeoJSON yüklenemedi:', url, e);
      }
    }
    throw new Error('GeoJSON verisi yüklenemedi. İnternet bağlantınızı kontrol edin.');
  }

  // ========== Map Setup ==========

  function initMap() {
    if (state.map) state.map.remove();

    const turkeyBounds = L.latLngBounds(L.latLng(35.5, 25.5), L.latLng(42.5, 45.0));

    state.map = L.map('map', {
      center: [39.0, 35.2],
      zoom: 6,
      minZoom: 5,
      maxZoom: 9,
      zoomControl: true,
      attributionControl: false,
      maxBounds: turkeyBounds.pad(0.1),
      maxBoundsViscosity: 1.0
    });

    // Add CartoDB tile layer
    const tileUrl = TILE_URLS[state.displayMode] || TILE_URLS.dark;
    state.tileLayer = L.tileLayer(tileUrl, {
      attribution: '',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(state.map);

    renderProvinces();
  }

  // ========== Province Rendering ==========

  function getDefaultProvinceStyle() {
    return { fillColor: state.mapFillColor, fillOpacity: 0.85, color: 'rgba(255, 255, 255, 0.35)', weight: 1.5 };
  }

  const PROVINCE_STYLE = {
    get default() { return getDefaultProvinceStyle(); },
    hover: { fillColor: '#2a5298', fillOpacity: 0.95, color: 'rgba(255, 255, 255, 0.6)', weight: 2 },
    correct: { fillColor: '#10b981', fillOpacity: 0.8, color: '#ffffff', weight: 2.5 },
    wrong: { fillColor: '#ef4444', fillOpacity: 0.6, color: '#ffffff', weight: 2 },
    highlight: { fillColor: '#8b5cf6', fillOpacity: 0.8, color: '#ffffff', weight: 2.5 },
    correctReveal: { fillColor: '#10b981', fillOpacity: 0.7, color: '#ffffff', weight: 2.5 }
  };

  function renderProvinces() {
    if (!state.geoJsonData) return;
    state.provinceLayers = {};
    state.provinceNameMap = {};

    state.geoJsonLayer = L.geoJSON(state.geoJsonData, {
      style: () => ({ ...PROVINCE_STYLE.default }),
      onEachFeature: (feature, layer) => {
        const originalName = getFeatureProvinceName(feature);
        const normalized = normalizeProvinceName(originalName);
        state.provinceLayers[normalized] = layer;
        state.provinceNameMap[normalized] = originalName;

        layer.on('mouseover', () => {
          if (!state.answered) { layer.setStyle(PROVINCE_STYLE.hover); layer.bringToFront(); }
        });
        layer.on('mouseout', () => {
          if (!state.answered) layer.setStyle(PROVINCE_STYLE.default);
        });
        layer.on('click', () => handleProvinceClick(normalized, originalName, layer));
      }
    }).addTo(state.map);

    state.map.fitBounds(state.geoJsonLayer.getBounds(), { padding: [10, 10] });
  }

  function resetAllProvinceStyles() {
    if (state.geoJsonLayer) {
      state.geoJsonLayer.eachLayer(layer => layer.setStyle(PROVINCE_STYLE.default));
    }
  }

  function highlightProvince(normalizedName, style) {
    const layer = state.provinceLayers[normalizedName];
    if (layer) { layer.setStyle(style); layer.bringToFront(); }
  }

  function getProvinceLayer(normalizedName) {
    return state.provinceLayers[normalizedName] || null;
  }

  // ========== Question Generation ==========

  function generateQuestions() {
    const allItems = getItemsByCategories(state.selectedCategories);
    const shuffled = [...allItems].sort(() => Math.random() - 0.5);
    const count = state.mode === 'speed' ? shuffled.length : Math.min(state.questionCount, shuffled.length);
    state.questions = shuffled.slice(0, count);
    state.currentIndex = 0;
    state.correctCount = 0;
    state.wrongCount = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.categoryStats = {};
    state.newBadges = [];
  }

  function getCurrentQuestion() {
    return state.questions[state.currentIndex];
  }

  // ========== Display Question ==========

  function showQuestion() {
    const q = getCurrentQuestion();
    if (!q) return;

    state.answered = false;
    state.hintUsed = false;
    resetAllProvinceStyles();
    if (state.map) state.map.closePopup();

    // Progress
    if (state.mode === 'speed') {
      dom.progressText.textContent = `Doğru: ${state.correctCount} | Yanlış: ${state.wrongCount}`;
      dom.progressBar.style.width = ((state.timeLeft / 60) * 100) + '%';
    } else {
      dom.progressText.textContent = `Soru: ${state.currentIndex + 1}/${state.questions.length}`;
      dom.progressBar.style.width = ((state.currentIndex) / state.questions.length * 100) + '%';
    }

    dom.scoreText.textContent = `Puan: ${state.correctCount * 10}`;

    // Category badge
    const catData = GEOGRAPHY_DATA[q.category] || { label: 'Diğer', icon: '❓', color: '#888' };
    dom.qCategory.textContent = `${catData.icon} ${catData.label}`;
    dom.qCategory.style.background = `${catData.color}22`;
    dom.qCategory.style.color = catData.color;

    // Reset hint
    dom.hintBox.classList.add('hidden');
    dom.hintBtn.classList.remove('used');

    // Choice feedback reset
    if (dom.choiceFeedback) {
      dom.choiceFeedback.classList.add('hidden');
      dom.choiceFeedback.className = 'hidden';
      dom.choiceFeedback.textContent = '';
    }

    // Streak UI
    if (state.streak >= 3 && dom.streakIndicator) {
      dom.streakIndicator.classList.remove('hidden');
      dom.streakIndicator.textContent = `🔥 ${state.streak}'lü Seri!`;
    } else if (dom.streakIndicator) {
      dom.streakIndicator.classList.add('hidden');
    }

    // In speed mode, always use "find on map" style
    if (state.mode === 'speed' || state.mode === 'find') {
      showFindQuestion(q);
    } else {
      showNameQuestion(q);
    }

    // Fit to Turkey
    if (state.geoJsonLayer) {
      state.map.fitBounds(state.geoJsonLayer.getBounds(), { padding: [10, 10], animate: true });
    }
  }

  function showFindQuestion(q) {
    dom.questionText.innerHTML = `<span style="color:var(--accent-blue)">"${q.name}"</span> nerede?`;
    dom.questionInstruction.textContent = state.mode === 'speed' ? '⚡ Hızlı yanıtla! Haritada doğru ili tıkla.' : 'Haritada doğru ili tıklayın.';
    dom.choicesContainer.classList.add('hidden');
  }

  function showNameQuestion(q) {
    dom.questionText.textContent = 'Haritada işaretli yer neresidir?';
    dom.questionInstruction.textContent = 'Şıklardan doğru olanı seçin.';

    q.provinces.forEach(prov => {
      const norm = normalizeProvinceName(prov);
      highlightProvince(norm, PROVINCE_STYLE.highlight);
      const layer = getProvinceLayer(norm);
      if (layer) state.map.fitBounds(layer.getBounds(), { padding: [40, 40], maxZoom: 8, animate: true });
    });

    const choices = generateChoices(q);
    dom.choicesContainer.classList.remove('hidden');
    dom.choicesContainer.innerHTML = '';
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice.name;
      btn.dataset.correct = choice.id === q.id ? 'true' : 'false';
      dom.choicesContainer.appendChild(btn);
    });
  }

  function generateChoices(correctItem) {
    const allItems = getItemsByCategories(state.selectedCategories);
    const sameCategory = allItems.filter(item => item.category === correctItem.category && item.id !== correctItem.id);
    const otherItems = allItems.filter(item => item.id !== correctItem.id);
    let pool = sameCategory.length >= 3 ? sameCategory : otherItems;
    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 3);
    return [...shuffled, correctItem].sort(() => Math.random() - 0.5);
  }

  // ========== Answer Handling ==========

  function handleProvinceClick(normalizedName, originalName, layer) {
    if (state.answered) return;
    if (state.mode === 'name') return; // name mode uses choices only

    const q = getCurrentQuestion();
    if (!q) return;

    state.answered = true;
    const isCorrect = doesProvinceMatch(normalizedName, q.provinces);

    if (isCorrect) {
      layer.setStyle(PROVINCE_STYLE.correct);
      layer.bringToFront();
      const bounds = layer.getBounds();
      L.popup({ closeButton: false, className: 'province-popup' })
        .setLatLng(bounds.getCenter())
        .setContent(`<div class="popup-name">✅ ${originalName}</div><div class="popup-desc">${q.description}</div>`)
        .openOn(state.map);
    } else {
      layer.setStyle(PROVINCE_STYLE.wrong);
      layer.bringToFront();
      q.provinces.forEach(prov => {
        const norm = normalizeProvinceName(prov);
        highlightProvince(norm, PROVINCE_STYLE.correctReveal);
        const correctLayer = getProvinceLayer(norm);
        if (correctLayer) {
          L.popup({ closeButton: false, className: 'province-popup' })
            .setLatLng(correctLayer.getBounds().getCenter())
            .setContent(`<div class="popup-name">📍 ${prov}</div><div class="popup-desc">${q.description}</div>`)
            .openOn(state.map);
        }
      });
    }

    processAnswer(isCorrect);
  }

  function handleChoiceClick(e) {
    if (state.answered || state.mode !== 'name') return;
    const btn = e.target.closest('.choice-btn');
    if (!btn) return;

    state.answered = true;
    const isCorrect = btn.dataset.correct === 'true';

    const choiceBtns = dom.choicesContainer.querySelectorAll('.choice-btn');
    choiceBtns.forEach(b => {
      b.classList.add('disabled');
      if (b.dataset.correct === 'true') b.classList.add('correct-choice');
    });
    if (!isCorrect) btn.classList.add('wrong-choice');

    if (dom.choiceFeedback) {
      const q = getCurrentQuestion();
      dom.choiceFeedback.classList.remove('hidden');
      if (isCorrect) {
        dom.choiceFeedback.textContent = `Doğru! ${q.description}`;
        dom.choiceFeedback.style.color = 'var(--accent-green)';
        dom.choiceFeedback.style.background = 'rgba(16,185,129,0.1)';
      } else {
        dom.choiceFeedback.textContent = `Yanlış! Gerçek: ${q.name} - ${q.description}`;
        dom.choiceFeedback.style.color = 'var(--accent-red)';
        dom.choiceFeedback.style.background = 'rgba(239,68,68,0.1)';
      }
    }

    processAnswer(isCorrect);
  }

  function processAnswer(isCorrect) {
    const q = getCurrentQuestion();

    // Track per-category stats
    if (q && q.category) {
      if (!state.categoryStats[q.category]) {
        state.categoryStats[q.category] = { correct: 0, wrong: 0 };
      }
      if (isCorrect) state.categoryStats[q.category].correct++;
      else state.categoryStats[q.category].wrong++;
    }

    if (isCorrect) {
      state.correctCount++;
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    } else {
      state.wrongCount++;
      state.streak = 0;
    }

    dom.scoreText.textContent = `Puan: ${state.correctCount * 10}`;

    if (state.mode === 'speed') {
      // Speed mode: no feedback overlay, auto-advance
      setTimeout(() => {
        state.currentIndex++;
        if (state.currentIndex >= state.questions.length || state.timeLeft <= 0) {
          stopTimer();
          showResults();
        } else {
          showQuestion();
        }
      }, isCorrect ? 400 : 800);
    } else {
      setTimeout(() => showFeedback(isCorrect), isCorrect ? 600 : 1200);
    }
  }

  function showFeedback(isCorrect) {
    const q = getCurrentQuestion();
    dom.feedbackOverlay.classList.remove('hidden');

    dom.feedbackCard.className = 'feedback-card ' + (isCorrect ? 'correct-card' : 'wrong-card');
    dom.feedbackIcon.textContent = isCorrect ? '🎉' : '😕';
    dom.feedbackTitle.textContent = isCorrect ? 'Doğru!' : 'Yanlış!';

    dom.feedbackDesc.textContent = `📍 ${q.provinces.join(', ')} — ${q.description}`;

    if (state.currentIndex >= state.questions.length - 1) {
      dom.nextBtn.innerHTML = `Sonuçları Gör <span style="margin-left:5px">▶️</span>`;
    } else {
      dom.nextBtn.innerHTML = `Sonraki Soru <span style="margin-left:5px">▶️</span>`;
    }
  }

  // ========== Screen Navigation ==========

  function showScreen(screen) {
    dom.splashScreen.classList.add('hidden');
    dom.quizScreen.classList.add('hidden');
    dom.resultScreen.classList.add('hidden');

    if (state.streak >= 3 && dom.streakIndicator) {
      dom.streakIndicator.classList.remove('hidden');
      dom.streakIndicator.textContent = `🔥 ${state.streak}'lü Seri!`;
    } else if (dom.streakIndicator) {
      dom.streakIndicator.classList.add('hidden');
    }
    screen.classList.remove('hidden');
  }

  function showLoading(show) {
    if (dom.loadingOverlay) dom.loadingOverlay.classList.toggle('hidden', !show);
  }

  async function startQuiz() {
    if (state.selectedCategories.length === 0) return;
    if (state.isLoading) return;

    generateQuestions();
    if (state.questions.length === 0) return;

    if (!state.geoJsonData) {
      state.isLoading = true;
      showLoading(true);
      try {
        state.geoJsonData = await loadGeoJSON();
      } catch (err) {
        alert(err.message);
        showLoading(false);
        state.isLoading = false;
        return;
      }
      showLoading(false);
      state.isLoading = false;
    }

    showScreen(dom.quizScreen);

    setTimeout(() => {
      initMap();
      showQuestion();
      // Start timer for speed mode
      if (state.mode === 'speed') startTimer();
    }, 150);
  }

  function nextQuestion() {
    dom.feedbackOverlay.classList.add('hidden');
    state.currentIndex++;

    if (state.currentIndex >= state.questions.length) {
      showResults();
    } else {
      showQuestion();
    }
  }

  function showResults() {
    stopTimer();
    showScreen(dom.resultScreen);

    const total = state.correctCount + state.wrongCount;
    const finalScoreValue = state.correctCount * 10;

    dom.finalCorrect.textContent = state.correctCount;
    dom.finalWrong.textContent = state.wrongCount;
    dom.finalScore.textContent = finalScoreValue;
    dom.finalStreak.textContent = state.bestStreak;

    const percent = total > 0 ? Math.round((state.correctCount / total) * 100) : 0;

    if (state.mode === 'speed') {
      dom.finalTitle.textContent = `⚡ Hızlı Tur: 60 saniyede ${state.correctCount} doğru! ${percent >= 80 ? 'Muhteşem!' : percent >= 50 ? 'İyi!' : 'Çalışmaya devam!'}`;
    } else if (percent >= 80) {
      dom.finalTitle.textContent = 'Harika! Coğrafya bilgin çok iyi! KPSS\'ye hazırsın!';
    } else if (percent >= 50) {
      dom.finalTitle.textContent = 'İyi Gidiyorsun! Biraz daha pratik ile mükemmel olacaksın!';
    } else {
      dom.finalTitle.textContent = 'Çalışmaya Devam! Endişelenme, tekrar çalışarak gelişebilirsin!';
    }

    // Save global stats
    const stats = loadStats();
    stats.played += total;
    stats.correct += state.correctCount;
    if (state.bestStreak > stats.bestStreak) stats.bestStreak = state.bestStreak;
    saveStats(stats);

    // Check & award badges
    checkAndAwardBadges();
    renderBadgeBox();

    // Weak category analysis
    renderWeakCategories();
  }

  // ========== Weak Category Analysis ==========

  function renderWeakCategories() {
    if (!dom.weakCategoryBox) return;
    dom.weakCategoryBox.classList.add('hidden');
    dom.weakCategoryBox.innerHTML = '';

    const weakCats = [];
    Object.keys(state.categoryStats).forEach(catKey => {
      const s = state.categoryStats[catKey];
      const total = s.correct + s.wrong;
      if (total >= 2 && s.wrong > 0) {
        const wrongPct = Math.round((s.wrong / total) * 100);
        if (wrongPct >= 40) {
          const catData = GEOGRAPHY_DATA[catKey];
          if (catData) {
            weakCats.push({ label: catData.label, icon: catData.icon, wrongPct, wrong: s.wrong, total });
          }
        }
      }
    });

    if (weakCats.length === 0) return;

    weakCats.sort((a, b) => b.wrongPct - a.wrongPct);

    let html = '<div class="weak-cat-title">⚠️ Zayıf Olduğun Konular</div>';
    weakCats.forEach(w => {
      html += `<div class="weak-cat-item">${w.icon} ${w.label}: <span>${w.wrong}/${w.total} yanlış (%${w.wrongPct})</span></div>`;
    });

    dom.weakCategoryBox.innerHTML = html;
    dom.weakCategoryBox.classList.remove('hidden');
  }

  // ========== Badge Box ==========

  function renderBadgeBox() {
    if (!dom.badgeBox) return;
    dom.badgeBox.classList.add('hidden');
    dom.badgeBox.innerHTML = '';

    if (state.newBadges.length === 0) return;

    let html = '<div class="badge-box-title">🏅 Yeni Rozet Kazandın!</div><div class="badge-list">';
    state.newBadges.forEach(b => {
      html += `<div class="badge-item"><span class="badge-emoji">${b.icon}</span> ${b.label} Uzmanı</div>`;
    });
    html += '</div>';

    dom.badgeBox.innerHTML = html;
    dom.badgeBox.classList.remove('hidden');
  }

  function goHome() {
    stopTimer();
    if (state.map) { state.map.remove(); state.map = null; state.tileLayer = null; }
    showScreen(dom.splashScreen);
    updateStatsDisplay();
  }

  // ========== Hint ==========

  function showHint() {
    if (state.hintUsed || state.answered) return;
    const q = getCurrentQuestion();
    dom.hintBox.textContent = '💡 ' + q.hint;
    dom.hintBox.classList.remove('hidden');
    dom.hintBtn.classList.add('used');
    state.hintUsed = true;
  }

  // ========== Events ==========

  function initEventListeners() {
    dom.startBtn.addEventListener('click', startQuiz);
    dom.backBtn.addEventListener('click', goHome);
    dom.hintBtn.addEventListener('click', showHint);
    dom.nextBtn.addEventListener('click', nextQuestion);
    dom.restartBtn.addEventListener('click', startQuiz);
    dom.homeBtn.addEventListener('click', goHome);
    dom.choicesContainer.addEventListener('click', handleChoiceClick);

    // Settings
    if (dom.settingsBtn) dom.settingsBtn.addEventListener('click', openSettings);
    if (dom.settingsCloseBtn) dom.settingsCloseBtn.addEventListener('click', closeSettings);
    if (dom.settingsOverlay) {
      dom.settingsOverlay.addEventListener('click', (e) => {
        if (e.target === dom.settingsOverlay) closeSettings();
      });
    }

    // Purchase modal
    if (dom.purchaseCloseBtn) dom.purchaseCloseBtn.addEventListener('click', closePurchaseModal);
    if (dom.purchaseOverlay) {
      dom.purchaseOverlay.addEventListener('click', (e) => {
        if (e.target === dom.purchaseOverlay) closePurchaseModal();
      });
    }
    if (dom.purchaseBtn) {
      dom.purchaseBtn.addEventListener('click', () => {
        // Google Play Billing integration point
        handlePurchase();
      });
    }

    // Gift code
    if (dom.giftCodeBtn) dom.giftCodeBtn.addEventListener('click', validateGiftCode);
    if (dom.giftCodeInput) {
      dom.giftCodeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') validateGiftCode();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (!dom.feedbackOverlay.classList.contains('hidden')) {
          e.preventDefault();
          nextQuestion();
        }
      }
      if (e.key === 'h' || e.key === 'H') {
        if (!dom.quizScreen.classList.contains('hidden') && !state.answered) showHint();
      }
      if (e.key === 'Escape') {
        if (dom.settingsOverlay && !dom.settingsOverlay.classList.contains('hidden')) closeSettings();
      }
    });
  }

  // ========== Init ==========

  function init() {
    initSettings();
    initCategoryButtons();
    initModeButtons();
    initEventListeners();
    updateStatsDisplay();

    loadGeoJSON().then(data => {
      state.geoJsonData = data;
      console.log('GeoJSON yüklendi:', data.features.length, 'il');
    }).catch(err => {
      console.warn('GeoJSON ön-yükleme başarısız:', err.message);
    });
  }

  init();

  // ========== Purchase & Gift Code ==========

  function showPurchaseModal() {
    if (dom.purchaseOverlay) dom.purchaseOverlay.classList.remove('hidden');
  }

  function closePurchaseModal() {
    if (dom.purchaseOverlay) dom.purchaseOverlay.classList.add('hidden');
  }

  function validateGiftCode() {
    const input = dom.giftCodeInput;
    const msg = dom.giftCodeMsg;
    if (!input || !msg) return;

    const code = input.value.trim().toUpperCase();

    // Valid codes list (add more as needed)
    const VALID_CODES = ['FNDK25'];

    if (VALID_CODES.includes(code)) {
      unlockAllCategories();
      msg.textContent = '✅ Tebrikler! Tüm kategoriler açıldı!';
      msg.className = 'gift-code-msg success';
      msg.classList.remove('hidden');
      input.value = '';
      // Rebuild category buttons to reflect unlocked state
      setTimeout(() => {
        initCategoryButtons();
        closePurchaseModal();
      }, 1000);
    } else if (code.length > 0) {
      msg.textContent = '❌ Geçersiz kod. Tekrar deneyin.';
      msg.className = 'gift-code-msg error';
      msg.classList.remove('hidden');
    }
  }

  function handlePurchase() {
    // ====================================================
    // GOOGLE PLAY BILLING API INTEGRATION POINT
    // ====================================================
    //
    // For PWA/TWA apps published via Google Play:
    //
    // 1. Ensure your app is wrapped as a TWA (Trusted Web Activity)
    //    using Bubblewrap or PWABuilder.
    //
    // 2. Add the Digital Goods API support:
    //    if ('getDigitalGoodsService' in window) {
    //      const service = await window.getDigitalGoodsService(
    //        'https://play.google.com/billing'
    //      );
    //      const details = await service.getDetails(['premium_access']);
    //      // details contains price, title, description
    //    }
    //
    // 3. Use the Payment Request API to initiate purchase:
    //    const request = new PaymentRequest(
    //      [{ supportedMethods: 'https://play.google.com/billing',
    //         data: { sku: 'premium_access' } }],
    //      { total: { label: 'Premium Erişim', amount: { currency: 'TRY', value: '49.99' } } }
    //    );
    //    const response = await request.show();
    //    // Validate purchase token on your server
    //    // On success:
    //    //   unlockAllCategories();
    //    //   initCategoryButtons();
    //    //   response.complete('success');
    //
    // 4. Acknowledge/consume the purchase via your backend.
    //
    // For now, show a placeholder message:
    alert('Google Play satın alma henüz aktif değil. Hediye kodu kullanabilirsiniz: Ayarlar > 🎁 Hediye Kodu');
  }

})();
