import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import Cropper from 'react-easy-crop';
import { Button, Slider, Dialog } from '@mui/material';

const ProfilePictureAccount = ({ profilePicture, setProfilePicture }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const guestProfilePicture = '../Images/[CITYPNG.COM]Black User Member Guest Icon - 4000x4000.png';

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
    setAnchorEl(null); // Close menu
  };

  const handleCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSaveCroppedImage = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    setProfilePicture(croppedImage);
    localStorage.setItem('profilePicture', croppedImage);
    setShowCropper(false);
  };

  const handleCancelCrop = () => {
    setImageSrc(null);
    setShowCropper(false);
  };

  const handleDeleteProfilePicture = () => {
    setProfilePicture(guestProfilePicture);
    localStorage.removeItem('profilePicture');
    setAnchorEl(null); // Close menu
  };

  const getCroppedImg = (imageSrc, cropArea) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = cropArea.width;
        canvas.height = cropArea.height;
        ctx.drawImage(
          image,
          cropArea.x,
          cropArea.y,
          cropArea.width,
          cropArea.height,
          0,
          0,
          cropArea.width,
          cropArea.height
        );
        canvas.toBlob((blob) => {
          const fileReader = new FileReader();
          fileReader.onloadend = () => resolve(fileReader.result);
          fileReader.onerror = reject;
          fileReader.readAsDataURL(blob);
        }, 'image/jpeg');
      };
    });
  };

  return (
    <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 10px' }}>
      <img
        src={profilePicture || guestProfilePicture}
        alt="Profile"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          objectFit: 'cover',
          cursor: 'pointer',
        }}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => document.getElementById('fileInput').click()}>Change Picture</MenuItem>
        <MenuItem onClick={() => setShowCropper(true)}>Edit Picture</MenuItem>
        <MenuItem onClick={handleDeleteProfilePicture}>Delete Picture</MenuItem>
      </Menu>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleProfilePictureChange}
      />

      {/* Dialog Cropper */}
      <Dialog open={showCropper} onClose={handleCancelCrop}>
        <div style={{ width: '400px', height: '400px', position: 'relative' }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Slider value={zoom} min={1} max={3} step={0.1} onChange={(e, zoom) => setZoom(zoom)} />
          <div>
            <Button onClick={handleSaveCroppedImage} color="primary" variant="contained">
              Save
            </Button>
            <Button
              onClick={handleCancelCrop}
              color="secondary"
              variant="outlined"
              style={{ marginLeft: '10px' }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProfilePictureAccount;
