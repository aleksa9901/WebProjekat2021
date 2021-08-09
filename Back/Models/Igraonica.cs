using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back.Models
{
   [Table("Igraonica")] 
    public class Igraonica
    {  
        
        [Key]
        [Column("ID")]    
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }

        [Column("M")]
        public int M { get; set; }

        [Column("N")]
        public int N { get; set; }
    
        public virtual List<Sto> Stolovi {get;set;}

        public virtual List<BoardGame> Igre {get;set;}


    }
}