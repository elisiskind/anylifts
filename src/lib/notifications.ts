export const RequestNotificationsPermissions = () => {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  } else {
    Notification.requestPermission();
  }
};

const audio = new Audio("/ding.mp3");

export const SendAlert = (title: string, body: string) => {
  if (document.hidden) {
    navigator.serviceWorker.ready.then(function (serviceWorker) {
      serviceWorker.showNotification(title, {
        body: body,
        vibrate: [100, 100, 100],
      });
    });
  } else {
    audio.play();
  }
};
