import Component from "../Component.js";
import NodeComponent from "../Node/Node.js";

export default class NodesComponent extends Component {
	constructor({root, initState, onClick}) {
		super(`<div class="Nodes"></div>`, initState);

		root.appendChild(this.element);
		this.element.addEventListener("click", (e) => {
			const node = e.target.closest(".Node");
			if (!node) return;

			onClick(node.dataset);
		});
		this.onClick = onClick;
	}

	render() {
		this.element.innerHTML = "";

		if (!this.state.isRoot) {
			const node = new NodeComponent({
				initState: {node: {type: "PREV"}},
			});
			node.attachTo("beforeend", this.element);
		}

		this.state.nodes.forEach((nodeData) => {
			const node = new NodeComponent({
				initState: {node: nodeData},
			});
			node.attachTo("beforeend", this.element);
		});
	}
}
