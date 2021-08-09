export class Table
{
    constructor(i,j,igra, brojIgraca, maxBrojIgraca, boja)
    {
        this.i = i;
        this.j = j;
        this.igra = igra;
        this.brojIgraca = brojIgraca;
        this.maxBrojIgraca = maxBrojIgraca;
        this.boja = boja;
        this.container = null;
    }
    vratiBoji()
    {
        console.log(this.boja);
        if(!this.boja)
        return "green";
        else if(this.boja == "Dexterity")
        return "orange";
        else if(this.boja == "Komedija")
        return "red";
        else if(this.boja == "Triller")
        return "#9370DB";
        else if(this.boja == "Akcija")
        return "#00BFFF";
        else if(this.boja == "Horror")
        return "#FFA07A";
    }

    crtajSto(host)
    {
        let slovo = "A";
        let broj = this.j+1;
        this.container = document.createElement("div");
        this.container.className="table";
        this.container.innerHTML=slovo.substring(0, slovo.length - 1) + String.fromCharCode(slovo.charCodeAt(slovo.length - 1) + this.i) + ", " + broj + "<br> Prazno, " + this.brojIgraca;
        this.container.style.backgroundColor = this.vratiBoji();
        this.buttonsAdd(this.container);
        host.appendChild(this.container);
    } 

    azurirajSto(naziv,brojIgraca,maxBrojIgraca,boja)
    {
        let slovo = "A";
        let broj = this.j+1;
        this.maxBrojIgraca = maxBrojIgraca;
        //console.log(this.brojIgraca);
        if(brojIgraca + this.brojIgraca > this.maxBrojIgraca)
            alert("BOI FUCK OFF");
        else
        {
            this.igra = naziv;
            this.boja = boja;
            this.brojIgraca += brojIgraca;
            this.container.innerHTML = slovo.substring(0, slovo.length - 1) + String.fromCharCode(slovo.charCodeAt(slovo.length - 1) + this.i) + ", " + broj + "<br>" + this.igra+ ", " + this.brojIgraca;
            this.container.style.backgroundColor = this.vratiBoji();
            this.buttonsAdd(this.container);
        }
    }

    isprazniSto()
    {
        let slovo = "A";
        let broj = this.j+1;
        this.maxBrojIgraca = 0;
        this.igra = "";
        this.brojIgraca = 0;
        this.boja = "";
        this.container.innerHTML=slovo.substring(0, slovo.length - 1) + String.fromCharCode(slovo.charCodeAt(slovo.length - 1) + this.i) + ", " + broj + "<br> Prazno, " + this.brojIgraca;
        this.container.style.backgroundColor = this.vratiBoji();
        this.buttonsAdd(this.container);
    }
    
    buttonsAdd(host)
    {
        let divDugmadi = document.createElement("div");
        divDugmadi.className = "tableDugme";
        let dugme = document.createElement("button");
        dugme.innerHTML = "Isprazni";
        divDugmadi.appendChild(dugme);
        let dugmeAzuriraj = document.createElement("button");
        dugmeAzuriraj.innerHTML = "Azuriraj";
        divDugmadi.appendChild(dugmeAzuriraj);
        host.appendChild(divDugmadi);

        dugme.onclick = (ev)=>
        {
            this.isprazniSto();
        }
        dugmeAzuriraj.onclick = (ev)=>
        {
            var broj = parseInt(prompt("Koliko novih igraca? (moze negativan broj za oduzimanje)"));
            this.azurirajSto(this.igra,broj,this.maxBrojIgraca);

        }

    }
}