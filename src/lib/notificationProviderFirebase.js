import firebase from 'firebase-admin';

const keyFilename = {
  "type": "service_account",
  "project_id": "cardocter-6325f",
  "private_key_id": "6eea9056aa6b8eea9ace5410230e2de367e3eb7f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDKJUWhiiiKVcpJ\nhh1Y3G0+MNOyWT/bpxuVwaRKSWpGoT1HzUUmMIF9NALYTvqQh2+B4lTQoE+m+JJs\n8hs/y9uxl0NbsSElzvZrOKw2QcjjECZpjBjC+i+yeNt4WZHi/VpMef5aPdAOrtBH\nQK8QpcXiHVo2SaBL4Arf3d67ThxIVRSMexOOigw0rGKCbt8fST7wgMJwLO0MnjKs\nXhGsYU3np/97dtMS0EjtCTWHd48gSUXAro0awVLAi8v9qP19YEfpmwjvV0WyYlJr\nJIW/8We/OwRoEoA3X2wmP8/+jBBqJVvuJSMEZWLlCOxipJ6QYgtpC8+rZPhKw6q1\n3wTTHNavAgMBAAECggEANHVyugbAGZJE8kqnMAnYIcULEyQdMdQOkREVISAnP9gV\nLp6DHPOGjybhvB/W343+Lo89YnzP3u1wFmzIDIjLZS1zkgaIKycoBNBKxLPSvbZR\nuZ9dR7Akk6TQk81u0iDcf69DBkk3RrAwJeWP6PqUPWdPo3n86uPj/o+1/xa4uT5A\nz7egymxanpTb20dj5ZFHDYDIcjjV8GJUB+5ZPEvVtMN6soiLpZLDvHLYTIkKOc+V\nX2xkZd0LGPR2wjnigrYUqAhEU+bJUvfffpYcirtIAVRgP0uvRvHYK/BP7eKwKZsz\n7Tc1nLKKvN0BDXRtoNW1wAamsX4k+tyEc79e1PVTbQKBgQDyF8NWskSXjFQJmhIm\nkJSW0N/Dx1VSDjj0qYPqurlbewzz54hi+GY6dq2bjWShCiojREd1NYHxKCU4Cjhd\nYOkCLJjCVuTRD3DQJf3AB9Eeie5Xz687xvzo5a8cFusoS+9MaUu2Sn2xjqbYf4eO\n3GFrn9QuxBaicgL7LMG3a4JAEwKBgQDVwgqs1ixJrVPkjV43SjkhEjZbvBEvZb1f\nwRVdamdSBOiKvvwI6y6O3opP7AKWQlkJplWHtt17gAmuH7LfwgYDpmbTkltVAg4f\nphnZHcigQsXjZc5RPxg4jS5cfml58Gq8OKz6a9tvBsaoWuBifmOVXcipGOfHF3mk\nZojk6FH6dQKBgQCfeR3ZJ1ddyTe2l4JrWwQ2kONGETHX+rx0FpJqdpQRee5fYN6L\n63tT+ceE11A5cPuu/ZRg1l2BoWNbFghpIqR7JSt/oUPbn2M+CjisXbnYdx3FRG73\nXq5NMLf4NfS0N8kruZUBQPKpmwG3TdLbPbsC7WcVY2BRo+7ozGPTUoObdwKBgQDC\nE8a7fE2Dq4KC/bOwQYyzMST3jz6PKTGSse1i/ovGlTxJVPPiaR3Bi95KiD8lDCJp\nN4NqkCZxziN72739mNz7DWdI6xZPjWkjZR0M2xTgJSAkwbdcXwvvtIeGZSQBGb7f\nHBo52BnIqX9PNguKgbSK1jatCTbPtcm08X+TTje4TQKBgFo41ID/85Xp8Dl+Yo++\nj9TWEWWRiDfqJ/JmFZV+hQszMgp/59BZylmPxWdRkoeydQMx+75Lh0TCu0pD6Ypt\nHaXtJVt5IiqQu/5QhquZDSssyKA/W+fTwiquCugE5PcLh90fGX3u2NqWSzaOHwUT\ne4+GnBd0OZfEJFUd+VCbWXCv\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-sgz1o@cardocter-6325f.iam.gserviceaccount.com",
  "client_id": "109125592468551229672",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sgz1o%40cardocter-6325f.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

firebase.initializeApp({
  credential: firebase.credential.cert(keyFilename),
});

async function sendMultiplePushNotification(tokens, message) {
  try {
    const resp = await firebase.messaging().sendMulticast({ ...message, tokens });
    if (resp.failureCount > 0) {
      const failedTokens = [];
      resp.responses.forEach((res, idx) => {
        if (!res.success) {
          failedTokens.push(tokens[idx]);
        }
      });
      console.error(`List of tokens that caused failures: ${failedTokens}`);
    }
    console.info('Number of successfully sent messages: %s', resp.successCount);
  } catch (err) {
    console.error('Failed to send the message: %s', err);
  }
}

export default {
  sendMultiplePushNotification,
}