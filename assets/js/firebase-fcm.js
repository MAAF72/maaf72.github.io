const messaging = firebase.messaging()
console.log(messaging)
messaging.onMessage((payload) => {
    console.log('Message received. ', payload)
})

Notification
    .requestPermission()
    .then((permission) => {
        if (permission == 'granted') {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker
                    .register('./assets/js/firebase-messaging-sw.js')
                    .then((registration) => {
                        console.log('Registration successful, scope is:', registration.scope)
                        messaging.getToken({
                            serviceWorkerRegistration: registration,
                            vapidKey: 'BFbaYQoFiKxCJuEt3GVMIUjthc3Kb7yfrOBOc2izhDDF5h0L_RAdihFJKwSQmAgStWkgvX1dgxelOl-RJhsGJUM'
                        }).then((currentToken) => {
                            if (currentToken) {
                                console.log('Notification permission granted.')
                                console.log('Device token is : ' + currentToken)

                                if ($('#fcm-token').length) {
                                    $('#fcm-token').text(currentToken)
                                }
                            } else {
                                console.log('Please request new permission.')
                            }
                        })
                    })
            } else {
                console.log('serviceWorker not found in navigator')
            }
        } else {
            console.log('Notification permission denied. ' + permission)
        }
    })
    .catch(function (err) {
        console.log('Unable to get permission to notify.', err)
    })