import { CONFIG } from "../config/constants";
import { createApolloFetch } from "apollo-fetch";
import { dic } from "../config/dic";
const sqlite = require("sqlite-sync");

export class Search {
  static async dados() {
    let list = {};
    let dadosList: any = [];

    sqlite.connect("banco.db");

    sqlite.run(
      "DROP TABLE dados; CREATE TABLE dados(ID INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, inserts TEXT NOT NULL, deletions TEXT NOT NULL);"
    );

    for (let i = 0; i <= Object.keys(dic).length ; i++) {
    //for (let i = 0; i <= 1; i++) {
      const url = CONFIG.baseUrlGit;

      const apolloFetch = createApolloFetch({ uri: url });

      apolloFetch.use(({ request, options }, next) => {
        options.headers = {
          "Content-Type": "application/json",
          Authorization: "bearer " + CONFIG.TOKEN,
        };
        next();
      });

      const fetchData = () =>
        apolloFetch({
          query: dic[i],
        }).catch((error) => {
          console.log(error);
        });

      await fetchData().then(async (response: any) => {
        if (response.data != null) {
          let dados = response.data.repository.object.history.nodes;
          await dados.map(function (dado: any) {
            list = {};

            let name =
              dado.author.user == null || dado.author.user == ""
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
          });
        }
      });
    }
  }
}
