/*

*/
import Component from "../component.js";

export default class BreadCrumbComponent extends Component{
    constructor(root){
        super(`
        <nav class="Breadcrumb">
        <div>root</div>
        </nav>
        `)

        root.appendChild(this.element);
    }

    
}
