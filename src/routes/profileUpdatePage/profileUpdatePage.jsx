import React from "react";
import { useNavigate } from "react-router-dom";
import "./profileUpdatePage.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from '../../components/uploadWidget/UploadWidget';

function ProfileUpdatePage() {
  
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState([]);
  const [error, setError] = useState('');
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    
    try{
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
      // const res = await axios.put(apiRequest+`/users/${currentUser.id}`, {
        username, email, password, avatar:avatar[0]
      });
      updateUser(res.data);
      navigate('/profile');
    }catch(err){
      // console.log(err);
      setError(err.response.data.message);
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error('Server Error', err.response.status, err.response.data);
      } else if (err.request) {
        // No response received from the server
        console.error('Network Error', err.request);
      } else {
        // Something else happened
        console.error('Error', err.message);
      }
    }finally{
      setIsLoading(false);
    }
    
  }

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button disabled={isLoading}>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || '/noavatar.jpg'} alt="" className="avatar" />
        <UploadWidget 
          uwConfig={{
            cloudName:'djjdcdm9x',
            uploadPreset: 'astate',
            multiple: false,
            maxImageFileSize:2000000,
            folder: 'avatars',
          }}
          setState= {setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
