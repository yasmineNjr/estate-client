import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./card.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
function Card({ item }) {

  const checkIfSaved = async() => {
    try{
      const res = await apiRequest('/posts/'+ item.id);
      return res.data.isSaved;
    }catch(err){
      console.log(err);
    }
  }
  
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [saved, setSaved] = useState(false);
  
  useEffect(() => {
    checkIfSaved().then(value => setSaved(value));
  }, []); 

  const handleSave = async() => {
    //after react19 update to useOptimistick hook
    setSaved((prev) => !prev);
    if(!currentUser){
      navigate('/login');
    }
    try{
      await apiRequest.post('/users/save', { postId: item.id });
    }catch(err){
      console.log(err);
      setSaved((prev) => !prev);
    }
  }
 
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">${item.Price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon" onClick={handleSave} style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}>
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
