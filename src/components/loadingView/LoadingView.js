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
			initState,
		});
		this.element.classList.add("loading");
	}

	render() {
		const modal = document.querySelector(".loading");
		if (modal) {
			modal.style.display = this.state.isLoading ? "block" : "none";
		}
	}
}
