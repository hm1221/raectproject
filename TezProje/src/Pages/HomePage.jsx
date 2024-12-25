import React, { useState, useRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tr } from "date-fns/locale";
import "./HomePage.css";
import resim from "../images/Foto15.webp";

registerLocale("tr", tr); // Türkçe dil ayarı

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const datePickerRef = useRef(null); // DatePicker için referans

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true); // Takvimi aç
    }
  };

  return (
    <div className="homepage">
      {/* Hero Bölgesi */}
      <section className="hero-section">
        <div className="overlay"></div> {/* Arka plan karartması */}
        <div className="content">
          <h1 className="hero-title">
            Düşük Ücretler Karşılığında Nakliye Çözümleri
          </h1>
        </div>
        <section className="search-section">
          <div className="search-buttons">
            <i className="fas fa-map-marker-alt"></i>
            <input
              type="text"
              className="search-text"
              placeholder="Kalkış Yeri"
            />

            <div className="vertical-divider"></div>

            <i className="fas fa-map-marker icon"></i>
            <input
              type="text"
              className="search-text"
              placeholder="Varış Yeri"
            />

            <div className="vertical-divider"></div>
            <div className="date-picker">
              <i
                className="fas fa-calendar-alt date-icon"
                onClick={openDatePicker} // İkona tıklayınca takvim açılır
              ></i>

              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText="Tarih Seçin"
                dateFormat="dd/MM/yyyy"
                locale="tr"
                minDate={new Date()} // Geçmiş tarihleri engelle
                className="date-input"
                popperPlacement="bottom" // Takvim pozisyonu
                popperClassName="custom-datepicker" // Daha estetik görünüm
                ref={datePickerRef} // Referansı bağla
              />
            </div>
            <button className="search-button search-submit">
              <i className="fas fa-search icon"></i> Ara
            </button>
          </div>
        </section>
      </section>

      {/* Arama Butonları */}

      {/* Özellikler ve Sloganlar */}
      <section className="features-section">
        <div className="feature">
          <i className="fas fa-money-bill-wave feature-icon"></i>
          <h3 className="feature-title">Düşük Maliyetler</h3>
          <p className="feature-description">
            Boş araç dönüşlerini en aza indirerek tasarruf edin. Platformumuz,
            nakliye işlemlerinizde hem maliyeti düşürmek hem de kaynakları en
            verimli şekilde kullanmanıza olanak tanır. Maliyetlerinizi kontrol
            altına almak artık çok kolay.
          </p>
        </div>
        <div className="feature">
          <i className="fas fa-leaf feature-icon"></i>
          <h3 className="feature-title">Çevre Dostu</h3>
          <p className="feature-description">
            Çevreye duyarlı nakliye çözümlerimizle karbon ayak izinizi
            azaltabilirsiniz. Yenilikçi yaklaşımlarımız ve sürdürülebilir
            politikalarımız sayesinde hem iş hedeflerinize ulaşabilir hem de
            çevreyi koruyabilirsiniz.
          </p>
        </div>
        <div className="feature">
          <i className="fas fa-bolt feature-icon"></i>
          <h3 className="feature-title">Hızlı Çözümler</h3>
          <p className="feature-description">
            Hız, nakliye süreçlerinde en önemli unsurlardan biridir.
            Platformumuz, ihtiyacınız olan nakliye işlemlerini en kısa sürede
            sonuçlandırmanıza yardımcı olur. Zamanın değerini biliyor ve bu
            değeri koruyoruz.
          </p>
        </div>
      </section>
      <section className="cta-section">
        <div className="cta-container">
          {/* Sol taraf: Yazı ve buton */}
          <div className="cta-content">
            <h2 className="cta-title">Nakliye İhtiyacınızı Kolayca Çözün</h2>
            <p className="cta-description">
              Nakliye sağlayıcısı olarak kaydolun ve yüklerinizi kolayca
              paylaşarak maliyetlerinizi düşürün. İlk nakliye işinizi yayınlamak
              sadece birkaç dakikanızı alır. Haydi, şimdi başlayın!
            </p>
            <button className="cta-button">Nakliye Yayınla</button>
          </div>

          {/* Sağ taraf: Mutlu nakliyeci */}
          <div className="cta-image">
            <img src={resim} alt="Mutlu Nakliyeci" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
