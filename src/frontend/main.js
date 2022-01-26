const API_URL = 'http://127.0.0.1:3000';

const processSD = document.getElementById('processSD');
processSD.addEventListener('click', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('sd', document.getElementById('sd').value);
    const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    if (data['success']) {
        let path = data['puml'];
        let response = await fetch(path, {
            method: 'GET'
        });
        document.getElementById('pumlText').value = await response.text();

        path = data['code']['js'];
        response = await fetch(path, {
            method: 'GET'
        });
        document.getElementById('code').value = await response.text();
    }
});