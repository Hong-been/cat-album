/*
[
  {
  "id": "1",
  "name": "노란고양이",
  "type": "DIRECTORY",
  "filePath": null,
  "parent": null
  },
  {
  "id": "3",
  "name": "까만고양이",
  "type": "DIRECTORY",
  "filePath": null,
  "parent": null
  },]
*/
import Component from "../component.js";
import NodeComponent from "../Node/Node.js";

export default class NodesComponent extends Component {
	constructor({root, initState, onClick}) {
		super(`<div class="Nodes"></div>`, initState);
		root.appendChild(this.element);

		this.onClick = onClick;
	}

	render() {
		this.element.innerHTML = "";

		if (!this.state.isRoot) {
			const node = new NodeComponent({
				initState: {node: {type: "PREV"}},
				onClick: this.onClick,
			});
			node.attachTo("beforeend", this.element);
		}

		this.state.nodes.forEach((nodeData) => {
			const node = new NodeComponent({
				initState: {node: nodeData},
				onClick: this.onClick,
			});
			node.attachTo("beforeend", this.element);
		});
	}
}
