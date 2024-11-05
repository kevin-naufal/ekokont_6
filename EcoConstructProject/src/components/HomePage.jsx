import React from 'react';
import Header from './Header'; // Import Header
import Footer from './Footer'; // Import Footer

function HomePage() {
  // Define styles as JavaScript objects
  const styles = {
    homepageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // Full viewport height
    },
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000, // Ensures header stays above content
      backgroundColor: '#4b5b3c', // Background color of header
    },
    content: {
      flex: 1, // Takes up available space, pushing footer down
      padding: '80px 20px 20px', // Add padding for content, accounting for header height
      overflowY: 'auto', // Enable scrolling if content exceeds the viewport
    },
  };

  return (
    <div style={styles.homepageContainer}>
      <Header style={styles.header} /> {/* Apply header styles */}
      <div style={styles.content}>
        <p>Welcome to Eco-Construct!</p>
        <p>Explore our eco-friendly building materials.</p>

        {/* Add multiple paragraphs to make the page scrollable */}
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus, lorem ac luctus aliquet, erat lacus commodo odio, nec cursus libero dolor non eros. Aenean dignissim ante nec vehicula fermentum. Donec ut bibendum velit, ut iaculis ligula. Curabitur eget dolor vel purus dignissim sagittis nec sit amet urna. Praesent consectetur ex id sapien suscipit, id tincidunt lacus tincidunt. Vestibulum a arcu justo. Cras sit amet libero fringilla, pharetra ex in, euismod magna. Phasellus gravida tortor non nulla cursus tincidunt.</p>

        <p>Vivamus auctor eu justo nec condimentum. Integer luctus purus in sapien ultrices, nec accumsan nisi gravida. Vivamus a diam vitae ex consectetur facilisis nec sed ex. Duis at risus vel nunc tincidunt sollicitudin. Aliquam erat volutpat. Aenean imperdiet volutpat ligula, et pharetra ex egestas vitae. Fusce dapibus metus vel augue euismod, a venenatis lectus dapibus. Sed volutpat interdum nisl, vel hendrerit lacus gravida non.</p>

        <p>Maecenas interdum, magna vel egestas placerat, ex arcu gravida mi, nec bibendum risus nisi vel dolor. Cras sed tristique sem. Integer volutpat vestibulum libero at fermentum. Donec ut turpis ac ex blandit euismod. Curabitur lacinia, nulla id aliquam viverra, sapien ligula dictum ex, a posuere sem lacus ut sapien. Proin euismod lacinia ante et dictum.</p>

        <p>Ut in odio consequat, cursus est a, fermentum nulla. Morbi luctus arcu sed arcu ultricies, ut ullamcorper leo dignissim. Donec luctus mollis metus, vitae laoreet justo dignissim at. Nulla facilisi. Phasellus vulputate eros eget mi aliquam, ac convallis lectus dapibus. Cras at ligula id sem vulputate laoreet sed et dolor.</p>

        <p>Fusce aliquet suscipit libero, sed consequat erat. Nulla posuere nunc ut tellus tincidunt tristique. Ut sed malesuada magna. Aenean laoreet, felis ac vehicula fermentum, odio ex congue purus, vel laoreet elit ligula ut dolor. Sed fermentum libero vitae sapien tincidunt, at elementum risus consequat.</p>

        <p>Nam sagittis dui nec fringilla sodales. Fusce hendrerit leo eu sem suscipit viverra. Aliquam erat volutpat. Phasellus imperdiet lorem ut velit faucibus, ut consequat odio tincidunt. In et justo tincidunt, varius nisi vel, gravida dolor. Pellentesque tincidunt mi nec arcu hendrerit, eu gravida ligula tempor. Suspendisse vel nisi ac odio bibendum pharetra vel ac purus.</p>

        <p>Proin nec ex vitae quam hendrerit fermentum. Vestibulum tempus ligula non magna tristique, et sodales urna lacinia. Sed eget ipsum non orci gravida cursus. Donec et ante vel sapien volutpat dictum non sed sem. Quisque condimentum orci vitae augue facilisis, vitae faucibus nisi auctor. Etiam varius, nunc sed malesuada auctor, justo eros gravida eros, a ultricies libero nulla nec urna. Suspendisse potenti.</p>

        <p>Donec finibus dolor vitae ligula aliquam, non venenatis arcu volutpat. Nullam malesuada, sapien ac consequat placerat, nunc est pellentesque neque, id venenatis eros ligula eu augue. Vestibulum in odio fermentum, malesuada dui a, ullamcorper ligula. Aliquam ac eros ac risus gravida posuere. Aliquam erat volutpat. In hac habitasse platea dictumst.</p>

        <p>Nam euismod felis ac turpis lacinia, a fermentum magna pellentesque. Etiam volutpat, nisi ac varius cursus, justo libero gravida justo, ut vestibulum libero odio non eros. Curabitur ac risus sit amet felis tincidunt fermentum vel et lectus. Sed vel cursus velit, ac sagittis ipsum. Sed convallis orci nec metus scelerisque, ac scelerisque nulla tincidunt.</p>

        <p>Phasellus nec dui eros. Morbi nec est volutpat, dignissim massa non, ullamcorper justo. Nulla facilisi. Proin a posuere nulla, nec dignissim risus. Sed feugiat, arcu nec cursus facilisis, dolor neque facilisis justo, nec fermentum augue augue ut lorem. Aliquam erat volutpat.</p>

        <p>Praesent sit amet arcu eu nunc suscipit dignissim. Duis at velit sed ex tempor tincidunt. In tincidunt nibh id ex efficitur, vitae consectetur tortor hendrerit. Nunc euismod, dui sit amet fringilla fermentum, metus massa bibendum eros, ut vehicula leo arcu nec magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi vel arcu ante.</p>

        <p>Sed ut ligula sit amet urna viverra porttitor. Suspendisse sit amet dui consectetur, condimentum ligula at, vulputate nunc. Sed gravida, metus at efficitur scelerisque, mi neque auctor urna, eu feugiat ex justo sit amet metus. Vivamus nec gravida est, ut tincidunt justo. Aenean feugiat augue et purus cursus, in ullamcorper lacus fermentum.</p>

        <p>Fusce faucibus metus eget orci viverra, vel condimentum risus feugiat. Donec sit amet volutpat ligula, sit amet rutrum ligula. Morbi euismod dui ac diam pharetra, at lacinia elit suscipit. Phasellus vitae leo elit. Donec tincidunt nunc vel lectus dignissim, eu maximus metus tristique.</p>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
