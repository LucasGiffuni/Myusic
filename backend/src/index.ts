import express, { Express, NextFunction } from "express";
import http from "http";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import fs from "fs";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

import songRoutes from "./routes/songRoutes";

import loginRoutes from "./routes/loginRoutes";
import albumRoutes from "./routes/albumRoutes";
import { IResponse } from "./interfaces/IResponse";

const app = express();
const RSA_PRIVATE_KEY = fs.readFileSync("private.key");

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
	  "Access-Control-Allow-Headers",
	  "Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);

	if (req.method === "OPTIONS") {
	  res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
	  return res.status(200).json({});
	}

	next();
});

app.use("/login", loginRoutes);

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, RSA_PRIVATE_KEY, (err: Error) => {
      if (err) {
        const response: IResponse<any> = {
          Result: {
            statuscode: "403",
            statustext: "Unauthorized",
          },
          data: {},
        };

        res.status(403).json(response);
      } else {
        next();
      }
    });
  } else {
    const response: IResponse<any> = {
      Result: {
        statuscode: "401",
        statustext: "Unauthorized",
      },
      data: {},
    };
    res.status(401).json(response);
  }
});

/** Routes go here */

app.use("/user", userRoutes);
app.use("/song", songRoutes);
app.use("/albums", albumRoutes);

/** Error handling */
app.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(app);
httpServer.listen(3000);
