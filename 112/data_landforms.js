// Yer Şekilleri: Dağlar, Masifler, Platolar
const DATA_LANDFORMS = {
  kivrim_daglar: {
    label: "Kıvrım Dağlar", icon: "⛰️", color: "#e74c3c",
    items: [
      { id:"kd1", name:"Küre Dağları", lat:41.75, lng:33.25, provinces:["Kastamonu","Bartın"], description:"Kuzey Anadolu kıvrım dağları. Milli park.", hint:"Batı Karadeniz'deki kıvrım dağ" },
      { id:"kd2", name:"Ilgaz Dağları", lat:41.08, lng:33.73, provinces:["Kastamonu","Çankırı"], description:"Kuzey Anadolu kıvrım sistemi. 2587 m.", hint:"Kastamonu-Çankırı sınırı" },
      { id:"kd3", name:"Köroğlu Dağları", lat:40.70, lng:32.00, provinces:["Bolu","Eskişehir"], description:"Kuzey Anadolu kıvrım dağları.", hint:"Bolu çevresindeki kıvrım dağ" },
      { id:"kd4", name:"Canik Dağları", lat:41.10, lng:36.80, provinces:["Samsun","Ordu"], description:"Orta Karadeniz kıvrım dağları.", hint:"Samsun-Ordu arasındaki dağlar" },
      { id:"kd5", name:"Giresun Dağları", lat:40.60, lng:38.50, provinces:["Giresun"], description:"Doğu Karadeniz kıvrım dağları.", hint:"Karadeniz'de fındık yetişen dağlar" },
      { id:"kd6", name:"Kaçkar Dağları", lat:40.84, lng:41.16, provinces:["Rize","Artvin"], description:"Doğu Karadeniz. 3937 m. Kıvrım+volkanik.", hint:"Doğu Karadeniz'in en yüksek dağları" },
      { id:"kd7", name:"Batı Toroslar", lat:37.20, lng:30.50, provinces:["Antalya","Burdur","Isparta"], description:"Bey Dağları, Akdağ. Göller Yöresi'ni sınırlar.", hint:"Antalya-Göller Yöresi torosları" },
      { id:"kd8", name:"Orta Toroslar (Bolkar)", lat:37.45, lng:34.62, provinces:["Niğde","Mersin"], description:"Bolkar Dağları, 3524 m.", hint:"Niğde-Mersin sınırındaki toroslar" },
      { id:"kd9", name:"Aladağlar", lat:37.75, lng:35.20, provinces:["Adana","Kayseri","Niğde"], description:"Orta Toroslar. 3756 m. Dağcılık merkezi.", hint:"Orta Toroslar'ın en yüksek kısmı" },
      { id:"kd10", name:"Doğu Toroslar (Nurhak)", lat:37.95, lng:37.40, provinces:["Kahramanmaraş","Malatya"], description:"Güney kıvrım dağları.", hint:"Maraş-Malatya çevresindeki toroslar" },
      { id:"kd11", name:"Cilo Dağı", lat:37.49, lng:44.03, provinces:["Hakkari"], description:"Güneydoğu Toroslar. 4135 m.", hint:"Hakkari'deki yüksek kıvrım dağ" },
      { id:"kd12", name:"Cudi Dağı", lat:37.40, lng:42.85, provinces:["Şırnak"], description:"Güneydoğu Toroslar uzantısı.", hint:"Şırnak'taki dağ" },
      { id:"kd13", name:"Munzur Dağları", lat:39.30, lng:39.50, provinces:["Tunceli"], description:"İç kıvrım dağ. 3463 m. Milli park.", hint:"Tunceli'nin kıvrım dağları" },
      { id:"kd14", name:"Mercan Dağları", lat:39.42, lng:39.70, provinces:["Tunceli","Erzincan"], description:"İç kıvrım dağ sistemi.", hint:"Tunceli-Erzincan sınırı" },
      { id:"kd15", name:"Allahüekber Dağları", lat:40.30, lng:42.50, provinces:["Kars","Erzurum"], description:"Doğu Anadolu kıvrım dağı. Sarıkamış yakını.", hint:"Kars-Erzurum arasındaki dağ" }
    ]
  },
  kirik_daglar: {
    label: "Kırık (Horst) Dağlar", icon: "🏔️", color: "#c0392b",
    items: [
      { id:"hd1", name:"Uludağ", lat:40.07, lng:29.22, provinces:["Bursa"], description:"2543 m. Horst dağ. Kış turizmi.", hint:"Marmara'nın en yüksek horst dağı" },
      { id:"hd2", name:"Honaz Dağı", lat:37.75, lng:29.28, provinces:["Denizli"], description:"2528 m. Batı Anadolu'nun en yüksek noktası.", hint:"Ege'nin en yüksek horst dağı" },
      { id:"hd3", name:"Bozdağlar", lat:38.35, lng:28.05, provinces:["İzmir","Manisa"], description:"Ege'deki horst dağ. Gediz Grabeni kenarı.", hint:"İzmir-Manisa graben kenarı" },
      { id:"hd4", name:"Aydın Dağları", lat:37.70, lng:27.60, provinces:["Aydın"], description:"B.Menderes Grabeni kenarı horst.", hint:"Aydın'daki graben kenarı dağ" },
      { id:"hd5", name:"Madra Dağı", lat:39.45, lng:27.10, provinces:["Balıkesir"], description:"Kuzey Ege'deki horst dağ.", hint:"Balıkesir'deki horst dağ" },
      { id:"hd6", name:"Yunt Dağı", lat:38.95, lng:27.75, provinces:["Manisa"], description:"Gediz Grabeni kenarı horst.", hint:"Manisa'daki horst dağ" },
      { id:"hd7", name:"Kazdağı (İda)", lat:39.70, lng:26.87, provinces:["Balıkesir","Çanakkale"], description:"1774 m. Horst dağ. Mitolojik.", hint:"Ege'de mitolojik horst dağ" },
      { id:"hd8", name:"Murat Dağı", lat:38.98, lng:29.58, provinces:["Kütahya"], description:"İç Batı Anadolu horst dağı. 2312 m.", hint:"Kütahya'daki horst dağ" },
      { id:"hd9", name:"Davraz Dağı", lat:37.78, lng:30.65, provinces:["Isparta"], description:"Horst dağ. Kayak merkezi. 2635 m.", hint:"Isparta'daki kayak dağı" },
      { id:"hd10", name:"Menteşe Dağları", lat:37.10, lng:28.30, provinces:["Muğla"], description:"Güneybatı Anadolu horst sistemi.", hint:"Muğla çevresindeki horst dağlar" }
    ]
  },
  volkanik_daglar: {
    label: "Volkanik Dağlar", icon: "🌋", color: "#d35400",
    items: [
      { id:"vd1", name:"Ağrı Dağı", lat:39.70, lng:44.30, provinces:["Ağrı","Iğdır"], description:"5137 m. Türkiye'nin en yüksek dağı.", hint:"Türkiye'nin çatısı" },
      { id:"vd2", name:"Süphan Dağı", lat:38.93, lng:42.82, provinces:["Bitlis"], description:"4058 m. Van Gölü kuzeyinde.", hint:"Van Gölü kuzeyindeki volkan" },
      { id:"vd3", name:"Nemrut Dağı (Bitlis)", lat:38.65, lng:42.23, provinces:["Bitlis"], description:"Krater gölü var. Aktif volkan.", hint:"Krater gölü olan volkan" },
      { id:"vd4", name:"Tendürek Dağı", lat:39.37, lng:43.87, provinces:["Ağrı","Van"], description:"3584 m. Doğu Anadolu volkanı.", hint:"Ağrı-Van sınırındaki volkan" },
      { id:"vd5", name:"Erciyes Dağı", lat:38.53, lng:35.45, provinces:["Kayseri"], description:"3917 m. İç Anadolu'nun en yüksek volkanı.", hint:"Kayseri'deki volkan" },
      { id:"vd6", name:"Hasan Dağı", lat:38.13, lng:34.17, provinces:["Aksaray"], description:"3268 m. İç Anadolu volkanı.", hint:"Aksaray'daki volkan" },
      { id:"vd7", name:"Karacadağ", lat:37.68, lng:39.83, provinces:["Şanlıurfa","Diyarbakır"], description:"Güneydoğu'nun tek volkanı. Bazalt.", hint:"Güneydoğu Anadolu volkanı" },
      { id:"vd8", name:"Melendiz Dağları", lat:38.25, lng:34.45, provinces:["Niğde"], description:"Kapadokya volkanik bölgesi.", hint:"Niğde-Kapadokya volkanik dağ" },
      { id:"vd9", name:"Karadağ (Karaman)", lat:37.35, lng:33.10, provinces:["Karaman"], description:"İç Anadolu sönmüş volkanı.", hint:"Karaman'daki volkanik dağ" }
    ]
  },
  masifler: {
    label: "Masifler", icon: "🗻", color: "#8e44ad",
    items: [
      { id:"m1", name:"Yıldız (Istranca) Masifi", lat:41.80, lng:27.60, provinces:["Kırklareli"], description:"Trakya'nın en eski kara kütlesi. I. zamandan kalma.", hint:"Trakya'daki masif" },
      { id:"m2", name:"Saruhan-Menteşe Masifi", lat:37.50, lng:28.20, provinces:["Muğla","Aydın"], description:"Ege'deki eski kara. I. zaman.", hint:"Ege'deki masif arazi" },
      { id:"m3", name:"Kırşehir Masifi", lat:39.20, lng:34.20, provinces:["Kırşehir","Nevşehir"], description:"İç Anadolu'daki eski kara kütlesi.", hint:"İç Anadolu'daki masif" },
      { id:"m4", name:"Bitlis Masifi", lat:38.50, lng:42.20, provinces:["Bitlis"], description:"Doğu Anadolu eski kara. Van Gölü'nü sınırlar.", hint:"Van Gölü yakınındaki masif" },
      { id:"m5", name:"Mardin-Midyat Eşiği", lat:37.40, lng:41.00, provinces:["Mardin"], description:"Güneydoğu'daki eski kara kütlesi.", hint:"Güneydoğu Anadolu masifi" },
      { id:"m6", name:"Sultan Dağları", lat:38.20, lng:31.20, provinces:["Afyonkarahisar","Konya"], description:"İç Anadolu masif karakterli dağ.", hint:"Afyon-Konya arasındaki masif dağ" }
    ]
  },
  platolar: {
    label: "Platolar", icon: "🏜️", color: "#7f8c8d",
    items: [
      { id:"p1", name:"Haymana Platosu", lat:39.40, lng:32.50, provinces:["Ankara"], description:"İç Anadolu platosu. Tahıl tarımı.", hint:"Ankara güneyindeki plato" },
      { id:"p2", name:"Cihanbeyli Platosu", lat:38.70, lng:32.90, provinces:["Konya"], description:"İç Anadolu platosu. Tuz Gölü kenarı.", hint:"Konya'daki plato" },
      { id:"p3", name:"Obruk Platosu", lat:37.70, lng:33.00, provinces:["Konya","Karaman"], description:"Karstik obrukların bulunduğu plato.", hint:"Konya'da obruklu plato" },
      { id:"p4", name:"Bozok Platosu", lat:39.80, lng:34.80, provinces:["Yozgat"], description:"İç Anadolu kuzeyi platosu.", hint:"Yozgat çevresindeki plato" },
      { id:"p5", name:"Uzunyayla Platosu", lat:39.00, lng:36.50, provinces:["Sivas","Kayseri"], description:"İç Anadolu yüksek platosu. Hayvancılık.", hint:"Sivas'taki yüksek plato" },
      { id:"p6", name:"Erzurum-Kars Platosu", lat:40.10, lng:42.50, provinces:["Erzurum","Kars","Ardahan"], description:"Doğu Anadolu. Hayvancılık. Çernozyom toprak.", hint:"Doğu'nun yüksek platosu" },
      { id:"p7", name:"Taşeli Platosu", lat:36.70, lng:33.00, provinces:["Mersin","Karaman"], description:"Akdeniz Bölgesi platosu. Karstik.", hint:"Mersin kuzeyindeki plato" },
      { id:"p8", name:"Teke Platosu", lat:37.30, lng:30.20, provinces:["Antalya","Burdur"], description:"Batı Toroslar üzerinde. Karstik.", hint:"Antalya kuzeyindeki plato" },
      { id:"p9", name:"Gaziantep Platosu", lat:37.10, lng:37.40, provinces:["Gaziantep"], description:"Güneydoğu platosu. Bazalt örtülü.", hint:"Güneydoğu platosu" },
      { id:"p10", name:"Şanlıurfa Platosu", lat:37.00, lng:38.80, provinces:["Şanlıurfa"], description:"Güneydoğu platosu. GAP bölgesi.", hint:"Güneydoğu'daki tarım platosu" },
      { id:"p11", name:"Çatalca-Kocaeli Platosu", lat:41.10, lng:29.50, provinces:["İstanbul","Kocaeli"], description:"Marmara platosu. Sanayi bölgesi.", hint:"Marmara'daki plato" },
      { id:"p12", name:"Perşembe Platosu", lat:40.70, lng:38.30, provinces:["Giresun","Ordu"], description:"Karadeniz yaylası/platosu.", hint:"Karadeniz'deki ünlü yayla-plato" }
    ]
  }
};
