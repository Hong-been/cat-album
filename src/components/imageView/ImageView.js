import Modal from "../modal/Modal.js";

const IMGAE_URL =
	"https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export default class ImageModal extends Modal {
	constructor({root, initState}) {
		super(
			root,
			`
      <div class="content">
        <img src="${IMGAE_URL}${initState.filePath}">
      </div>`
		);
	}
}
