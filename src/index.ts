import Server from "./api/Server";
import * as path from "path";

const App = new Server().app;

App.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

App.listen(1337);

console.log(`Server running on 1337`);
