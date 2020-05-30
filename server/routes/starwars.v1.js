const { authJwt } = require("../middleware");
const controller = require("../controllers/starwars.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get(
    "/api/starwars/v1/films",
    [authJwt.verifyToken],
    controller.films
  );
  app.get(
    "/api/starwars/v1/films/:filmId/characters",
    [authJwt.verifyToken],
    controller.characters
  );
};
