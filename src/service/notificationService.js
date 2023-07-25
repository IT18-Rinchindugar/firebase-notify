import notificationProvider from '../lib/notificationProviderFirebase.js';

function sendMultiCastPushNotification(tokens, msg) {
  const BULK_SIZE = 500;
  const invocationNumber = tokens.length / BULK_SIZE;
  const promises = [];
  for (let i = 0; i < invocationNumber && tokens.length > 0; i += 1) {
    const start = i * BULK_SIZE;
    const end = i === invocationNumber ? tokens.length - 1 : (start + BULK_SIZE);
    promises.push(notificationProvider.sendMultiplePushNotification(tokens.slice(start, end), msg));
  }
  return Promise.all(promises);
}

export default {
  sendMultiCastPushNotification,
};
