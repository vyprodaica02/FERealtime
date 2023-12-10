/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
interface UserData {
  id: number;
  tenUser: string;
}

interface JwtPayload {
  userId: number;
}

const PageHome = () => {
  const [userList, setUserList] = useState<UserData[]>([]);
  const { token } = useAuth();
  const [senUser, setSenUser] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState("");
  const [listMessage, setListMessage] = useState<any[]>([]);

  function getTokenFromCookies() {
    return Cookies.get("authData");
  }
  const tokens = getTokenFromCookies();
  const decoded =
    typeof tokens === "string" ? (jwtDecode(tokens) as JwtPayload) : undefined;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7181/api/User/DanhSachUser"
        );
        setUserList(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7181/api/Chat/GetMessage?senUserId=${decoded?.userId}&ResenUserid=${senUser}`
        );

        setListMessage(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng", error);
      }
    };

    if (decoded) {
      fetchData();
    }
  }, [senUser, decoded?.userId]);
  console.log(listMessage);

  const handleSendMessage = async () => {
    // Gửi tin nhắn thông qua API
    try {
      const response = await axios.post(
        "https://localhost:7181/api/Chat/GuiTinNhan",
        {
          content: message,
          senderUserId: decoded?.userId,
          receiverUserId: senUser,
        }
      );

      if (response.status === 200) {
        console.log("Message sent successfully");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const handleUserClick = (user: UserData) => {
    // Lưu thông tin người dùng được chọn vào state
    setSenUser(user.id);
  };

  const handleKeyDown = (event: { key: string }) => {
    // Kiểm tra xem phím Enter đã được nhấn
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };
  return (
    <div className="">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 p-4 text-white">
          <h2 className="text-lg font-semibold mb-4">Danh sách Chat</h2>
          <ul>
            {userList.map((_user) => (
              <li
                key={_user.id}
                className="mb-2 cursor-pointer"
                onClick={() => handleUserClick(_user)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-600 rounded-full mr-2"></div>
                  <div>
                    <p className="font-semibold">{_user.tenUser}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 p-4 border-l border-gray-300">
          <div className="flex flex-col-reverse space-y-2 overflow-y-auto h-full">
            <div className="flex justify-end">
              {listMessage.map((lstMessage) => (
                <div key={lstMessage.id}>
                  {lstMessage.senderUserId == decoded?.userId && (
                    <div className="bg-blue-500 text-white p-2 rounded-lg max-w-2/3">
                      {lstMessage.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex">
              {listMessage.map((lstMessage) => (
                <div key={lstMessage.id}>
                  {lstMessage.receiverUserId == senUser && (
                    <div className="bg-gray-300 p-2 rounded-lg max-w-2/3">
                      {lstMessage.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              className="w-full border rounded-md p-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHome;
