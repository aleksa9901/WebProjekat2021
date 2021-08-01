export class BoardGame
{
    constructor(naziv,brojIgraca,tip)
    {
        this.naziv = naziv;
        this.brojIgraca = brojIgraca;
        this.tip = tip;
    }
    odrediBoju()
    {
        if(!this.tip)
        return "green";
        else
        return "red";
    }

    crtajDodavanjeIgre()
    {

    }
}