import NodesComponent from "./components/Nodes/Nodes.js";
import BreadCrumbComponent from "./components/BreadCrumb/BreadCrumb.js";
import ImageModalComponent from "./components/imageView/ImageView.js";
import LoadingModalComponent from "./components/loadingView/LoadingView.js";
import {fetchDirectory} from "./api/api.js";

const ROOT = "root";
const DIRECTORY = "DIRECTORY";
const FILE = "FILE";
const PREV = "PREV";

const cache = {};
const appInitState = {
	depth: [
		{
			name: ROOT,
			id: null,
		},
	],
	nodes: [],
	isLoading: false,
};

export default class App {
	constructor(root) {
		this.state = appInitState;
		this.setState = this.setState.bind(this);

		this.loadingModal = new LoadingModalComponent({
			root,
			initState: {isLoading: {appInitState}},
		});

		this.breadCrumb = new BreadCrumbComponent({
			root,
			initState: {depth: {appInitState}},
			onClick: async (e) => {
				const index = parseInt(e.target.id) + 1;
				const newDepth = this.state.depth.slice(0, index);
				const id =
					newDepth[newDepth.length - 1].id === null
						? ROOT
						: newDepth[newDepth.length - 1].id;

				if (cache[id]) {
					this.setState({
						...this.state,
						depth: newDepth,
						nodes: cache[id],
					});
					return;
				}

				this.setState({
					...this.state,
					isLoading: true,
				});

				try {
					const nodes = await fetchDirectory(id);
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
				isRoot: appInitState.depth.length > 1 ? false : true,
				nodes: {appInitState},
			},
			onClick: async ({nodeId, nodeName, nodeType}) => {
				if (nodeType === DIRECTORY) {
					if (cache[nodeId]) {
						this.state.depth.push({name: nodeName, id: nodeId});
						this.setState({
							...this.state,
							nodes: cache[nodeId],
						});
						return;
					}

					this.setState({
						...this.state,
						isLoading: true,
					});

					try {
						const nodes = await fetchDirectory(nodeId);
						cache[nodeId] = nodes;

						this.state.depth.push({name: nodeName, id: nodeId});
						this.setState({
							...this.state,
							nodes,
							isLoading: false,
						});
					} catch (e) {
						console.error(e);
					}
				} else if (nodeType === FILE) {
					this.imageModal = new ImageModalComponent({
						root,
						initState: {filePath: node.filePath},
					});
				} else if (nodeType === PREV) {
					// 뒤로 갈때는 캐쉬가 있어야 정상
					this.state.depth.pop();
					const id = this.state.depth[this.state.depth.length - 1].id;

					if (cache[id]) {
						this.state.depth.pop();
						this.setState({
							...this.state,
							nodes: cache[id],
						});
						return;
					}

					this.setState({
						...this.state,
						isLoading: true,
					});

					try {
						const nodes = await fetchDirectory(id);
						cache[id] = nodes;

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
			cache[ROOT] = nodes;

			this.setState({
				...this.state,
				nodes,
			});
		} catch (e) {
			console.error(e);
		}
	};
}
