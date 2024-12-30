import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useDebounce } from "../hooks/useDebounce";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

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

export const EventList = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm
  const [registeredEvents, setRegisteredEvents] = useState([]); // Danh sách sự kiện đã đăng ký
  const [selectedEvent, setSelectedEvent] = useState(null); // Sự kiện được chọn
  const [filteredEvents, setFilteredEvents] = useState([]); // Danh sách sự kiện đã lọc

  // Hàm xử lý tìm kiếm
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
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
  const getLocation = () => {
    return 'TP.HCM, Việt Nam'
  }

  const loadEvent = async function () {
    try {
      const response = await axios.get(
        `http://localhost:8888/api/users/event/get?eventName=${searchTerm}`
      );

      setFilteredEvents(response.data.data)
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const debouncedSearch = useDebounce(loadEvent, 500);

  useEffect(() => {
    debouncedSearch()

  }, [searchTerm])


  return (
    <div className="flex min-h-screen mt-5 items-center justify-center bg-gray-100 bg-gradient-to-r from-darkPink to-coralRed">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <Header />
        <div className='container mx-auto p-4 mt-5'>
          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>イベントリスト</h1>

          {/* Bộ lọc title */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="イベントタイトルで検索..."
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
                key={event.eventId}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '15px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <h2 style={{ marginBottom: '10px', color: '#333' }}>{event.eventName}</h2>
                <p style={{ marginBottom: '5px' }}>
                  <strong>時間:</strong> {moment(event.eventTime).format("HH:mm:ss DD-MM-YYYY")}
                </p>
                <p style={{ marginBottom: '5px' }}>
                  <strong>場所:</strong> {event.location ? event.location : getLocation()}
                </p>
                <p style={{ marginBottom: '10px' }}>{event.eventDescription}</p>

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
                    詳細を見る
                  </button>

                  {/* Nút đăng ký - Nằm bên phải */}
                  <button
                    style={{
                      padding: '10px 15px',
                      backgroundColor: registeredEvents.includes(event.eventID) ? '#dc3545' : '#28a745',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleRegister(event.eventID)}
                  >
                    {registeredEvents.includes(event.eventID) ? '登録をキャンセル' : '登録'}
                  </button>
                </div>
              </div>
            ))}
            {filteredEvents.length === 0 && (
              <p style={{ textAlign: 'center', color: '#888' }}>イベントが見つかりません。</p>
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
                <h2 style={{ color: '#333' }}>{selectedEvent.eventName}</h2>
                <p>
                  <strong>時間:</strong> {moment(selectedEvent.eventTime).format("HH:mm:ss DD-MM-YYYY")}
                </p>
                <p>
                  <strong>場所:</strong> {getLocation()}
                </p>
                <p>{selectedEvent.eventDescription}</p>
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
                  閉じる
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
      </div>
    </div>
  );
};

export default EventList;
