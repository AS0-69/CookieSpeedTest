import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil implements OnInit {
  pseudo: string | null = null;
  pseudoSaisi: string = '';
  messageDeconnexion: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() { this.pseudo = sessionStorage.getItem('pseudo'); }

  validerPseudo() {
    if (this.pseudoSaisi.trim()) {
      sessionStorage.setItem('pseudo', this.pseudoSaisi);
      this.pseudo = this.pseudoSaisi;
      this.messageDeconnexion = false;
    }
  }

  jouer() { this.router.navigate(['/game']); }
  voirScores() { this.router.navigate(['/scores']); }
  
  quitter() {
    sessionStorage.removeItem('pseudo');
    this.pseudo = null;
    this.pseudoSaisi = '';
    this.messageDeconnexion = true;
  }
}