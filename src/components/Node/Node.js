import Component from "../Component.js";

export default class NodeComponent extends Component {
	constructor({initState}) {
		super(`<div class="Node"></div>`, initState);

		this.render();
	}

	render() {
		const {type, name, id} = this.state.node;
		if (type === "FILE") {
			this.element.setAttribute("data-node-type", type);
			this.element.setAttribute("data-node-name", name);
			this.element.setAttribute("data-node-id", id);

			this.element.innerHTML = `
            <img src="./assets/file.png" alt="사진"></img>
            <div class="title">${name}</div>`;
		} else if (type === "DIRECTORY") {
			this.element.setAttribute("data-node-type", type);
			this.element.setAttribute("data-node-name", name);
			this.element.setAttribute("data-node-id", id);

			this.element.innerHTML = `
            <img src="./assets/directory.png" alt="파일"></img>
            <div class="title">${name}</div>`;
		} else if (type === "PREV") {
			this.element.innerHTML = `
            <img src="./assets/prev.png" alt="뒤로가기"></img>`;
		} else {
			throw Error("Node type mismatched!");
		}
	}
}
