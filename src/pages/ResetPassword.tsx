import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, Nav } from '../components';
import axios from 'axios';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [checkAccount, setCheckAccount] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [isLoading, setLoader] = useState(false);

  const handleAccountNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  }
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setError(''); // Clear error when password changes
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setError(''); // Clear error when password changes
  };

  const handleAccountNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoader(true);
      const response = await axios.get(`http://localhost:8888/api/users/checkEmail?email=${email}`,
        { withCredentials: true });
      if (!response.data.exists) {
        setError('電子メールが存在しません。');
        setLoader(false);
        return;
      }

      // If account name exists, show password fields
      setCheckAccount(true);
    } catch (err: any) {
      console.error('電子メールの存在を確認中にエラーが発生しました:', err);
      setError('メールの存在を確認できませんでした。しばらくしてからもう一度お試しください。');
    } finally {
      setLoader(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('パスワードが一致しません。');
      return;
    }

    try {
      setLoader(true);
      await axios.post('http://localhost:8888/api/users/resetPassword', {
        newPassword,
        email,
      }, { withCredentials: true });
      setCheckPassword(true);
    } catch (err: any) {
      console.error('パスワードのリセット中にエラーが発生しました:', err);
      setError('パスワードのリセットに失敗しました。しばらくしてからもう一度お試しください。');
    } finally {
      setLoader(false);
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  if (checkPassword) { // Render only the success message and button if successful
    return (
      <div>
        <Loader />
        <Nav />
        <div className="relative min-h-screen bg-gray-100">
          <div className="absolute top-1/4 left-0 w-full text-center">
            <span className="text-green-500 text-4xl font-bold">パスワードが正常に変更されました！
            </span>
          </div>

          <div className="flex items-center justify-center min-h-screen">
            <button
              onClick={handleGoToLogin}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              ログインページへ
            </button>
          </div>
        </div>
      </div>

    );
  }
  if (checkAccount) {
    return (
      <div>
        <Nav />
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
            <div className="reset-password-container max-w-md mx-auto p-4">
              <h2 className="text-xl font-semibold mb-4">パスワードをリセット</h2>

              {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}
              { }

              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="新しいパスワードを入力してください"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="新しいパスワードの確認"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded"
                  />
                </div>
                <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">
                  送信
                </button>
              </form>
              {isLoading && <Loader />}
            </div>
          </div>
        </div>

      </div>
    );
  };
  return (
    <div>
      <Nav />
      <div className="flex min-h-screen items-center justify-center bg-gray-100 ">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <div className="reset-password-container max-w-md mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">メールアドレスを入力してください</h2>

            {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}

            <form onSubmit={handleAccountNameSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="メールアドレスを入力してください"
                  value={email}
                  onChange={handleAccountNameInput}
                  className="w-full border border-gray-400 px-3 py-2 rounded"
                />
              </div>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                次
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}
