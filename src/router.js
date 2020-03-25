
import { Router } from 'express';
import createController from './controller';

export default function loadRoutes(config) {

  const {
    runAliveChecks,
    runReadyChecks,
  } = createController(config);

  const router = new Router();

  router.get('/status/alive', runAliveChecks);
  router.get('/status/ready', runReadyChecks);

  return router;
};
