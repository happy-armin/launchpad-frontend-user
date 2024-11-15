import React, { useState } from 'react';
import '../styles/components/avatar-upload.scss';

interface AvatarUploadProps {
  onUpload: (file: File) => void; // Callback to handle the uploaded file
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ onUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Generate a preview URL for the uploaded image
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      onUpload(file); // Pass the file to the parent component
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
  };

  return (
    <div className="avatar-upload">
      <div className="preview-container">
        {preview ? (
          <>
            <img src={preview} alt="Avatar Preview" className="avatar-preview" />
            <button onClick={handleRemoveImage} className="remove-button">
              Remove
            </button>
          </>
        ) : (
          <label htmlFor="avatar-input" className="upload-placeholder">
            Click
          </label>
        )}
      </div>
      <input type="file" id="avatar-input" className="file-input" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default AvatarUpload;
