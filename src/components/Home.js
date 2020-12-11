import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import headerBg from '../img/header-bg.jpg';
import Product from './Product';
import FullscreenImg from './FullscreenImg';
import { useStateValue } from './StateProvider';
import { db } from '../firebase';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

function Home() {
  // eslint-disable-next-line no-unused-vars
  const [{ user, keyword }, dispatch] = useStateValue();
  const [products, setProducts] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);
  const [loaderIcon, setLoaderIcon] = useState(
    <Loader
      type="ThreeDots"
      color="#ff914d"
      height={60}
      width={60}
      style={{ marginTop: '200px' }}
    />
  );
  const [headerMargin, setHeaderMargin] = useState({ marginBottom: '-30%' });

  const getProductsFromDb = async () => {
    const snapshot = await db.collection('products').get();
    return snapshot.docs.map((doc) => doc.data());
  };

  useEffect(() => {
    console.log('woki');
    const getProducts = async () => {
      setProducts(await getProductsFromDb());
      setDefaultProducts(await getProductsFromDb());
    };
    getProducts();
    setLoaderIcon('');
  }, []);

  useEffect(() => {
    if (keyword) {
      setProducts(
        defaultProducts.filter((product) =>
          product.name.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      if (products.length === 0) {
        setHeaderMargin({ marginBottom: '0px' });
      } else {
        setHeaderMargin({ marginBottom: '-30%' });
      }
    }
  }, [keyword]);

  // if (!keyword) {
  //   setProducts(defaultProducts.filter(product => product.name !== keyword))
  // }

  return (
    <div className="home">
      {!loaderIcon ? (
        <>
          <FullscreenImg />
          <div className="home__container">
            <img
              src={headerBg}
              alt=""
              className="home__headerImg"
              style={headerMargin}
            />
            <div className="home__row">
              {products &&
                products.map((product, index) => (
                  <Product
                    key={index}
                    id={product.id}
                    title={product.name}
                    price={Number(product.price)}
                    image={product.imagesUrl}
                    weight={product.weight}
                    height={product.height}
                    width={product.width}
                    length={product.length}
                    description={product.description}
                    rating={5}
                  />
                ))}
            </div>
          </div>
        </>
      ) : (
        loaderIcon
      )}
    </div>
  );
}

export default Home;
