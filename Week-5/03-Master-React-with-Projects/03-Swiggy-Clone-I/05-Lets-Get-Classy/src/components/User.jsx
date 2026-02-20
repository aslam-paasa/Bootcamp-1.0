import { useEffect, useState } from 'react';

const User = ({ contact }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function getUserInfo() {
        const data = await fetch('https://api.github.com/users/aslam-paasa');
        const json = await data.json();
        setUserInfo(json);
    }
    getUserInfo(); 
  }, []);

  return (
    <div className="user-card">
      <img src={userInfo.avatar_url} alt="user" />
      <h2>Name: {userInfo.name}</h2>
      <h3>Location: {userInfo.location}</h3>
      <h3>Contact: {userInfo.contact || contact }</h3>
      <h3>Followers: {userInfo.followers}</h3>
      <h3>Following: {userInfo.following}</h3>
    </div>
  );
};

export default User;
