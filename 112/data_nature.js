// Bitki Örtüsü, Toprak, Kıyılar, Akarsular, Barajlar
const DATA_NATURE = {
  bitki_ortusu: {
    label: "Bitki Örtüsü", icon: "🌿", color: "#27ae60",
    items: [
      { id:"bo1", name:"Maki (Akdeniz)", lat:36.90, lng:30.70, provinces:["Antalya","Muğla","İzmir","Aydın","Mersin"], description:"Akdeniz iklim kuşağı. Zeytin,defne,mersin,kocayemiş,keçiboynuzu,sandal.", hint:"Akdeniz-Ege'deki sert yapraklı bitki" },
      { id:"bo2", name:"Garig (Frigana)", lat:37.70, lng:27.20, provinces:["Aydın","İzmir","Muğla"], description:"Makinin tahrip edilmiş hali. Kekik,adaçayı,lavanta.", hint:"Tahrip edilmiş maki alanı" },
      { id:"bo3", name:"Psödomaki", lat:41.00, lng:39.70, provinces:["Trabzon","Rize","Artvin"], description:"Karadeniz'e bakan yamaçlardaki maki benzeri bitki örtüsü. Defne,kocayemiş.", hint:"Karadeniz'deki maki benzeri örtü" },
      { id:"bo4", name:"Bozkır (Step)", lat:39.00, lng:33.50, provinces:["Ankara","Konya","Eskişehir","Kırşehir","Yozgat","Sivas"], description:"İç Anadolu step. Geven,yavşan,üzerlik,çoban yastığı.", hint:"İç Anadolu kurak bitki örtüsü" },
      { id:"bo5", name:"Karadeniz Ormanları", lat:41.00, lng:37.00, provinces:["Trabzon","Rize","Artvin","Giresun","Ordu","Samsun"], description:"Nemli yaprak döken+iğne yapraklı karma orman. Kayın,kestane,ladin,köknar.", hint:"Karadeniz'in gür ormanları" },
      { id:"bo6", name:"Alpin Bitki Örtüsü", lat:40.84, lng:41.16, provinces:["Rize","Artvin","Erzurum","Hakkari"], description:"Yüksek dağlarda orman üst sınırı üzerinde. Çayır,yosun.", hint:"Yüksek dağlardaki çayır örtüsü" }
    ]
  },
  endemik_bitkiler: {
    label: "Endemik Bitkiler", icon: "🌺", color: "#e74c3c",
    items: [
      { id:"eb1", name:"Sığla Ağacı (Günlük)", lat:37.20, lng:28.60, provinces:["Muğla"], description:"Liquidambar orientalis. Dünyada sadece Muğla-Köyceğiz.", hint:"Muğla'ya özgü endemik ağaç" },
      { id:"eb2", name:"Datça Hurması", lat:36.73, lng:27.68, provinces:["Muğla"], description:"Phoenix theophrasti. Datça Yarımadası'na özgü.", hint:"Datça'ya özgü palmiye" },
      { id:"eb3", name:"Kazdağı Göknarı", lat:39.70, lng:26.87, provinces:["Balıkesir","Çanakkale"], description:"Abies equi-trojani. Kazdağı'na özgü.", hint:"Kazdağı'ndaki endemik göknar" },
      { id:"eb4", name:"Ankara Çiğdemi", lat:39.93, lng:32.86, provinces:["Ankara"], description:"Crocus ancyrensis. Ankara'ya özgü.", hint:"Başkente özgü çiçek" },
      { id:"eb5", name:"Kasnak Meşesi", lat:37.80, lng:30.50, provinces:["Isparta"], description:"Quercus vulcanica. Isparta-Eğirdir'e özgü.", hint:"Isparta'daki endemik meşe" },
      { id:"eb6", name:"Yabani Şakayık", lat:41.08, lng:33.73, provinces:["Kastamonu"], description:"Paeonia turcica. Ilgaz Dağı'na özgü.", hint:"Ilgaz'daki endemik bitki" }
    ]
  },
  toprak_tipleri: {
    label: "Toprak Tipleri", icon: "🟤", color: "#795548",
    items: [
      { id:"tt1", name:"Terra Rossa", lat:36.90, lng:30.70, provinces:["Antalya","Mersin","Muğla","Hatay"], description:"Akdeniz ikliminde kalker üzerinde. Kırmızı toprak.", hint:"Akdeniz'deki kırmızı toprak" },
      { id:"tt2", name:"Kahverengi Orman Toprağı", lat:41.00, lng:37.00, provinces:["Trabzon","Rize","Giresun","Ordu","Samsun","Artvin"], description:"Karadeniz nemli orman altında oluşur.", hint:"Karadeniz'in orman toprağı" },
      { id:"tt3", name:"Çernozyom (Kara Toprak)", lat:40.10, lng:42.50, provinces:["Erzurum","Kars","Ardahan"], description:"En verimli toprak. Bozkır altı. Hayvancılık bölgesi.", hint:"Doğu'nun en verimli toprağı" },
      { id:"tt4", name:"Kırmızı-Sarı Podzolik", lat:41.05, lng:40.52, provinces:["Rize","Artvin","Trabzon"], description:"Doğu Karadeniz çay bölgesi. Yıkanmış asidik toprak.", hint:"Çay yetiştirilen yıkanmış toprak" },
      { id:"tt5", name:"Çorak (Tuzlu) Toprak", lat:38.75, lng:33.35, provinces:["Konya","Aksaray","Ankara"], description:"İç Anadolu kapalı havzalarda. Tuz Gölü çevresi.", hint:"İç Anadolu'nun tuzlu toprakları" },
      { id:"tt6", name:"Alüvyal Toprak", lat:37.00, lng:35.50, provinces:["Adana","Samsun","Aydın","İzmir"], description:"Akarsu taşıdığı verimli toprak. Delta/ova.", hint:"Akarsuların taşıdığı verimli toprak" },
      { id:"tt7", name:"Kahverengi Step Toprağı", lat:38.80, lng:32.50, provinces:["Konya","Ankara","Eskişehir","Kırşehir","Yozgat"], description:"İç Anadolu bozkır altında. Tahıl tarımı.", hint:"İç Anadolu'nun step toprağı" },
      { id:"tt8", name:"Laterit Toprak", lat:36.80, lng:36.20, provinces:["Hatay","Osmaniye"], description:"Güneydoğu Akdeniz. Tropikal kalıntı.", hint:"Amanos eteklerindeki tropikal toprak" }
    ]
  },
  kiyi_tipleri: {
    label: "Kıyı Tipleri", icon: "🏖️", color: "#f1c40f",
    items: [
      { id:"kt1", name:"Ria Kıyısı (Batı Karadeniz)", lat:41.60, lng:32.00, provinces:["Zonguldak","Bartın","Sinop"], description:"Boğulmuş vadi kıyısı. Az girintili çıkıntılı.", hint:"Batı Karadeniz'in kıyı tipi" },
      { id:"kt2", name:"Enine Kıyı (Ege)", lat:38.50, lng:26.80, provinces:["İzmir","Aydın","Muğla"], description:"Dağlar kıyıya dik. Çok girintili/çıkıntılı. Koy-körfez.", hint:"Ege'nin çok girintili kıyısı" },
      { id:"kt3", name:"Boyuna Kıyı (Batı Akdeniz)", lat:36.50, lng:30.50, provinces:["Antalya"], description:"Dağlar kıyıya paralel. Az girintili çıkıntılı.", hint:"Antalya'nın düz kıyı tipi" },
      { id:"kt4", name:"Dalmaçya Kıyısı (Güney Ege)", lat:36.70, lng:28.00, provinces:["Muğla"], description:"Dağlar kıyıya paralel. Adalar oluşur. Göcek-Fethiye.", hint:"Muğla'nın adalı kıyı tipi" },
      { id:"kt5", name:"Limanlı Kıyı (Doğu Karadeniz)", lat:41.00, lng:40.00, provinces:["Trabzon","Rize","Artvin"], description:"Dağlar kıyıya paralel. Doğal liman az.", hint:"Doğu Karadeniz kıyı tipi" },
      { id:"kt6", name:"Haliçli Kıyı (Marmara)", lat:41.00, lng:29.00, provinces:["İstanbul"], description:"Haliç, boğaz oluşumlu kıyı.", hint:"İstanbul'un kıyı tipi" }
    ]
  },
  koy_korfez: {
    label: "Koy-Körfez-Yarımada", icon: "🌊", color: "#2980b9",
    items: [
      { id:"kk1", name:"İzmit Körfezi", lat:40.73, lng:29.50, provinces:["Kocaeli"], description:"Marmara'nın doğu körfezi. Sanayi.", hint:"Marmara'daki sanayi körfezi" },
      { id:"kk2", name:"Edremit Körfezi", lat:39.55, lng:26.80, provinces:["Balıkesir"], description:"Kuzey Ege körfezi. Zeytincilik.", hint:"Balıkesir'deki Ege körfezi" },
      { id:"kk3", name:"İzmir Körfezi", lat:38.45, lng:26.90, provinces:["İzmir"], description:"Ege'nin en büyük körfezi.", hint:"Ege'nin büyük körfezi" },
      { id:"kk4", name:"İskenderun Körfezi", lat:36.60, lng:36.10, provinces:["Hatay","Adana","Osmaniye"], description:"Doğu Akdeniz körfezi.", hint:"Akdeniz'in doğu körfezi" },
      { id:"kk5", name:"Antalya Körfezi", lat:36.50, lng:30.60, provinces:["Antalya"], description:"Akdeniz'in en büyük körfezi.", hint:"Akdeniz'in büyük körfezi" },
      { id:"kk6", name:"Mersin Körfezi", lat:36.60, lng:34.30, provinces:["Mersin"], description:"Doğu Akdeniz körfezi.", hint:"Mersin'deki körfez" },
      { id:"kk7", name:"Gelibolu Yarımadası", lat:40.37, lng:26.38, provinces:["Çanakkale"], description:"Çanakkale Savaşları. Tarihi milli park.", hint:"Çanakkale Savaşları yarımadası" },
      { id:"kk8", name:"Bozburun Yarımadası", lat:36.68, lng:28.07, provinces:["Muğla"], description:"Ege-Akdeniz geçişi.", hint:"Marmaris'teki yarımada" },
      { id:"kk9", name:"Datça Yarımadası", lat:36.73, lng:27.68, provinces:["Muğla"], description:"Ege ve Akdeniz'i ayırır.", hint:"Ege-Akdeniz ayıran yarımada" },
      { id:"kk10", name:"Sinop Burnu (İnce Burun)", lat:42.10, lng:35.09, provinces:["Sinop"], description:"Türkiye'nin en kuzey noktası.", hint:"En kuzey nokta" },
      { id:"kk11", name:"Bababurnu", lat:39.48, lng:26.07, provinces:["Çanakkale"], description:"Anadolu'nun en batı noktası.", hint:"En batı nokta" },
      { id:"kk12", name:"Anamur Burnu", lat:36.03, lng:32.81, provinces:["Mersin"], description:"Anadolu'nun en güney noktası.", hint:"En güney nokta" }
    ]
  },
  akarsular: {
    label: "Akarsular", icon: "💧", color: "#3498db",
    items: [
      { id:"a1", name:"Kızılırmak", lat:41.73, lng:35.98, provinces:["Sivas","Tokat","Amasya","Samsun","Nevşehir","Kırşehir"], description:"En uzun nehir (1355 km). Bafra deltası.", hint:"Türkiye'nin en uzun ırmağı" },
      { id:"a2", name:"Fırat Nehri", lat:38.68, lng:39.25, provinces:["Erzincan","Tunceli","Elazığ","Malatya","Adıyaman","Şanlıurfa"], description:"En uzun sınıraşan nehir. En çok su.", hint:"Mezopotamya nehri, en fazla su" },
      { id:"a3", name:"Dicle Nehri", lat:37.92, lng:40.23, provinces:["Elazığ","Diyarbakır","Batman","Siirt","Şırnak"], description:"Sınıraşan nehir. Irak'a geçer.", hint:"Fırat'ın kardeş nehri" },
      { id:"a4", name:"Sakarya Nehri", lat:41.10, lng:30.62, provinces:["Eskişehir","Bilecik","Sakarya","Bolu"], description:"Karadeniz'e dökülür. 824 km.", hint:"Marmara-Karadeniz nehri" },
      { id:"a5", name:"Yeşilırmak", lat:41.23, lng:36.55, provinces:["Sivas","Tokat","Amasya","Samsun"], description:"Çarşamba deltasını oluşturur.", hint:"Çarşamba Ovası nehri" },
      { id:"a6", name:"Büyük Menderes", lat:37.53, lng:27.18, provinces:["Afyonkarahisar","Denizli","Aydın"], description:"Ege'ye dökülür. Menderes=kıvrım.", hint:"Kıvrımlı Ege nehri" },
      { id:"a7", name:"Seyhan Nehri", lat:36.82, lng:35.07, provinces:["Kayseri","Adana"], description:"Çukurova'yı sulayan nehir.", hint:"Adana'nın nehri" },
      { id:"a8", name:"Ceyhan Nehri", lat:36.67, lng:35.82, provinces:["Kahramanmaraş","Osmaniye","Adana"], description:"İskenderun Körfezi'ne dökülür.", hint:"Çukurova'nın ikinci nehri" },
      { id:"a9", name:"Çoruh Nehri", lat:41.38, lng:41.65, provinces:["Bayburt","Erzurum","Artvin"], description:"En hızlı akan nehir. Rafting.", hint:"En hızlı akan nehir" },
      { id:"a10", name:"Aras Nehri", lat:39.88, lng:43.83, provinces:["Erzurum","Kars","Iğdır"], description:"Doğu sınır nehri. Hazar Denizi.", hint:"Doğu sınır nehri" },
      { id:"a11", name:"Meriç Nehri", lat:40.78, lng:26.02, provinces:["Edirne"], description:"Batı sınır nehri. Trakya.", hint:"Trakya'daki sınır nehri" },
      { id:"a12", name:"Asi Nehri", lat:36.17, lng:35.92, provinces:["Hatay"], description:"Güneyden giren tek nehir.", hint:"Güneyden gelen nehir" }
    ]
  },
  barajlar: {
    label: "Barajlar", icon: "🏗️", color: "#34495e",
    items: [
      { id:"br1", name:"Atatürk Barajı", lat:37.48, lng:38.33, provinces:["Şanlıurfa","Adıyaman"], description:"Fırat üzerinde. Türkiye'nin en büyük barajı. GAP.", hint:"En büyük baraj, GAP" },
      { id:"br2", name:"Keban Barajı", lat:38.80, lng:38.75, provinces:["Elazığ"], description:"Fırat üzerinde. İlk büyük baraj.", hint:"Elazığ'daki Fırat barajı" },
      { id:"br3", name:"Karakaya Barajı", lat:38.20, lng:38.95, provinces:["Malatya","Elazığ","Diyarbakır"], description:"Fırat üzerinde. Enerji.", hint:"Fırat'ın üçüncü barajı" },
      { id:"br4", name:"Hirfanlı Barajı", lat:39.15, lng:33.55, provinces:["Kırşehir"], description:"Kızılırmak üzerinde.", hint:"Kızılırmak'taki baraj" },
      { id:"br5", name:"Oymapınar Barajı", lat:36.98, lng:31.46, provinces:["Antalya"], description:"Manavgat Çayı üzerinde. Kemer baraj.", hint:"Antalya'daki kemer baraj" },
      { id:"br6", name:"Ilısu Barajı", lat:37.45, lng:41.78, provinces:["Mardin","Şırnak","Siirt","Batman"], description:"Dicle üzerinde. GAP barajı.", hint:"Dicle'nin en büyük barajı" },
      { id:"br7", name:"Çoruh Barajları (Deriner)", lat:41.03, lng:41.48, provinces:["Artvin"], description:"Deriner Barajı. Türkiye'nin en yüksek barajı (249 m).", hint:"En yüksek baraj, Artvin" },
      { id:"br8", name:"Altınkaya Barajı", lat:41.25, lng:36.00, provinces:["Samsun"], description:"Kızılırmak üzerinde.", hint:"Samsun'daki Kızılırmak barajı" }
    ]
  }
};
