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

        const puml = await response.text();
        document.querySelector('#puml-text textarea').value = puml;

        document.querySelector('#puml-rendered div').innerHTML =
            `<img src="https://www.plantuml.com/plantuml/img/${window.plantumlEncoder.encode(puml)}">`;

        path = data['tds'];
        response = await fetch(path, {
            method: 'GET'
        });
        document.querySelector('#tds textarea').value =
            JSON.stringify(JSON.parse(await response.text()), null, 4);

        path = data['code']['js'];
        response = await fetch(path, {
            method: 'GET'
        });
        document.querySelector('#js-code textarea').value = await response.text();

        path = data['code']['ts'];
        response = await fetch(path, {
            method: 'GET'
        });
        document.querySelector('#ts-code textarea').value = await response.text();

        path = data['code']['tsconfig'];
        response = await fetch(path, {
            method: 'GET'
        });
        document.querySelector('#tsconfig textarea').value = await response.text();
    }
});
