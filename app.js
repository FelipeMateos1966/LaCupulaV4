
// Service Worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

const permissionContainer = document.getElementById('permission-container');
const micPermissionBtn = document.getElementById('mic-permission-btn');
const appFrame = document.getElementById('app-frame');
const appUrl = 'https://la-c-pula-7621540317.us-west1.run.app';

micPermissionBtn.addEventListener('click', () => {
    // Request microphone permission
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(stream => {
            console.log('Microphone access granted.');
            // Stop the tracks immediately as we only needed the permission
            stream.getTracks().forEach(track => track.stop());
            loadApp();
        })
        .catch(err => {
            console.error('Microphone access denied.', err);
            permissionContainer.innerHTML = '<p>El acceso al micrófono fue denegado. La aplicación no puede funcionar. Por favor, habilite el permiso en la configuración de su navegador y recargue la página.</p>';
        });
});

function loadApp() {
    permissionContainer.style.display = 'none';
    appFrame.src = appUrl;
    appFrame.style.display = 'block';
}

// Check for existing permission
navigator.permissions.query({ name: 'microphone' }).then(permissionStatus => {
    if (permissionStatus.state === 'granted') {
        loadApp();
    }
    permissionStatus.onchange = () => {
        if (permissionStatus.state === 'granted') {
            loadApp();
        }
    };
});
