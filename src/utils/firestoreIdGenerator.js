import {randomBytes} from 'crypto';

export function firestoreIdGenerator() {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let autoId = '';
  while (autoId.length < 20) {
    const bytes = randomBytes(40);
    // eslint-disable-next-line no-loop-func
    bytes.forEach(b => {
      const maxValue = 62 * 4 - 1;
      if (autoId.length < 20 && b <= maxValue) {
        autoId += chars.charAt(b % 62);
      }
    });
  }
  return autoId;
}