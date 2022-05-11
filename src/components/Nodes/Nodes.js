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
import {fetchDirectory, fetchFile} from "../../api/api.js";

export default class NodesComponent extends Component {
	// root,nodeList,path,fetchCallback
	constructor({root, initState, onClick}) {
		super(`<div class="Nodes"></div>`);

		this.onClick = onClick;
		root.appendChild(this.element);

		this.state = initState;
		// this.nodes = async () => {
		// 	await fetchDirectory();
		// };
		this.render();
	}

	setState(newState) {
		this.state = newState;
		this.render();
	}

	render() {
		const handlePrevClick = async () => {
			const prevPath = this.state.path.slice(0, -1).join("/");
			await fetchDirectory(prevPath);
		};
		this.element.innerHTML = "";

		if (this.state.path.length > 1) {
			const node = new NodeComponent({
				initState: {node: nodeData},
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
