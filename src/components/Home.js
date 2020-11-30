import React from 'react';
import '../styles/home.css';
import bolsa1 from '../img/01-full.jpg';
import bolsa2 from '../img/02-full.jpg'
import Product from './Product';

function Home() {

  const generateId = () => {
    Number((Math.random() * 1000000).toFixed(0));
  }

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__row">
          <Product
            id={generateId()}
            title="the bolsa vermelha"
            price={150}
            image={bolsa1}
            rating={4}
          />
          <Product
            id={generateId()}
            title="the bolsa sem cor"
            price={200}
            image={bolsa2}
            rating={5}
          />
        </div>
        <div className="home__row">
          <Product 
           id={generateId()}
           title="the bolsa sem cor"
           price={200}
           image={bolsa2}
           rating={5}
           />
          <Product 
            id={generateId()}
            title="the bolsa vermelha"
            price={150}
            image={bolsa1}
            rating={4}
          />
          <Product 
           id={generateId()}
           title="the bolsa sem cor"
           price={200}
           image={bolsa2}
           rating={5}
           />
        </div>
        <div className="home__row">
          <Product 
            id={generateId()}
            title="the bolsa vermelha"
            price={150}
            image={bolsa1}
            rating={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
