const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

router.render = (req, res) => {
	let data = res.locals.data;
	const { originalUrl } = req;
	if (
		req.method === "GET" &&
		(originalUrl === "/events" || /^\/events\?.*$/.test(originalUrl))
	) {
		data = data.map((event) => ({
			id: event.eventId,
			capaciy: event.capacity,
			event_name: event.eventName,
			ticket: event.ticket,
			event_operator_id: event.eventOperatorId,
			date_event: event.dateEvent,
			time_start: event.timeStart,
			time_end: event.timeEnd,
			address: event.address,
			image_url: event.imageUrl,
		}));
	}
	res.jsonp(data);
};

// Use default router
server.use(router);
server.listen(4000, () => {
	console.log(`JSON Server is running`);
});
