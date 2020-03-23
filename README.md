# Digipolis Probes

This package includes a livenessprobe and a readinessprobe.

- A livenessprobe checks if the app is still active. If it's not, the pod/container will be restarterd.
- A readinessprobe checks if the app is ready to process requests.
  If the readinessprobe fails, no requests will be sent to this pod/container.

This package exposes two endpoints:
- **/status/alive** for the livenessprobe.
- **/status/ready** for the readinessprobe.

## Installation

  `npm i @digipolis/probes`

  ### Configuration

  This package will work without any configuration but it is best practice to add some.
  
  | Param                     | Description                      |
  | ------------------------- | -------------------------------- |
  | **aliveHooks** (optional) | Array with alive check functions |
  | **readyHooks** (optional) | Array with ready check functions |
  
  #### Example
  
  ```js
const probes = require('@digipolis/probes');

function runReadyCheck(req, res, next) {
  const appIsReady = false;

  if (appIsReady) {
    return next();
  }

  const err = new Error("Uh oh! This app is not ready.");
  err.statusCode = 500;

  return next(err);
}

const config = {
  hooks: {
    readyHooks: [
      runReadyCheck
    ]
  }
};

app.use(probes(app, config));

  ```

## Tests
Not yet implemented.

## Authors
See [the list](https://github.com/digipolisantwerp/probes_module_nodejs/graphs/contributors) of contributors who participated in this project.
