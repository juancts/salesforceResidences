import { Express, Request, Response } from "express";
import createConnection from "../database/dbconection";
import * as jsforce from "jsforce";
import * as dotenv from "dotenv";
import { userInfo } from "os";
import { Docs } from "../types";

dotenv.config();

const LOGINURL = process.env.SF_LOGIN_URL;
const USERNAME = process.env.SF_USERNAME;
const PASSWORD = process.env.SF_PASSWORD;
const TOKEN = process.env.SF_TOKEN;

export const GET_AllDocuments = async (req: Request, res: Response) => {
  try {
    let conn: jsforce.Connection | undefined = undefined;

    if (USERNAME && PASSWORD && TOKEN) {
      conn = new jsforce.Connection({
        loginUrl: LOGINURL,
        version: "53.0",
      });

      await conn.login(USERNAME, PASSWORD + TOKEN);
    } else {
      console.error(
        "USERNAME, PASSWORD, or TOKEN is undefined. Check your environment variables."
      );
    }

    if (!conn) {
      res.status(500).json({
        error: "Could not establish a connection with Salesforce",
      });
      return;
    }

    const result = await conn.query("SELECT Titol__c FROM Documentos__c");
    const titol: Array<{ Id: number; titol: string }> = result.records.map(
      (doc: any, i: number) => {
        return { Id: i, titol: doc.Titol__c };
      }
    );

    res.json(titol);
  } catch (err) {
    res.send(err);
  }
};
