import { Link, useLocation } from 'react-router-dom';

const MyAccountSidebar = () => {
  const location = useLocation();

  const handleClick = (path) => (event) => {
    if (location.pathname === path) {
      event.preventDefault(); // Prevents appending `#` to the URL
    }
  };

  const handleLogout = () => {
    // Set loggedIn to false in localStorage
    localStorage.setItem('loggedIn', 'false');
    // Redirect to the homepage after logging out
    window.location.href = '/';
  };

  const styles = {
    sidebar: {
      width: "200px",
      backgroundColor: '#CABA9C',
      padding: '20px',
      borderRadius: '8px',
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
      <Link to="/account/details" style={styles.sidebarLink} onClick={handleClick('/account')}>Account</Link>
      <Link to="/account/address" style={styles.sidebarLink} onClick={handleClick('/account/address')}>Address</Link>
      <Link to="/account/orders" style={styles.sidebarLink} onClick={handleClick('/account/orders')}>Orders</Link>
      <Link to="/account/wishlist" style={styles.sidebarLink} onClick={handleClick('/account/wishlist')}>Wishlist</Link>
      <a href="#" style={{ ...styles.sidebarLink, ...styles.logoutLink }} onClick={handleLogout}>Log out</a>
    </div>
  );
};

export default MyAccountSidebar;