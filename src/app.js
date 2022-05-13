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
			onClick: async (e) => {
				this.setState({
					...this.state,
					isLoading: true,
				});

				const index = parseInt(e.target.id) + 1;
				const newDepth = this.state.depth.slice(0, index);

				try {
					const nodes = await fetchDirectory(newDepth[newDepth.length - 1].id);
					this.setState({
						...this.state,
						depth: newDepth,
						nodes,
						isLoading: false,
					});
				} catch (e) {
					console.error(e);
				}
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
						const nodes = await fetchDirectory(node.id);
						this.state.depth.push({name: node.name, id: node.id});
						this.setState({
							...this.state,
							nodes,
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
						const nodes = await fetchDirectory(
							this.state.depth[this.state.depth.length - 1].id
						);
						this.setState({
							...this.state,
							nodes,
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
		this.state = newState;

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
