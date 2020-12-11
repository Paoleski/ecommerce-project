import React from 'react';
import '../styles/fullscreenImg.css';
import { useStateValue } from './StateProvider';

function FullscreenImg() {
  const [{image, fullscreen}, dispatch] = useStateValue()
  
  const closeFullScreen = () => {
    dispatch({
        type:'SET_FULLSCREEN',
        image:null,
        fullscreen:false,
    })
  }

  const divStyle = {
    visibility:fullscreen ? 'visible' : 'hidden',
    position:'fixed',
    top:0,
    right:0,
    left:0,
    bottom:0,
    zIndex:5000,
    backgroundColor:'rgba(0,0,0, .7)',
    height:'100vh !important',
    width:'100vw !important',
    overflow:'hidden'
  }

  return (
    <div style={divStyle} onClick={closeFullScreen} className="fullscreenImg">
      <div className="fullscreenImg__container">
        {image && <img className="fullscreenImg__img" src={image} alt=""/>}
       </div>
    </div>
  );
}


export default FullscreenImg;
