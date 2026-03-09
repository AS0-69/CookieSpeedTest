import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Game } from './pages/game/game';
import { Result } from './pages/result/result';
import { Scores } from './pages/scores/scores';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'game', component: Game },
  { path: 'result/:id', component: Result },
  { path: 'scores', component: Scores },
  { path: '**', redirectTo: '' }
];