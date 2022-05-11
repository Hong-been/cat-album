/*
type 3개중에 한개로 렌더링.
누르면 각각 다른 작업 수행.
*/
import Component from "../component.js";

export default class NodeComponent extends Component {
	constructor({initState, onClick}) {
		super(`<div class="Node"></div>`);
		this.state = initState;
		this.element.addEventListener("click", () => {
			onClick(this.state.node);
		});
		this.render();
	}

	render() {
		if (this.state.node.type === "FILE") {
			this.element.innerHTML = `
            <img src="./assets/file.png" alt="사진"></img>
            <div class="title">${this.state.node.name}</div>`;
		} else if (this.state.node.type === "DIRECTORY") {
			this.element.innerHTML = `
            <img src="./assets/directory.png" alt="파일"></img>
            <div class="title">${this.state.node.name}</div>`;
		} else {
			throw Error("Node type mismatched!");
		}
	}
}
