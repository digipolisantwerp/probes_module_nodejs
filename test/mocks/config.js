function customReadyCheckResolve() {
  const ready = true;

  return new Promise((resolve, reject) => {
    if (!ready) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ status: 400, message: 'Uh oh! This app is not ready.' });
    }

    resolve();
  });
}

function customReadyCheckReject() {
  const ready = false;

  return new Promise((resolve, reject) => {
    if (!ready) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ status: 400, message: 'Uh oh! This app is not ready.' });
    }

    resolve();
  });
}

export const configResolve = {
  hooks: {
    ready: [
      customReadyCheckResolve,
    ],
    alive: [
      customReadyCheckResolve,
    ],
  },
};

export const configReject = {
  hooks: {
    ready: [
      customReadyCheckReject,
    ],
    alive: [
      customReadyCheckReject,
    ],
  },
};
