import { PageTitle } from "../components";
import background from "../assets/img/background.webp";

export const Profile = () => {
    return (
        <div>
            <PageTitle />
            <div className="profile-container max-w-xl mx-auto p-4">
                <div className="profile-header flex flex-col items-center">
                    <img src={background} alt="Profile" className="profile-pic w-64 h-auto mb-4" />
                    <h2 className="profile-name text-2xl font-semibold text-white">John Doe</h2>
                </div>

                <div className="profile-info ml-4 mt-4 space-y-2 text-white">
                    {/* Key-Value Pair 1 */}
                    <div className="flex justify-between mb-2">
                        <span className="font-bold text-white">メール:</span>
                        <span className="text-white">johndoe@example.com</span>
                    </div>

                    {/* Key-Value Pair 2 */}
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-white">性別:</span>
                        <span className="text-white">男性</span>
                    </div>

                    {/* Key-Value Pair 3 */}
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-white">誕生日:</span>
                        <span className="text-white">2021年1月1日</span>
                    </div>

                    {/* Key-Value Pair 4 */}
                    <div className="flex justify-between">
                        <span className="font-bold text-white">趣味:</span>
                        <span className="text-white">音楽, 読書</span>
                    </div>
                </div>
                <div className="profile-actions mt-6 flex justify-center">
                    <button className="edit-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Edit Profile</button>
                </div>
            </div>
        </div>
    )
}