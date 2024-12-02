import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

function CustomerServicePage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    category: '',
    material: '',
    priceRange: '',
  });

  const styles = {
    container: {
      backgroundColor: '#F1E4CC',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '20px',
    },
    question: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#4b5b3c',
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: '#4b5b3c',
      color: 'white',
      padding: '15px 30px',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
      borderRadius: '5px',
      margin: '10px',
    },
    backButton: {
      backgroundColor: '#ccc',
      color: '#333',
      padding: '10px 20px',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '5px',
      marginTop: '20px',
    },
  };

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
      options: ['< Rp500.000', 'Rp500.000 - Rp1.000.000', '> Rp1.000.000'],
      key: 'priceRange',
    },
  ];

  const handleNext = (answer) => {
    const currentQuestion = questions[step];
    setAnswers({ ...answers, [currentQuestion.key]: answer });
    setStep(step + 1);
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({
      category: '',
      material: '',
      priceRange: '',
    });
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.content}>
        {step < questions.length ? (
          <>
            <h2 style={styles.question}>{questions[step].text}</h2>
            {questions[step].options.map((option, index) => (
              <button
                key={index}
                style={styles.button}
                onClick={() => handleNext(option)}
              >
                {option}
              </button>
            ))}
            {step > 0 && (
              <button
                style={styles.backButton}
                onClick={() => setStep(step - 1)}
              >
                Kembali
              </button>
            )}
          </>
        ) : (
          <>
            <h2 style={styles.question}>
              Rekomendasi kami berdasarkan preferensi Anda:
            </h2>
            <p>
              <strong>Kategori:</strong> {answers.category}
            </p>
            <p>
              <strong>Material:</strong> {answers.material}
            </p>
            <p>
              <strong>Kisaran Harga:</strong> {answers.priceRange}
            </p>
            <p>
              Silakan kunjungi halaman produk kami untuk memilih bahan yang
              sesuai atau klik tombol di bawah ini untuk diarahkan ke koleksi
              terkait.
            </p>
            <button
              style={styles.button}
              onClick={() => (window.location.href = '/product')}
            >
              Lihat Produk
            </button>
            <button style={styles.backButton} onClick={resetQuiz}>
              Mulai Ulang
            </button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CustomerServicePage;