document.getElementById("subscribe").addEventListener("submit", (event) => {
	event.preventDefault();
	const subscriber = {
		created_at: new Date(),
		email: event.target["email"].value,
	};

	if (grecaptcha.getResponse() != 0) {
		addSubscriber(subscriber);
		event.target.reset();
        grecaptcha.reset();
	}
});

const addSubscriber = async (subscriber) => {
	const TABLE = "subscribers";
	const URL = `https://bmtshsmfotakquvzsnsk.supabase.co/rest/v1/${TABLE}`;
	const API_KEY =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtdHNoc21mb3Rha3F1dnpzbnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc4MjI5OTQsImV4cCI6MTk5MzM5ODk5NH0.sv0uAXcxMAS5JPt_n3Ti4VBBw4-xL4VmhxKGDjNa9O0";
	const HELP_EMAIL = "help@crowdlinx.com";
	const HEADERS = new Headers({
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
		apikey: API_KEY,
	});

	await fetch(URL, {
		method: "POST",
		headers: HEADERS,
		body: JSON.stringify(subscriber),
	})
		.then((response) => {
			if (response.status == 201)
				alert(`Thanks!\n${subscriber.email} has been added and we'll keep you updated 😀`); //201 - Created
			else
				alert(
					`Hmm well this is embarrassing 🤔\nPlease wait a minute and then try again, and if the problem persists please email us at ${HELP_EMAIL}`
				);
		})
		.catch((error) => {
			alert("Whoops... Something went wrong");
			console.log(error);
		});
};
