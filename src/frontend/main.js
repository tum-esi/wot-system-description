// Address of the backend (server.ts) that wraps the CLI tool
const BACKEND_URL = 'http://127.0.0.1:3000';
// Address of the plantUML backend server that generates diagrams
const PUML_SERVER_URL = 'http://127.0.0.1:8080';

// System Description -> Sequence Diagram generation
const processSD = document.getElementById('process-sd');
processSD.addEventListener('click', async (e) => {
    e.preventDefault();
    const $pumlRendered = document.querySelector('#puml-rendered div');
    $pumlRendered.innerHTML = '';
    window.pumlEditor.setValue('');
    window.tdsEditor.setValue('');
    window.jsEditor.setValue('');
    window.tsEditor.setValue('');
    window.tsconfigEditor.setValue('');
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

        $pumlRendered.innerHTML =
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
    } else {
        alert(data['error'] || 'An error occurred. Make sure you have valid data and try again.')
    }
});

// Sequence Diagram -> System Description generation
const processPuml = document.getElementById('process-puml');
processPuml.addEventListener('click', async (e) => {
    e.preventDefault();
    const puml = window.pumlEditor.getValue();
    const $pumlRendered = document.querySelector('#puml-rendered div');
    $pumlRendered.innerHTML = '';
    window.sdEditor.setValue('');
    window.jsEditor.setValue('');
    window.tsEditor.setValue('');
    window.tsconfigEditor.setValue('');
    const formData = new FormData();
    formData.append('puml', puml);
    formData.append('tds', window.tdsEditor.getValue());
    const response = await fetch(`${BACKEND_URL}/generate`, {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    if (data['success']) {
        $pumlRendered.innerHTML =
            `<img src="${PUML_SERVER_URL}/plantuml/png/${window.plantumlEncoder.encode(puml)}">`;

        let path = data['sd'];
        let response = await fetch(path, {
            method: 'GET'
        });

        const sd = await response.text();
        window.sdEditor.setValue(sd);

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
    } else {
        alert(data['error'] || 'An error occurred. Make sure you have valid data and try again.')
    }
});
