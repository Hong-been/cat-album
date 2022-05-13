import Component from "../component.js";

export default class BreadCrumbComponent extends Component {
	constructor({root, initState}) {
		super(`<nav class="Breadcrumb"></nav>`, initState);

		root.appendChild(this.element);
	}

	render() {
		this.element.innerHTML = "";
		this.state.path.forEach((node) => {
			this.element.innerHTML += `<div>${node}</div>`;
		});
	}
}
