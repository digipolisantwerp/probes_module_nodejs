function customReadyCheckResolve() {
  const ready = true;

  return new Promise((resolve, reject) => {
    if (!ready) {
      return reject({ status: 400, message: 'Uh oh! This app is not ready.' });
    }

    return resolve();
  })
}

function customReadyCheckReject() {
  const ready = false;

  return new Promise((resolve, reject) => {
    if (!ready) {
      return reject({ status: 400, message: 'Uh oh! This app is not ready.' });
    }

    return resolve();
  })
}

export const configResolve = {
  hooks: {
    ready: [
      customReadyCheckResolve
    ],
    alive: [
      customReadyCheckResolve
    ]
  }
};

export const configReject = {
  hooks: {
    ready: [
      customReadyCheckReject
    ],
    alive: [
      customReadyCheckReject
    ]
  }
};
