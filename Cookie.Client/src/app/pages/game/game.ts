import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class Game implements OnInit {
  pseudo: string | null = '';
  gameStarted: boolean = false;
  currentClick: number = 0;
  maxClicks: number = 10;
  
  lastClickTime: number = 0;
  clicksData: { nbClick: number, tempsClick: number }[] = [];

  topPos: number = 50; 
  leftPos: number = 50;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.pseudo = sessionStorage.getItem('pseudo');
    if (!this.pseudo) this.router.navigate(['/']);
  }

  cliquerCible() {
    const now = performance.now();

    if (!this.gameStarted) {
      this.gameStarted = true;
      this.currentClick = 1;
      this.lastClickTime = now;
      this.deplacerCible();
    } else {
      const chrono = (now - this.lastClickTime) / 1000;
      this.clicksData.push({ nbClick: this.currentClick, tempsClick: Number(chrono.toFixed(2)) });
      
      this.currentClick++;
      this.lastClickTime = now;

      if (this.currentClick > this.maxClicks) {
        this.envoyerPartie();
      } else {
        this.deplacerCible();
      }
    }
  }

  deplacerCible() {
    this.topPos = Math.floor(Math.random() * 75) + 10;
    this.leftPos = Math.floor(Math.random() * 75) + 10;
  }

  envoyerPartie() {
    const best = Math.min(...this.clicksData.map(c => c.tempsClick));
    const avg = this.clicksData.reduce((a, b) => a + b.tempsClick, 0) / this.clicksData.length;

    const payload = {
      pseudo: this.pseudo,
      meilleurTemps: Number(best.toFixed(2)),
      tempsMoyen: Number(avg.toFixed(2)),
      clicks: this.clicksData
    };

    this.http.post<any>('http://localhost:5091/api/game', payload).subscribe({
      next: (response) => this.router.navigate(['/result', response.gameId]),
      error: (err) => alert("Erreur de connexion dotnet")
    });
  }
}