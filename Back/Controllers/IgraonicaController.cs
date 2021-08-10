using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Back.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IgraonicaController : ControllerBase
    {
        public IgraonicaContext Context{get;set;}
        public IgraonicaController(IgraonicaContext context)
        {
            Context = context;
        }

        [Route("DodajIgraonicu")]
        [HttpPost]

        public async Task<int> DodajIgraonicu(Igraonica playingPlace)
        {
            Context.Igraonice.Add(playingPlace);
             await Context.SaveChangesAsync();
             int id = playingPlace.ID;
             return id;
        }

        [Route("PreuzmiIgraonice")]
        [HttpGet]

        public async Task<List<Igraonica>> PreuzmiIgraonice()
        {
            return await Context.Igraonice.Include(p=>p.Igre).Include(p=>p.Stolovi).ToListAsync();
        }

        [Route("IzbrisiIgru/{id}")]
        [HttpDelete]
        public async Task IzbrisiIgru(int id)
        {
            var game = await Context.Igrice.FindAsync(id);
            Context.Remove(game);
            await Context.SaveChangesAsync();
        }

        [Route("DodajIgru/{id}")]
        [HttpPost]

        public async Task<int> DodajIgru(int id,[FromBody] BoardGame igra)
        {
            var cale = await Context.Igraonice.FindAsync(id);
            igra.PlayingPlace = cale;
            Context.Igrice.Add(igra);
            await Context.SaveChangesAsync();
            int idkrajnji = igra.ID;
            return idkrajnji;
        }

        [Route("DodajSto/{idIgre}/{idIgraonice}")]
        [HttpPost]

        public async Task<int> DodajSto(int idIgre, int idIgraonice,[FromBody] Sto table)
        {
            var igra = await Context.Igrice.FindAsync(idIgre);
            var igraonice = await Context.Igraonice.FindAsync(idIgraonice);
            table.PlayingPlace = igraonice;
            table.Igra = igra;
            Context.Stolovi.Add(table);
            await Context.SaveChangesAsync();
            int id = table.ID;
            return id;
        }

        [Route("IzmeniSto")]
        [HttpPut]

        public async Task IzmeniSto([FromBody] Sto table)
        {
            Context.Update<Sto>(table);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiSto/{id}")]
        [HttpDelete]

        public async Task IzbrsiSto(int id)
        {
            var sto = await Context.Stolovi.FindAsync(id);
            Context.Remove(sto);
            await Context.SaveChangesAsync();
        }


        

    }
}
