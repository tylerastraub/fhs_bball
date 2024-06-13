import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import teamData from '../../../assets/data/team-data.json'

export interface ISeasonInfo {
  year: string,
  champion: string,
  lastPlace: string,
  rookies: string
};

@Component({
  selector: 'app-seasons',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seasons.component.html',
  styleUrl: './seasons.component.css'
})
export class SeasonsComponent {
  minYear = 16;
  maxYear = 23;
  seasonData: Array<ISeasonInfo> = [];
  
  ngOnInit(): void {
    this.populate().then(() => {
      this.seasonData.sort((a, b) => parseInt(a.year.substring(2, 4)) - parseInt(b.year.substring(2, 4)));
    });
  }

  async populate(): Promise<void> {
    for(let i = this.minYear; i <= this.maxYear; ++i) {
      const year = "20" + i.toString() + "-" + (i + 1).toString();
      await this.getSeasonData(year);
    }
  }
  
  async getSeasonData(year: string): Promise<void> {
    import("../../../assets/data/" + year + "/season-data.json").then(data => {
      let seasonInfo: ISeasonInfo = {year: year, champion: "", lastPlace: "", rookies: ""};
      for(let j in data["default"]) {
        let teamSeasonData = data["default"][j];
        if(teamSeasonData["playoffPlace"] === 1) {
          seasonInfo.champion = teamSeasonData["name"];
        }
        else if(teamSeasonData["playoffPlace"] === 12) {
          seasonInfo.lastPlace = teamSeasonData["name"];
        }
      }
      if(parseInt(year.substring(2, 4)) > 17) {
        for(let teamInfo of teamData) {
          if(teamInfo.from === year) {
            seasonInfo.rookies += (teamInfo.name + ", ");
          }
        }
      }

      if(seasonInfo.champion === '') seasonInfo.champion = '-';
      if(seasonInfo.lastPlace === '') seasonInfo.lastPlace = '-';
      if(seasonInfo.rookies.length === 0) seasonInfo.rookies += '-';
      else {seasonInfo.rookies = seasonInfo.rookies.substring(0, seasonInfo.rookies.length - 2)};

      this.seasonData.unshift(seasonInfo);
    }).catch((err) => {
      // todo: figure out why this doesn't print (angular catches the module import error)
      console.log("Error importing season data for this page! Error reason: ", err);
    });
  }
}
