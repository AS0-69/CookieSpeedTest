import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IGameResult } from '../../models/game';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.html',
  styleUrl: './result.css'
})
export class Result implements OnInit {
  resultData!: IGameResult;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      
      this.http.get<IGameResult>(`http://localhost:5091/api/game/${id}`).subscribe({
        next: (data) => this.resultData = data,
        error: (err) => console.error(err)
      });
    }
  }

  retourAccueil() { this.router.navigate(['/']); }
}