import Component from "../Component.js";

export default class Modal extends Component {
	constructor(root, contentHtml, initState) {
		super(`<div class="Modal">${contentHtml}</div>`, initState);

		root.appendChild(this.element);
	}
}
