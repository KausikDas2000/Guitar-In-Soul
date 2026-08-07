importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBef6wrUkSt1e76s8u7vsrqjXpHyjaYuYM",
  authDomain: "guitar-in-soul.firebaseapp.com",
  projectId: "guitar-in-soul",
  storageBucket: "guitar-in-soul.firebasestorage.app",
  messagingSenderId: "69388274348",
  appId: "1:69388274348:web:fc78ed50202c0d9339ad09",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background Notification:", payload);

  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/logo192.png", // change to your logo if you have one
      badge: "/logo192.png",
    }
  );
});

self.addEventListener("push", (event) => {
  console.log("Push event received:", event);

  event.waitUntil(
    self.registration.showNotification("Push Test", {
      body: "This notification came from the push event.",
      icon: "/logo192.png",
    })
  );
});