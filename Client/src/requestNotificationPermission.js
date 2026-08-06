import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
import API from "./services/api";

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("❌ Notification permission denied");
      return;
    }

    const fcmToken = await getToken(messaging, {
      vapidKey: "BJk7OpPVqRIVBjt8H-K7s4w0wFbu_MqdVbZMvRPHGbNPgxWokxZ5mYgWKfGw59OhNP5RgOl_N9K3selNvJ9AVcM",
    });

    if (!fcmToken) {
      console.log("❌ No FCM token received");
      return;
    }

    console.log("✅ FCM Token:", fcmToken);

    await API.post(
      "/notifications/save-token",
      {
        fcmToken,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("✅ Token saved to database");
    
  } catch (err) {
    console.error("FCM Error:", err);
  }
};