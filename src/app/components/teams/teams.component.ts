import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import teamData from '../../../assets/data/team-data.json'

@Component({
  selector: 'app-teams',
  standalone: true,
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css',
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class TeamsComponent {
  sortAscending = false;
  lastColumnSelected = "";

  sort(column: string) {
    let coefficient = 1;

    if(column != this.lastColumnSelected) {
      this.sortAscending = false;
    }
    this.lastColumnSelected = column;
    if(this.sortAscending === true) {
      coefficient = -1;
    }

    switch(column) {
      case "name": {
        this.teams.sort((a, b) => a.name < b.name ? 1 * coefficient : a.name > b.name ? -1 * coefficient : 0)
        break;
      }
      case "from": {
        this.teams.sort((a, b) => a.from < b.from ? 1 * coefficient : a.from > b.from ? -1 * coefficient : 0)
        break;
      }
      case "to": {
        this.teams.sort((a, b) => a.to < b.to ? 1 * coefficient : a.to > b.to ? -1 * coefficient : 0)
        break;
      }
      case "wins": {
        this.teams.sort((a, b) => a.wins < b.wins ? 1 * coefficient : a.wins > b.wins ? -1 * coefficient : 0)
        break;
      }
      case "losses": {
        this.teams.sort((a, b) => a.losses < b.losses ? 1 * coefficient : a.losses > b.losses ? -1 * coefficient : 0)
        break;
      }
      case "ties": {
        this.teams.sort((a, b) => a.ties < b.ties ? 1 * coefficient : a.ties > b.ties ? -1 * coefficient : 0)
        break;
      }
      case "winPercent": {
        this.teams.sort((a, b) => a.winPercent < b.winPercent ? 1 * coefficient : a.winPercent > b.winPercent ? -1 * coefficient : 0)
        break;
      }
      case "divisionTitles": {
        this.teams.sort((a, b) => a.divisionTitles < b.divisionTitles ? 1 * coefficient : a.divisionTitles > b.divisionTitles ? -1 * coefficient : 0)
        break;
      }
      case "playoffs": {
        this.teams.sort((a, b) => a.playoffs < b.playoffs ? 1 * coefficient : a.playoffs > b.playoffs ? -1 * coefficient : 0)
        break;
      }
      case "finalsAppearances": {
        this.teams.sort((a, b) => a.finalsAppearances < b.finalsAppearances ? 1 * coefficient : a.finalsAppearances > b.finalsAppearances ? -1 * coefficient : 0)
        break;
      }
      case "championships": {
        this.teams.sort((a, b) => a.championships < b.championships ? 1 * coefficient : a.championships > b.championships ? -1 * coefficient : 0)
        break;
      }
    }
    
    this.sortAscending = !this.sortAscending;
  }

  get teams() {
    return teamData;
  }
}