// KPSS Coğrafya - Ana Veri Birleştirici
// Tüm modülleri birleştirir ve yardımcı fonksiyonları sağlar

// Ücretsiz Kategoriler (isLocked: false)
const FREE_CATEGORIES = ['sehirler', 'endemik_bitkiler', 'tarim'];

// Kategori Grupları (UI organizasyonu)
const CATEGORY_GROUPS = [
  { group: "Yer Şekilleri", categories: ['kivrim_daglar','kirik_daglar','volkanik_daglar','masifler','platolar'] },
  { group: "Ovalar", categories: ['delta_ovalari','aluvyon_ovalar','tektonik_ovalar','karstik_ovalar','volkanik_ovalar'] },
  { group: "Göller", categories: ['tektonik_goller','volkanik_goller','set_goller','karstik_goller','buzul_goller'] },
  { group: "Su Kaynakları", categories: ['akarsular','barajlar'] },
  { group: "Doğa", categories: ['bitki_ortusu','endemik_bitkiler','toprak_tipleri'] },
  { group: "Kıyılar", categories: ['kiyi_tipleri','koy_korfez'] },
  { group: "Yerleşme", categories: ['sehirler','kir_yerlesmeleri'] },
  { group: "Ekonomi", categories: ['tarim','hayvancilik','madenler_enerji','sanayi','ulasim','turizm'] }
];

// Tüm verileri tek obje altında birleştir
const GEOGRAPHY_DATA = Object.assign({},
  DATA_LANDFORMS,
  DATA_PLAINS_LAKES,
  DATA_NATURE,
  DATA_ECONOMY
);

// ---- Erişim Kontrolü ----

function hasFullAccess() {
  try { return localStorage.getItem('full_access') === 'true'; } catch { return false; }
}

function isCategoryLocked(catKey) {
  if (hasFullAccess()) return false;
  return !FREE_CATEGORIES.includes(catKey);
}

function unlockAllCategories() {
  try { localStorage.setItem('full_access', 'true'); } catch {}
}

// Yardımcı fonksiyonlar
function getAllCategories() {
  return Object.keys(GEOGRAPHY_DATA);
}

function getTotalQuestionCount(categories) {
  let total = 0;
  categories.forEach(cat => {
    if (GEOGRAPHY_DATA[cat]) total += GEOGRAPHY_DATA[cat].items.length;
  });
  return total;
}

function getItemsByCategories(categories) {
  let items = [];
  categories.forEach(cat => {
    if (GEOGRAPHY_DATA[cat] && !isCategoryLocked(cat)) {
      GEOGRAPHY_DATA[cat].items.forEach(item => {
        items.push({ ...item, category: cat });
      });
    }
  });
  return items;
}
