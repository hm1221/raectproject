import React, { useState } from "react";
import "./MainPage.css";
import {
  FaClock,
  FaDollarSign,
  FaWalking,
  FaMapMarkerAlt,
  FaRoad,
} from "react-icons/fa";

const MainPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const filters = [
    { id: "earliest", label: "En erken kalkış saati", icon: <FaClock /> },
    { id: "cheapest", label: "En düşük fiyat", icon: <FaDollarSign /> },
    {
      id: "nearestDeparture",
      label: "Kalkış yerine yakın",
      icon: <FaWalking />,
    },
    {
      id: "nearestArrival",
      label: "Varış yerine yakın",
      icon: <FaMapMarkerAlt />,
    },
    { id: "shortestJourney", label: "En kısa yolculuk", icon: <FaRoad /> },
  ];

  const handleFilterClick = (filterId) => {
    setSelectedFilter(filterId);
  };

  return (
    <div className="mainpage-filters">
      <div className="mainpage-container">
        <h3 className="filters-header">Sırala</h3>
        <button className="clear-filters" onClick={() => setSelectedFilter("")}>
          Tümünü temizle
        </button>
      </div>
      <div className="filters-list">
        {filters.map((filter) => (
          <div
            key={filter.id}
            className={`filter-item ${
              selectedFilter === filter.id ? "selected" : ""
            }`}
            onClick={() => handleFilterClick(filter.id)}
          >
            <span className="filter-icon">{filter.icon}</span>
            <label className="filter-label">{filter.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
