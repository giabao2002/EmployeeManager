const autoIncrement = require("mongoose-auto-increment");

const initializeAutoIncrement = (connection) => {
  autoIncrement.initialize(connection);
  return autoIncrement;
};

module.exports = initializeAutoIncrement;
