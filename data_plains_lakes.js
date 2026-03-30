// Ovalar ve Göller (türlerine göre)
const DATA_PLAINS_LAKES = {
  delta_ovalari: {
    label: "Delta Ovaları", icon: "🌊", color: "#2980b9",
    items: [
      { id:"do1", name:"Bafra Ovası", lat:41.57, lng:35.90, provinces:["Samsun"], description:"Kızılırmak deltası.", hint:"Kızılırmak'ın denize döküldüğü ova" },
      { id:"do2", name:"Çarşamba Ovası", lat:41.20, lng:36.72, provinces:["Samsun"], description:"Yeşilırmak deltası.", hint:"Yeşilırmak deltası" },
      { id:"do3", name:"Çukurova", lat:37.00, lng:35.50, provinces:["Adana","Mersin"], description:"Seyhan-Ceyhan delta ovası. En verimli.", hint:"Güneyde Seyhan-Ceyhan deltası" },
      { id:"do4", name:"Silifke (Göksu) Ovası", lat:36.30, lng:33.95, provinces:["Mersin"], description:"Göksu Nehri deltası.", hint:"Mersin'deki nehir deltası" },
      { id:"do5", name:"Gediz Deltası", lat:38.55, lng:26.90, provinces:["İzmir"], description:"Gediz nehri delta ovası.", hint:"İzmir'deki delta ova" },
      { id:"do6", name:"B.Menderes Deltası", lat:37.55, lng:27.20, provinces:["Aydın"], description:"Büyük Menderes delta ovası.", hint:"Aydın'daki delta ova" }
    ]
  },
  aluvyon_ovalar: {
    label: "Alüvyon (Taşkın) Ovalar", icon: "💧", color: "#8e44ad",
    items: [
      { id:"ao1", name:"Sakarya (Adapazarı) Ovası", lat:40.78, lng:30.40, provinces:["Sakarya"], description:"Sakarya Nehri'nin oluşturduğu ova.", hint:"Sakarya'nın taşıdığı alüvyon ova" },
      { id:"ao2", name:"Ergene Ovası", lat:41.25, lng:27.15, provinces:["Tekirdağ","Edirne"], description:"Ergene Nehri havzası ovası.", hint:"Trakya'nın ortasındaki ova" }
    ]
  },
  tektonik_ovalar: {
    label: "Tektonik Ovalar", icon: "📐", color: "#27ae60",
    items: [
      { id:"to1", name:"Büyük Menderes Ovası", lat:37.75, lng:28.00, provinces:["Aydın","Denizli"], description:"Graben oluşumlu tektonik ova.", hint:"Ege'deki graben ova" },
      { id:"to2", name:"Gediz Ovası", lat:38.60, lng:27.50, provinces:["Manisa","İzmir"], description:"Gediz Grabeni tektonik ovası.", hint:"Manisa'daki graben ova" },
      { id:"to3", name:"Bakırçay Ovası", lat:39.08, lng:27.17, provinces:["İzmir"], description:"Tektonik çöküntü ovası.", hint:"İzmir kuzeyindeki graben ova" },
      { id:"to4", name:"Bursa Ovası", lat:40.15, lng:29.10, provinces:["Bursa"], description:"Tektonik çöküntü ovası.", hint:"Bursa'daki tektonik ova" },
      { id:"to5", name:"Bolu Ovası", lat:40.73, lng:31.60, provinces:["Bolu"], description:"Tektonik ova. Düzce fay hattı.", hint:"Bolu'daki tektonik ova" },
      { id:"to6", name:"Düzce Ovası", lat:40.84, lng:31.16, provinces:["Düzce"], description:"Kuzey Anadolu Fayı tektonik ovası.", hint:"Düzce'deki tektonik ova" },
      { id:"to7", name:"Muş Ovası", lat:38.75, lng:41.50, provinces:["Muş"], description:"Doğu Anadolu tektonik ovası.", hint:"Doğu Anadolu tektonik ovası" },
      { id:"to8", name:"Erzurum Ovası", lat:39.90, lng:41.27, provinces:["Erzurum"], description:"Karasu tarafından sulanan tektonik ova.", hint:"Doğu Anadolu yüksek ovası" },
      { id:"to9", name:"Iğdır Ovası", lat:39.90, lng:44.02, provinces:["Iğdır"], description:"Tektonik ova. Mikro klima.", hint:"Ağrı Dağı eteklerindeki ova" },
      { id:"to10", name:"Erbaa-Niksar Ovası", lat:40.68, lng:36.58, provinces:["Tokat"], description:"Kelkit Çayı tektonik ovası.", hint:"Tokat'taki tektonik ova" }
    ]
  },
  volkanik_ovalar: {
    label: "Volkanik Ovalar", icon: "🌋", color: "#d35400",
    items: [
      { id:"vo1", name:"Develi Ovası", lat:38.38, lng:35.48, provinces:["Kayseri"], description:"Erciyes civarı volkanik ova.", hint:"Erciyes dağının yakınındaki ova" }
    ]
  },
  karstik_ovalar: {
    label: "Karstik Ovalar (Polye)", icon: "🕳️", color: "#16a085",
    items: [
      { id:"ko1", name:"Elmalı Ovası", lat:36.74, lng:29.92, provinces:["Antalya"], description:"Batı Toroslar karstik polye.", hint:"Antalya'daki karstik ova" },
      { id:"ko2", name:"Kestel Ovası", lat:37.45, lng:30.20, provinces:["Burdur"], description:"Karstik polye ovası.", hint:"Burdur'daki polye" },
      { id:"ko3", name:"Acıpayam Ovası", lat:37.43, lng:29.35, provinces:["Denizli"], description:"Karstik polye.", hint:"Denizli'deki polye ovası" },
      { id:"ko4", name:"Tefenni Ovası", lat:37.30, lng:29.77, provinces:["Burdur"], description:"Karstik polye.", hint:"Burdur'daki ikinci polye" },
      { id:"ko5", name:"Korkuteli Ovası", lat:37.07, lng:30.18, provinces:["Antalya"], description:"Karstik polye ovası.", hint:"Antalya kuzeyindeki polye" },
      { id:"ko6", name:"Muğla Ovası", lat:37.22, lng:28.36, provinces:["Muğla"], description:"Karstik kaynaklı ova.", hint:"Muğla'daki karstik ova" }
    ]
  },
  tektonik_goller: {
    label: "Tektonik Göller", icon: "🏞️", color: "#3498db",
    items: [
      { id:"tg1", name:"Van Gölü", lat:38.64, lng:43.28, provinces:["Van","Bitlis"], description:"Türkiye'nin en büyük gölü. Sodalı.", hint:"En büyük göl, sodalı" },
      { id:"tg2", name:"Tuz Gölü", lat:38.75, lng:33.35, provinces:["Ankara","Aksaray","Konya"], description:"2. büyük göl. Tuzlu.", hint:"İç Anadolu'nun tuzlu gölü" },
      { id:"tg3", name:"Beyşehir Gölü", lat:37.73, lng:31.50, provinces:["Konya"], description:"En büyük tatlı su gölü.", hint:"En büyük tatlı su gölü" },
      { id:"tg4", name:"Eğirdir Gölü", lat:38.03, lng:30.87, provinces:["Isparta"], description:"4. büyük göl. Tatlı su.", hint:"Isparta'daki tatlı su gölü" },
      { id:"tg5", name:"Burdur Gölü", lat:37.72, lng:30.28, provinces:["Burdur"], description:"Tektonik. Acı su.", hint:"Burdur'daki acı su gölü" },
      { id:"tg6", name:"Acıgöl", lat:37.73, lng:29.97, provinces:["Denizli","Burdur"], description:"Tektonik. Acı su.", hint:"Göller Yöresi acı göl" },
      { id:"tg7", name:"İznik Gölü", lat:40.43, lng:29.53, provinces:["Bursa"], description:"Marmara'nın en büyük gölü.", hint:"Marmara'nın en büyük gölü" },
      { id:"tg8", name:"Sapanca Gölü", lat:40.68, lng:30.28, provinces:["Sakarya","Kocaeli"], description:"Kuzey Anadolu Fayı çöküntüsü.", hint:"Marmara'daki fay gölü" },
      { id:"tg9", name:"Hazar Gölü", lat:38.48, lng:39.40, provinces:["Elazığ"], description:"Doğu Anadolu Fayı üzerinde.", hint:"Elazığ'daki tektonik göl" },
      { id:"tg10", name:"Çıldır Gölü", lat:41.05, lng:43.43, provinces:["Ardahan","Kars"], description:"Kışın tamamen donan göl.", hint:"Kışın donan göl" },
      { id:"tg11", name:"Erçek Gölü", lat:38.98, lng:43.58, provinces:["Van"], description:"Tuzlu tektonik göl.", hint:"Van'daki tuzlu göl" },
      { id:"tg12", name:"Manyas (Kuş) Gölü", lat:40.18, lng:28.00, provinces:["Balıkesir"], description:"Kuş cenneti. Ramsar alanı.", hint:"Kuş cenneti gölü" },
      { id:"tg13", name:"Ulubat Gölü", lat:40.17, lng:28.58, provinces:["Bursa"], description:"Tatlı su tektonik göl.", hint:"Bursa'daki tektonik göl" }
    ]
  },
  volkanik_goller: {
    label: "Volkanik Göller", icon: "🌋", color: "#e67e22",
    items: [
      { id:"vg1", name:"Nemrut Krater Gölü", lat:38.63, lng:42.24, provinces:["Bitlis"], description:"Dünyanın en büyük krater göllerinden.", hint:"Krater içindeki göl" },
      { id:"vg2", name:"Nazik Gölü", lat:38.95, lng:42.58, provinces:["Bitlis"], description:"Volkanik set göl.", hint:"Bitlis'teki volkanik göl" },
      { id:"vg3", name:"Meke Gölü", lat:37.68, lng:33.65, provinces:["Konya"], description:"Maar gölü. Volkanik krater.", hint:"Konya'daki maar gölü" },
      { id:"vg4", name:"Balık Gölü", lat:39.73, lng:43.60, provinces:["Ağrı"], description:"Volkanik set göl.", hint:"Ağrı'daki volkanik set göl" }
    ]
  },
  set_goller: {
    label: "Set Gölleri", icon: "🚧", color: "#2c3e50",
    items: [
      { id:"sg1", name:"Tortum Gölü", lat:40.30, lng:41.53, provinces:["Erzurum"], description:"Heyelan set gölü.", hint:"Erzurum'daki heyelan set gölü" },
      { id:"sg2", name:"Sera Gölü", lat:40.95, lng:39.65, provinces:["Trabzon"], description:"Heyelan set gölü.", hint:"Trabzon'daki heyelan gölü" },
      { id:"sg3", name:"Yedigöller", lat:40.95, lng:31.75, provinces:["Bolu"], description:"Heyelan set gölleri. Milli park.", hint:"Bolu'daki 7 göl" },
      { id:"sg4", name:"Abant Gölü", lat:40.60, lng:31.28, provinces:["Bolu"], description:"Heyelan+tektonik set gölü.", hint:"Bolu'nun ünlü gölü" },
      { id:"sg5", name:"Zinav Gölü", lat:39.60, lng:37.20, provinces:["Sivas"], description:"Heyelan set gölü.", hint:"Sivas'taki heyelan gölü" },
      { id:"sg6", name:"Küçükçekmece Gölü", lat:41.00, lng:28.75, provinces:["İstanbul"], description:"Kıyı set (lagün) gölü.", hint:"İstanbul'daki lagün" },
      { id:"sg7", name:"Büyükçekmece Gölü", lat:41.03, lng:28.58, provinces:["İstanbul"], description:"Kıyı set (lagün) gölü.", hint:"İstanbul'daki ikinci lagün" },
      { id:"sg8", name:"Bafa Gölü", lat:37.53, lng:27.42, provinces:["Muğla","Aydın"], description:"Kıyı set gölü. Eski körfez.", hint:"Ege'deki kıyı set gölü" },
      { id:"sg9", name:"Köyceğiz Gölü", lat:36.85, lng:28.68, provinces:["Muğla"], description:"Kıyı set (lagün) gölü.", hint:"Muğla'daki lagün gölü" },
      { id:"sg10", name:"Terkos (Durusu) Gölü", lat:41.35, lng:28.60, provinces:["İstanbul"], description:"Kıyı set gölü. İçme suyu.", hint:"İstanbul'un içme suyu gölü" },
      { id:"sg11", name:"Mogan Gölü", lat:39.78, lng:32.80, provinces:["Ankara"], description:"Alüvyon set gölü.", hint:"Ankara'daki alüvyon set gölü" },
      { id:"sg12", name:"Eymir Gölü", lat:39.82, lng:32.82, provinces:["Ankara"], description:"Alüvyon set gölü.", hint:"Ankara'daki ikinci alüvyon göl" },
      { id:"sg13", name:"Salda Gölü", lat:37.53, lng:29.67, provinces:["Burdur"], description:"Karstik+tektonik göl. Beyaz kumlar.", hint:"Türkiye'nin Maldivleri" }
    ]
  },
  karstik_goller: {
    label: "Karstik Göller", icon: "💎", color: "#1abc9c",
    items: [
      { id:"kag1", name:"Suğla Gölü", lat:37.30, lng:32.05, provinces:["Konya"], description:"Karstik çöküntü gölü. Obruk bölgesi.", hint:"Konya'daki karstik göl" },
      { id:"kag2", name:"Yarışlı Gölü", lat:37.57, lng:29.37, provinces:["Burdur"], description:"Karstik (polye) göl.", hint:"Burdur'daki karstik göl" },
      { id:"kag3", name:"Kestel Gölü", lat:37.45, lng:30.22, provinces:["Burdur"], description:"Polye gölü.", hint:"Burdur polye gölü" }
    ]
  },
  buzul_goller: {
    label: "Buzul Göller", icon: "❄️", color: "#5dade2",
    items: [
      { id:"bg1", name:"Karagöl (Artvin)", lat:41.40, lng:42.10, provinces:["Artvin"], description:"Buzul aşındırma gölü. Sahara.", hint:"Artvin'deki buzul gölü" },
      { id:"bg2", name:"Aygır Gölü", lat:38.60, lng:42.50, provinces:["Bitlis"], description:"Buzul sirk gölü.", hint:"Bitlis'teki buzul göl" },
      { id:"bg3", name:"Karagöl (Giresun)", lat:40.56, lng:38.70, provinces:["Giresun"], description:"Buzul sirk gölü. Milli park.", hint:"Giresun'daki buzul gölü" },
      { id:"bg4", name:"Çubuk Gölü (Ağrı)", lat:39.60, lng:44.20, provinces:["Ağrı"], description:"Ağrı Dağı buzul gölü.", hint:"Ağrı Dağı'ndaki buzul göl" }
    ]
  }
};
