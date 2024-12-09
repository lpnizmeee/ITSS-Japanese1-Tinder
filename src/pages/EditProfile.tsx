import { PageTitle, Loader, Nav } from "../components";
import background from "../assets/img/background.webp";
import "../assets/Css/profile.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export const EditProfile = () => {
    const [image, setImage] = useState(null); // Trạng thái lưu ảnh đã chọn

    const [name, setName] = useState("");
    const [email, setEmail]=useState("")
    const [gender, setGender] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [love, setLove] = useState("");
    const navigate = useNavigate(); // Khởi tạo useNavigate
    
    const handleDateChange = (date : any) => {
        setSelectedDate(date);
    };

    const handSave = (e: any) => {
        e.preventDefault();
        
        const dataProfile = { image,name, email,gender, selectedDate, love };
        console.log(dataProfile);
        navigate("/profile", { state: dataProfile });
        // fetch('http://localhost:5173/profile', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(dataProfile)
        // })
        
    };
    
    const handleImageChange = (e: any) => {
        const file = e.target.files[0]; // Lấy file người dùng chọn
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const [image, setImage] = useState<string | ArrayBuffer | null>(null);
                setImage(reader.result); // Lưu ảnh vào state
            };
            reader.readAsDataURL(file); // Chuyển file thành URL
        }
    };
    

    return (
        <div>
            <PageTitle />
            <form onSubmit={handSave}>
                <div className="profile-container max-w-xl mx-auto p-4">
                <div className="profile-header flex flex-col items-center">
                    <img
                        src={image || "path_to_default_image.jpg"} // Nếu không có ảnh chọn thì hiển thị ảnh mặc định
                        alt="Profile"
                        className="profile-pic w-64 h-auto mb-4"
                    />
                    <input
                        type="file"
                        accept="image/*" // Chỉ cho phép chọn ảnh
                        onChange={handleImageChange}
                        className="hidden" // Ẩn input chọn file
                        id="file-input"
                    />
                    <label htmlFor="file-input" className="cursor-pointer text-blue-500">
                        Change Picture
                    </label>
                </div>
                    <div className="profile-info ml-4 mt-4 space-y-2 text-white">
                        <div className="flex justify-between mb-2">
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text"
                                className="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="name">Email</label>
                            <input 
                                type="text"
                                className="name"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="gender">Gender</label>
                            <div>
                                <input
                                    type="radio"
                                    id="radio-2"
                                    name="gender"
                                    value="Male"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <label htmlFor="radio-2">Male</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="radio-3"
                                    name="gender"
                                    value="Female"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <label htmlFor="radio-3">Female</label>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="birthday">Birth day</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select your date of birth"
                                className="bg-gray-800 text-white p-2 rounded"
                            
                            />
                        </div>
                        <div className="flex justify-between">
                            <label htmlFor="love">Love</label>
                            <textarea
                                className="name"
                                value={love}
                                onChange={(e) => setLove(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="profile-actions mt-6 flex justify-center">
                        <button type="submit" className="edit-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
