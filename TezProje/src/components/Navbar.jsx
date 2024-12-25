import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../images/Foto8.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasProfileImage = false; // Profil resmi var mı kontrol
  const navigate = useNavigate();

  // Menü aç/kapat
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigasyon için fonksiyon
  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Menü kapansın
  };
  return (
    <nav className="navbar">
      {/* Logo ve Proje İsmi */}
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <Link to="/" className="project-name-link">
          <span className="project-name">
            Yük<span className="highlight">Yolda</span>
          </span>
        </Link>
      </div>

      {/* Ara ve Yolculuk Yayınla */}
      <div className="navbar-center">
        <Link to="/search" className="nav-link">
          <i className="fas fa-search"></i> Ara
        </Link>
        <Link to="/publish" className="nav-link">
          <i className="fas fa-plus"></i> Nakliye Yayınla
        </Link>
      </div>

      {/* Profil Menüsü */}
      <div className="navbar-right">
        {/* Profil ve Menü İkonu */}
        <div className="profile-containers">
          <div className="profile-container">
            <div className="profile-circle" onClick={toggleMenu}>
              {hasProfileImage ? (
                <img
                  src="YOUR_PROFILE_IMAGE_URL"
                  alt="Profile"
                  className="profile-pic"
                />
              ) : (
                <i className="fas fa-user   profile-icon"></i>
              )}
            </div>
          </div>
          <i
            className={`fas fa-chevron-down toggle-icon ${
              isMenuOpen ? "rotate-up" : ""
            }`}
            onClick={toggleMenu}
          ></i>
        </div>

        {/* Açılır Menü */}
        {isMenuOpen && (
          <div className="dropdown-menu">
            <div onClick={() => handleNavigation("/login")}>
              Oturum Aç <i className="fas fa-chevron-right"></i>
            </div>

            <div onClick={() => handleNavigation("/register")}>
              Üye Ol <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
