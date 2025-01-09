// React bileşeni: Search Sayfası

import "./Search.css";
import React, { useState, useRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tr } from "date-fns/locale";

registerLocale("tr", tr);

const Search = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const datePickerRef = useRef(null); // DatePicker için referans
  const [from, setFrom] = useState(""); // Kalkış yeri
  const [to, setTo] = useState(""); // Varış yeri

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true); // Takvimi aç
    }
  };

  const handlePopularRouteClick = (route) => {
    const [fromLocation, toLocation] = route.split(" → "); // Popüler güzergâhı böl
    setFrom(fromLocation);
    setTo(toLocation);

    // Ara butonuna otomatik tıklama simülasyonu
    handleSearch();
  };

  const handleSearch = () => {
    alert(
      `Kalkış: ${fromLocation}\nVarış: ${toLocation}\nTarih: ${selectedDate.toLocaleDateString(
        "tr-TR"
      )}`
    );
    // Burada API çağrısı veya sonuç yönlendirmesi yapılabilir.
  };
  return (
    <div className="search-container">
      <header className="search-page-header">Sefer Ara</header>
      <section className="search-section">
        <div className="search-buttons">
          <i className="fas fa-map-marker-alt"></i>
          <input
            type="text"
            className="search-text"
            placeholder="Kalkış Yeri"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />

          <div className="vertical-divider"></div>

          <i className="fas fa-map-marker icon"></i>
          <input
            type="text"
            className="search-text"
            placeholder="Varış Yeri"
            value={to}
            onChange={(e) => setTo(e.target.value)}
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
          <button
            className="search-button search-submit"
            onClick={handleSearch}
          >
            <i className="fas fa-search icon"></i> Ara
          </button>
        </div>
      </section>

      <section className="search-page-popular-routes">
        <h2 className="search-page-popular-routes-header">Popüler Seferler</h2>
        <ul className="search-page-popular-routes-list">
          {[
            "İzmir, Türkiye → Manisa, Türkiye",
            "İstanbul, Türkiye → Ankara, Türkiye",
            "Antalya, Türkiye → Bursa, Türkiye",
            "Konya, Türkiye → Kayseri, Türkiye",
            "Adana, Türkiye → Mersin, Türkiye",
            "Eskişehir, Türkiye → İstanbul, Türkiye",
          ].map((route, index) => (
            <li
              key={index}
              className="search-page-popular-route-item"
              onClick={() => handlePopularRouteClick(route)}
            >
              {route}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Search;
