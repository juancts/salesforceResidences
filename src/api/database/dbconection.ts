import * as jsforce from 'jsforce';
import * as dotenv from 'dotenv';
import { log } from 'console';
dotenv.config();

const LOGINURL = process.env.SF_LOGIN_URL;
const USERNAME = process.env.SF_USERNAME;
const PASSWORD = process.env.SF_PASSWORD;
const TOKEN = process.env.SF_TOKEN;
const KEY = process.env.SF_CONS_KEY;
const SECRET = process.env.SF_CONS_SECRET;


const createConnection = () => {
  console.log("DBCONECTION RETURN");
    let conn: jsforce.Connection | undefined = undefined;
  
    if (USERNAME !== undefined && PASSWORD !== undefined && TOKEN !== undefined) {
      const combinedPassword = PASSWORD + TOKEN;
      conn = new jsforce.Connection({
        loginUrl: LOGINURL,
        version: "53.0",
      });
  
      conn.login(USERNAME, combinedPassword, (err, userInfo) => {
        if (err) {
          console.error("Login error:", err);
        } else {
          console.log("Conection ok - Logged in as:", userInfo.id);
          console.log("Org Id:"+ userInfo.organizationId);
        }
      });
    } else {
      console.error("USERNAME, PASSWORD, or TOKEN is undefined. Check your environment variables.");
    }
    console.log("****CONECTION*****",conn);
    console.log("******END CONECTION*********");
    
    return conn;
  };



export default createConnection;