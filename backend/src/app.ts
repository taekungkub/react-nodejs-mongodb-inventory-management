import express, { Express } from "express";
import * as db from "./config/db-config";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import indexRoutes from "./routes/index";

const app: Express = express();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

const router = express.Router({ mergeParams: true });

router.use(indexRoutes);
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
