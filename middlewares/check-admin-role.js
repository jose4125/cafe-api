export default (req, res, next) => {
  const { role } = req.user;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      ok: false,
      err: {
        message: 'unauthorized user'
      }
    });
  }

  next();
};
