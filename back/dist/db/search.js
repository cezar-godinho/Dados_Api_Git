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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
var constants_1 = require("../config/constants");
var apollo_fetch_1 = require("apollo-fetch");
var dic_1 = require("../config/dic");
var sqlite = require("sqlite-sync");
var Search = /** @class */ (function () {
    function Search() {
    }
    Search.dados = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list, dadosList, _loop_1, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        list = {};
                        dadosList = [];
                        sqlite.connect("banco.db");
                        sqlite.run("DROP TABLE dados; CREATE TABLE dados(ID INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, inserts TEXT NOT NULL, deletions TEXT NOT NULL);");
                        _loop_1 = function (i) {
                            var url, apolloFetch, fetchData;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        url = constants_1.CONFIG.baseUrlGit;
                                        apolloFetch = apollo_fetch_1.createApolloFetch({ uri: url });
                                        apolloFetch.use(function (_a, next) {
                                            var request = _a.request, options = _a.options;
                                            options.headers = {
                                                "Content-Type": "application/json",
                                                Authorization: "bearer " + constants_1.CONFIG.TOKEN,
                                            };
                                            next();
                                        });
                                        fetchData = function () {
                                            return apolloFetch({
                                                query: dic_1.dic[i],
                                            }).catch(function (error) {
                                                console.log(error);
                                            });
                                        };
                                        return [4 /*yield*/, fetchData().then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                                var dados;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!(response.data != null)) return [3 /*break*/, 2];
                                                            dados = response.data.repository.object.history.nodes;
                                                            return [4 /*yield*/, dados.map(function (dado) {
                                                                    list = {};
                                                                    var name = dado.author.user == null || dado.author.user == ""
                                                                        ? "NULL"
                                                                        : dado.author.user.login;
                                                                    list = {
                                                                        nome: name,
                                                                        inserts: dado.additions,
                                                                        deletions: dado.deletions
                                                                    };
                                                                    sqlite.insert("dados", {
                                                                        nome: name,
                                                                        inserts: dado.additions,
                                                                        deletions: dado.deletions,
                                                                    });
                                                                    dadosList.push(list);
                                                                })];
                                                        case 1:
                                                            _a.sent();
                                                            _a.label = 2;
                                                        case 2: return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i <= Object.keys(dic_1.dic).length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Search;
}());
exports.Search = Search;
