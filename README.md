# ml-kendo

## Requirements

- MarkLogic Server 10
- Node.js 16 and npm 8

## Setup

1. Copy `config_sample.js` and save as `config.js` in project root.

2. Edit `config.js` for your environment. At a minimum, edit `config.auth` for your MarkLogic Server.

3. In a new terminal, install the project dependencies from the project root using npm:
```
cd ml-kendo
npm install
```
This will install dependencies for the setup script, proxy server, and React UI. You can also install dependencies separately by running `npm install` from each subdirectory.

4. From the project root, run the setup script:
```
node setup
```
This will set up your MarkLogic Server (create databases, a REST server, a user, etc.) and load the application documents. 

After setup, you can view your MarkLogic Server configuration in the Admin UI (http://localhost:8001) and the loaded documents in Query Console (http://localhost:8000/qconsole).

## Run the middle tier 

1. From the project root, run the proxy server, which is the middle tier between the UI and the MarkLogic Server:
```
node server
```

## Run the UI 

1. In a new terminal, run the development UI server from the ui directory:
```
cd ml-kendo/ui
npm start
```

2. Open the UI in your browser: http://localhost:3000
