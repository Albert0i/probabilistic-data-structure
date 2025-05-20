function updateStats() {
    fetch('/api/v1/users/stats')
        .then(res => res.json())
        .then(data => {
            document.getElementById('userCount').innerText = data.totalUsers;
        });
}

setInterval(updateStats, 1000);