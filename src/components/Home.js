import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import headerBg from '../img/header-bg.jpg';
import Product from './Product';
import FullscreenImg from './FullscreenImg';
import { useStateValue } from './StateProvider';
import { db } from '../firebase';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import { Link } from 'react-router-dom';


function Home() {
  // eslint-disable-next-line no-unused-vars
  const [{ user, keyword }, dispatch] = useStateValue();
  const [products, setProducts] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loaderIcon, setLoaderIcon] = useState(
    <Loader
      type="ThreeDots"
      color="black"
      height={80}
      width={80}
    />
  );

  const [headerImgMargin, setHeaderImgMargin] = useState({
    marginBottom: '-30%',
  });

  const getProductsFromDb = async () => {
    const snapshot = await db.collection('products').get();
    return snapshot.docs.map((doc) => doc.data());
  };

  useEffect(() => {
    const getProducts = async () => {
      setProducts(await getProductsFromDb());
      setDefaultProducts(await getProductsFromDb());
    };
    getProducts();

  }, []);

  useEffect(() => {
    if (!keyword) {
      setProducts(defaultProducts);
      return;
    }
    setProducts(
      defaultProducts.filter((product) => product.name.includes(keyword))
    );
  }, [keyword, defaultProducts]);

  useEffect(() => {
    if (products.length === 0) {
      setHeaderImgMargin({ marginBottom: 0 });
      return;
    }
    setHeaderImgMargin({ marginBottom: '-30%' });
  }, [products]);

  // if (products.length === 0) {
  //
  // } else {
  //
  // }

  // if (!keyword) {
  //   setProducts(defaultProducts.filter(product => product.name !== keyword))
  // }

  return (
    <div className="home">
      <FullscreenImg />
      <Link to={user ? '/checkout' : '/login'}>
        <NotificationContainer />
      </Link>
      <div className="home__container">
        <img
          src={headerBg}
          alt=""
          className="home__headerImg"
          style={headerImgMargin}
        />
        <div className="home__row">
            {products.length > 0 ? (
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
            ))
          ) : (
            <div className="home__loaderIconContainer">{loaderIcon}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
