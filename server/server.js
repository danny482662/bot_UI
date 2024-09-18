const express = require('express')
const cors = require("cors");
const bodyParser = require("body-parser")
const config = require("./config/app-config")
const logger = require("./utils/logger")
const swaggerDoc = require("./config/swagger-config")
const routes = require('./routes');

const errorHandler = require("./utils/errorHandler")

const app = express()
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

swaggerDoc(app);
routes.endPointsHandler(app);
app.use(errorHandler);

const PORT = config.port || 8080;
app.listen(PORT, () => {
  logger.info(`Server is running on port: ${PORT}`);
});
