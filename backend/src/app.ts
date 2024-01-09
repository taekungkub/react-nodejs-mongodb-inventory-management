import express, { Express } from "express";
import session from "express-session";
import * as db from "./config/db-config";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import cors from "cors";
import passport from "passport";

import indexRoutes from "./routes/index";
import authRoute from "./routes/auth.route";
import productRoute from "./routes/product.route";

const app: Express = express();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const router = express.Router({ mergeParams: true });
router.use(indexRoutes);
router.use(authRoute);
router.use(productRoute);

app.use("/api", router);

const port = Number(process.env.SERVER_PORT) || 8000;

app.listen(port, "0.0.0.0", async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}/api`);
  await db
    .connect()
    .then(() => {
      console.log("DB Connection!");
    })
    .catch((e) => {
      console.error(e);
    });
});
