using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using safuillin.webapi.db.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace safuillin.webapi.db.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ElectronicModelController : Controller
    {
        // GET: ElectronicModelController
        private ElectronicModelContext? _electronicDB;
        public ElectronicModelController(ElectronicModelContext _context)
        {
            _electronicDB = _context;
        }
        // GET: api/<MusicModelController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ElectronicModel>>> Get()
        {
            return await _electronicDB._ElectronicModelContext.ToListAsync();
        }

        // GET api/<MusicModelController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ElectronicModel>> Get(int id)
        {
            ElectronicModel model =
                await _electronicDB._ElectronicModelContext.FirstOrDefaultAsync(x => x.Id == id);
            if (model == null)
                return NotFound();
            return model;
        }

        // POST api/<MusicModelController>
        [HttpPost]
        public async Task<ActionResult<ElectronicModel>> Post(ElectronicModel elModel)
        {
            if (elModel == null)
                return BadRequest();
            _electronicDB._ElectronicModelContext.Add(elModel);
            await _electronicDB.SaveChangesAsync();
            return Ok(elModel);
        }

        // PUT api/<MusicModelController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ElectronicModel>> Put(ElectronicModel eLModel)
        {
            if (eLModel == null)
                return BadRequest();
            if (!_electronicDB._ElectronicModelContext.Any(x => x.Id == eLModel.Id))
            {
                return NotFound();
            }
            _electronicDB._ElectronicModelContext.Update(eLModel);
            await _electronicDB.SaveChangesAsync();
            return Ok(eLModel);
        }

        // DELETE api/<MusicModelController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ElectronicModel>> Delete(int id)
        {
            ElectronicModel elModel =
                await _electronicDB._ElectronicModelContext.FirstOrDefaultAsync(x => x.Id == id);
            if (elModel == null)
                return NotFound();
            _electronicDB._ElectronicModelContext.Remove(elModel);
            await _electronicDB.SaveChangesAsync();
            return Ok(elModel);
        }
    }
}

