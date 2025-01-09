import React, { useState, useEffect } from "react";
import "./Publish.css";
import { Link, useLocation } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const PublishForm = () => {
  const location = useLocation();
  const { startCity, endCity } = location.state || {}; // Publish.jsx'ten gelen şehir bilgisi

  const [startAddress, setStartAddress] = useState(""); // Giriş alanındaki adres
  const [position, setPosition] = useState(null); // Marker konumu
  const [mapCenter, setMapCenter] = useState(null); // Harita merkezi

  console.log("Start City:", startCity);
  console.log("End City:", endCity);

  // Haritayı dışarıdan kontrol etmek için custom hook
  const MapController = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, 13); // Haritayı verilen konuma odakla
      }
    }, [center, map]);
    return null;
  };

  // "Nereden" kısmından gelen şehri haritada göster
  useEffect(() => {
    const updatePositionFromStartCity = async () => {
      try {
        if (startCity) {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              startCity
            )}`
          );

          if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            const newPosition = [parseFloat(lat), parseFloat(lon)];
            setPosition(newPosition); // Marker konumunu güncelle
            setMapCenter(newPosition); // Harita merkezini güncelle
          }
        }
      } catch (error) {
        console.error("Şehir koordinat alınırken bir hata oluştu:", error);
      }
    };

    updatePositionFromStartCity();
  }, [startCity]);

  // Kullanıcının adres girmesi durumunda haritayı güncelle
  useEffect(() => {
    const updatePositionFromAddress = async () => {
      try {
        if (startAddress) {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              startAddress
            )}`
          );

          if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            const newPosition = [parseFloat(lat), parseFloat(lon)];
            setPosition(newPosition); // Marker konumunu güncelle
            setMapCenter(newPosition); // Harita merkezini güncelle
          }
        }
      } catch (error) {
        console.error("Adres koordinat alınırken bir hata oluştu:", error);
      }
    };

    updatePositionFromAddress();
  }, [startAddress]);

  // Harita tıklaması için olay işleyici
  const MapEventsHandler = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);

        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );

          if (response.data && response.data.display_name) {
            setStartAddress(response.data.display_name); // Formdaki adresi güncelle
          }
        } catch (error) {
          console.error("Adres alınırken bir hata oluştu:", error);
        }
      },
    });
    return null;
  };

  return (
    <div className="publishForm-container" style={{ display: "flex" }}>
      {/* Sol taraf: Adres girişi */}
      <div style={{ flex: 1, marginRight: "20px" }}>
        <h2 className="publishForm-title">Nereden Yola Çıkacaksınız?</h2>
        <div className="publishForm-group">
          <label htmlFor="address" className="publishForm-label">
            <i className="fas fa-search publishForm-icon"></i>
          </label>
          <input
            type="text"
            id="address"
            className="publishForm-input"
            placeholder="Tam adresinizi buraya giriniz..."
            value={startAddress}
            onChange={(e) => setStartAddress(e.target.value)}
          />
          <Link
            to="/PublishTo"
            state={{
              startAddress, // Kullanıcının girdiği başlangıç adresi
              endCity, // Varış şehir bilgisi
            }}
          >
            <button className="publishForm-button">Tamamla</button>
          </Link>
        </div>
      </div>

      {/* Sağ taraf: Harita */}
      <div
        style={{
          flex: 1,
          height: "400px",
          borderRadius: "10px",
          overflow: "hidden",
          marginRight: "20px",
        }}
      >
        {mapCenter && (
          <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={mapCenter} // Harita merkezi
            zoom={13}
            scrollWheelZoom={true}
          >
            <MapController center={mapCenter} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {position && (
              <Marker position={position}>
                <Popup>Seçilen Konum: {startAddress || "Belirtilmedi"}</Popup>
              </Marker>
            )}
            <MapEventsHandler />
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default PublishForm;
