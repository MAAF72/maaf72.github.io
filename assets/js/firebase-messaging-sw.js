importScripts("https://www.gstatic.com/firebasejs/8.7.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.7.0/firebase-messaging.js")
importScripts("./firebase-init.js")

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload)
})