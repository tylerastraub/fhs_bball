import { Routes } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { TeamsComponent } from "../components/teams/teams.component";
import { PagenotfoundComponent } from "../components/pagenotfound/pagenotfound.component";

export const appRoutes: Routes = [
    {path: 'teams', component: TeamsComponent},
    {path: '', component: HomeComponent},
    {path: '**', component: PagenotfoundComponent}
  ];