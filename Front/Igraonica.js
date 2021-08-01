 import { BoardGame } from "./BoardGame.js"
 export class Igraonica
 {
    constructor(naziv, n, m)
    {
        this.naziv = naziv;
        this.n = n;
        this.m = m;
        this.tables = [];
        this.games = [];
        this.container = null;
        this.dodajGame(new BoardGame("Darkest Dungeon", 5,"Strategija"));
        this.dodajGame(new BoardGame("Darkest Days", 5,"Strategija"));
        this.dodajGame(new BoardGame("Betreyal at house on the hill", 5,"Strategija"));
        this.dodajGame(new BoardGame("Splendor", 5,"Strategija"));
    }

    dodajSto(table)
    {
        this.tables.push(table);
    }

    dodajGame(game)
    {
        this.games.push(game);
    }

    crtajIgraonicu(host)
    {
        if(!host)
        {
            throw new Error("Greska");
        }
        this.container = document.createElement("div");
        this.container.classList.add("mainContainer");
        host.appendChild(this.container);

        this.crtajFormuIgre(this.container);
        this.crtajStolove(this.container);

        var sutniDole = document.createElement("div");
        sutniDole.classList.add("Sutnuto");
        this.container.appendChild(sutniDole);
        this.crtajFormuIgre(sutniDole);


    }

    crtajFormuTables(host)
    {
        const formaTables = document.createElement("div");
        formaTables.classList.add("formaTables");
        host.appendChild(formaTables);


        var elLabel = document.createElement("h3");
        elLabel.innerHTML = "Unos Stola:"
        formaTables.appendChild(elLabel);

        var divBrojIgraca = document.createElement("div");
        div.classList.add("unutrasnjiDiv");
        elLabel = document.createElement("label");
        elLabel.innerHTML = "Broj Igraca: ";
        divBrojIgraca.appendChild(elLabel);
        let tb = document.createElement("input");
        tb.className = "BrojIgraca";
        divBrojIgraca.appendChild(tb);
        formaTables.appendChild(div);

        var divIgrice = document.createElement("div");
        elLabel = document.createElement("label");
        elLabel.innerHTML = "Igra: ";
        formaTables.appendChild(elLabel);

        let opcija = null;
        let igrice = document.createElement("select");
        igrice.classList.add("listaIgrica");

        divIgrice.appendChild(elLabel);
        divIgrice.appendChild(igrice);

        this.games.forEach((game,index)=>{
            opcija = document.createElement("option");
            opcija.innerHTML = game.naziv;
            opcija.value = game.naziv;
            igrice.appendChild(opcija);
        })
        formaTables.appendChild(divIgrice);
    }

    crtajStolove(host)
    {

    }

    crtajFormuIgre(host)
    {

    }

 }