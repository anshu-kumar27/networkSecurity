const app = require("./app");
const dotenv = require("dotenv");
const databaseConnection = require("./config/databaseConnection");

dotenv.config({ path: "./config/config.env" });
databaseConnection();

app.listen(8000, () => {
  console.log(`your server is running on http://localhost:8000`);
});
