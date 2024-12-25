import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userName, setUserName] = useState(""); // Kullanıcı adı
  const [password, setPassword] = useState(""); // Şifre
  const [errorMessage, setErrorMessage] = useState(""); // Hata mesajı
  const [showPassword, setShowPassword] = useState(false); // Şifre görünürlük durumu
  const navigate = useNavigate(); // Sayfa yönlendirme için

  const handleLogin = async (e) => {
    e.preventDefault(); // Formun sayfayı yenilemesini engelle

    const loginData = {
      userName: userName,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://localhost:7045/api/User/Login",
        loginData,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      // Eğer login başarılı olursa
      if (response.status === 200) {
        console.log("Giriş Başarılı:", response.data);
        navigate("/ForgotPasswordReset"); // Başarılı giriş sonrası yönlendirme
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage("Giriş bilgileri hatalı");
      } else {
        setErrorMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box">
        <div className="login-container">
          <div className="top">
            <span>
              Hesabınız yok mu? <Link to="/register">Üye Ol</Link>
            </span>
            <header>Giriş Yap</header>
          </div>
          <form onSubmit={handleLogin}>
            <div className="input-box">
              <input
                type="text"
                className="input-field"
                placeholder="Kullanıcı Adı veya Email"
                autoFocus
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <i className="fas fa-user"></i>
            </div>
            <div className="input-box password-box">
              <input
                type={showPassword ? "text" : "password"} // Şifreyi görünür veya gizli yap
                className="input-field"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="fas fa-lock"></i>
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} // İkon değişimi
                onClick={() => setShowPassword(!showPassword)} // Şifre görünürlüğünü değiştir
                style={{ cursor: "pointer" }}
              ></i>
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <div className="input-box">
              <input type="submit" className="submit" value="Giriş Yap" />
            </div>
          </form>
          <div className="two-col">
            <div className="one">
              <input className="checkbox" type="checkbox" id="login-check" />
              <label htmlFor="login-check" className="remember">
                {" "}
                Beni Hatırla
              </label>
            </div>
            <div className="two">
              <label>
                <Link to="/ForgotPassword">Parolanızı mı unuttunuz?</Link>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
