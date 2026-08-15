const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

let app;
let db = null;

try {
  const serviceAccount = require('../../serviceAccountKey.json');
  app = initializeApp({
    credential: cert(serviceAccount)
  });
  console.log('Firebase Admin initialized successfully.');
  db = getFirestore();
} catch (error) {
  console.error('Exact error loading service account:', error);
  console.warn('Warning: serviceAccountKey.json not found or invalid. Firebase Admin SDK not initialized.');
  console.warn('Ensure you have placed the serviceAccountKey.json file in the root directory.');
}

module.exports = { app, db };
