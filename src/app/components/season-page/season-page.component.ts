import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ApplicationPipesModule } from '../../pipes/application-pipes.module';

import teamData from '../../../assets/data/team-data.json'

export interface IStandingsEntry {
  id: string,
  name: string,
  regSeasonPlace: number,
  divisionPlace: number,
  wins: number,
  losses: number,
  ties: number,
  winPercent: number,
  categoriesWon: number,
  categoriesLost: number,
  categoriesTied: number,
  pointsFor: number,
  pointsAgainst: number,
  divisionWins: number,
  divisionLosses: number,
  divisionTies: number,
};

export interface IStatsEntry {
  id: string,
  name: string,
  fg: number,
  ft: number,
  threePtr: number,
  reb: number,
  ast: number,
  stl: number,
  blk: number,
  to: number,
  pts: number
};

@Component({
  selector: 'app-season-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ApplicationPipesModule],
  templateUrl: './season-page.component.html',
  styleUrl: './season-page.component.css'
})
export class SeasonPageComponent {
  sortAscending = false;
  lastColumnSelected = "";
  
  year = "";
  minYear = "2017-18";
  maxYear = "2023-24";
  regSeasonStandings: Array<IStandingsEntry> = [];
  divisionStandings: {[division: string]: IStandingsEntry[];} = {};
  regSeasonStats: Array<IStatsEntry> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.params.subscribe(params => {
      this.year = params["year"];
      this.getSeasonData().then(() => {
        this.lastColumnSelected = "";
        this.sortRegSeasonTable("place");
        for(let division in this.divisionStandings) {
          this.divisionStandings[division].sort((a, b) => a.divisionPlace - b.divisionPlace);
        }
      });
      this.getSeasonStats().then(() => {
        this.lastColumnSelected = "";
        this.sortStatsTable("name");
      })
    });
  }

  async getSeasonData(): Promise<void> {
    this.regSeasonStandings = [];
    this.divisionStandings = {};
    await import("../../../assets/data/" + this.year + "/season-data.json").then(data => {
      for(let i in data["default"]) {
        let team = data["default"][i];
        let entry: IStandingsEntry = {
          id: team["id"],
          name: team["name"],
          regSeasonPlace: team["regSeasonPlace"],
          divisionPlace: team["divisionPlace"],
          wins: team["wins"],
          losses: team["losses"],
          ties: team["ties"],
          winPercent: ((team["wins"] + team["ties"] * 0.5) / (team["wins"] + team["losses"] + team["ties"])),
          categoriesWon: team["categoriesWon"],
          categoriesLost: team["categoriesLost"],
          categoriesTied: team["categoriesTied"],
          pointsFor: team["pointsFor"],
          pointsAgainst: team["pointsAgainst"],
          divisionWins: team["divisionWins"],
          divisionLosses: team["divisionLosses"],
          divisionTies: team["divisionTies"]
        };
        this.regSeasonStandings.push(entry);
        if(this.divisionStandings[team["division"]] === undefined) {
          this.divisionStandings[team["division"]] = [];
        }
        this.divisionStandings[team["division"]].push(entry);
      }
    }).catch(() => {
      console.log("Error importing season data for this page!");
    });

  }
  
  async getSeasonStats(): Promise<void> {
    this.regSeasonStats = [];
    await import("../../../assets/data/" + this.year + "/season-stats.json").then(data => {
      for(let i in data["default"]) {
        let team = data["default"][i];
        let entry: IStatsEntry = {
          id: team["id"],
          name: team["name"],
          fg: team["FG%"],
          ft: team["FT%"],
          threePtr: team["3PM"],
          reb: team["REB"],
          ast: team["AST"],
          stl: team["STL"],
          blk: team["BLK"],
          to: team["TO"],
          pts: team["PTS"],
        }
        this.regSeasonStats.push({...entry});
      }
    }).catch(() => {
      console.log("Error importing season stats for this page!");
    });
  }

  sortRegSeasonTable(column: string) {
    let coefficient = 1;

    if(column != this.lastColumnSelected) {
      this.sortAscending = this.sortAscendingByDefault(column);
    }
    this.lastColumnSelected = column;
    if(this.sortAscending === true) {
      coefficient = -1;
    }

    switch(column) {
      case "place": {
        this.regSeason.sort((a, b) => a.regSeasonPlace < b.regSeasonPlace ? 1 * coefficient : a.regSeasonPlace > b.regSeasonPlace ? -1 * coefficient : 0)
        break;
      }
      case "name": {
        this.regSeason.sort((a, b) => a.name < b.name ? 1 * coefficient : a.name > b.name ? -1 * coefficient : 0)
        break;
      }
      case "wins": {
        this.regSeason.sort((a, b) => a.wins < b.wins ? 1 * coefficient : a.wins > b.wins ? -1 * coefficient : 0)
        break;
      }
      case "losses": {
        this.regSeason.sort((a, b) => a.losses < b.losses ? 1 * coefficient : a.losses > b.losses ? -1 * coefficient : 0)
        break;
      }
      case "ties": {
        this.regSeason.sort((a, b) => a.ties < b.ties ? 1 * coefficient : a.ties > b.ties ? -1 * coefficient : 0)
        break;
      }
      case "winPercent": {
        this.regSeason.sort((a, b) => a.winPercent < b.winPercent ? 1 * coefficient : a.winPercent > b.winPercent ? -1 * coefficient : 0)
        break;
      }
      case "categories": {
        this.regSeason.sort((a, b) => a.categoriesWon < b.categoriesWon ? 1 * coefficient : a.categoriesWon > b.categoriesWon ? -1 * coefficient : 0)
        break;
      }
      case "pointsScored": {
        this.regSeason.sort((a, b) => a.pointsFor < b.pointsFor ? 1 * coefficient : a.pointsFor > b.pointsFor ? -1 * coefficient : 0)
        break;
      }
      case "pointsAllowed": {
        this.regSeason.sort((a, b) => a.pointsAgainst < b.pointsAgainst ? 1 * coefficient : a.pointsAgainst > b.pointsAgainst ? -1 * coefficient : 0)
        break;
      }
    }
    
    this.sortAscending = !this.sortAscending;
  }
  
  sortStatsTable(column: string) {
    let coefficient = 1;

    if(column != this.lastColumnSelected) {
      this.sortAscending = this.sortAscendingByDefault(column);
    }
    this.lastColumnSelected = column;
    if(this.sortAscending === true) {
      coefficient = -1;
    }

    switch(column) {
      case "name": {
        this.regSeasonStats.sort((a, b) => a.name < b.name ? 1 * coefficient : a.name > b.name ? -1 * coefficient : 0)
        break;
      }
      case "fg": {
        this.regSeasonStats.sort((a, b) => a.fg < b.fg ? 1 * coefficient : a.fg > b.fg ? -1 * coefficient : 0)
        break;
      }
      case "ft": {
        this.regSeasonStats.sort((a, b) => a.ft < b.ft ? 1 * coefficient : a.ft > b.ft ? -1 * coefficient : 0)
        break;
      }
      case "threePtr": {
        this.regSeasonStats.sort((a, b) => a.threePtr < b.threePtr ? 1 * coefficient : a.threePtr > b.threePtr ? -1 * coefficient : 0)
        break;
      }
      case "reb": {
        this.regSeasonStats.sort((a, b) => a.reb < b.reb ? 1 * coefficient : a.reb > b.reb ? -1 * coefficient : 0)
        break;
      }
      case "ast": {
        this.regSeasonStats.sort((a, b) => a.ast < b.ast ? 1 * coefficient : a.ast > b.ast ? -1 * coefficient : 0)
        break;
      }
      case "stl": {
        this.regSeasonStats.sort((a, b) => a.stl < b.stl ? 1 * coefficient : a.stl > b.stl ? -1 * coefficient : 0)
        break;
      }
      case "blk": {
        this.regSeasonStats.sort((a, b) => a.blk < b.blk ? 1 * coefficient : a.blk > b.blk ? -1 * coefficient : 0)
        break;
      }
      case "to": {
        this.regSeasonStats.sort((a, b) => a.to < b.to ? 1 * coefficient : a.to > b.to ? -1 * coefficient : 0)
        break;
      }
      case "pts": {
        this.regSeasonStats.sort((a, b) => a.pts < b.pts ? 1 * coefficient : a.pts > b.pts ? -1 * coefficient : 0)
        break;
      }
    }
    
    this.sortAscending = !this.sortAscending;
  }

  sortAscendingByDefault(column: string) {
    switch(column) {
      case "place": {
        return true;
      }
      case "name": {
        return true;
      }
      case "wins": {
        return false;
      }
      case "losses": {
        return false;
      }
      case "ties": {
        return false;
      }
      case "winPercent": {
        return false;
      }
      case "categories": {
        return false;
      }
      case "pointsScored": {
        return false;
      }
      case "pointsAllowed": {
        return false;
      }
      case "to": {
        return true;
      }
      default:
        return false;
    }
  }

  get regSeason() {
    return this.regSeasonStandings;
  }

  get teams() {
    return teamData;
  }
}
