const express = require("express"),
	authRoutes = require("./auth.routes"),
	mainRoutes = require("./main.routes"),
	userRoutes = require("./user.routes"),
	personalRoutes = require("./personal.routes"),
	manageRoutes = require("./manage.routes");

const router = express.Router();

const defaultRoutes = [
	{
		path: "/",
		route: authRoutes,
	},
	{
		path: "/main",
		route: mainRoutes,
	},
	{
		path: "/user",
		route: userRoutes,
	},
	{
		path: "/personal",
		route: personalRoutes
	},
	{
		path: "/manage",
		route: manageRoutes
	},
];

const devRoutes = [
	// routes available only in development mode
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

/* istanbul ignore next */
if (process.env.NODE_ENV === "development") {
	devRoutes.forEach((route) => {
		router.use(route.path, route.route);
	});
}

module.exports = router;
