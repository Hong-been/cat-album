import Modal from "../modal/Modal.js";

const IMGAE_URL =
	"https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export default class ImageModal extends Modal {
	constructor({root, initState}) {
		super(
			root,
			`<div class="content">
        <img class="image">
      </div>`,
			initState
		);

		this.element.classList.add("Modalimage");
		this.element.style.visibility = "hidden";

		const img = this.element.querySelector(".image");
		const modal = document.querySelector(".Modalimage");
		this.element.addEventListener("click", (e) => {
			if (e.target === modal) {
				this.element.style.visibility = "hidden";
				img.setAttribute("src", "");
			}
		});
		window.addEventListener("keydown", (e) => {
			if (e.key === "Esc" || e.key === "Escape") {
				this.element.style.visibility = "hidden";
				img.setAttribute("src", "");
			}
		});
	}

	render() {
		const img = this.element.querySelector(".image");
		img.setAttribute("src", `${IMGAE_URL}${this.state.filePath}`);
		this.element.style.visibility = "visible";
	}
}
