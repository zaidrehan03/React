import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { getJwtToken } from "./UtlisAuth";

function Documents() {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    const companyId = 93;
    const folderId = 96;
    const subFolderId = 0;
    const createdBy = 123;

    const apiUrl = `http://18.197.21.71:8084/ipik/CompaniesFilesUpload?companyId=${companyId}&folderId=${folderId}&subFolderId=${subFolderId}&createdBy=${createdBy}`;

    try {
      const jwtToken = getJwtToken(); // Get JWT token from local storage
      if (!jwtToken) {
        alert('JWT token not found. Please log in.');
        return;
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });

      if (response.ok) {
        alert('File uploaded successfully!');
        // Optionally, reset the file input
        setSelectedFile(null);
      } else {
        // Handle error responses from the server
        const errorMessage = await response.text();
        alert(`Failed to upload file: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Upload Documents</h2>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>Drag and drop a document here, or click to select document</p>
      </div>
      {selectedFile && (
        <div>
          <p>Selected file: {selectedFile.name}</p>
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
}

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  marginBottom: '20px',
};

export default Documents;
