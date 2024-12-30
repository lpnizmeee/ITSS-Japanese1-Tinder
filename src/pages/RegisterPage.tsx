import { useState } from "react";
import axios from "axios";  // Import axios
import { Loader, Nav } from "../components";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    role: "",
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
      const response = await axios.post("http://localhost:8888/api/users/register", formData);

      if (response.status === 201) {
        alert("登録に成功しました！");
      }
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || "登録に失敗しました。");
      } else {
        setError("サーバーへの接続エラー。");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Loader />
      <Nav />

      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 bg-gradient-to-r from-darkPink to-coralRed">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md mt-20">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            アカウントを作成
          </h2>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-600" htmlFor="name">
                氏名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="氏名を入力してください"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

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

            <div className="mb-4">
              <label className="block text-gray-600" htmlFor="gender">
                性別
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">性別を選択してください</option>
                <option value="0">男性</option>
                <option value="1">女性</option>
                <option value="2">その他</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600" htmlFor="role">
                役割
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">役割を選択してください</option>
                <option value="0">教師</option>
                <option value="1">学生</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600" htmlFor="dob">
                生年月日
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-500 py-2 text-white hover:bg-indigo-600"
              disabled={loading}
            >
              {loading ? "登録中..." : "登録"}
            </button>
          </form>

          {error && (
            <p className="mt-4 text-center text-sm text-red-500">{error}</p>
          )}

          <p className="mt-4 text-center text-sm">
            すでにアカウントをお持ちですか？{" "}
            <a href="/login" className="text-indigo-500 hover:underline">
              ログイン
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
