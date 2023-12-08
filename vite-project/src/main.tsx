import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PageFan from "./Pages/PageFan.tsx";
import PageHome from "./Pages/PageHome.tsx";
import FormDangNhap from "./Pages/FormDangNhap.tsx";
import FormDangKy from "./Pages/FormDangKy.tsx";
import { AuthProvider } from "./Pages/AuthContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
        <Routes>
          <Route path="/Home" element={<PageHome />} />
          <Route path="/fan" element={<PageFan />} />
          <Route path="/" element={<FormDangNhap />}></Route>
          <Route path="/dangky" element={<FormDangKy />}></Route>
          <Route path="*" element={<>404</>}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
