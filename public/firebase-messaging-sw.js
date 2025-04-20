// service-worker.js

// Import necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging/sw';

// Your web app's Firebase configuration
const firebaseConfig = {
  // ... your firebase config ...
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get the Messaging object
const messaging = getMessaging(app);

// Get registration token.
getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' }).then((currentToken) => {
  if (currentToken) {
    console.log('FCM registration token:', currentToken);
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
    // Show permission UI.
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

// Handle incoming messages.
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
    // ... other options ...
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Listen for the 'push' event
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');
  const data = event.data.json();
  const title = data.notification.title;
  const options = {
    body: data.notification.body,
    icon: data.notification.image,
    badge: '/badge-icon.png',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Listen for the 'notificationclick' event
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click Received.');
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});