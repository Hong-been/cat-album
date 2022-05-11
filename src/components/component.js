export default class Component {
	constructor(htmlString) {
		const template = document.createElement("template");
		template.innerHTML = htmlString;
		this.element = template.content.firstElementChild;
	}

	// 'beforebegin': Before the targetElement itself.
	// 'afterbegin': Just inside the targetElement, before its first child.
	// 'beforeend': Just inside the targetElement, after its last child.
	// 'afterend': After the targetElement itself.
	attachTo(position = "afterbegin", parent) {
		parent.insertAdjacentElement(position, this.element);
	}

	removeFrom(parent) {
		if (parent !== this.element.parentElement) {
			throw Error("parent mismatched!!");
		}
		parent.removeChile(this.element);
	}
}
