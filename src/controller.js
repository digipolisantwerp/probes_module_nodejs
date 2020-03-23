import { runHooks } from './helpers';

export default function createController(config = {}) {
  const {
    hooks = {},
  } = config;

  let {
    readyHooks = [],
    aliveHooks = [],
  } = hooks;

  function runAliveChecks(req, res) {
    runHooks(aliveHooks, req, res, (err) => {
      const statusCode = err ? err.statusCode : 200;
      const message = err ? err.message : 'ok';

      return res.status(statusCode).json({
        message: message,
        status: statusCode,
      });
    });
  }

  function runReadyChecks(req, res) {
    runHooks(readyHooks, req, res, (err) => {
      const statusCode = err ? err.statusCode : 200;
      const message = err ? err.message : 'ok';

      return res.status(statusCode).json({
        message: message,
        status: statusCode,
      });
    });
  }

  return {
    runAliveChecks,
    runReadyChecks,
  };
}
