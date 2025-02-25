const app = require("./src/app");
const pool = require("./src/pool");

pool
  .connect({
    host: "localhost",
    port: 5432,
    database: "social-repo",
    user: "postgres",
    password: "password",
  })
  .then(() => {
    app().listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
