import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { InspireTreeModule } from './inspire-tree/inspire-tree.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpModule,
        InspireTreeModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
