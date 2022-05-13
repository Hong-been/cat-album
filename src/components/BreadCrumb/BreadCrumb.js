import Component from "../Component.js";

export default class BreadCrumbComponent extends Component {
	constructor({root, initState, onClick}) {
		super(`<nav class="Breadcrumb"></nav>`, initState);

		root.appendChild(this.element);
		this.element.addEventListener("click", onClick);
	}

	render() {
		this.element.innerHTML = "";
		this.state.depth.forEach((value, index) => {
			this.element.innerHTML += `<div id=${index}>${value.name}</div>`;
		});
	}
}
