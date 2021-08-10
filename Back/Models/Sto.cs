using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Back.Models
{   
    [Table("Sto")]
    public class Sto
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }
        
        [Column("I")]
        public int I { get; set; }
        
        [Column("J")]
        public int J {get;set;}
        [Column("Igra")]
        
        
        public BoardGame Igra { get; set; }

        [Column("BrojIgraca")]
        public int BrojIgraca { get; set; }
        [Column("MaxBrojIgraca")]
        public int MaxBrojIgraca {get;set;}

        [Column("Boja")]
        public string Boja { get; set; }

        [Column("PlayingPlace")]
        [JsonIgnore]
        public Igraonica PlayingPlace {get;set;}


    }
}