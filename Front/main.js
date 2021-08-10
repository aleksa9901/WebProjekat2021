import { Igraonica } from "./Igraonica.js";
import { BoardGame } from "./BoardGame.js";
import { Table } from "./Table.js";


fetch("https://localhost:5001/Igraonica/PreuzmiIgraonice").then(p => {
    p.json().then(data=> {
        data.forEach(igraonica =>
            {
                console.log(igraonica);
                let igraonica1 = new Igraonica(igraonica.id,igraonica.naziv,igraonica.n,igraonica.m);
                igraonica1.crtajIgraonicu(document.body);
                igraonica.igre.forEach( novaIgra => {
                    let Igra = new BoardGame(novaIgra.naziv,novaIgra.brojIgraca,novaIgra.tip);
                    Igra.ID = novaIgra.id;
                    igraonica1.dodajGame(Igra);
                });
                igraonica.stolovi.forEach(noviStolovi=>
                    {
                        igraonica1.tables[noviStolovi.i*igraonica1.n+noviStolovi.j].popuniSto(noviStolovi.igra.naziv,noviStolovi.brojIgraca,noviStolovi.maxIgraca,noviStolovi.boja)
                    });
                    
            });
    });
});
/*const igra = new Igraonica("Goblin",5,4);
igra.crtajIgraonicu(document.body);

const newIgra = new Igraonica("Karavan",10,5);
newIgra.crtajIgraonicu(document.body);*/