import { Routes } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { TeamsComponent } from "../components/teams/teams.component";
import { PagenotfoundComponent } from "../components/pagenotfound/pagenotfound.component";
import { TeamPageComponent } from "../components/team-page/team-page.component";

export const appRoutes: Routes = [
    {path: 'teams', component: TeamsComponent},
    {path: 'teams/:id/:year', component: TeamPageComponent},
    {path: '', component: HomeComponent},
    {path: '**', component: PagenotfoundComponent}
  ];