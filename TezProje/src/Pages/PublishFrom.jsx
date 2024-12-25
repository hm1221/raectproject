import React from "react";
import "./Publish.css";
import { Link } from "react-router-dom";

const PublishForm = () => {
  return (
    <div className="publishForm-container">
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
        />
        <Link to="/PublishTo">
          <button className="publishForm-button">Tamamla</button>
        </Link>
      </div>
    </div>
  );
};

export default PublishForm;
