import React from 'react';
import '../styles/home.css';
import bolsa1 from '../img/01-full.jpg';
import Product from './Product';

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__row">
          <Product
            id="213314"
            title="the lean startup the lean startup the lean startup the lean startup the lean startup"
            price={30.99}
            image={bolsa1}
            rating={3}
          />
          <Product
            id="213314"
            title="the lean startup the lean startup the lean startup the lean startup the lean startup 
              the lean startup the lean startup the lean startup the lean startup the lean startup"
            price={30.99}
            image={bolsa1}
            rating={3}
          />
        </div>
        <div className="home__row">
          <Product />
          <Product />
          <Product />
        </div>
        <div className="home__row">
          <Product />
        </div>
      </div>
    </div>
  );
}

export default Home;
