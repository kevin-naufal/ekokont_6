import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Button, Slider, Dialog, Menu, MenuItem } from '@mui/material';

const MyAccountSidebar = () => {
  const location = useLocation();
  const [profilePicture, setProfilePicture] = useState(() =>
    localStorage.getItem('profilePicture') || null
  );
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

  const storedLoginData = JSON.parse(localStorage.getItem('loginData'));
  const username = storedLoginData?.user?.username || 'Guest';

  const styles = {
    sidebar: {
      width: '250px',
      backgroundColor: '#CABA9C',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
    },
    profilePictureWrapper: {
      position: 'relative',
      width: '100px',
      height: '100px',
      margin: '0 auto 10px',
    },
    profilePicture: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      backgroundColor: '#ffffff', // Gray background for default guest profile
      objectFit: 'cover',
      cursor: 'pointer',
    },
    fileInput: {
      display: 'none',
    },
    username: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '15px',
    },
    separator: {
      margin: '15px 0',
      borderTop: '1px solid #999',
    },
    sidebarLink: {
      display: 'block',
      marginBottom: '15px',
      color: '#333',
      textDecoration: 'none',
      fontSize: '18px',
    },
    logoutLink: {
      color: '#d9534f',
    },
  };

  return (
    <div style={styles.sidebar}>
      {/* Foto Profil */}
      <div style={styles.profilePictureWrapper}>
        <img
          src={profilePicture || guestProfilePicture}
          alt="Profile"
          style={styles.profilePicture}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => document.getElementById('fileInput').click()}>
            Change Picture
          </MenuItem>
          <MenuItem onClick={() => setShowCropper(true)}>Edit Picture</MenuItem>
          <MenuItem onClick={handleDeleteProfilePicture}>Delete Picture</MenuItem>
        </Menu>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={styles.fileInput}
          onChange={handleProfilePictureChange}
        />
      </div>

      {/* Nama Pengguna */}
      <div style={styles.username}>{username}</div>

      {/* Pembatas */}
      <div style={styles.separator}></div>

      {/* Tautan Menu */}
      <Link
        to="/account-details"
        style={styles.sidebarLink}
        onClick={() =>
          location.pathname === '/account-details' && event.preventDefault()
        }
      >
        Account
      </Link>
      <Link
        to="/account-address"
        style={styles.sidebarLink}
        onClick={() =>
          location.pathname === '/account-address' && event.preventDefault()
        }
      >
        Address
      </Link>
      <Link
        to="/account-orders"
        style={styles.sidebarLink}
        onClick={() =>
          location.pathname === '/account-orders' && event.preventDefault()
        }
      >
        Orders
      </Link>
      <Link
        to="/account/wishlist"
        style={styles.sidebarLink}
        onClick={() =>
          location.pathname === '/account/wishlist' && event.preventDefault()
        }
      >
        Wishlist
      </Link>
      <a
        href="#"
        style={{ ...styles.sidebarLink, ...styles.logoutLink }}
        onClick={() => {
          const storedLoginData = JSON.parse(localStorage.getItem('loginData'));
          if (storedLoginData && storedLoginData.user) {
            storedLoginData.user.loggedIn = false;
            localStorage.setItem('loginData', JSON.stringify(storedLoginData));
          }
          window.location.href = '/';
        }}
      >
        Log out
      </a>

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
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e, zoom) => setZoom(zoom)}
          />
          <div>
            <Button
              onClick={handleSaveCroppedImage}
              color="primary"
              variant="contained"
            >
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

export default MyAccountSidebar;
