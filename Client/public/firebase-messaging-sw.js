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


/*
  Background notification
*/
messaging.onBackgroundMessage((payload) => {

  console.log("Background Notification:", payload);


  const notificationTitle = payload.notification?.title || "Guitar In Soul";

  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/favicon.png",
    badge: "./favicon.png",

    // IMPORTANT
    data: {
      url: payload.data?.url || "https://guitar-in-soul.vercel.app"
    }
  };


  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );

});



/*
  Notification click redirect
*/
self.addEventListener("notificationclick", (event) => {

  console.log("Notification clicked:", event.notification);

  event.notification.close();


  const url =
    event.notification.data?.url ||
    "https://guitar-in-soul.vercel.app";


  event.waitUntil(

    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    })

    .then((clientList) => {

      for (const client of clientList) {

        if (client.url.includes("guitar-in-soul")) {

          client.navigate(url);
          return client.focus();

        }

      }


      return clients.openWindow(url);

    })

  );

});



/*
  Remove this while testing.
  It creates duplicate notifications.
*/

// self.addEventListener("push", (event) => {
//   event.waitUntil(
//     self.registration.showNotification("Push Test", {
//       body: "This notification came from the push event.",
//       icon: "/logo192.png",
//     })
//   );
// });