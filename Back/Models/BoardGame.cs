using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back.Models
{
    [Table("BoardGame")]
    public class BoardGame
    {
        [Key]
        [Column("ID")]
        public int ID {get;set;}
        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }
        [Column("BrojIgraca")]
        public int BrojIgraca { get; set; }
        [Column("Tip")]
        [MaxLength(255)]
        public string Tip { get; set; }
        [Column("PlayingPlace")]
        public Igraonica PlayingPlace {get;set;}
    }
}