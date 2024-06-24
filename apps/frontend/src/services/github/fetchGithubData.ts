const headers = {
	Authorization: `Bearer ${import.meta.env.GH_AUTH_TOKEN}`,
};

export async function fetchGithubData(url: string) {
	console.log("Token: " + import.meta.env.GH_AUTH_TOKEN);

	return fetch(url, { headers })
		.then((res) => {
			console.log("Response: " + res.json());
			return res.json();
		})
		.catch((err) => console.log(err));
}
