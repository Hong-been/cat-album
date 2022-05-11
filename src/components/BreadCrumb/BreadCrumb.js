/*

*/
import Component from "../component.js";

export default class BreadCrumbComponent extends Component {
	constructor({root, initState}) {
		super(`<nav class="Breadcrumb"></nav>`);

		root.appendChild(this.element);
		this.state = initState;
		this.render();
	}

	setState(newState) {
		console.log(newState);
		this.state = newState;
		this.render();
	}

	render() {
		this.element.innerHTML = "";
		this.state.path.forEach((node) => {
			this.element.innerHTML += `<div>${node}</div>`;
		});
	}
}
