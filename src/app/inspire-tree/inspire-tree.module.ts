import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InspireTreeComponent } from './inspire-tree.component';
import { InspireTreeNodesComponent } from './inspire-tree-nodes.component';

/**
 * Inspire Tree module. Exposes inspire-tree component and
 * contains related internal-use components.
 */
@NgModule({
    declarations: [
        InspireTreeComponent,
        InspireTreeNodesComponent
    ],
    imports: [ BrowserModule ],
    exports: [ InspireTreeComponent ]
})
export class InspireTreeModule {}
