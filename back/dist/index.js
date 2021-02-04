"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var constants_1 = require("./config/constants");
var routes_1 = require("./routes");
var search_1 = require("./db/search");
var cors = require('cors');
var app = express_1.default();
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
app.use('/data', routes_1.dataRouter);
search_1.Search.dados();
app.listen(constants_1.CONFIG.PORT, function () {
    console.log("Server is listening on port " + constants_1.CONFIG.PORT);
});
exports.default = app;
