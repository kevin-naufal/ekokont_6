import { Link, useLocation } from 'react-router-dom';

const MyAccountSidebar = () => {
  const location = useLocation();

  const handleClick = (path) => (event) => {
    if (location.pathname === path) {
      event.preventDefault(); // Prevents appending `#` to the URL
    }
  };

  const handleLogout = () => {
    const storedLoginData = JSON.parse(localStorage.getItem('loginData'));
    // Perbarui status login ke false
    if (storedLoginData && storedLoginData.user) {
      storedLoginData.user.loggedIn = false; // Set loggedIn ke false
      localStorage.setItem('loginData', JSON.stringify(storedLoginData)); // Simpan kembali ke localStorage
    }
    window.location.href = '/';
  };

  // Ambil nama pengguna dari localStorage
  const storedLoginData = JSON.parse(localStorage.getItem('loginData'));
  const username = storedLoginData?.user?.username || 'Guest';

  const styles = {
    sidebar: {
      width: "200px",
      backgroundColor: '#CABA9C',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center', // Pusatkan konten
    },
    profilePicture: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      backgroundColor: '#ddd', // Placeholder jika tidak ada gambar
      margin: '0 auto 10px', // Tambahkan margin bawah
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
      {/* Foto profil */}
      <div style={styles.profilePicture}></div>

      {/* Nama pengguna */}
      <div style={styles.username}>{username}</div>

      {/* Pembatas */}
      <div style={styles.separator}></div>

      {/* Tautan menu */}
      <Link to="/account-details" style={styles.sidebarLink} onClick={handleClick('/account-details')}>Account</Link>
      <Link to="/account-address" style={styles.sidebarLink} onClick={handleClick('/account-address')}>Address</Link>
      <Link to="/account-orders" style={styles.sidebarLink} onClick={handleClick('/account-orders')}>Orders</Link>
      <Link to="/account/wishlist" style={styles.sidebarLink} onClick={handleClick('/account/wishlist')}>Wishlist</Link>
      <a href="#" style={{ ...styles.sidebarLink, ...styles.logoutLink }} onClick={handleLogout}>Log out</a>
    </div>
  );
};

export default MyAccountSidebar;
