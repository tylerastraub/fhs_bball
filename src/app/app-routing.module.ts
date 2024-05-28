import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './shared/routes';

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
