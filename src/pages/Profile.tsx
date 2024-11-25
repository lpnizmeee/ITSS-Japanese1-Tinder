import { PageTitle } from "../components";
import background from "../assets/img/background.webp";
import { useLocation , useNavigate   } from "react-router-dom";
import { useState, useEffect  } from "react";
import DatePicker from "react-datepicker";
export const Profile = () => {

    const [image, setImage] = useState(null); // Trạng thái lưu ảnh đã chọn
    const [name, setName] = useState("John Doe");
    const [email, setEmail]=useState("");
    const [gender, setGender] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [love, setLove] = useState("");

    const location = useLocation();
    const data = location.state || {}; // Dữ liệu nhận từ EditProfile
    const navigate = useNavigate(); 
    const onEdit = (e) => {
        e.preventDefault();
        navigate("/editprofile");
        
        
    };
    //console.log(data);
    useEffect(() => {
        if (data.name&&data ) setName(data.name);
        if(data.email) setEmail(data.email)
        if (data.gender&&data) setGender(data.gender||"");
        if (data.selectedDate&&data) setSelectedDate(data.selectedDate||"");
        if (data.love) setLove(data.love);
        if(data.image) setImage(data.image);
    }, [data]);
    
    console.log(selectedDate);

    return (
        <div>
            <PageTitle />
            <div className="profile-container max-w-xl mx-auto p-4">
                <div className="profile-header flex flex-col items-center">
                    <img src={image||background} alt="Profile" className="profile-pic w-64 h-auto mb-4" />
                    <h2 className="profile-name text-2xl font-semibold text-white">{name}</h2>
                </div>

                <div className="profile-info ml-4 mt-4 space-y-2 text-white">
                    {/* Key-Value Pair 1 */}
                    <div className="flex justify-between mb-2">
                        <span className="font-bold text-white">メール:</span>
                        <span className="text-white">{email}</span>
                    </div>

                    {/* Key-Value Pair 2 */}
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-white">性別:</span>
                        <span className="text-white">{gender}</span>
                    </div>

                    {/* Key-Value Pair 3 */}
                    <div className="flex justify-between items-center mb-2">
                            <label htmlFor="birthday">Birth day</label>
                            <span className="text-white">
                            {selectedDate ? selectedDate.toLocaleDateString("vi-VN") : ""}
                            </span>
                        </div>

                    {/* Key-Value Pair 4 */}
                    <div className="flex justify-between">
                        <span className="font-bold text-white">趣味:</span>
                        <span className="text-white">{love}</span>
                    </div>
                </div>
                <div className="profile-actions mt-6 flex justify-center">
                    <button onClick={onEdit} className="edit-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Edit Profile</button>
                </div>
            </div>
        </div>
    )
}