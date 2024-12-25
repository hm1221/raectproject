import React from "react";
import "./Publish.css";

const PublishForm = () => {
  return (
    <div className="publishForm-container">
      <h2 className="publishForm-title">Yükü Nereden Almak İstiyorsunuz?</h2>
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

        <button className="publishForm-button">Tamamla</button>
      </div>
    </div>
  );
};

export default PublishForm;
