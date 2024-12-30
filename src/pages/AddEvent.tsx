import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 情報が不完全な場合のチェック
    if (!eventName || !eventTime || !eventDescription) {
      alert('すべての情報を入力してください。');
      return;
    }

    createEvent()
    // イベントを追加した後、イベントリストにリダイレクト
  };

  const createEvent = async () => {
    await axios.post('http://localhost:8888/api/users/event/create', {
      eventName,
      eventTime,
      eventDescription,
    },
      {
        withCredentials: true
      }
    )
    navigate('/eventlist'); // EventListページに移動
  }

  const handleClose = () => {
    // ユーザーがXをクリックした場合、EventListページに戻る
    navigate('/eventlist'); // EventListページに移動
  };

  return (
    <div className='bg-gradient-to-r from-darkPink to-coralRed'
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh', // 画面全体の高さを占める
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // フォームを縦方向に中央揃え
        alignItems: 'center', // フォームを横方向に中央揃え
        position: 'relative', // Xボタンを配置するために必要
      }}
    >
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {/* Xボタンでポップアップを閉じてEventListに戻る */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '24px',
            color: '#000',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>

        <h1 style={{ color: '#000', marginBottom: '30px' }}>新しいイベントを追加</h1>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', color: '#000' }}>
              タイトル
            </label>
            <input
              id="title"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              style={{
                padding: '10px',
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: '4px',
                color: '#000', // インプット内の文字色
                backgroundColor: '#fff', // インプット内の背景色
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="date" style={{ display: 'block', marginBottom: '5px', color: '#000' }}>
              日付
            </label>
            <input
              id="date"
              type="datetime-local"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              required
              style={{
                padding: '10px',
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: '4px',
                color: '#000', // インプット内の文字色
                backgroundColor: '#fff', // インプット内の背景色
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', color: '#000' }}>
              説明
            </label>
            <textarea
              id="description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
              style={{
                padding: '10px',
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: '4px',
                minHeight: '100px',
                color: '#000', // テキストエリア内の文字色
                backgroundColor: '#fff', // テキストエリア内の背景色
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            イベントを追加
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
