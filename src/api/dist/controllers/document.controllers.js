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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_AllDocuments = void 0;
const jsforce = __importStar(require("jsforce"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const LOGINURL = process.env.SF_LOGIN_URL;
const USERNAME = process.env.SF_USERNAME;
const PASSWORD = process.env.SF_PASSWORD;
const TOKEN = process.env.SF_TOKEN;
const GET_AllDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let conn = undefined;
        if (USERNAME && PASSWORD && TOKEN) {
            conn = new jsforce.Connection({
                loginUrl: LOGINURL,
                version: "53.0",
            });
            yield conn.login(USERNAME, PASSWORD + TOKEN);
        }
        else {
            console.error("USERNAME, PASSWORD, or TOKEN is undefined. Check your environment variables.");
        }
        if (!conn) {
            res.status(500).json({
                error: "Could not establish a connection with Salesforce",
            });
            return;
        }
        const result = yield conn.query("SELECT Titol__c FROM Documentos__c");
        const titol = result.records.map((doc, i) => {
            return { Id: i, titol: doc.Titol__c };
        });
        res.json(titol);
    }
    catch (err) {
        res.send(err);
    }
});
exports.GET_AllDocuments = GET_AllDocuments;
