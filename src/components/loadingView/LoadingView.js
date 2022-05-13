import Modal from "../modal/Modal.js";

export default class LoadingeModal extends Modal {
	constructor({root, initState}) {
		super({
			root,
			contentHtml: `
      <div class="content">
        <img src="./assets/nyan-cat.gif">
      </div>
      `,
		});
		this.element.classList.add("loading");
		this.state = initState;
		this.setState = this.setState.bind(this);
	}

	setState(newState) {
		console.log(newState);
		this.state = newState;
		this.render();
	}

	render() {
		const modal = document.querySelector(".loading");
		if (modal) {
			modal.style.display = this.state.isLoading ? "block" : "none";
		}
	}
}
