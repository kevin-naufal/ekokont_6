import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ProfilePictureAccount from './ProfilePictureAccount';

const MyAccountSidebar = () => {
  const location = useLocation();
  const [profilePicture, setProfilePicture] = useState(() =>
    localStorage.getItem('profilePictureAccount') || null  // Updated to 'profilePictureAccount'
  );

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
      {/* Profile Picture Component */}
      <ProfilePictureAccount profilePicture={profilePicture} setProfilePicture={setProfilePicture} />

      {/* Username */}
      <div style={styles.username}>{username}</div>

      {/* Separator */}
      <div style={styles.separator}></div>

      {/* Menu Links */}
      <Link
        to="/account-details"
        style={styles.sidebarLink}
        onClick={(event) =>
          location.pathname === '/account-details' && event.preventDefault()
        }
      >
        Account
      </Link>
      <Link
        to="/account-address"
        style={styles.sidebarLink}
        onClick={(event) =>
          location.pathname === '/account-address' && event.preventDefault()
        }
      >
        Address
      </Link>
      <Link
        to="/account-orders"
        style={styles.sidebarLink}
        onClick={(event) =>
          location.pathname === '/account-orders' && event.preventDefault()
        }
      >
        Orders
      </Link>
      <a
        href="#"
        style={{ ...styles.sidebarLink, ...styles.logoutLink }}
        onClick={() => {
          const storedLoginData = JSON.parse(localStorage.getItem('loginData'));
          if (storedLoginData && storedLoginData.user) {
            storedLoginData.user.loggedIn = false;
            localStorage.setItem('loginData', JSON.stringify(storedLoginData));
            localStorage.setItem('isLoggedIn', 'false');
          }
          window.location.href = '/home';
        }}
      >
        Log out
      </a>
    </div>
  );
};

export default MyAccountSidebar;
