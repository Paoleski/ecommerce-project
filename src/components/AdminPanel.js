import React, { useState } from 'react';
import { db, functions, storage } from '../firebase';
import '../styles/adminPanel.css';
import { useStateValue } from './StateProvider';
import { firestoreIdGenerator } from '../utils/firestoreIdGenerator';

function AdminPanel() {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [productHeight, setProductHeight] = useState('');
  const [productLength, setProductLength] = useState('');
  const [productWidth, setProductWidth] = useState('');
  const [productImages, setProductsImages] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImagesUrl, setProductImagesUrl] = useState([]);

  const [products, setProducts] = useState([]);
  const [toDeleteId, setToDeleteId] = useState('')
  const [orders, setOrders] = useState('')

  const handleProductSubmit = (e) => {
    e.preventDefault();
    console.log('begin + 30s');
    const id = firestoreIdGenerator();
      console.log(productImagesUrl);
      db.collection('products').doc(id).set({
        id: id,
        name: productName,
        price: productPrice,
        description: productDescription,
        imagesUrl: productImagesUrl,
        weight: productWeight,
        width:productWidth,
        height: productHeight,
        length: productLength,
        stock: productStock,
      });
      console.log('ending');
  };

  // eslint-disable-next-line no-unused-vars
//   const addAdmin = () => {
//     console.log('user is >>>', user)
//     const addAdminRole = functions.httpsCallable('addAdminRole');
//     addAdminRole({ email: user.email }).then((result) => {
//       console.log(result);
//       console.log(user)
//     });
//   };


  const handleImageChange = (e) => {
    if (e.target.files) {
      setProductsImages(e.target.files);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const productImagesArray = [...productImages];
    productImagesArray.forEach((image) => {
      const uploadTask = storage
        .ref(`images/${productName}/${image.name}`)
        .put(image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          setProductImagesUrl((prev) => [
            ...prev,
            { ref: `images/${productName}`, name: image.name },
          ]);
          console.log("finishing");
        }
      );
    });
    console.log('finished')
  };

  const getProductsListFromDb = async () => {
    const snapshot = await db.collection('products').get();
    return snapshot.docs.map((doc) => doc.data());
  };

  const handleProductsList = async () => {
    setProducts(await getProductsListFromDb());
  };

  const deleteProduct = (e) => {
      e.preventDefault()
      console.log(toDeleteId)
      if (toDeleteId) {
        db.collection('products').doc(toDeleteId).delete().then(f => {
            setProducts(prev => prev.filter(item => item.id !== toDeleteId))
            console.log('Document succesfully deleted')
        }).catch(err => {
            console.log(err)
        })
      }
  }

  const getAllOrders = async () => {
    const snapshot = await db.collection('orders').get();
    console.log(snapshot.docs.map((doc) => doc.data()))
    setOrders(snapshot.docs.map((doc) => doc.data()));
  }

  console.log(orders);

  return (
    <div className="adminPanel">
      {user && user.admin && (
        <div className="adminPanel__container">
          <div className="adminPanel__addproducts">
            <h3>Add a Product</h3>
            <form onSubmit={handleProductSubmit}>
              <label>name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <label>Price </label>
              <input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />

              <label>Description</label>
              <input
                type="text"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
              <label>Weight (in kg)</label>
              <input
                type="number"
                value={productWeight}
                onChange={(e) => setProductWeight(e.target.value)}
              />
              <label>Width (in cm)</label>
              <input
                type="number"
                value={productWidth}
                onChange={(e) => setProductWidth(e.target.value)}
              />
              <label>Height (in cm)</label>
              <input
                type="number"
                value={productHeight}
                onChange={(e) => setProductHeight(e.target.value)}
              />
              <label>Length (in cm)</label>
              <input
                type="number"
                value={productLength}
                onChange={(e) => setProductLength(e.target.value)}
              />
              <label>Stock</label>
              <input
                type="number"
                value={productStock}
                onChange={(e) => setProductStock(e.target.value)}
              />
              <label>Images</label>
              <input type="file" onChange={handleImageChange} multiple />
              <button onClick={handleUpload}>
                click to upload pictures before submiting
              </button>

              <button type="submit">CLICK TO SUBMIT</button>
            </form>
          </div>

          <div className="adminPanel__removeProducts">
            <button onClick={handleProductsList}>
              click to get products list
            </button>
            <div className="adminPanel__removeProducts__productList">
              {products &&
                products.map((product) => {
                  return (
                    <p key={product.id}>
                      name:{product.name} id:{product.id}
                    </p>
                  );
                })}
                {products && 
                  <form onSubmit={deleteProduct}>
                    <label>Paste the ID of the product you want to delete</label>
                    <input type="text" onChange={(e) => setToDeleteId(e.target.value)}></input>
                    <button type="submit">click to delete</button>
                  </form>
                }
            </div>
          </div>
          <div className="adminPanel__getOrders">
              <button onClick={getAllOrders}>click to get all orders</button>
              
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
