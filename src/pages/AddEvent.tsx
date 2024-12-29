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
    // Kiểm tra nếu thông tin không đầy đủ
    if (!eventName || !eventTime || !eventDescription) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    createEvent()
    // Sau khi thêm sự kiện, chuyển hướng về danh sách sự kiện
  };

  const createEvent = async () =>{
    await axios.post('http://localhost:8888/api/users/event/create', {
      eventName,
      eventTime,
      eventDescription,
      }, 
      { 
        withCredentials: true 
      }
    )
    navigate('/eventlist'); // Chuyển đến trang EventList
  }

  const handleClose = () => {
    // Nếu người dùng nhấn vào X, quay lại trang EventList
    navigate('/eventlist'); // Chuyển đến trang EventList
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fff',
        minHeight: '100vh', // Chiếm toàn bộ chiều cao màn hình
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Căn giữa form theo chiều dọc
        alignItems: 'center', // Căn giữa form theo chiều ngang
        position: 'relative', // Để có thể đặt dấu X
      }}
    >
      {/* Dấu X để đóng popup và quay lại EventList */}
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

      <h1 style={{ color: '#000', marginBottom: '30px' }}>Thêm sự kiện mới</h1>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', color: '#000' }}>
            Tiêu đề
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
              color: '#000', // Màu chữ bên trong input
              backgroundColor: '#fff', // Màu nền bên trong input
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="date" style={{ display: 'block', marginBottom: '5px', color: '#000' }}>
            Ngày
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
              color: '#000', // Màu chữ bên trong input
              backgroundColor: '#fff', // Màu nền bên trong input
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', color: '#000' }}>
            Mô tả
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
              color: '#000', // Màu chữ bên trong textarea
              backgroundColor: '#fff', // Màu nền bên trong textarea
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
          Thêm sự kiện
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
