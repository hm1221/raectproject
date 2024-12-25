import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ForgotPasswordReset = () => {
  const { id, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [iconTop, setIconTop] = useState("52%"); // Göz ikonunun konumu

  const [iconTop2, setIconTop2] = useState("63%"); // İkinci Göz ikonunun konumu

  const handlePasswordReset = async () => {
    setIconTop("68%"); // Butona tıklandığında göz ikonunun konumunu değiştir
    setIconTop2("56%");
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (newPassword !== confirmPassword) {
      setErrorMessage("Şifreler uyuşmuyor!");
      setSuccessMessage("");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        "Şifre en az bir harf, bir sayı ve bir özel karakter içermelidir!"
      );
      setSuccessMessage("");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7045/api/User/ResetPassword",
        {
          id: parseInt(id),
          password: newPassword,
          token: token,
        }
      );

      if (response.status === 200) {
        setSuccessMessage(
          "Şifreniz başarıyla sıfırlandı! Giriş sayfasına yönlendiriliyorsunuz..."
        );
        setErrorMessage("");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          "Şifre sıfırlama sırasında bir hata oluştu. Lütfen tekrar deneyin."
        );
      } else {
        setErrorMessage(
          "Bağlantı kurulamadı. Lütfen daha sonra tekrar deneyin."
        );
      }
      setSuccessMessage("");
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box">
        <div className="password-container">
          <header className="header2">Şifrenizi Sıfırlayın</header>
          <p className="p2">Lütfen yeni bir şifre belirleyin ve doğrulayın.</p>

          {/* Mesajlar */}
          {errorMessage && (
            <div className="reset-error-message">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="reset-success-message">{successMessage}</div>
          )}

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-box">
              <input
                type={showNewPassword ? "text" : "password"}
                className="input-field"
                placeholder="Yeni Şifre"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <i className="fas fa-lock"></i>
              <i
                className={`fas ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}
                onClick={() => setShowNewPassword(!showNewPassword)}
                style={{
                  top: iconTop, // Dinamik konum
                  transform: "translateY(-50%)",
                  position: "absolute",
                  left: "470px",
                  color: "#d8cbcb",
                  cursor: "pointer",
                }}
              ></i>
            </div>
            <div className="input-box">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="input-field"
                placeholder="Şifreyi Onayla"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <i className="fas fa-lock"></i>
              <i
                className={`fas ${
                  showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "10px",
                  top: iconTop2, // Dinamik konum
                  transform: "translateY(-50%)",
                }}
              ></i>
            </div>
            <div className="input-box">
              <button
                className="submit"
                type="submit"
                onClick={handlePasswordReset}
              >
                Şifreyi Sıfırla
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordReset;
