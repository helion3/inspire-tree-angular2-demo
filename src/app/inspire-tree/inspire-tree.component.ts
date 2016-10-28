import { ChangeDetectorRef, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Http, Response } from '@angular/http';
import InspireTree from 'inspire-tree/dist/inspire-tree-core';
import { InspireTreeNodesComponent } from './inspire-tree-nodes.component';

/**
 * Inspire Tree component. Initializes InspireTree on a given element.
 */
@Component({
    selector: 'inspire-tree',
    viewProviders: [ InspireTreeNodesComponent ],

    // Allow external css
    encapsulation: ViewEncapsulation.None,

    // Grab the CSS provided by inspire-tree
    styleUrls: [ '../../../node_modules/inspire-tree/dist/inspire-tree.css' ],
    template: `
        <div class="inspire-tree" tabindex="-1">
            <ol inspire-tree-nodes [nodes]="nodes" [tree]="tree"></ol>
        </div>
    `
})
export class InspireTreeComponent {
    // Keep a reference to the tree instance
    tree: any;

    // Keep a reference to the tree nodes so Angular can render them.
    nodes: any;

    /**
     * Initialize InspireTree on the component's target element.
     *
     * @param {ElementRef} el An HTML element.
     * @param {Http} http HTTP service for loading JSON data.
     * @param {ChangeDetectorRef} ref Change detection service/
     */
    constructor(el: ElementRef, http: Http, ref: ChangeDetectorRef) {
        this.tree = new InspireTree({
            // Set a data loader. Since we're dynamically loading data, and angular2
            // uses oberservables which don't directly return the JSON, we'll use the callback method.
            data: function(node, resolve, reject) {
                http.get('/assets/full.json').subscribe(
                    data => resolve(data.json()),
                    error =>  reject(error));
            }
        });

        // Listen for the model loaded event
        this.tree.on('model.loaded', () => {
            // Sync tree nodes with our internal var (so templates have access)
            this.nodes = this.tree.nodes();

            // Angular can't see this change, so we have to tell it
            ref.markForCheck();
        });
    }
}
