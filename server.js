const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const Joi = require("@hapi/joi");
const HapiSwagger = require("hapi-swagger");

const SwaggerPlugin = {
  plugin: HapiSwagger,
  options: {
    info: {
      title: "Test API Documentation",
      version: "0.0.1",
    },
  },
};

(async () => {
  const server = new Hapi.Server({
    host: "localhost",
    port: 3000,
  });

  await server.register([Inert, Vision, SwaggerPlugin]);

  server.route({
    method: "GET",
    path: "/",
    options: {
      tags: ["api"],
      handler(req, h) {
        return h.response("buka!");
      },
    },
  });

  await server.start();

  console.log("hapi on " + server.info.uri);
})();
