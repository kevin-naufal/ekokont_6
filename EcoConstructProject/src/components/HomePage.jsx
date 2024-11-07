import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header'; // Ensure you have the correct path to your Header component
import Footer from './Footer'; // Ensure you have the correct path to your Footer component

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F1E4CC' }}>
      <Header /> {/* Add Header at the top */}
      <div className="flex-grow mt-12 px-4 pt-4 w-full flex flex-col items-center justify-center">
        <h1 className="text-[#102820] font-black text-3xl">ECO-CONSTRUCT</h1>
        
        <div className="mt-12 px-4 pt-4 w-full flex flex-col items-center justify-center">
          <p style={{ textAlign: 'justify', color: '#102820', fontSize: '1.25rem' }} className="text-gray-800">
            In an era of rapid urbanization and increasing environmental challenges, Eco-Construct emerges as a pioneering platform dedicated to revolutionizing the construction industry by facilitating access to eco-friendly building materials. With over 200 million buildings worldwide contributing to significant resource depletion and carbon emissions, the need for sustainable practices has never been more critical. Eco-Construct addresses the common barriers hindering the adoption of green materials—such as the perceived hassle and additional costs of consulting—by providing a comprehensive marketplace where users can easily find and purchase high-quality, environmentally sustainable materials. Our commitment to quality is reinforced through rigorous quality control checks for all materials listed by suppliers, ensuring that every product meets our high standards. By fostering education and awareness about the long-term benefits of eco-friendly building, along with implementing incentive programs to encourage sustainable choices, Eco-Construct strives to significantly increase the percentage of environmentally friendly buildings, paving the way for a greener, more sustainable future in construction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="p-4 border border-[#4C6444] rounded-lg shadow-sm hover:shadow-lg transition flex items-center justify-center bg-[#CABA9C]">
            <Link to="/signup" className="text-[#102820] font-bold">
              REGISTER
            </Link>
          </div>

          <div className="p-4 border border-[#4C6444] rounded-lg shadow-sm hover:shadow-lg transition flex items-center justify-center bg-[#8A6240]">
            <Link to="/login" className="text-[#F1E4CC] font-bold">
              SIGN IN
            </Link>
          </div>
        </div>
      </div>
      <Footer /> {/* Add Footer at the bottom */}
    </div>
  );
}

export default HomePage;
