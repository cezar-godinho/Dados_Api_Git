import { Request, Response } from "express";
import { Controller } from "../Controller";
import { IDado } from '../../types/dados'
const sqlite = require("sqlite-sync");

sqlite.connect("banco.db");

export class DataController extends Controller {
  public create(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    throw new Error("Method not implemented.");
  }

  public async read(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ) {
    const dadosBd = sqlite.run("SELECT * FROM dados");

    const dados: IDado[] = await sqlite.run("SELECT id, nome, count(nome) as commits, sum(inserts) as inserts, sum(deletions) as deletions from dados group by nome");
    res.status(200).json({ dados });
  }

  public update(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    throw new Error("Method not implemented.");
  }

  public delete(
    req: Request<import("express-serve-static-core").ParamsDictionary>,
    res: Response
  ): void {
    throw new Error("Method not implemented.");
  }
}
