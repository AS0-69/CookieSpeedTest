using System;

namespace Cookie.Api.Models
{
    public class GameH
    {
        public int Id { get; set; }
        public string Pseudo { get; set; } = string.Empty;
        public double TempsMoyen { get; set; }
        public double MeilleurTemps { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
    }
}