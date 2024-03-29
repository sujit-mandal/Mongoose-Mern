const app = require("./app");
const connectDataBase = require("./config/db");
const { serverPort } = require("./secret");

app.listen(serverPort, async() => {
  console.log(`server is running on port http://localhost:${serverPort}`);
  await connectDataBase();
});
