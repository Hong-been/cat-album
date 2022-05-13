import Component from "../Component.js";

export default class NodesComponent extends Component {
	constructor({root, initState, onClick}) {
		super(`<div class="Nodes"></div>`, initState);

		root.appendChild(this.element);
		this.element.addEventListener("click", (e) => {
			const node = e.target.closest(".Node");
			const {nodeId} = node.dataset;
			if (!nodeId) onClick({type: "PREV"});
			else {
				const node = this.state.nodes.find((node) => node.id === nodeId);
				onClick(node);
			}
		});
	}

	render() {
		this.element.innerHTML = "";

		if (!this.state.isRoot) {
			this.element.innerHTML += `
					<div class="Node">
						<img src="./assets/prev.png" alt="뒤로가기"></img>
					</div>`;
		}

		this.state.nodes.forEach((nodeData) => {
			const {type, name, id} = nodeData;
			if (type === "FILE" || type === "DIRECTORY") {
				const imgPath = type === "FILE" ? "file" : "directory";

				this.element.innerHTML += `
					<div class="Node" data-node-id=${id}>
						<img src="./assets/${imgPath}.png" alt="사진"></img>
            <div class="title">${name}</div>
					</div>`;
			} else {
				throw Error("Node type mismatched!");
			}
		});
	}
}
