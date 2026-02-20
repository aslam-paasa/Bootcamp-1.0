import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa"; // GitHub logo

const User = ({ contact }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function getUserInfo() {
      const data = await fetch("https://api.github.com/users/aslam-paasa");
      const json = await data.json();
      setUserInfo(json);
    }
    getUserInfo();
  }, []);

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl flex flex-col items-center text-center">
      {/* Avatar */}
      <img
        src={userInfo.avatar_url}
        alt="user"
        className="w-28 h-28 rounded-full border-4 border-gray-200 shadow-md"
      />

      {/* Info */}
      <h2 className="mt-4 text-2xl font-bold text-gray-800">
        {userInfo.name}
      </h2>
      <h3 className="text-gray-500 text-lg">{userInfo.location}</h3>
      <h3 className="text-gray-600 text-base">
        Email: {userInfo.email || contact}
      </h3>

      {/* Stats */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">{userInfo.followers}</p>
          <p className="text-sm text-gray-500">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-gray-800">{userInfo.following}</p>
          <p className="text-sm text-gray-500">Following</p>
        </div>
      </div>

      {/* GitHub Button */}
      <a
        href={userInfo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center gap-2 px-5 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
      >
        <FaGithub size={20} />
        Visit GitHub
      </a>
    </div>
  );
};

export default User;
