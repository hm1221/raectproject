import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Publish.css";
import axios from "axios";

const PublishPlus = () => {
  const location = useLocation();
  const { startAddress, endAddress } = location.state || {};
  const [route, setRoute] = useState([]);
  const [mapBounds, setMapBounds] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY2;

  const turkishCities = [
    "Adana",
    "Adıyaman",
    "Afyonkarahisar",
    "Ağrı",
    "Amasya",
    "Ankara",
    "Antalya",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakır",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkari",
    "Hatay",
    "Isparta",
    "Mersin",
    "İstanbul",
    "İzmir",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kırklareli",
    "Kırşehir",
    "Kocaeli",
    "Konya",
    "Kütahya",
    "Malatya",
    "Manisa",
    "Kahramanmaraş",
    "Mardin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Rize",
    "Sakarya",
    "Samsun",
    "Siirt",
    "Sinop",
    "Sivas",
    "Tekirdağ",
    "Tokat",
    "Trabzon",
    "Tunceli",
    "Şanlıurfa",
    "Uşak",
    "Van",
    "Yozgat",
    "Zonguldak",
    "Aksaray",
    "Bayburt",
    "Karaman",
    "Kırıkkale",
    "Batman",
    "Şırnak",
    "Bartın",
    "Ardahan",
    "Iğdır",
    "Yalova",
    "Karabük",
    "Kilis",
    "Osmaniye",
    "Düzce",
  ];

  useEffect(() => {
    if (startAddress && endAddress) {
      fetchCoordinatesAndCalculateRoute();
    }
  }, [startAddress, endAddress]);

  const fetchCoordinatesAndCalculateRoute = async () => {
    try {
      const startCoords = await getCoordinates(startAddress);
      const endCoords = await getCoordinates(endAddress);

      if (startCoords && endCoords) {
        await calculateRoute(startCoords, endCoords);
      } else {
        console.error("Başlangıç veya varış koordinatları alınamadı.");
      }
    } catch (error) {
      console.error(
        "Hata: Geocoding veya rota hesaplama sırasında bir sorun oluştu.",
        error
      );
    }
  };

  const getCoordinates = async (address) => {
    try {
      const response = await axios.get(
        `https://api.openrouteservice.org/geocode/search?text=${encodeURIComponent(
          address
        )}&api_key=${API_KEY}`
      );
      const coordinates = response.data.features[0]?.geometry.coordinates;
      return coordinates ? [coordinates[1], coordinates[0]] : null;
    } catch (error) {
      console.error("Geocoding API hatası:", error);
      return null;
    }
  };

  const calculateRoute = async (startCoords, endCoords) => {
    try {
      const response = await axios.get(
        `https://api.openrouteservice.org/v2/directions/driving-car?start=${startCoords[1]},${startCoords[0]}&end=${endCoords[1]},${endCoords[0]}&api_key=${API_KEY}`
      );

      const coordinates =
        response.data.features[0]?.geometry?.coordinates || [];
      if (coordinates.length === 0) {
        console.error("Rota bulunamadı.");
        return;
      }

      const formattedRoute = coordinates.map((coord) => [coord[1], coord[0]]);
      setRoute(formattedRoute);

      const bounds = [
        [
          Math.min(...formattedRoute.map((point) => point[0])) - 0.2,
          Math.min(...formattedRoute.map((point) => point[1])) - 0.2,
        ],
        [
          Math.max(...formattedRoute.map((point) => point[0])) + 0.2,
          Math.max(...formattedRoute.map((point) => point[1])) + 0.2,
        ],
      ];
      setMapBounds(bounds);
    } catch (error) {
      console.error("Rota hesaplama sırasında bir hata oluştu:", error);
    }
  };

  const handleCitySelection = (city) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((c) => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const handleRemoveCity = (city) => {
    setSelectedCities(selectedCities.filter((c) => c !== city));
  };

  const turkishToLower = (str) =>
    str.replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase();

  const filteredCities = turkishCities.filter((city) =>
    turkishToLower(city).includes(turkishToLower(searchTerm.trim()))
  );

  return (
    <div className="publishplus-container">
      {/* Sol Panel */}
      <div className="publishplus-left-panel">
        <h3 className="publishplus-header">
          Başka Şehirlerden de Yük Almak İster misiniz?
        </h3>
        <input
          type="text"
          className="publishplus-search"
          placeholder="Şehir ara..."
          value={searchTerm}
          autoFocus
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="publishplus-checkbox-list">
          {filteredCities.map((city, index) => (
            <div
              key={index}
              className={`publishplus-checkbox-item ${
                selectedCities.includes(city) ? "selected" : ""
              }`}
              onClick={() => handleCitySelection(city)}
            >
              <input
                type="checkbox"
                id={`city-${index}`}
                checked={selectedCities.includes(city)}
                readOnly
              />
              <label htmlFor={`city-${index}`}>{city}</label>
            </div>
          ))}
        </div>
        <h4 className="publishplus-selected-header">Seçilen Şehirler</h4>
        <div className="publishplus-selected-list">
          {selectedCities.map((city, index) => (
            <div key={index} className="publishplus-selected-item">
              {city}
              <span
                className="publishplus-remove"
                onClick={() => handleRemoveCity(city)}
              >
                &times;
              </span>
            </div>
          ))}
        </div>
        <button
          className="rota-button"
          onClick={() => console.log("Seçilen Şehirler:", selectedCities)}
        >
          Tamamla
        </button>
      </div>

      {/* Sağ Panel (Harita) */}
      <div className="publishplus-right-panel">
        {route.length > 0 && mapBounds ? (
          <MapContainer
            className="publishplus-map"
            bounds={mapBounds}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Polyline
              positions={route}
              pathOptions={{
                color: "blue", // Çizgi rengi
                weight: 6, // Çizgi kalınlığı
                opacity: 0.8, // Saydamlık
                dashArray: "8, 8", // Çizgiyi kesikli yapar, modern bir hava verir
                lineCap: "round", // Çizgi uçlarını yuvarlar
              }}
            />
            <Marker position={route[0]}>
              <Popup>Başlangıç Noktası</Popup>
            </Marker>
            <Marker position={route[route.length - 1]}>
              <Popup>Varış Noktası</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p className="publishplus-loading">Rota yükleniyor...</p>
        )}
      </div>
    </div>
  );
};

export default PublishPlus;
