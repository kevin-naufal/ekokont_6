import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

function CustomerServicePage() {
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([
    { sender: 'system', text: 'Apa jenis proyek Anda? Pilih kategori:' },
  ]);
  const [answers, setAnswers] = useState({});
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const navigate = useNavigate();

  const styles = {
    container: {
      backgroundColor: '#F1E4CC',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    chatBox: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      overflowY: 'auto',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      border: '3px solid #4C6444',
    },
    chatBubble: {
      padding: '10px 15px',
      margin: '10px 0',
      borderRadius: '15px',
      maxWidth: '80%',
      wordWrap: 'break-word',
    },
    systemBubble: {
      backgroundColor: '#4b5b3c',
      color: 'white',
      alignSelf: 'flex-start',
    },
    userBubble: {
      backgroundColor: '#F1E4CC',
      color: '#4b5b3c',
      alignSelf: 'flex-end',
      border: '1px solid #4b5b3c',
    },
    quickReplies: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '10px',
    },
    replyButton: {
      backgroundColor: '#4b5b3c',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
    },
    productBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      alignItems: 'center',
      marginTop: '20px',
    },
    productCard: {
      border: '1px solid #ccc',
      borderRadius: '10px',
      overflow: 'hidden',
      width: '200px',
      textAlign: 'center',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    productImage: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
    },
    productName: {
      padding: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#4b5b3c',
    },
    inputBox: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      borderTop: '1px solid #ccc',
    },
    inputField: {
      flex: 1,
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '20px',
      marginRight: '10px',
    },
    sendButton: {
      backgroundColor: '#4b5b3c',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      padding: '10px 20px',
      cursor: 'pointer',
    },
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/products');
      setProducts(response.data.products);
    } catch (err) {
      console.error('Error fetching products:', err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (Object.keys(answers).length === questions.length) {
      const filteredProducts = products.filter((product) => {
        const matchesType = answers.material ? product.type === answers.material : true;
        const matchesPrice =
          answers.priceRange === '< Rp200.000'
            ? product.price < 200000
            : answers.priceRange === 'Rp200.000 - Rp500.000'
            ? product.price >= 200000 && product.price <= 500000
            : answers.priceRange === '> Rp500.000'
            ? product.price > 500000
            : true;

        return matchesType && matchesPrice;
      });
      setSortedProducts(filteredProducts);
    }
  }, [answers, products]);

  const questions = [
    {
      text: 'Apa jenis proyek Anda? Pilih kategori:',
      options: ['Renovasi Rumah', 'Pembangunan Baru', 'Dekorasi Interior'],
      key: 'category',
    },
    {
      text: 'Material apa yang Anda butuhkan?',
      options: ['Kayu', 'Semen', 'Kaca', 'Atap', 'Batu'],
      key: 'material',
    },
    {
      text: 'Berapa kisaran harga yang Anda inginkan?',
      options: ['< Rp200.000', 'Rp200.000 - Rp500.000', '> Rp500.000'],
      key: 'priceRange',
    },
    {
      text: 'Apakah Anda memiliki preferensi warna?',
      options: ['Tidak', 'Ya'],
      key: 'colorPreference',
    },
  ];

  const handleReply = (reply) => {
    const currentQuestion = questions[step];
    setAnswers({ ...answers, [currentQuestion.key]: reply });
    setMessages([
      ...messages,
      { sender: 'user', text: reply },
      step < questions.length - 1
        ? { sender: 'system', text: questions[step + 1].text }
        : { sender: 'system', text: 'Terima kasih! Berikut produk yang cocok untuk Anda:' },
    ]);
    setStep(step + 1);
  };

  const resetChat = () => {
    setStep(0);
    setAnswers({});
    setMessages([{ sender: 'system', text: questions[0].text }]);
    setSortedProducts([]);
  };

  const handleProductClick = (productId) => {
    navigate(`/product-display/${productId}`);
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.chatBubble,
              ...(msg.sender === 'system' ? styles.systemBubble : styles.userBubble),
            }}
          >
            {msg.text}
          </div>
        ))}
        {step < questions.length && (
          <div style={styles.quickReplies}>
            {questions[step].options.map((option, index) => (
              <button
                key={index}
                style={styles.replyButton}
                onClick={() => handleReply(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      {step >= questions.length && (
        <div style={styles.productBox}>
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <div key={product._id} style={styles.productCard}>
                <a onClick={() => handleProductClick(product._id)} style={{ cursor: 'pointer' }}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    style={styles.productImage}
                  />
                  <div style={styles.productName}>{product.name}</div>
                </a>
              </div>
            ))
          ) : (
            <p>Tidak ada produk yang sesuai dengan kriteria Anda.</p>
          )}
          <button style={styles.replyButton} onClick={resetChat}>
            Mulai Ulang
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default CustomerServicePage;