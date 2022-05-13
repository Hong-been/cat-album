export default class Component {
	constructor(htmlString, initState) {
		const template = document.createElement("template");
		template.innerHTML = htmlString;
		this.element = template.content.firstElementChild;

		this.state = initState;
		this.setState = this.setState.bind(this);
	}

	setState(newState) {
		this.state = newState;
		this.render && this.render();
	}

	// 'beforebegin','afterbegin','beforeend','afterend'
	attachTo(position = "afterbegin", parent) {
		parent.insertAdjacentElement(position, this.element);
	}
}
