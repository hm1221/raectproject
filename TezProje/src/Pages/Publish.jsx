import "./Publish.css";
import Foto16 from "../images/Foto16.png";
import React, { useState, useRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tr } from "date-fns/locale";
import { Link } from "react-router-dom";

registerLocale("tr", tr); // Türkçe dil ayarı

const Publish = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const datePickerRef = useRef(null);
  const [startCity, setStartCity] = useState(""); // "Nereden" için stateconst [startCity, setStartCity] = useState(""); // "Nereden" için state
  const [endCity, setEndCity] = useState("");
  // Takvimi açan fonksiyon
  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };
  console.log(startCity);
  console.log(endCity);
  return (
    <>
      <section className="baslık">
        <h3 className="h33">
          "Nakliye Paylaşarak Daha Fazla Tasarruf Sağlayın"
        </h3>
      </section>
      <div className="publish-container">
        {/* Sol Taraf Form */}
        <div className="form-section">
          <h2 className="form-title">Nakliye Yayınla</h2>
          <div className="form-group">
            <label htmlFor="from" className="form-label">
              <i className="fas fa-map-marker-alt input-icon"></i>
            </label>
            <div className="input-box">
              <input
                type="text"
                id="from"
                className="input-field"
                placeholder="Nereden"
                onChange={(e) => setStartCity(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="to" className="form-label">
              <i className="fas fa-map-marker input-icon"></i>
            </label>
            <div className="input-box">
              <input
                type="text"
                id="to"
                className="input-field"
                placeholder="Nereye"
                onChange={(e) => setEndCity(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <i className="fas fa-calendar-alt alt" onClick={openDatePicker}></i>{" "}
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Tarih seçin"
              dateFormat="dd/MM/yyyy"
              locale="tr"
              minDate={new Date()} // Geçmiş tarihleri engelle
              className="date-inputs full-width"
              ref={datePickerRef} // Datepicker referansı
            />
          </div>

          <Link to="/PublishFrom" state={{ startCity, endCity }}>
            <button className="publish-button">Yayınla</button>
          </Link>
        </div>

        {/* Sağ Taraf Görsel */}
        <div className="image-section">
          <img
            src={Foto16} // Buraya ilgili görselin yolunu ekle
            alt="Mutlu Nakliyeci"
            className="publish-image"
          />
        </div>
      </div>
      <section className="slogan-section">
        <h2 className="slogan-title">Sür, Paylaş, Tasarruf Et</h2>
        <div className="slogan-cards">
          <div className="slogan-card">
            <h3 className="card-title">Sür</h3>
            <p className="card-description">
              Nakliye araçlarınızı paylaşarak hem zamandan tasarruf edin hem de
              daha verimli bir yolculuk gerçekleştirin.
            </p>
          </div>
          <div className="slogan-card">
            <h3 className="card-title">Paylaş</h3>
            <p className="card-description">
              Boş dönüşlerinizi paylaşarak maliyetlerinizi düşürün ve çevreye
              katkıda bulunun.
            </p>
          </div>
          <div className="slogan-card">
            <h3 className="card-title">Tasarruf Et</h3>
            <p className="card-description">
              İşinizi kolaylaştırırken aynı zamanda tasarruf ederek daha karlı
              bir süreç yönetin.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Publish;
