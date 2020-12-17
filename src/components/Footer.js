import React from 'react';
import '../styles/footer.css';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';

function Footer() {

  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__right">
          <p>agoefilo@gmail.com </p>
        </div>
        <div className="footer__mid">
          <button onClick={() => window.scrollTo(0, 0)} style={{cursor:'pointer', textDecoration:'none'}}>Back to top</button>
        </div>
        <div className="footer__left">
          <WhatsAppIcon style={{ height: 30, width: 30 }} />
          <InstagramIcon style={{ height: 30, width: 30 }} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
