"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_AllDocuments = void 0;
const dbconection_1 = __importDefault(require("../database/dbconection"));
const GET_AllDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = (0, dbconection_1.default)();
    console.log("EN GET ALL DOCUMENTS");
    if (!conn) {
        res.status(500).json({
            error: "Could not stablish a connection width salesforce",
        });
        return;
    }
    let titol = [];
    conn.query("SELECT Titol__c FROM Documentos__c", {}, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        else {
            console.log("Total records" + result.totalSize);
            result.records.map((doc, i) => {
                titol.push({ Id: i, titol: doc.Titol__c });
            });
            console.log(titol);
            res.json(titol);
        }
    });
});
exports.GET_AllDocuments = GET_AllDocuments;
