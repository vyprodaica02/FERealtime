const FormDangKy = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Đăng Ký</h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Tên người dùng
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full border rounded-md p-2"
            placeholder="Nhập tên người dùng"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border rounded-md p-2"
            placeholder="Nhập địa chỉ email"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full border rounded-md p-2"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Đăng Ký
        </button>
      </form>
    </div>
  );
};

export default FormDangKy;
