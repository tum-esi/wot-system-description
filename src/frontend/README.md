# WOT Mashups Frontend

This package represents a small frontend for using the backend (`server.ts`) of [WOT Mashups](https://github.com/tum-esi/wot-system-description) (the backend, essentially, just wraps the WOT Mashups CLI tool).
The frontend is made using [Bootstrap](https://getbootstrap.com/) for layout, [Monaco Editor](https://github.com/microsoft/monaco-editor) for interactive editor fields and plain JavaScript for other simple interactions. It uses Fetch API for communicating with the backend.

The frontend consists of one page (`index.html`).
It can be used in 2 directions - (1) to generate Sequence Diagram and Thing Descriptions from System Description and (2) to generate System Description from Sequence Diagram and Thing Descriptions.
Code is always generated.
