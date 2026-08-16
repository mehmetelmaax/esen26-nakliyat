import React from 'react';
import type { Metadata } from 'next';
import { Sparkles, CheckCircle2, ShieldCheck, Clock, FileText } from 'lucide-react';
import { SITE } from '@/lib/site-config';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Eskişehir Ev ve Ofis Temizliği Hizmeti | Esen 26',
  description: "Eskişehir'de taşınma öncesi veya sonrası profesyonel ev ve ofis temizliği. Deneyimli temizlik personellerimiz ve kaliteli malzemelerimizle hijyenik temizlik.",
  alternates: {
    canonical: '/hizmetler/ev-ve-ofis-temizligi',
  },
};

export default function TemizlikHizmetiPage() {
  const schema = breadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Hizmetler', url: '#hizmetler' },
    { name: 'Ev ve Ofis Temizliği', url: '/hizmetler/ev-ve-ofis-temizligi' }
  ]);

  return (
    <>
      <JsonLd data={schema} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[{ name: 'Ev ve Ofis Temizliği', url: '/hizmetler/ev-ve-ofis-temizligi' }]} className="pt-4" />
        
        {/* Hero Section */}
        <section className="py-20 bg-navy text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl -z-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
            <span className="text-orange font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>HİJYENİK & GÜVENİLİR HİZMET</span>
            </span>
            <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
              Eskişehir Ev ve Ofis Temizliği
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
              Eskişehir Tepebaşı ve Odunpazarı başta olmak üzere, taşınma gününüzün getirdiği yorgunluğu hafifleten, profesyonel temizlik ekiplerimizle anahtar teslim hijyen sunuyoruz.
            </p>
          </div>
        </section>

        {/* Dynamic Service Overview */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Block 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-premium space-y-4">
              <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-orange flex-shrink-0" />
                <span>Eskişehir'de Profesyonel Ev ve Ofis Temizliği Neleri Kapsar?</span>
              </h2>
              <p className="text-charcoal text-sm md:text-base leading-relaxed font-semibold">
                Esen 26 Temizlik ekibi olarak Eskişehir'de sunduğumuz temizlik hizmeti, 2 ana aşamadan oluşan ve zeminlerin yıkanmasından kapı kollarının dezenfekte edilmesine kadar uzanan derinlemesine bir hijyen çalışmasını kapsar. Taşınma öncesi boş ev temizliği ve taşınma sonrası yerleşim temizliği olarak ikiye ayrılan bu süreçlerde kullandığımız tüm deterjanlar TSE standartlarına uygundur.
              </p>
              <p className="text-charcoal text-sm leading-relaxed">
                Hizmet kapsamımız, evin her bir köşesini ayrıntılı olarak ele alacak şekilde planlanmıştır. Mutfak alanında fayanslar, dolap içi ve dışı yüzeyler, davlumbaz ve ocak çevresi yağ arındırıcı kimyasallarla ovulur. Banyo ve tuvaletlerde derz araları dezenfekte edilerek kireç çözücü özel solüsyonlar yardımıyla parlatılır. Armatürler, lavabolar ve duşakabin camları su lekesi kalmayacak biçimde mikrofiber bezlerle kurulanarak teslim edilir.
              </p>
              <p className="text-charcoal text-sm leading-relaxed">
                Salon ve oda temizliklerinde ise süpürgeliklerin tozları alınır, pencereler içten ve dıştan silinir, varsa jaluzi ve stor perdelerin tozları vakumlanır. Kapılar, prizler ve elektrik anahtarları gibi sık temas edilen noktalar alkol bazlı yüzey dezenfektanlarıyla sterilize edilir. Zemin kaplamasına (laminat parke, mermer veya seramik) en uygun ph derecesine sahip temizlik sıvıları tercih edilerek ahşapların şişmesi veya mermerin matlaşması önlenir.
              </p>
              <p className="text-charcoal text-sm leading-relaxed">
                Taşıma öncesi veya sonrasında gerçekleştirdiğimiz hizmetlerimizin detaylı listesi şunları içermektedir:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs md:text-sm">
                <li className="flex items-center gap-2 text-charcoal font-semibold">
                  <span className="w-1.5 h-1.5 bg-orange rounded-full"></span>
                  <span>Mutfak dolaplarının iç-dış temizliği</span>
                </li>
                <li className="flex items-center gap-2 text-charcoal font-semibold">
                  <span className="w-1.5 h-1.5 bg-orange rounded-full"></span>
                  <span>Banyo ve tuvalet dezenfeksiyonu</span>
                </li>
                <li className="flex items-center gap-2 text-charcoal font-semibold">
                  <span className="w-1.5 h-1.5 bg-orange rounded-full"></span>
                  <span>Camların ve pencerelerin silinmesi</span>
                </li>
                <li className="flex items-center gap-2 text-charcoal font-semibold">
                  <span className="w-1.5 h-1.5 bg-orange rounded-full"></span>
                  <span>Zeminlerin buharlı vakumla silinmesi</span>
                </li>
                <li className="flex items-center gap-2 text-charcoal font-semibold">
                  <span className="w-1.5 h-1.5 bg-orange rounded-full"></span>
                  <span>Prizlerin ve anahtarların temizlenmesi</span>
                </li>
                <li className="flex items-center gap-2 text-charcoal font-semibold">
                  <span className="w-1.5 h-1.5 bg-orange rounded-full"></span>
                  <span>Kapıların ve pervazların ovulması</span>
                </li>
              </ul>
            </div>

            {/* Block 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-premium space-y-4">
              <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-orange flex-shrink-0" />
                <span>İnşaat Sonrası Boş Daire Temizliği Nasıl Yapılır?</span>
              </h2>
              <p className="text-charcoal text-sm md:text-base leading-relaxed font-semibold">
                Yeni tamamlanan binalarda veya tadilat gören evlerde 2026 yılı temizlik standartlarına uygun özel ekipmanlar ve endüstriyel vakum makineleri yardımıyla temizlik yapmaktayız. Alçı lekeleri, boya kalıntıları, harç artıkları ve yoğun inşaat tozu, yüzeylere zarar vermeyen özel kimyasal çözücüler kullanılarak temizlenir.
              </p>
              <p className="text-charcoal text-sm leading-relaxed">
                İnşaat sonrası oluşan moloz ve kaba pislikler yüzeylerden kazınmadan önce yumuşatıcı köpüklerle kaplanır. Camlarda biriken bant ve harç lekeleri için özel aparatlı cam jiletleri ve çizilmeyi önleyici keçeler kullanılır. Duvarlardaki ince alçı tozlarının temizlenmesi için yüksek çekim gücüne sahip hepa filtreli kuru vakum makineleri devreye sokulur. Bu sayede tozların havaya yayılarak tekrar yüzeylere çökmesi önlenmiş olur.
              </p>
              <p className="text-charcoal text-sm leading-relaxed">
                Banyo fayanslarındaki çimento ve derz dolgu lekeleri asit içermeyen özel temizleyicilerle ovulur. Mutfak tezgahı ve dolap raylarındaki talaş tozları ince uçlu vakum aparatlarıyla çekildikten sonra nemli bezlerle sterilize edilir. Zeminlerin temizliğinde ise endüstriyel zemin yıkama ve cilalama makineleri kullanılarak harç lekeleri tamamen sökülür, pırıl pırıl bir yüzey teslim edilir.
              </p>
              <p className="text-charcoal text-sm leading-relaxed">
                İnşaat sonrası temizlikte işleyiş şu adımları izler:
              </p>
              <ol className="space-y-3 pt-2 text-xs md:text-sm list-decimal list-inside text-charcoal font-semibold">
                <li>Kaba çöplerin ve harç birikintilerinin kazınmadan arındırılması.</li>
                <li>Hassas ahşap ve mermer yüzeyler için korozyon yapmayan temizleyicilerin seçilmesi.</li>
                <li>Tavanlardan tabana kadar biriken ince toz tabakasının kuru mikrofiber bezlerle çekilmesi.</li>
                <li>Islak hacimlerin dezenfektanlarla derinlemesine yıkanması ve kurulanması.</li>
              </ol>
            </div>

            {/* Block 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-premium space-y-4">
              <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
                <Clock className="w-6 h-6 text-orange flex-shrink-0" />
                <span>Taşınma Öncesi Eşyasız Ev Temizliği Neden Önemlidir?</span>
              </h2>
              <p className="text-charcoal text-sm md:text-base leading-relaxed font-semibold">
                Eşyalarınızın yerleşiminden önce yapılacak boş ev temizliği, 1 gün öncesinden tamamlanarak taşınma günü mobilyaların tozlu zeminlerle temas etmesini önler. Eşyalı bir evde dip bucak temizlik yapmak çok daha fazla iş gücü gerektirdiğinden, boş ev temizliği hem zamandan tasarruf sağlar hem de maliyet olarak daha uygundur.
              </p>
              <p className="text-charcoal text-sm leading-relaxed">
                Boş ev temizliğinin bir diğer önemli avantajı, tüm dolap içi ve raf yüzeylerinin engelsiz bir şekilde dezenfekte edilebilmesidir. Mutfak ve gardırop dolaplarının kapakları açılarak iç kısımları anti-alerjenik sıvılarla silinir ve havalandırılır. Bu sayede taşınma günü kamyondan indirilen giysileriniz ve mutfak gereçleriniz hiçbir ek işleme gerek kalmadan doğrudan temiz dolaplara yerleştirilebilir.
              </p>
              <p className="text-charcoal text-sm leading-relaxed">
                Eşyasız evlerin temizlenmesi, yeni evinizde sağlıklı bir başlangıç yapabilmeniz için astım ve alerji gibi solunum yolları rahatsızlıklarına karşı da koruyucu bir önlemdir. Ekiplerimiz evinizin tüm odalarını havalandırarak teslim eder.
              </p>
            </div>

            {/* Block 4 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-premium space-y-4">
              <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-orange flex-shrink-0" />
                <span>Eskişehir Ofis ve İşyeri Temizliğinde Dikkat Edilmesi Gerekenler Nelerdir?</span>
              </h2>
              <p className="text-charcoal text-sm md:text-base leading-relaxed font-semibold">
                Eskişehir merkezli ticari işletmeler için sunduğumuz ofis ve büro temizliklerinde, en az 3 kişiden oluşan uzman ekiplerimizle evrak ve arşiv güvenliğine azami özen gösteriyoruz. Bilgisayarlar, sunucu kabinleri ve elektronik cihazların toz alımlarında özel antistatik temizleyiciler kullanılarak statik elektrik hasarlarının önüne geçilir.
              </p>
              <p className="text-charcoal text-sm leading-relaxed">
                Ofis içi çalışma alanlarında hijyen standartları en üst düzeyde tutulmaktadır. Çalışanların gün boyu temas ettiği çalışma masaları, klavyeler, telefon ahizeleri ve toplantı masaları özel dezenfektanlarla silinir. Ortak kullanım alanı olan mutfak, lavabolar ve tuvaletler her gün veya periyodik anlaşmalara göre antibakteriyel sabunlar yardımıyla steril hale getirilir. Çöp kovaları boşaltılarak çöp poşetleri yenilenir.
              </p>
              <p className="text-charcoal text-sm leading-relaxed">
                Büyük iş yerleri ve showroomlar için zemin cilalama ve cam cephe temizliği gibi özel hizmetlerimiz de mevcuttur. Dış cephe cam silimleri için gerekli durumlarda sepetli vinç kurulumu yapılarak güvenlik kuralları çerçevesinde işlem gerçekleştirilir. Ofis halılarının temizliğinde ise kuru köpük teknolojili yıkama makineleri kullanılarak halıların kısa sürede kuruması ve nem kokusu yapmaması garanti edilir.
              </p>
              <p className="text-charcoal text-sm leading-relaxed">
                Çalışma saatlerinizin aksamaması adına dilerseniz hafta sonu veya mesai saatleri dışındaki akşam periyotlarında da ofis temizliği planlaması yapabilmekteyiz. Tüm işyerlerinde zemin ve masa hijyeni eksiksiz sağlanır.
              </p>
            </div>

            {/* Block 5: Price table */}
            <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-premium space-y-6">
              <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2 border-b border-gray-light pb-2">
                <FileText className="w-6 h-6 text-orange flex-shrink-0" />
                <span>Eskişehir Temizlik Hizmeti Fiyatları Nasıl Belirlenir?</span>
              </h2>
              <p className="text-charcoal text-sm md:text-base leading-relaxed font-semibold">
                Eskişehir'de ev temizliği fiyatlarımız, dairenin metrekaresine, oda sayısına ve inşaat sonrası / eşyasız boş daire durumuna göre 2.000 TL ile 6.000 TL arasında değişmektedir. Eşyalı dairelerin temizliği ve detaylı koltuk yıkama gibi ek talepler fiyat listemize ayrıca yansıtılır.
              </p>
              <p className="text-charcoal text-sm leading-relaxed">
                Temizlik fiyatlarını belirlerken binanın asansör durumu, cam adedi, ek dezenfeksiyon talepleri ve gerekli personel sayısı analiz edilir. Örneğin, dubleks veya villa tarzı geniş konutların temizliğinde en az 4 kişilik bir ekibin görev yapması gerekir, bu da iş gücü maliyetini belirler. Aşağıdaki tablomuzda Eskişehir genelinde uygulanan ortalama fiyat aralıklarını görebilirsiniz:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <caption>Eskişehir Ortalama Ev Temizliği Fiyat Tarifesi</caption>
                  <thead>
                    <tr className="bg-navy text-white">
                      <th scope="col" className="p-3 rounded-tl-lg">Daire Tipi</th>
                      <th scope="col" className="p-3">Boş Ev Temizliği (TL)</th>
                      <th scope="col" className="p-3 rounded-tr-lg">İnşaat Sonrası Temizlik (TL)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-light">
                    <tr className="hover:bg-off-white/50">
                      <th scope="row" className="p-3 font-bold text-navy">1+1 Daire</th>
                      <td className="p-3">2.000 TL – 2.500 TL</td>
                      <td className="p-3">3.000 TL – 3.500 TL</td>
                    </tr>
                    <tr className="hover:bg-off-white/50">
                      <th scope="row" className="p-3 font-bold text-navy">2+1 Daire</th>
                      <td className="p-3">2.500 TL – 3.200 TL</td>
                      <td className="p-3">3.800 TL – 4.500 TL</td>
                    </tr>
                    <tr className="hover:bg-off-white/50">
                      <th scope="row" className="p-3 font-bold text-navy">3+1 Daire</th>
                      <td className="p-3">3.200 TL – 4.000 TL</td>
                      <td className="p-3">4.500 TL – 5.500 TL</td>
                    </tr>
                    <tr className="hover:bg-off-white/50">
                      <th scope="row" className="p-3 font-bold text-navy">4+1+ Daire</th>
                      <td className="p-3">4.000 TL – 5.000 TL</td>
                      <td className="p-3">5.500 TL – 7.000 TL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Block 6: FAQs */}
            <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-premium space-y-6">
              <h2 className="font-display font-black text-navy text-xl md:text-2xl">
                Esen 26 Temizlik Hizmetleri Hakkında Sıkça Sorulan Sorular Nelerdir?
              </h2>
              
              <div className="space-y-6 text-sm text-charcoal">
                <div>
                  <h3 className="font-bold text-navy text-base mb-1">Temizlik malzemelerini firmanız mı getiriyor?</h3>
                  <p className="leading-relaxed">
                    Evet. Eskişehir genelinde verdiğimiz tüm temizlik hizmetlerinde endüstriyel vakum makineleri, buharlı temizleyiciler ve mikrofiber bezler dahil tüm malzemeleri biz temin ediyoruz. Sizin ekstra bir malzeme almanıza gerek yoktur.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-navy text-base mb-1">Temizlik işlemi kaç saat sürüyor ve kaç personel katılıyor?</h3>
                  <p className="leading-relaxed">
                    Ortalama 120 metrekarelik bir dairenin temizliği yaklaşık 6 ile 8 saat arasında tamamlanmaktadır. Dairenin boyutuna göre 2 ya da 4 kişilik deneyimli temizlik ekibimiz adrese yönlendirilir.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-navy text-base mb-1">Nakliyat ile birlikte temizlik hizmeti aldığımda indirim uygulanıyor mu?</h3>
                  <p className="leading-relaxed">
                    Evet. Esen 26 bünyesinde hem ev taşıma hem de boş daire temizliği hizmetini kombine olarak tercih eden müşterilerimize paket fiyat üzerinden %15 indirim fırsatı sunmaktayız.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
