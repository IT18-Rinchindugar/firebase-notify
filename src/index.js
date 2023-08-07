import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';
import notificationService from './service/notificationService.js';

dotenv.config();
const app = express();

app.use(cors('*'))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello Server..');
});

app.post('/notification/webhook',
  body('appDeviceId').notEmpty(),
  body('title').notEmpty(),
  body('text').notEmpty(),
  (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      const { title, text, appDeviceId, link } = req.body;
      const msg = {
        notification: { title, body: text },
        data: {
          link: link || 'cardoctor://',
          click_action: 'cardoctor://'
        },
      };
      notificationService.sendMultiCastPushNotification([appDeviceId], msg)
      return res.status(200).json({
        success: true
      });
    }
    res.status(400).json({ errors: result.array() });
  });

app.listen(process.env.PORT || 5000, () => {
  console.log(`App listening on port ${process.env.PORT || 5000}`);
});

