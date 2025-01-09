import React from "react";
import "./Card.css";

const Card = ({
  departureTime,
  arrivalTime,
  from,
  to,
  price,
  driverName,
  rating,
  details,
}) => {
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-time">
          <span>{departureTime}</span>
          <div className="card-duration">
            <span>•</span>
            <span> {arrivalTime}</span>
          </div>
        </div>
        <div className="card-location">
          <span>{from}</span>
          <span>{to}</span>
        </div>
      </div>
      <div className="card-content">
        <div className="card-driver-info">
          <img
            src="https://via.placeholder.com/50"
            alt="Driver"
            className="driver-image"
          />
          <div className="driver-details">
            <span className="driver-name">{driverName}</span>
            <span className="driver-rating">⭐ {rating}</span>
          </div>
        </div>
        <div className="card-details">{details}</div>
        <div className="card-price">{price} ₺</div>
      </div>
    </div>
  );
};

export default Card;
