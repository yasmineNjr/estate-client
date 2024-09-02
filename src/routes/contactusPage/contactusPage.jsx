import React from "react";
import "./contactusPage.scss";

function ContactUsPage() {

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Contact Us</h1>
          <p>
          We’re here to help with all your real estate needs! Whether you have questions about a listing, need assistance with your account, or simply want to share feedback, our team is ready to assist you.
          </p>
          <h1 className="subTitle">How to Reach Us</h1>
          <p>
            <ul style={{ marginLeft: '20px'}}>
                <li style={{ marginBottom: '15px'}}>
                    <span style={{ fontSize: '20px'}}>Email: </span>Send us an email at <span style={{ fontWeight: 'bold'}}>support@elitestate.com</span> for any inquiries or support requests. We strive to respond within 24 hours.
                </li>
                <li>
                    <span style={{ fontSize: '20px'}}>Phone: </span>Give us a call at <span style={{ fontWeight: 'bold'}}>+963955502266</span>. Our customer service team is available from <span style={{ fontWeight: 'bold'}}>[09:00AM - 05:00PM]</span> to assist you.
                </li>
            </ul>
          </p>
          <p>
          Thank you for choosing EliteEstate. We look forward to helping you find your perfect property.
          </p>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default ContactUsPage;
