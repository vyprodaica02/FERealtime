/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
const FormDangNhap = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token, setAuthData } = useAuth();
  const handleLogin = async (e: any) => {
    e.preventDefault();

    const apiUrl = `https://localhost:7181/api/Login/Login?userName=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`;

    try {
      const response = await axios.post(apiUrl);
      setAuthData(response.data);
      navigate("/home");
    } catch (error) {
      // Xử lý lỗi khi đăng nhập không thành công
      console.error("Đăng nhập thất bại", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-md">
      <h2 className="text-center">Form đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md p-2"
            placeholder="Nhập địa chỉ email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md p-2"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Đăng Nhập
        </button>
      </form>
    </div>
  );
};

export default FormDangNhap;
