import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InputImage.css'

function InputImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  useEffect(() => {
    
  },[originalImage,processedImage]);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
        alert('Please select an image file.');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      try {
        const response = await axios.post('http://localhost:8000/predict', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setProcessedImage(response.data.image);
        setOriginalImage(response.data.orig_image);
        setTimeTaken(response.data.total_time);
        console.log(timeTaken);
      } catch (error) {
        console.error('Error processing image:', error);
        alert('Error processing image. Please try again later.');
      }
    };
  

  return (
    <div className='div-file-upload'>
      <br></br>
      <input type="file" id="input-file-upload" onChange={handleFileChange} />
      <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={handleSubmit}>Input Satellite Image</button>
      <br></br> <br></br>
      {processedImage && (
        <div>
        <div className='border-double border-2 border-sky-500' style={{
          // "border-style":"groove",
          "width":"50%",
          "margin":"auto",
          // "justify-content":"center"
        }}>
          <br></br>
          <div style={{ 
            "display": "flex",
            "align-items":"center", 
            "justify-content" :"center",
            "grid-template-columns": "1fr 1fr",
            "column-gap": "10%",
            "row-gap":"10px"}}> 
            <label id='img-id' htmlFor='orig-img-id'>Original Image</label>
            <label id='img-id' htmlFor='proc-img-id'>Processed Image</label>
            </div>

          <br></br> <br></br>

          <div style={{ 
            "display": "flex",
            "align-items":"center", 
            "justify-content" :"center",
            "grid-template-columns": "1fr 1fr",
            "column-gap": "10%",
            "row-gap":"10px"}}>
            <img id='orig-img-id' src={`data:image/jpeg;base64,${originalImage}`} alt="Original" />
            <img id='proc-img-id' src={`data:image/jpeg;base64,${processedImage}`} alt="Processed" />
          </div>
          <br></br>
          {/* <p>{console.log(timeTaken)}</p> */}
        </div>

        <div style={{ 
            "display": "flex",
            "align-items":"center", 
            "justify-content" :"center"}}>

          Time taken for inference: {timeTaken} seconds...
        </div>
        </div>
      )}
    </div>
  );
}

export default InputImage;