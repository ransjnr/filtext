// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';

const Upload = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const [extractedText, setExtractedText] = useState("");

  const handleExtract = async () => {
    const formData = new FormData();
    const fileInput = document.querySelector(".input-field");
  
    if (fileInput.files[0]) {
      formData.append('file', fileInput.files[0]);
  
      try {
        const response = await fetch('http://localhost:8000/upload/', { // Update the URL to match your FastAPI server
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log(data.message); // Handle the response from FastAPI
  
        // Send another request to extract the information
        const extractResponse = await fetch('http://localhost:8000/extract/', {
          method: 'POST',
        });
  
        if (!extractResponse.ok) {
          throw new Error('Network response was not ok');
        }
  
        const extractData = await extractResponse.json();
        setExtractedText(extractData.text);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };
  return (
    <div className='main'>
      <form
        onClick={() => document.querySelector(".input-field").click()}
      >
        <input type="file" accept='image/*,application/pdf' className='input-field' hidden
          onChange={({ target: { files } }) => {
            files[0] && setFileName(files[0].name);
            if (files) {
              setImage(URL.createObjectURL(files[0]));
            }
          }}
        />
        {image ?
          <img src={image} width={150} height={150} alt={fileName} />
          :
          <>
            <MdCloudUpload color='#6956E5' size={60} />
            <p>Browse files to upload</p>
          </>
        }
      </form>
      <section className='uploaded-row'>
        <AiFillFileImage color='#6956E5' />
        <span className='upload-content'>
          {fileName}
          <MdDelete
            onClick={() => {
              setFileName("No selected file");
              setImage(null);
            }}
          />
        </span>
        <button className='btn-extract' onClick={handleExtract}>Extract</button>
      </section>
      {extractedText && (
        <div className='result'>
          <h3>Extracted Text:</h3>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default Upload;