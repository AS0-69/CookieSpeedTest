using Microsoft.AspNetCore.Mvc;
using Cookie.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Cookie.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly CookieDbContext _context;

        public GameController(CookieDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetScores()
        {
            var scores = _context.GamesH.OrderBy(g => g.TempsMoyen).ToList();
            return Ok(scores);
        }

        [HttpPost]
        public IActionResult SaveGame([FromBody] GameSubmission payload)
        {
            var newGame = new GameH
            {
                Pseudo = payload.Pseudo,
                MeilleurTemps = payload.MeilleurTemps,
                TempsMoyen = payload.TempsMoyen
            };

            _context.GamesH.Add(newGame);
            _context.SaveChanges(); 

            foreach (var click in payload.Clicks)
            {
                var newClick = new GameD
                {
                    GameHId = newGame.Id, 
                    NbClick = click.NbClick,
                    TempsClick = click.TempsClick
                };
                _context.GamesD.Add(newClick);
            }

            _context.SaveChanges(); 

            return Ok(new { 
                message = "Partie enregistrée", 
                gameId = newGame.Id 
            });
        }

        [HttpGet("{id}")]
        public IActionResult GetGameResult(int id)
        {
            var game = _context.GamesH.FirstOrDefault(g => g.Id == id);
            if (game == null) return NotFound();

            var clicks = _context.GamesD.Where(c => c.GameHId == id).OrderBy(c => c.NbClick).ToList();

            var globalRank = _context.GamesH.Count(g => g.TempsMoyen < game.TempsMoyen) + 1;
            var playerRank = _context.GamesH.Count(g => g.Pseudo == game.Pseudo && g.TempsMoyen < game.TempsMoyen) + 1;

            return Ok(new {
                Game = game,
                Clicks = clicks,
                GlobalRank = globalRank,
                PlayerRank = playerRank
            });
        }
    }

    public class GameSubmission
    {
        public string Pseudo { get; set; } = string.Empty;
        public double MeilleurTemps { get; set; }
        public double TempsMoyen { get; set; }
        public List<ClickData> Clicks { get; set; } = new List<ClickData>();
    }

    public class ClickData
    {
        public int NbClick { get; set; }
        public double TempsClick { get; set; }
    }
}