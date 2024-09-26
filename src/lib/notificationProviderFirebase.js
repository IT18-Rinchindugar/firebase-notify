import firebase from 'firebase-admin';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const keyFilePath = resolve(__dirname, '../../config/service_account_key.json');

const serviceAccount = JSON.parse(await import('fs').then(fs => fs.promises.readFile(keyFilePath, 'utf8')));

try {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });
  console.info('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

async function sendMultiplePushNotification(tokens, message) {
  try {
    const multicastMessage = {
      notification: message.notification,
      tokens: tokens,
    };
    console.info('Message:', message);
    const resp = await firebase.messaging().sendEachForMulticast(multicastMessage);

    if (resp.failureCount > 0) {
      const failedTokens = [];
      resp.responses.forEach((res, idx) => {
        if (!res.success) {
          failedTokens.push(tokens[idx]);
          console.error('Error message:', res.error);
        }
      });
      console.error(`List of tokens that caused failures: ${failedTokens}`);
    }
    console.info('Number of successfully sent messages: %s', resp.successCount);
  } catch (err) {
    console.error('Failed to send the message:', err);
  }
}

export default {
  sendMultiplePushNotification,
}
