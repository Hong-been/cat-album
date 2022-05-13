import Component from "../component.js";

export default class Modal extends Component {
	constructor({root, contentHtml}) {
		super(`<div class="Modal">${contentHtml}</div>`);

		root.appendChild(this.element);
	}
}
