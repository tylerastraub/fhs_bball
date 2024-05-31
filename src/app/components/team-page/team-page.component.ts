import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApplicationPipesModule } from '../../pipes/application-pipes.module';

import teamData from "../../../assets/data/team-data.json";

const numTeams = 12;

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [RouterModule, CommonModule, ApplicationPipesModule],
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.css',
})
export class TeamPageComponent {
  teamId = "";
  year = "";
  seasonData = {
    "id": "",
    "name": "",
    "wins": "",
    "losses": "",
    "ties": "",
    "regSeasonPlace": "",
    "division": "",
    "divisionPlace": "",
    "divisionWins": "",
    "divisionLosses": "",
    "divisionTies": "",
    "categoriesWon": "",
    "categoriesLost": "",
    "categoriesTied": "",
    "pointsFor": "",
    "pointsAgainst": "",
    "playoffWins": "",
    "playoffLosses": "",
    "playoffPlace": "",
    "playoffWinnings": "",
    "winStreak": "",
    "lossStreak": ""
  };
  maxYear = "";
  minYear = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.params.subscribe(params => {
      this.teamId = params["id"];
      this.year = params["year"];
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.getTeamData();
    for(let team of teamData) {
      if(team.id === this.teamId) {
        this.minYear = team.from;
        this.maxYear = team.to;
        break;
      }
    }
  }

  getTeamData(): void {
    this.teamId = String(this.route.snapshot.paramMap.get('id'));
    this.year = String(this.route.snapshot.paramMap.get('year'));
    import("../../../assets/data/" + this.year + "/season-data.json").then(data => {
      for(let i = 0; i < numTeams; i++) {
        let team = data["default"][i];
        if(team["id"] === this.teamId) {
          for(let key in team) {
            this.seasonData.id = team["id"];
            this.seasonData.name = team["name"];
            this.seasonData.wins = team["wins"];
            this.seasonData.losses = team["losses"];
            this.seasonData.ties = team["ties"];
            this.seasonData.regSeasonPlace = team["regSeasonPlace"];
            this.seasonData.division = team["division"];
            this.seasonData.divisionPlace = team["divisionPlace"];
            this.seasonData.divisionWins = team["divisionWins"];
            this.seasonData.divisionLosses = team["divisionLosses"];
            this.seasonData.divisionTies = team["divisionTies"];
            this.seasonData.categoriesWon = team["categoriesWon"];
            this.seasonData.categoriesLost = team["categoriesLost"];
            this.seasonData.categoriesTied = team["categoriesTied"];
            this.seasonData.pointsFor = team["pointsFor"];
            this.seasonData.pointsAgainst = team["pointsAgainst"];
            this.seasonData.playoffWins = team["playoffWins"];
            this.seasonData.playoffLosses = team["playoffLosses"];
            this.seasonData.playoffPlace = team["playoffPlace"];
            this.seasonData.playoffWinnings = team["playoffWinnings"];
            this.seasonData.winStreak = team["winStreak"];
            this.seasonData.lossStreak = team["lossStreak"];
          }
          break;
        }
      }
    }).catch((err) => {
      // todo: figure out why this doesn't print (angular catches the module import error)
      console.log("Error importing season data for this page! Error reason: ", err);
    });
  }
}
