import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
import api from "./services/api";

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey:
        "BJk7OpPVqRIVBjt8H-K7s4w0wFbu_MqdVbZMvRPHGbNPgxWokxZ5mYgWKfGw59OhNP5RgOl_N9K3selNvJ9AVcM1",
    });

    if (token) {
      console.log("FCM Token:", token);

      // Save token to your backend
      await api.post("/notifications/save-token", {
        fcmToken: token,
      });

      return token;
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};