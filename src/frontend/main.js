const API_URL = 'http://127.0.0.1:3000';

const processSD = document.getElementById('process-sd');
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
        document.querySelector('#puml-text textarea').value = await response.text();

        path = data['code']['js'];
        response = await fetch(path, {
            method: 'GET'
        });
        document.querySelector('#js-code textarea').value = await response.text();
    }
});
