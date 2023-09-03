import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { engine } from "express-handlebars";
import { router } from "./routes.js";
//import * as handlebarhelpers from "./handlebarhelpers.js"; // Import your custom helper

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(fileUpload());

/* // Configure Handlebars with your custom helper
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: {
      eq: handlebarhelpers.eq, // Register the custom helper
    },
  })
); */

app.engine(
  ".hbs",
  engine({
    extname: ".hbs", // Register the custom helper
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use("/", router);

const listener = app.listen(process.env.PORT || 4000, function () {
  console.log(`Todolist started on http://localhost:${listener.address().port}`);
});
