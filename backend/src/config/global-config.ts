import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const secretJWT = process.env.SECRET_JWT ?? "f8725d3ce29cb7210810602d37e581a4";
