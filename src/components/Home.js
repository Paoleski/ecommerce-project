import React from 'react';
import '../styles/home.css';
import bolsa1 from '../img/01-full.jpg';
import bolsa2 from '../img/02-full.jpg'
import headerBg from '../img/header-bg.jpg'
import Product from './Product';
import FullscreenImg from './FullscreenImg';

function Home() {

  const generateId = () => {
    Number((Math.random() * 1000000).toFixed(0));
  }
  const bolsas = [bolsa1, bolsa2]



  return (
    <div className="home">
      <FullscreenImg/>
      <div className="home__container">
        <img src={headerBg} alt="" className="home__headerImg"/>
        <div className="home__row">
          <Product
            id={1}
            title="the bolsa vermelha"
            price={150}
            image={bolsas}
            rating={4}
          />
          <Product
            id={2}
            title="the bolsa sem cor"
            price={200}
            image={bolsas}
            rating={5}
          />
        </div>
        <div className="home__row">
          <Product 
           id={generateId()}
           title="the bolsa sem cor"
           price={200}
           image={bolsas}
           rating={5}
           />
          <Product 
            id={generateId()}
            title="the bolsa vermelha"
            price={150}
            image={bolsas}
            rating={4}
          />
          <Product 
           id={generateId()}
           title="the bolsa sem cor"
           price={200}
           image={bolsas}
           rating={5}
           />
        </div>
        <div className="home__row">
          <Product 
            id={generateId()}
            title="the bolsa vermelha"
            price={150}
            image={bolsas}
            rating={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
