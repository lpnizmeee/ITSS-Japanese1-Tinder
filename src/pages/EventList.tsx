import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const events = [
  {
    id: 1,
    title: 'Hội thảo công nghệ React',
    description: 'Khám phá những xu hướng mới nhất trong React và hệ sinh thái của nó.',
    date: '2024-12-30',
    location: 'Hà Nội, Việt Nam',
  },
  {
    id: 2,
    title: 'Ngày hội lập trình viên',
    description: 'Một ngày hội đặc biệt dành cho các lập trình viên và nhà phát triển phần mềm.',
    date: '2024-12-25',
    location: 'TP.HCM, Việt Nam',
  },
  {
    id: 3,
    title: 'Hội thảo AI và ML',
    description: 'Tìm hiểu về AI, Machine Learning và các ứng dụng trong thực tế.',
    date: '2025-01-10',
    location: 'Đà Nẵng, Việt Nam',
  },
];

export const EventList = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm
  const [registeredEvents, setRegisteredEvents] = useState([]); // Danh sách sự kiện đã đăng ký
  const [selectedEvent, setSelectedEvent] = useState(null); // Sự kiện được chọn
  const [filteredEvents, setFilteredEvents] = useState(events); // Danh sách sự kiện đã lọc

  // Hàm xử lý tìm kiếm
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(value)
    );
    setFilteredEvents(filtered);
  };

  // Hàm xử lý đăng ký sự kiện
  const handleRegister = (id) => {
    if (registeredEvents.includes(id)) {
      setRegisteredEvents(registeredEvents.filter((eventId) => eventId !== id)); // Hủy đăng ký
    } else {
      setRegisteredEvents([...registeredEvents, id]); // Thêm vào danh sách đăng ký
    }
  };

  // Hàm hiển thị chi tiết sự kiện
  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  // Hàm đóng popup chi tiết
  const closePopup = () => {
    setSelectedEvent(null);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', position: 'relative' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Danh sách sự kiện</h1>

      {/* Bộ lọc title */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Tìm kiếm theo tiêu đề sự kiện..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: '10px',
            width: '50%',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '16px',
          }}
        />
      </div>

      {/* Danh sách sự kiện */}
      <div>
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h2 style={{ marginBottom: '10px', color: '#333' }}>{event.title}</h2>
            <p style={{ marginBottom: '5px' }}>
              <strong>Thời gian:</strong> {event.date}
            </p>
            <p style={{ marginBottom: '5px' }}>
              <strong>Địa điểm:</strong> {event.location}
            </p>
            <p style={{ marginBottom: '10px' }}>{event.description}</p>

            {/* Container for buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Nút xem chi tiết - Nằm bên trái */}
              <button
                style={{
                  padding: '10px 15px',
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={() => handleViewDetails(event)}
              >
                Xem chi tiết
              </button>

              {/* Nút đăng ký - Nằm bên phải */}
              <button
                style={{
                  padding: '10px 15px',
                  backgroundColor: registeredEvents.includes(event.id) ? '#dc3545' : '#28a745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={() => handleRegister(event.id)}
              >
                {registeredEvents.includes(event.id) ? 'Hủy đăng ký' : 'Đăng ký'}
              </button>
            </div>
          </div>
        ))}
        {filteredEvents.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888' }}>Không tìm thấy sự kiện nào.</p>
        )}
      </div>

      {/* Popup chi tiết sự kiện */}
      {selectedEvent && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '20px',
              width: '400px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h2 style={{ color: '#333' }}>{selectedEvent.title}</h2>
            <p>
              <strong>Thời gian:</strong> {selectedEvent.date}
            </p>
            <p>
              <strong>Địa điểm:</strong> {selectedEvent.location}
            </p>
            <p>{selectedEvent.description}</p>
            <button
              onClick={closePopup}
              style={{
                padding: '10px 15px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'block',
                margin: '10px auto 0',
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Nút "Thêm sự kiện" dấu "+" */}
      <Link to="/add-event">
        <button
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '60px',
            height: '60px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            fontSize: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            zIndex: '100',
          }}
        >
          +
        </button>
      </Link>
    </div>
  );
};

export default EventList;
