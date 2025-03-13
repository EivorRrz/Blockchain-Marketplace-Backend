const winston = require("winston");

const logger = winston.createLogger({
  level: "info", //set the level!!
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transport.Console()], //MAKE IT THE CONSOLE!
});

// Stream for morgan logging
logger.stream = {
  write: function (message) {
    logger.info(message.trim());
  },
};

module.exports = logger;
