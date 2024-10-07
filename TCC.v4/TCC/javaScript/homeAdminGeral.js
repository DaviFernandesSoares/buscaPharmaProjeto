const userOnline = true; 

const statusIndicator = document.getElementById('status-indicator');
if (userOnline) {
    statusIndicator.classList.remove('offline');
    statusIndicator.classList.add('online');
} else {
    statusIndicator.classList.remove('online');
    statusIndicator.classList.add('offline');
}
