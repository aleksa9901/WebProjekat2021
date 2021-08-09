 import { BoardGame } from "./BoardGame.js";
 import { Table } from "./Table.js";
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
        //this.dodajGame(new BoardGame("Darkest Dungeon", 5,"Strategija"));
        //this.dodajGame(new BoardGame("Darkest Days", 5,"Strategija"));
        //this.dodajGame(new BoardGame("Betreyal at house on the hill", 5,"Strategija"));
        //this.dodajGame(new BoardGame("Splendor", 5,"Strategija"));
    }

    dodajSto(table)
    {
        this.tables.push(table);
    }

    dodajGame(game)
    {
        this.games.push(game);
        this.updateSelekcije();
        
    }
    ukloniIgru(Naziv)
    {
        var igra = this.games.find(element => element.naziv==Naziv)
        igra.izbrisiIgru();
        this.games=this.games.filter(el =>{ 
            return el.naziv != Naziv}
        );
        console.log(this.games);
        this.updateSelekcije();
    }

    updateSelekcije()
    {
        let selekcija = this.container.querySelector(".listaIgrica");
        var length = selekcija.options.length - 1;
        for(let i = length; i >= 0; i--)
        {
            selekcija.remove(i);
        }
        let opcija = null;
        this.games.forEach((game,index)=>{
            opcija = document.createElement("option");
            opcija.innerHTML = game.naziv;
            opcija.value = game.naziv;
            selekcija.appendChild(opcija);
        });
        selekcija = document.body.querySelector(".boardGameSelectList");
        var length = selekcija.options.length - 1;
        for(let i = length; i >= 0; i--)
        {
            selekcija.remove(i);
        }
        this.games.forEach((game,index)=>{
            opcija = document.createElement("option");
            opcija.innerHTML = game.naziv;
            opcija.value = game.naziv;
            selekcija.appendChild(opcija);
        });
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

        this.crtajFormuTables(this.container);
        this.crtajStolove(this.container);

        var sutniDole = document.createElement("div");
        sutniDole.classList.add("Sutnuto");
        host.appendChild(sutniDole);

        var sveIgre = document.createElement("div");
        sveIgre.className="divSveIgre";
        host.appendChild(sveIgre);

        this.crtajFormuIgre(sutniDole);
        this.crtajSveIgre(sveIgre);


    }
    crtajSveIgre(host)
    {
        let div = document.createElement("div");
        div.style.width = "100%";
        let elLabel = document.createElement("h3");
        elLabel.innerHTML = "SVE IGRE: "
        div.appendChild(elLabel);
        host.appendChild(div);
    }

    crtajFormuTables(host)
    {
        //glavni
        const formaTables = document.createElement("div");
        formaTables.classList.add("formaTables");
        host.appendChild(formaTables);

        //pocetak unosa
        var elLabel = document.createElement("h3");
        elLabel.innerHTML = "Unos Stola:";
        formaTables.appendChild(elLabel);

        //Div za broj igraca
        var divBrojIgraca = document.createElement("div");
        divBrojIgraca.classList.add("unutrasnjiDiv");
        elLabel = document.createElement("label");
        elLabel.innerHTML = "Broj Igraca: ";
        divBrojIgraca.appendChild(elLabel);
        let tb = document.createElement("input");
        tb.className = "brojIgraca";
        tb.type = "number";
        divBrojIgraca.appendChild(tb);
        formaTables.appendChild(divBrojIgraca);

        //Div za biranje igre
        var divIgrice = document.createElement("div");
        divIgrice.classList.add("unutrasnjiDiv");
        elLabel = document.createElement("label");
        elLabel.innerHTML = "Igra: ";
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

        //div za biranje stola
        let divRb = document.createElement("div");
        divRb.classList.add("unutrasnjiDiv");
        divRb.classList.add("XY") 
        let divX = document.createElement("div");
        divX.classList.add("xDiv");
        let selX = document.createElement("select");
        elLabel = document.createElement("label");
        elLabel.innerHTML = "X:";       
        divX.appendChild(elLabel);
        divX.appendChild(selX);
        divRb.appendChild(divX);


        for(let i = 0; i <this.m ; i++)
        {
            let slovo = "A"
            opcija = document.createElement("option");
            opcija.innerHTML = slovo.substring(0, slovo.length - 1) + String.fromCharCode(slovo.charCodeAt(slovo.length - 1) + i);
            opcija.value = i;
            selX.appendChild(opcija);
        }
        formaTables.appendChild(divRb);

        let divY = document.createElement("div");
        divY.classList.add("yDiv");
        let selY = document.createElement("select");
        elLabel = document.createElement("label");
        elLabel.innerHTML = "Y: ";
        divY.appendChild(elLabel);
        divY.appendChild(selY);
        divRb.appendChild(divY);
        for(let i = 0; i <this.n ; i++)
        {
            let broj = i + 1;
            opcija = document.createElement("option");
            opcija.innerHTML = broj;
            opcija.value = i;
            selY.appendChild(opcija);
        }
        formaTables.appendChild(divRb);

        const dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj Sto";
        formaTables.appendChild(dugme);

        dugme.onclick=(ev)=>{
            const igraci = parseInt(this.container.querySelector(".brojIgraca").value);
            const igra = igrice.value;

            const result = this.games.find(element => element.naziv==igra);
            const maxIgraca = parseInt(result.brojIgraca);
            const bojaPicker = result.tip;
            console.log("Boja je: " + result);
            let x = parseInt(selX.value);
            let y = parseInt(selY.value);

            //let potencijalniSto = this.tables.find(sto=> sto.igra == igra && sto.brojIgraca + igraci <= result.brojIgraca && (sto.i != x || sto.j != y));
            if (Number.isNaN(igraci))
            alert("Unesite broj igraca");
            //else if(potencijalniSto)
            //alert("NAPUNJEN STO FUCK OFF");
            else
                this.tables[x*this.n+y].azurirajSto(igra,igraci,maxIgraca,bojaPicker);
        }
        
    }


    crtajStolove(host)
    {
        const kontStolovi = document.createElement("div");
        kontStolovi.classList.add("kontStolovi");
        host.appendChild(kontStolovi);
        let red;
        let sto;
        for(let i=0; i<this.m;i++)
        {
            red = document.createElement("div");
            red.className = "red";
            kontStolovi.appendChild(red);
            for(let j = 0; j < this.n;j++)
            {
                sto = new Table(i,j,"",0,0,"");
                this.dodajSto(sto);
                sto.crtajSto(red);
            }
        }
    }

    crtajFormuIgre(host)
    {
        const formIgra = document.createElement("div");
        formIgra.className = "igraForma";
        host.appendChild(formIgra);

        var elLabel = document.createElement("h3");
        elLabel.innerHTML = "Board Games:";
        elLabel.className = "Naslov";
        formIgra.appendChild(elLabel);

        var divUnos = document.createElement("div");
        divUnos.className = "divUnos";
        divNaziv = document.createElement("div");
        elLabel = document.createElement("h4");
        elLabel.innerHTML = "Unos Igre: ";
        elLabel.className = "Naslov";
        divNaziv.appendChild(elLabel);
        divUnos.appendChild(divNaziv);

        //Unos naziv
        var divNaziv = document.createElement("div");
        divNaziv.className = "divNaziv";
        elLabel = document.createElement("label");
        elLabel.innerHTML = "Naziv: ";
        var unos = document.createElement("input");
        unos.className = "boardNaziv";
        divNaziv.appendChild(elLabel);
        divNaziv.appendChild(unos);
        divUnos.appendChild(divNaziv);

        //Unos broja igraca
        divNaziv = document.createElement("div");
        divNaziv.className = "divIgraci";
        elLabel = document.createElement("label");
        elLabel.innerHTML = "Broj Igraca: ";
        unos = document.createElement("input");
        unos.type = "number";
        unos.className = "boardGameBrojIgraca";
        divNaziv.appendChild(elLabel);
        divNaziv.appendChild(unos);
        divUnos.appendChild(divNaziv);


        //unos tip igre
        divNaziv = document.createElement("div");
        divNaziv.className = "divBoardGameType";
        elLabel = document.createElement("label");
        elLabel.innerHTML = "Tip igre: ";
        unos = document.createElement("select");
        unos.className = "boardGameType";
        var Tipovi = ["Horror","Akcija","Triller","Komedija","Dexterity"];
        var opcija = null;
        Tipovi.forEach((game,index)=>{
            opcija = document.createElement("option");
            opcija.innerHTML = game;
            opcija.value = game;
            unos.appendChild(opcija);
        });
        
        divNaziv.appendChild(elLabel);
        divNaziv.appendChild(unos);
        divUnos.appendChild(divNaziv);

        //dugme
        divNaziv = document.createElement("div");
        divNaziv.className="divBoardGameButton";
        let dugmeDodaj = document.createElement("button");
        dugmeDodaj.innerHTML = "Dodaj igru";
        divNaziv.appendChild(dugmeDodaj);
        divUnos.appendChild(divNaziv);

       
        formIgra.appendChild(divUnos);

        //forma za brisanje igre

        //selekcija igre
        divUnos = document.createElement("div");
        divUnos.className = "BrisanjeIgre";
        divNaziv = document.createElement("div");
        divNaziv.className = "divBoardGameSelect";
        unos = document.createElement("select");
        unos.className = "boardGameSelectList";
        let opcije = null;
        this.games.forEach((game,index)=>{
            opcije = document.createElement("option");
            opcije.innerHTML = game.naziv;
            opcije.value = game.naziv;
            unos.appendChild(opcije);
        })
        elLabel = document.createElement("label");
        elLabel.innerHTML = "Izaberite Igru: ";
        divNaziv.appendChild(elLabel);
        divNaziv.appendChild(unos);
        divUnos.appendChild(divNaziv);

        divNaziv = document.createElement("div");
        divNaziv.className = "divBrisanjeButton";
        let dugmeBrisanje = document.createElement("button");
        dugmeBrisanje.innerHTML = "Ukloni Igru";
        divNaziv.appendChild(dugmeBrisanje);
        divUnos.appendChild(divNaziv);

        formIgra.appendChild(divUnos);



        dugmeDodaj.onclick=(ev)=>
        {
            const BoardGameNaziv = host.querySelector(".boardNaziv").value;
            const BoardGameBrojIgraca = parseInt(host.querySelector(".boardGameBrojIgraca").value);
            const BoardGameTipIgre = host.querySelector(".boardGameType").value;
            if(BoardGameNaziv.trim().length == 0 || Number.isNaN(BoardGameBrojIgraca))
            {
                alert("Greska");
            }
            else
            {
            let drustvenaIgra = new BoardGame(BoardGameNaziv,BoardGameBrojIgraca,BoardGameTipIgre);
            var postoji = this.games.find((name) => name.naziv== drustvenaIgra.naziv);
            if(!postoji)
            {
                let crtaj = document.querySelector(".divSveIgre");
                drustvenaIgra.crtajIgru(crtaj);
                this.dodajGame(drustvenaIgra);
            }
            else
            {
                alert("postoji Igra");
            }
            }
            //console.log(this.games);
        };
        dugmeBrisanje.onclick=(ev)=>
        {
            const BoardGameNaziv =  host.querySelector(".boardGameSelectList").value;
            console.log(BoardGameNaziv);
            this.ukloniIgru(BoardGameNaziv);
        }

    }

 }