document.getElementById('requestForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const userName = document.getElementById('userName').value;
    const email = document.getElementById('email').value;
    const description = document.getElementById('description').value;

    fetch('http://localhost:5000/submit_request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, email, description })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        window.location.href = 'dashboard.html';
    })
    .catch(error => console.error('Error:', error));
});

window.onload = function () {
    fetch('http://localhost:5000/requests')
    .then(response => response.json())
    .then(requests => {
        const tableBody = document.getElementById('requestsTable');
        requests.forEach(request => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${request.id}</td><td>${request.status}</td><td>${request.description}</td>`;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error:', error));
};
