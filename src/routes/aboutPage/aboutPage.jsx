import React from "react";
import "./aboutPage.scss";

function AboutPage() {

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">About EliteEstate</h1>
          <p>
          Welcome to EliteEstate, your go-to solution for seamless real estate transactions. Whether you&apos;re looking to buy, sell, or rent, our app provides an intuitive platform designed to make the process easier, faster, and more transparent.
          </p>
          <h1 className="subTitle">Our Mission</h1>
          <p>
          At EliteEstate, we aim to revolutionize the real estate industry by leveraging technology to connect buyers, sellers, and renters with their dream properties. We believe that finding a home should be an exciting journey, not a stressful one.
          </p>
          {/* <h1 className="subTitle">What We Offer</h1>
          <p>
          Comprehensive Listings: Browse a wide range of properties, from cozy apartments to luxury homes, with detailed descriptions, high-quality images, and virtual tours.
          Advanced Search Filters: Narrow down your search by location, price range, property type, and more to find the perfect match for your needs.
          Real-Time Updates: Stay ahead of the market with instant notifications on new listings, price changes, and open houses.
          Expert Guidance: Access valuable insights from real estate professionals, market trends, and neighborhood guides to make informed decisions.
          User-Friendly Interface: Our app is designed with simplicity in mind, making it easy for anyone to navigate and find what they&apos;re looking for.
          </p>
          <h1 className="subTitle">Why Choose Us?</h1>
          <p>
          Trusted Platform: We prioritize your safety and privacy, ensuring a secure environment for all transactions.
          Customer Support: Our dedicated support team is here to assist you every step of the way.
          Innovative Features: We&apos;re constantly updating our app with new tools and features to enhance your real estate experience.
          </p> */}
          <p>
          Join thousands of satisfied users and start your real estate journey with EliteEstate today!
          </p>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default AboutPage;
