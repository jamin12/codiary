const express = require('express');
const mainRoutes = require('./mainRoutes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/main',
    route: mainRoutes,
  },
];

const devRoutes = [
  // routes available only in development mode
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
