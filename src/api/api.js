const BASE_URL =
	"https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const fetchDirectory = async (path = "") => {
	const res = await fetch(`${BASE_URL}/${path}`, {
		method: "GET",
		mode: "cors",
		cache: "default",
	});

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		const error = await res.json();
		throw error;
	}
};
