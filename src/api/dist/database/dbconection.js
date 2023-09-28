"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsforce = __importStar(require("jsforce"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const LOGINURL = process.env.SF_LOGIN_URL;
const USERNAME = process.env.SF_USERNAME;
const PASSWORD = process.env.SF_PASSWORD;
const TOKEN = process.env.SF_TOKEN;
const KEY = process.env.SF_CONS_KEY;
const SECRET = process.env.SF_CONS_SECRET;
const createConnection = () => {
    console.log("DBCONECTION RETURN");
    let conn = undefined;
    if (USERNAME !== undefined && PASSWORD !== undefined && TOKEN !== undefined) {
        const combinedPassword = PASSWORD + TOKEN;
        conn = new jsforce.Connection({
            loginUrl: LOGINURL,
            version: "53.0",
        });
        conn.login(USERNAME, combinedPassword, (err, userInfo) => {
            if (err) {
                console.error("Login error:", err);
            }
            else {
                console.log("Conection ok - Logged in as:", userInfo.id);
                console.log("Org Id:" + userInfo.organizationId);
            }
        });
    }
    else {
        console.error("USERNAME, PASSWORD, or TOKEN is undefined. Check your environment variables.");
    }
    console.log("****CONECTION*****", conn);
    console.log("******END CONECTION*********");
    return conn;
};
exports.default = createConnection;
