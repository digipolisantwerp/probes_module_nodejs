# Digipolis Probes

This package includes a livenessprobe and a readinessprobe.

- A livenessprobe checks if the app is still active. If it's not, the pod/container will be restarterd.
- A readinessprobe checks if the app is ready to process requests.
  If the readinessprobe fails, no requests will be sent to this pod/container.

This package exposes two endpoints:
- **/status/alive** for the livenessprobe.
- **/status/ready** for the readinessprobe.

After including this package in your project you'll need to configure it in [appconfig](https://appconfig.antwerpen.be).
Here is [a small how-to](https://bitbucket.antwerpen.be/projects/PLAT/repos/documentation/browse/Docker.md#probes).

## Installation

  `npm i @digipolis/probes`

  ### Configuration
  This package will work without any configuration but it is best practice to add some.
  
  | Param                     | Description                      |
  | ------------------------- | -------------------------------- |
  | **alive** (optional)      | Array with alive check functions |
  | **ready** (optional)      | Array with ready check functions |

  #### Example

```js
const probes = require('@digipolis/probes');

function customReadyCheck() {
  const ready = true;

  return new Promise((resolve, reject) => {
    if(!ready) {
      return reject({status: 400, message: 'Uh oh! This app is not ready.'});
    }

    return resolve();
  })
}

const config = {
  hooks: {
    ready: [
      customReadyCheck
    ]
  }
};

app.use(probes(config));

```

  ### Error object
  When there's an error (app is not alive/ready) you'll reject with an object.

  | Key                       | Value                            |
  | ------------------------- | -------------------------------- |
  | **status** (number)       | The [status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) you want to respond with. Should not be `200`. |
  | **message** (string       | A human readable message that will appear in the logs and your browser  |

  If you omit a status a 500 will be used.


  #### Example
  ```js
    return reject({status: 400, message: 'Uh oh! This app is not ready.'});
  ```

  If your app is in good shape and ready to handle traffic you resolve the promise.
  `return resolve();`

## Tests
run `npm t`

## Authors
See [the list](https://github.com/digipolisantwerp/probes_module_nodejs/graphs/contributors) of contributors who participated in this project.
