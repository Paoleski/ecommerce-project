import {
  NotificationManager
} from 'react-notifications';
// import 'react-notifications/lib/notifications.css';
import '../styles/notification.css'

const createNotification = (type, productName) => { 
    switch (type) {
        case 'info':
          NotificationManager.info(`${productName} was successfully added to the basket`, 'Success', 4000 );
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning(
            'Warning message',
            'Close after 3000ms',
            3000
          );
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
        default:
          return;
      }
}


export { createNotification };
