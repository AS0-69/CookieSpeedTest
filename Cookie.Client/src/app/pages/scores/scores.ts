import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IGameH } from '../../models/game';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scores.html',
  styleUrl: './scores.css'
})
export class Scores implements OnInit {
  tousLesScores: IGameH[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<IGameH[]>('http://localhost:5091/api/game').subscribe({
      next: (data) => this.tousLesScores = data,
      error: (err) => console.error("Erreur :", err)
    });
  }

  voirDetails(id: number) { this.router.navigate(['/result', id]); }
  retourAccueil() { this.router.navigate(['/']); }
}