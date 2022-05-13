import NodesComponent from "./components/Nodes/Nodes.js";
import BreadCrumbComponent from "./components/BreadCrumb/BreadCrumb.js";
import ImageModalComponent from "./components/imageView/ImageView.js";
import {fetchDirectory} from "./api/api.js";
/**
 * 로딩처리
 * <div class="Modal Loading">
      <div class="content">
        <img src="./assets/nyan-cat.gif">
      </div>
    </div>
 */
export default class App {
	constructor(root) {
		this.state = {
			path: ["root"],
			depth: [""],
			nodes: [],
		};
		this.setState = this.setState.bind(this);

		this.breadCrumb = new BreadCrumbComponent({
			root,
			initState: {path: this.state.path},
		});
		this.nodeContainer = new NodesComponent({
			root,
			initState: {
				isRoot: this.state.path.length > 1 ? false : true,
				nodes: [],
			},
			onClick: async (node) => {
				try {
					if (node.type === "DIRECTORY") {
						const res = await fetchDirectory(node.id);

						this.state.path.push(node.name);
						this.state.depth.push(node.id);
						this.setState({
							path: this.state.path,
							depth: this.state.depth,
							nodes: res,
						});
					} else if (node.type === "FILE") {
						this.imageModal = new ImageModalComponent({
							root,
							initState: {filePath: node.filePath},
						});
					} else if (node.type === "PREV") {
						this.state.path.pop();
						this.state.depth.pop();
						const res = await fetchDirectory(
							this.state.depth[this.state.depth.length - 1]
						);
						this.setState({
							path: this.state.path,
							nodes: res,
						});
					}
				} catch (e) {
					console.error(e);
				}
			},
		});

		this.init();
	}

	setState = (newState) => {
		this.breadCrumb.setState({
			path: newState.path,
		});
		this.nodeContainer.setState({
			isRoot: newState.path.length === 1,
			nodes: newState.nodes,
		});
	};

	init = async () => {
		try {
			const nodes = await fetchDirectory();
			this.setState({
				...this.state,
				nodes,
			});
		} catch (e) {
			console.error(e);
		}
	};
}
