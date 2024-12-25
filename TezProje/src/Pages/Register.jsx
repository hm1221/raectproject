import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    userName: "",
    phoneNumber: "",
    userType: "User", // Varsayılan kullanıcı tipi
    userActive: true, // Varsayılan aktif durumu
    created: new Date().toISOString(), // Şu anki tarih
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Şifre görünürlük durumu
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7045/api/User/Create",
        formData,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage(
          "Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz..."
        );
        setTimeout(() => {
          navigate("/login"); // Başarılı kayıt sonrası giriş sayfasına yönlendirme
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        setErrorMessage(
          "Kayıt sırasında bir hata oluştu. Lütfen bilgilerinizi kontrol edin."
        );
      } else {
        setErrorMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box">
        <div className="register-container">
          <div className="top">
            <span>
              Hesabın var mı? <Link to="/login">Giriş Yap</Link>
            </span>
            <header>Üye Ol</header>
          </div>
          <form onSubmit={handleRegister}>
            <div className="two-forms">
              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Adı"
                  name="name"
                  autoFocus
                  onChange={handleInputChange}
                  required
                />
                <i className="fas fa-user"></i>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Soyadı"
                  name="surname"
                  onChange={handleInputChange}
                  required
                />
                <i className="fas fa-user"></i>
              </div>
            </div>
            <div className="input-box">
              <input
                type="text"
                className="input-field"
                placeholder="Kullanıcı Adı"
                name="userName"
                onChange={handleInputChange}
                required
              />
              <i className="fas fa-user"></i>
            </div>
            <div className="input-box">
              <input
                type="email"
                className="input-field"
                placeholder="Email"
                name="email"
                onChange={handleInputChange}
                required
              />
              <i className="fas fa-envelope"></i>
            </div>
            <div className="input-box password-box">
              <input
                type={showPassword ? "text" : "password"} // Şifreyi görünür veya gizli yap
                className="input-field"
                placeholder="Şifre"
                name="password"
                onChange={handleInputChange}
                required
              />
              <i className="fas fa-lock"></i>

              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} // İkon değişimi
                onClick={() => setShowPassword(!showPassword)} // Şifre görünürlüğünü değiştir
                style={{ cursor: "pointer" }}
              ></i>
            </div>
            <div className="input-box">
              <input
                type="text"
                className="input-field"
                placeholder="Telefon Numarası"
                name="phoneNumber"
                onChange={handleInputChange}
              />
              <i className="fas fa-phone"></i>
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            <div className="input-box">
              <input type="submit" className="submit" value="Kayıt Ol" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
