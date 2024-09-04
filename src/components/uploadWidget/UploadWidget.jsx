import React from "react";
import { createContext, useEffect, useRef, useState } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function UploadWidget({ uwConfig, setPublicId, setState }) {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const widgetRef = useRef(null);

  const initializeCloudinaryWidget = () => {
    
    if (loaded) {
      // if (window.cloudinary && window.cloudinary.createUploadWidget) {
      //   widgetRef.current = window.cloudinary.createUploadWidget({
      //     // cloudName: 'djjdcdm9x', // Replace with your Cloudinary cloud name
      //     // uploadPreset: 'astate', // Replace with your upload preset
      //     uwConfig,
      //   }, (error, result) => {
      //     if (!error && result && result.event === "success") {
      //       console.log('Upload successful! Image URL: ', result.info.url);
      //       setState(result.info.url)
      //     } else if (error) {
      //       console.error('Upload error: ', error);
      //     }
      //   });
      //   widgetRef.current.open();
      // } else {
      //   console.error('Cloudinary widget is not available');
      // }
    /////////////////////////////////////////////////////////
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            // setPublicId(result.info.public_id);
            // setAvatar(result.secure_url);//for one image
            setState((prev) => [...prev, result.info.secure_url]);//for multiple images
          }
        }
      );

      // document.getElementById("upload_widget").addEventListener(
      //   "click",
      //   function () {
      //     myWidget.open();
      //   },
      //   false
      // );
      myWidget.open();
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        // className="cloudinary-button"
        style={{ padding: '12px 6px', backgroundColor: '#fece51', cursor: 'pointer', border: 'none', width: '50%'}}
        onClick={initializeCloudinaryWidget}
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
