import { NgModule } from "@angular/core";
import { OrdinalPipe } from "./ordinal";
import { SeasonYearPipe } from "./season-year-modify";

@NgModule({
    imports: [
      // dep modules
    ],
    declarations: [ 
      OrdinalPipe,
      SeasonYearPipe,
    ],
    exports: [
      OrdinalPipe,
      SeasonYearPipe,
    ]
  })
  export class ApplicationPipesModule {}