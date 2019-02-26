export let catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

export function errorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    res.status(400).json({
      ok: false,
      err: {
        message: err.message
      }
    });
    return;
  }
  console.log('500 ===================', err, err.name);
  res.status(500).json({
    ok: false,
    err: {
      message: err.message
    }
  });
}
