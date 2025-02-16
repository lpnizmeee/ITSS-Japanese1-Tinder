import { useState } from "react";
import axios from "axios";
import { Loader, Nav } from "../components";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8888/api/users/login",
        formData,
        { withCredentials: true } // Gửi cookie session đến server
      );

      if (response.status === 200) {
        alert("ログイン成功！");
        localStorage.setItem("authToken", response.data.token); // Lưu token
        window.location.href = "/dashboard"; // Chuyển đến dashboard
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "ログインに失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Loader />
      <Nav />
      <div className="flex min-h-screen items-center justify-center bg-gray-100 bg-gradient-to-r from-darkPink to-coralRed ">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            アカウントにログイン
          </h2>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-600" htmlFor="email">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="メールアドレスを入力してください"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600" htmlFor="password">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="パスワードを入力してください"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-500 py-2 text-white hover:bg-indigo-600"
              disabled={loading}
            >
              {loading ? "ログイン中..." : "ログイン"}
            </button>
          </form>
          {error && (
            <p className="mt-4 text-center text-sm text-red-500">{error}</p>
          )}
          <p className="mt-4 text-center text-sm">
            アカウントをお持ちでないですか？{" "}
            <a href="/register" className="text-indigo-500 hover:underline">
              サインアップ
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
