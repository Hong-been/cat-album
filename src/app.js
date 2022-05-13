import NodesComponent from "./components/Nodes/Nodes.js";
import BreadCrumbComponent from "./components/BreadCrumb/BreadCrumb.js";
import ImageModalComponent from "./components/imageView/ImageView.js";
import LoadingModalComponent from "./components/loadingView/LoadingView.js";
import {fetchDirectory} from "./api/api.js";

export default class App {
	constructor(root) {
		this.state = {
			depth: [{name: "root", id: ""}],
			nodes: [],
			isLoading: false,
		};
		this.setState = this.setState.bind(this);

		this.loadingModal = new LoadingModalComponent({
			root,
			initState: {isLoading: this.state.isLoading},
		});

		this.breadCrumb = new BreadCrumbComponent({
			root,
			initState: {depth: this.state.depth},
			onClick: (e) => {
				console.log(e.target);
			},
		});

		this.nodeContainer = new NodesComponent({
			root,
			initState: {
				isRoot: this.state.depth.length > 1 ? false : true,
				nodes: [],
			},
			onClick: async (node) => {
				if (node.type === "DIRECTORY") {
					this.setState({
						...this.state,
						isLoading: true,
					});

					try {
						const res = await fetchDirectory(node.id);
						this.state.depth.push({name: node.name, id: node.id});
						this.setState({
							...this.state,
							nodes: res,
							isLoading: false,
						});
					} catch (e) {
						console.error(e);
					}
				} else if (node.type === "FILE") {
					this.imageModal = new ImageModalComponent({
						root,
						initState: {filePath: node.filePath},
					});
				} else if (node.type === "PREV") {
					this.setState({
						...this.state,
						isLoading: true,
					});
					this.state.depth.pop();

					try {
						const res = await fetchDirectory(
							this.state.depth[this.state.depth.length - 1].id
						);
						this.setState({
							...this.state,
							nodes: res,
							isLoading: false,
						});
					} catch (e) {
						console.error(e);
					}
				}
			},
		});

		this.init();
	}

	setState = (newState) => {
		this.breadCrumb.setState({
			depth: newState.depth,
		});
		this.nodeContainer.setState({
			isRoot: newState.depth.length === 1,
			nodes: newState.nodes,
		});
		this.loadingModal.setState({
			isLoading: newState.isLoading,
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
