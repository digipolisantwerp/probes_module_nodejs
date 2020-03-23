import async from 'async';

export function runHooks(configuredHook, req, res, next) {
  if (!configuredHook || !Array.isArray(configuredHook)) {
    return next();
  }

  const hooks = configuredHook
    .map(hook => (cb) => hook(req, res, cb));

  async.series(hooks, next);
}