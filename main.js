/*------------------------------------------------Functions-----------------------------------*/

function chooseUrl(hashtag) { //This is a function to determine which spreadsheet to access based off of user input.
	if (hashtag === "cuarantena") {
		let url = "https://spreadsheets.google.com/feeds/list/15sxSPlNUgDd_-LMW4D_ynPj0PeIv1bThE2QQvgWxEQw/1/public/values?alt=json"
		return url;
	} else if (hashtag === "socialdistancing") {
		let url = "https://spreadsheets.google.com/feeds/list/1rU8fTnG-ta6_06ufG2-0B6e_Q74R0HX6HVdSM24I0js/1/public/values?alt=json"
		return url;
	} else if (hashtag === "quarantinelife") {
		let url = "https://spreadsheets.google.com/feeds/list/1SkG_zGxAy8cEbXdbPyHnd2588HwU4-Tn1EeAdybvMxk/1/public/values?alt=json"
		return url;
	} else if (hashtag === "stayathomechallenge") {
		let url = "https://spreadsheets.google.com/feeds/list/1u5d025lcRbPXjxKMbmvFFFcCtFXBYgKP7Q_3vkC2lXg/1/public/values?alt=json"
		return url;
	} else if (hashtag === "coronavirus") {
		let url = "https://spreadsheets.google.com/feeds/list/1nmQi2ZiJbjGNy6OMtp2ZY7B9U4GMe7rlecZXbqDwwHU/1/public/values?alt=json"
		return url;
	}
}

function getData(entry, property) { // This is a function for retrieving info from json that we get from Google Sheets. Thank you, TC for this one!
	property = property.replace(/[^A-Za-z0-9]+/, "").toLowerCase(); //puts things in lower case and removes non-alphanumeric characters
	const item = entry[`gsx$${property}`];
	if (item.$t) {
		return item.$t;
	}
	return item;
}

/*-------------------------------End of Pre-Built Functions-----------------------------------*/
const url = "https://spreadsheets.google.com/feeds/list/1nmQi2ZiJbjGNy6OMtp2ZY7B9U4GMe7rlecZXbqDwwHU/1/public/values?alt=json"

//Code for taking input from hashtag select menu and storing into variable 'hashtag'
$(".filter").on("change", function (e) { // Takes a hashtag input.
	hashtag = $(".filter").val(); // Saves selected value to hashtag
	$("#hashtagoutput").text(hashtag) //writes hashtag to the HTML


	//Code for taking input from slider select and storing into variable finalDate
	$("body").on("change", ".slider", function (e) {
		//const hsearch = e.target;

		const sliderValue = $(e.target).val();

		//Slider Javascript//
		var newDate = new Date(2020, 02, 15);
		newDate.setDate(sliderValue);

		month = newDate.toLocaleString('default', { month: 'long' });;
		day = newDate.getDate();
		//year = newDate.getFullYear();
		var finalDate = month + " " + day; //+ " " + year        //saves the info to the variable finalDate
		$("#dateoutput").text(finalDate); //writes finalDate to the HTML
		console.log(finalDate)

		if (hashtag != "" && finalDate != "") { //Check to see if both inputs have been filled. BROKEN
			let data;
			fetch(url)
				.then(r => r.json())
				.then(d => {
					data = d.feed.entry; //data is an array
				})
				.then(() => {
					const tweets = data.filter(row => getData(row, 'Date') === finalDate)
					tweets.forEach(tweet => embedcode = (getData(tweet, 'embed'))) //captures the embed code, but only within this function
					document.getElementById("tweet1").innerHTML = embedcode
				});
		};
	});
});