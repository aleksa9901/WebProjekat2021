using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Models;
using Microsoft.AspNetCore.Mvc;
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

        

    }
}
