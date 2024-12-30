import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-between bg-white p-4 shadow z-10 min-w-screen">
      <div className="flex items-center gap-4">
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
          <span onClick={() => navigate('/dashboard')} role="img" aria-label="matchinglist">
            🏠︎
          </span>
        </button>
      </div>
    </div>
  );
};

export const Settings = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    language: 'English', // Default language
    theme: 'Light', // Default theme
    fontSize: 'Medium', // Default font size
    notifications: true, // Default notification setting
  });

  useEffect(() => {
    // Fetch initial settings from API or local storage
    const fetchSettings = async () => {
      try {
        const response = await axios.get<{ settings: typeof settings }>(
          'http://localhost:8888/api/settings', // Replace with your API endpoint
          { withCredentials: true }
        );
        setSettings(response.data.settings);
      } catch (err: any) {
        console.error('Error fetching settings:', err);
        // Handle error, e.g., show an error message
      }
    };

    fetchSettings();
  }, []);

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked; // Type assertion for checked property

    setSettings({
      ...settings,
      [name]: name === 'notifications' ? checked : value,
    });
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // Send logout request to API
      await axios.post(
        'http://localhost:8888/api/users/logout', // Replace with your API endpoint
        {},
        { withCredentials: true }
      );
      // Redirect to login page or home page
      navigate('/login'); // Replace with your desired route
    } catch (err: any) {
      console.error('Error logging out:', err);
      // Handle error, e.g., show an error message
    }
  };

  const handleProfileClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/profile');
  };

  return (
    <div>
      <Header />
      <div className="flex min-h-screen items-center justify-center bg-gray-100 ">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <div className="settings-header flex items-center justify-center mb-6 mt-6">
            <h2 className="text-5xl font-semibold text-black flex items-center justify-center mb-8 mr-4">
              ⚙️設定
            </h2>
            {/* Add an empty div to maintain spacing */}
            <div></div>
          </div>
          <div className="settings-options space-y-4">
            {/* Language */}
            <div>
              <label htmlFor="language" className="block font-bold mb-2">
                言語
              </label>
              <select
                id="language"
                name="language"
                value={settings.language}
                onChange={handleSettingChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="English">英語</option>
                <option value="Japanese">日本語</option>
                <option value="Vietnamese">ベトナム語</option>
              </select>
            </div>

            {/* Theme */}
            <div>
              <label className="block font-bold mb-2">テーマ</label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="theme"
                    value="Light"
                    checked={settings.theme === 'Light'}
                    onChange={handleSettingChange}
                  />
                  <span className="ml-2">ライト</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="theme"
                    value="Dark"
                    checked={settings.theme === 'Dark'}
                    onChange={handleSettingChange}
                  />
                  <span className="ml-2">ダークモード</span>
                </label>
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="block font-bold mb-2">フォントサイズ</label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="fontSize"
                    value="Small"
                    checked={settings.fontSize === 'Small'}
                    onChange={handleSettingChange}
                  />
                  <span className="ml-2">小</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="fontSize"
                    value="Medium"
                    checked={settings.fontSize === 'Medium'}
                    onChange={handleSettingChange}
                  />
                  <span className="ml-2">中</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="fontSize"
                    value="Large"
                    checked={settings.fontSize === 'Large'}
                    onChange={handleSettingChange}
                  />
                  <span className="ml-2">大</span>
                </label>
              </div>
            </div>

            {/* Profile */}
            <div>
              <button
                onClick={handleProfileClick}
                className="flex items-center text-white hover:underline"
              >
                <span>プロフィール</span>
                <span className="ml-2">&rarr;</span>
              </button>
            </div>

            {/* Notifications */}
            <div>
              <label className="block font-bold mb-2">通知</label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={() => setSettings(prevSettings => ({
                      ...prevSettings,
                      notifications: !prevSettings.notifications
                    }))}
                  />
                  <span className="ml-2">{settings.notifications ? 'オン' : 'オフ'}</span>
                </label>
              </div>
            </div>

            {/* Password & Account (Placeholder) */}
            <div>
              <label className="block font-bold mb-2">パスワードとアカウント</label>
              {/* Add content for password and account settings here */}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full"
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};