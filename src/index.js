import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import notificationService from './service/notificationService.js';

const app = express();

app.use(cors('*'))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello Server..');
});

app.post('/notification/webhook', (req, res) => {
  const { title, text, appDeviceId } = req.body;
  const msg = {
    notification: { title, body: text },
    data: {},
  };
  notificationService.sendMultiCastPushNotification([appDeviceId], msg)
  res.status(200).json({
    success: true
  });
});

app.listen(8000, () => {
  console.log('App listening on port 8000');
});
