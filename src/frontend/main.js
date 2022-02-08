const BACKEND_URL = 'http://127.0.0.1:3000';
const PUML_SERVER_URL = 'http://127.0.0.1:8080';

const processSD = document.getElementById('process-sd');
processSD.addEventListener('click', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('sd', window.sdEditor.getValue());
    const response = await fetch(`${BACKEND_URL}/generate`, {
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
        window.pumlEditor.setValue(puml);

        document.querySelector('#puml-rendered div').innerHTML =
            `<img src="${PUML_SERVER_URL}/plantuml/png/${window.plantumlEncoder.encode(puml)}">`;

        path = data['tds'];
        response = await fetch(path, {
            method: 'GET'
        });
        window.tdsEditor.setValue(JSON.stringify(JSON.parse(await response.text()), null, 4));

        path = data['code']['js'];
        response = await fetch(path, {
            method: 'GET'
        });
        window.jsEditor.setValue(await response.text());

        path = data['code']['ts'];
        response = await fetch(path, {
            method: 'GET'
        });
        window.tsEditor.setValue(await response.text());

        path = data['code']['tsconfig'];
        response = await fetch(path, {
            method: 'GET'
        });
        window.tsconfigEditor.setValue(await response.text());
    }
});
