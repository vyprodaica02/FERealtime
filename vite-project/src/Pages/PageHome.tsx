/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
interface UserData {
  id: number;
  tenUser: string;
}

const PageHome = () => {
  const [userList, setUserList] = useState<UserData[]>([]);
  const { token } = useAuth();
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

  return (
    <div className="">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 p-4 text-white">
          <h2 className="text-lg font-semibold mb-4">Danh sách Chat</h2>
          <ul>
            {userList.map((_user) => (
              <li key={_user.id} className="mb-2">
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
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Người dùng 1</h2>
          </div>
          <div className="flex flex-col-reverse space-y-2 overflow-y-auto h-full">
            <div className="flex items-end">
              <div className="bg-blue-500 text-white p-2 rounded-lg max-w-2/3">
                Xin chào! Bạn có cần giúp gì không?
              </div>
              <div className="ml-2 text-gray-500 text-sm">12:30 PM</div>
            </div>
            <div className="flex items-end">
              <div className="bg-gray-300 p-2 rounded-lg max-w-2/3">
                Có vẻ như tôi cần một chút giúp đỡ.
              </div>
              <div className="ml-2 text-gray-500 text-sm">12:32 PM</div>
            </div>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHome;
