export default function createController(config = {}) {
  const {
    hooks = {},
  } = config;

  const {
    ready = [],
    alive = [],
  } = hooks;

  async function runAliveChecks(req, res) {
    try {
      await Promise
        .all(
          alive.map(check => check())
        )
        .then(() => {
          return res.json({ status: 200, message: 'ok' });
        })
        .catch(err => {
          console.error(`PROBES_ERROR_1: ${err.message || ''}`);
          return res.status(err.status || 500).json({ 'message': err.message || '' });
        });
    } catch (error) {
      console.error(`PROBES_ERROR_2: ${error.message || ''}`);
      return res.status(error.status || 500).json({ message: error.message || '' });
    }
  }

  async function runReadyChecks(req, res) {
    try {
      await Promise
        .all(
          ready.map(check => check())
        )
        .then(() => {
          return res.json({ status: 200, message: 'ok' });
        })
        .catch(err => {
          console.error(`PROBES_ERROR_3: ${err.message || ''}`);
          return res.status(err.status || 500).json({ 'message': err.message || '' });
        });
    } catch (error) {
      console.error(`PROBES_ERROR_4: ${error.message || ''}`);
      return res.status(error.status || 500).json({ message: error.message || '' });
    }
  }

  return {
    runAliveChecks,
    runReadyChecks,
  };
}
