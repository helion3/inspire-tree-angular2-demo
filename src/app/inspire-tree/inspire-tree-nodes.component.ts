import { Component, Input } from '@angular/core';

/**
 * Recursive nodes component.
 */
@Component({
    selector: '[inspire-tree-nodes]',
    template: `
        <li
            *ngFor="let node of nodes"
            [ngClass]="{
                collapsed: node.collapsed(),
                expanded: !node.collapsed(),
                focused: node.focused(),
                folder: node.children,
                hidden: node.hidden() || node.removed(),
                leaf: !node.children,
                selected: node.selected()
            }">
            <div class="title-wrap">
                <a
                    class="toggle icon"
                    (click)="node.toggleCollapse()"
                    [ngClass]="node.collapsed() ? 'icon-expand' : 'icon-collapse'"
                    *ngIf="node.hasChildren()"></a>
                <a
                    class="title icon"
                    (click)="click(node, $event)"
                    [ngClass]="node.itree.icon || node.hasChildren() ? 'icon-folder' : 'icon-file-empty'">{{ node.text }}</a>
            </div>
            <div class="wholerow"></div>
            <ol inspire-tree-nodes [nodes]="node.children" [tree]="tree"></ol>
        </li>
    `
})
export class InspireTreeNodesComponent {
    // An array of nodes to render
    @Input() nodes;

    // A pointer to the tree instance for API calls
    @Input() tree;

    /**
     * Node click event handler.
     *
     * @param {TreeNode} node Clicked node.
     * @param {MouseEvent} event Mouse click event object.
     */
    click(node, event) {
        if (this.tree.config.multiselect) {
            this.tree.preventDeselection = event.metaKey || event.ctrlKey;
        }

        node.toggleSelect();
    }
}
