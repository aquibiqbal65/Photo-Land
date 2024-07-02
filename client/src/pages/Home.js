import React from 'react';
import LatestProducts from '../components/LatestProducts';
import Hero from '../components/Hero.js';



const Home = () => {
  //get new products
  return(
    <section>
      <Hero />
      <LatestProducts />
    </section>  
  );
};

export default Home;
