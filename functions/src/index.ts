import * as functions from "firebase-functions";

import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.newSubscriberNotification =
functions.firestore
.document('detections/{detectionid}')
.onCreate(async event => {

  const data = event.data();

  const userId = data.userId;
  const worker = data.workerId;

  // notification content
  const payload = {
    notification: {
      title: 'New Detection',
      body: `${worker} is following your content`,
      icon: 'http://goo.gl/Fz9nrQ'
    }
  }

  const db =admin.firestore()
  const devicesRef = db.collection('devices').where('userId', '==', userId);

  // get user tokens and send notification
  const devices = await devicesRef.get();

  const tokens = []

  // loop over documents
  devices.forEach(result => {
    const token = result.data().token;

    tokens.push(token);
  })


  return admin.messaging().sendToDevice(tokens, payload);
})


