import NodesComponent from "./components/Nodes/Nodes.js";
import BreadCrumbComponent from "./components/BreadCrumb/BreadCrumb.js";
import {fetchDirectory} from "./api/api.js";

export default function App(root) {
	this.root = root;
	this.state = {
		path: ["root"],
		nodes: [],
	};

	const breadCrumb = new BreadCrumbComponent({
		root: this.root,
		initState: {path: this.state.path},
	});

	const nodeContainer = new NodesComponent({
		root: this.root,
		initState: {
			path: this.state.path,
			nodes: this.state.nodes,
		},
		onClick: async (node) => {
			if (node.type === "DIRECTORY") {
				try {
					const res = await fetchDirectory(node.id);
					this.state.path.push(node.name);
					this.setState({
						path: this.state.path,
						nodes: res,
					});
				} catch (e) {
					console.error(e);
				}
			} else if (node.type === "FILE") {
				// imageView 모달 띄우기
			}
		},
	});

	this.setState = (newState) => {
		this.state = newState;
		breadCrumb.setState({
			path: newState.path,
		});
		nodeContainer.setState({
			path: newState.path,
			nodes: newState.nodes,
		});
	};

	const init = async () => {
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

	init();
}
