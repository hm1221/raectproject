import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const clearInput = () => {
    setEmail(""); // E-posta alanını temizler
  };

  const handleSendResetLink = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7045/api/User/Mail-reset?email=${encodeURIComponent(
          email
        )}`,
        {
          headers: {
            accept: "*/*",
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage(
          "Sıfırlama bağlantısı başarıyla gönderildi. Lütfen e-posta adresinizi kontrol edin."
        );
        setErrorMessage(""); // Hata mesajını temizle
        setEmail(""); // Inputu temizle
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          "Bir hata oluştu. Lütfen e-posta adresinizi kontrol edin."
        );
      } else {
        setErrorMessage(
          "Bağlantı kurulamadı. Lütfen daha sonra tekrar deneyin."
        );
      }
      setSuccessMessage(""); // Başarı mesajını temizle
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box">
        <div className="forgot-password-container">
          <h3 className="h3">
            Hesabınla ilişkilendirilmiş e-posta adresin nedir? Şifreni
            sıfırlaman için sana e-posta adresinden bir bağlantı göndereceğiz.
          </h3>
          <div className="input-box">
            <div className="input-wrapper">
              <input
                type="email"
                className="input-fields"
                placeholder="E-posta Adresi"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="fas fa-envelope"></i>
              {email && (
                <span className="clear-icon" onClick={clearInput}>
                  ✖️
                </span>
              )}
            </div>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          {email && (
            <div className="input-box">
              <button className="password-submit" onClick={handleSendResetLink}>
                Sıfırlama Bağlantısı Gönder
              </button>
            </div>
          )}
          <div className="back-to-login">
            <Link to="/login">Giriş Sayfasına Dön</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
