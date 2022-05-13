import Component from "../component.js";

const IMGAE_URL =
	"https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export default class ImageModal extends Component {
	constructor({root, initState}) {
		super(`
    <div class="Modal ImageViewer">
      <div class="content">
        <img src="${IMGAE_URL}${initState.filePath}">
      </div>
    </div>`);
		root.appendChild(this.element);
		const modal = document.querySelector(".Modal");
		modal.addEventListener("click", () => {
			this.element.remove();
		});
	}
}
