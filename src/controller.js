export default function createController(config = {}) {
  const {
    hooks = {},
  } = config;

  const {
    ready = [],
    alive = [],
  } = hooks;

  async function runAliveChecks(_req, res) {
    try {
      await Promise
        .all(
          alive.map((check) => check()),
        );

      return res.json({ status: 200, message: 'ok' });
    } catch (error) {
      console.error(`PROBES_ERROR_1: ${error.message || ''}`);
      return res.status(error.status || 500).json({ message: error.message || '' });
    }
  }

  async function runReadyChecks(_req, res) {
    try {
      await Promise
        .all(
          ready.map((check) => check()),
        );

      return res.json({ status: 200, message: 'ok' });
    } catch (error) {
      console.error(`PROBES_ERROR_2: ${error.message || ''}`);
      return res.status(error.status || 500).json({ message: error.message || '' });
    }
  }

  return {
    runAliveChecks,
    runReadyChecks,
  };
}
