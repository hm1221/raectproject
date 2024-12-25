import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Layout from "./components/Layout";
import ForgotPassword from "./Pages/ForgotPassword";
import ForgotPasswordReset from "./Pages/ForgotPasswordReset";
import HomePage from "./Pages/HomePage";
import Publish from "./Pages/Publish";
import PublishFrom from "./Pages/PublishFrom";
import PublishTo from "./Pages/PublishTo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="homepage" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="ForgotPassword" element={<ForgotPassword />} />
          {/* <Route
            path="/ForgotPasswordReset/:id/:token"
            element={<ForgotPasswordReset />}
          /> */}
          <Route path="ForgotPasswordReset" element={<ForgotPasswordReset />} />
          {/* Şifre sıfırlama rotası */}
          <Route path="Publish" element={<Publish />} />
          <Route path="PublishFrom" element={<PublishFrom />} />
          <Route path="PublishTo" element={<PublishTo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
