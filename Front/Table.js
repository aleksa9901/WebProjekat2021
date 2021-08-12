export class Table
{
    constructor(i,j,igra, brojIgraca, maxBrojIgraca, boja)
    {
        this.ID = 0;
        this.i = i;
        this.j = j;
        this.igra = igra;
        this.brojIgraca = brojIgraca;
        this.maxBrojIgraca = maxBrojIgraca;
        this.boja = boja;
        this.container = null;
        this.idIgre = 0;
        this.idIgraonice = 0
    }
    vratiBoji()
    {
        //console.log(this.boja);
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
        host.appendChild(this.container);
    } 

    popuniSto(naziv,brojIgraca,maxBrojIgraca,boja,idigre)
    {
        
        let slovo = "A";
        let broj = this.j+1;
        this.maxBrojIgraca = maxBrojIgraca;
        //console.log(this.brojIgraca);
        if(brojIgraca + this.brojIgraca > this.maxBrojIgraca)
            alert("Previse Igraca");
        else
        {
            this.idIgre = idigre;
            this.igra = naziv; 
            this.boja = boja;
            this.brojIgraca += brojIgraca;
            this.container.innerHTML = slovo.substring(0, slovo.length - 1) + String.fromCharCode(slovo.charCodeAt(slovo.length - 1) + this.i) + ", " + broj + "<br>" + this.igra+ ", " + this.brojIgraca;
            this.container.style.backgroundColor = this.vratiBoji();
            this.buttonsAdd(this.container);
        }
    }

    dodajSto(naziv,brojIgraca,maxBrojIgraca,boja,idigre,idIgraonice)
    {
        //console.log(boja);
        fetch("https://localhost:5001/Igraonica/DodajSto/" + idigre +"/"+ idIgraonice,{method:"POST",
    
        headers:{
            "Content-Type" : "application/json" 
        },
        body:JSON.stringify({
            i : this.i,
            j : this.j,
            brojIgraca : brojIgraca,
            maxBrojIgraca : maxBrojIgraca,
            boja : boja
        })}).then(resp => {
            if(resp.ok)
            {   
                resp.json().then(val=>{
                    this.ID = val.id;
                })
                let slovo = "A";
                let broj = this.j+1;
                this.maxBrojIgraca = maxBrojIgraca;
                //console.log(this.brojIgraca);
                this.idIgre = idigre;
                this.igra = naziv;
                this.boja = boja;
                this.brojIgraca += brojIgraca;
                this.container.innerHTML = slovo.substring(0, slovo.length - 1) + String.fromCharCode(slovo.charCodeAt(slovo.length - 1) + this.i) + ", " + broj + "<br>" + this.igra+ ", " + this.brojIgraca;
                this.container.style.backgroundColor = this.vratiBoji();
                this.buttonsAdd(this.container);
            }
            else if(resp.status == 400)
            {
                alert("Greska prilikom dodavanje igre");
            }
        });
        let slovo = "A";
        let broj = this.j+1;
        this.maxBrojIgraca = maxBrojIgraca;
        //console.log(this.brojIgraca);
        if(brojIgraca + this.brojIgraca > this.maxBrojIgraca)
            alert("Previse ljudi");
        else
        {
            this.idIgre = idigre;
            this.igra = naziv;
            this.boja = boja;
            this.brojIgraca += brojIgraca;
            this.container.innerHTML = slovo.substring(0, slovo.length - 1) + String.fromCharCode(slovo.charCodeAt(slovo.length - 1) + this.i) + ", " + broj + "<br>" + this.igra+ ", " + this.brojIgraca;
            this.container.style.backgroundColor = this.vratiBoji();
            this.buttonsAdd(this.container);
        }
    }


    azurirajSto(brojI)
    {
        let slovo = "A";
        let broj = this.j+1;
        //console.log(this.brojIgraca);
        if(brojI + this.brojIgraca > this.maxBrojIgraca)
            alert("Previse Ljudi");
        else
        {
            fetch("https://localhost:5001/Igraonica/IzmeniSto/",{method:"PUT",headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
            id: this.ID,
            i : this.i,
            j : this.j,
            brojIgraca : brojI + this.brojIgraca,
            maxBrojIgraca : this.maxBrojIgraca,
            boja : this.boja
        })}).then(resp => {
            if(resp.ok)
            {   
                this.brojIgraca += brojI;
                this.container.innerHTML = slovo.substring(0, slovo.length - 1) + String.fromCharCode(slovo.charCodeAt(slovo.length - 1) + this.i) + ", " + broj + "<br>" + this.igra+ ", " + this.brojIgraca;
                this.container.style.backgroundColor = this.vratiBoji();
                this.buttonsAdd(this.container);
            }
            else if(resp.status == 400)
            {
                alert("Greska prilikom menjanje stola");
            }
        });
        }
    }

    isprazniSto()
    {
        fetch("https://localhost:5001/Igraonica/IzbrisiSto/" + this.ID,{method:"DELETE"}).then(resp => {
            if(resp.ok)
            {   
                let slovo = "A";
                let broj = this.j+1;
                this.maxBrojIgraca = 0;
                this.igra = "";
                this.brojIgraca = 0;
                this.boja = "";
                this.parent.updateSelekcije();
                this.container.innerHTML=slovo.substring(0, slovo.length - 1) + String.fromCharCode(slovo.charCodeAt(slovo.length - 1) + this.i) + ", " + broj + "<br> Prazno, " + this.brojIgraca;
                this.container.style.backgroundColor = this.vratiBoji();
                this.buttonsAdd(this.container);
            }
            else if(resp.status == 400)
            {
                alert("Greska prilikom brisanja stola");
            }
        });
        
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
            this.azurirajSto(broj);

        }

    }
}