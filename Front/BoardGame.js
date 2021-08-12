export class BoardGame
{
    constructor(naziv,brojIgraca,tip)
    {
        this.ID = 0;
        this.naziv = naziv;
        this.brojIgraca = brojIgraca;
        this.tip = tip;
        this.container = null;
    }
    odrediBoju()
    {
        //console.log(this.tip);
        if(!this.tip)
        return "green";
        else if(this.tip == "Dexterity")
        return "orange";
        else if(this.tip == "Komedija")
        return "red";
        else if(this.tip == "Triller")
        return "#9370DB";
        else if(this.tip == "Akcija")
        return "#00BFFF";
        else if(this.tip == "Horror")
        return "#FFA07A";
    }

    crtajIgru(host)
    {
        this.container = document.createElement("div");
        this.container.className="game";
        this.container.innerHTML=this.naziv + " , " + this.brojIgraca + " , " + this.tip;
        this.container.style.backgroundColor = this.odrediBoju();
        host.appendChild(this.container);
    }

    izbrisiIgru()
    {
        fetch("https://localhost:5001/Igraonica/IzbrisiIgru/" + this.ID,{method:"DELETE"}).then(resp => {
            if(resp.ok)
            {   
                var parent = this.container.parentNode;
                parent.removeChild(this.container);
            }
            else if(resp.status == 400)
            {
                alert("Greska prilikom brisanja igre");
            }
        });
    }
}