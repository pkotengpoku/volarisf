import React, { useState } from 'react'
//import { storage } from "../../firebase"

const Firebasetest = () => {
    const [image, setImage] = useStatetate(null);

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      //const storageRef = storage.ref();
      const imageRef = storageRef.child(file.name);
  
      imageRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          setImage(downloadURL);
        });
      });
    };
  
    return (
        <div className="container mx-auto my-8">
        <h1 className="text-2xl font-semibold mb-4">Image Upload</h1>
        <div className="mt-4">
        <input type="file" onChange={handleImageUpload} />
        {image && <img src={image} alt="Uploaded" className="mt-2 max-w-xs" />}
      </div>     
      </div>
    );
}

export default Firebasetest