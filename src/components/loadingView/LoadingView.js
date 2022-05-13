import Modal from "../modal/Modal.js";

export default class LoadingeModal extends Modal {
	constructor({root, initState}) {
		super(
			root,
			`<div class="content">
        <img src="./assets/nyan-cat.gif">
      </div>`,
			initState
		);
		this.element.classList.add("loading");
	}

	render() {
		const modal = document.querySelector(".loading");
		if (modal) {
			modal.style.visibility = this.state.isLoading ? "visible" : "hidden";
		}
	}
}
