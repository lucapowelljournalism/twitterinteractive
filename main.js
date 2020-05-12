/*------------------------------------------------Functions-----------------------------------*/
x = ""

function chooseUrl(hashtag) { //This is a function to determine which spreadsheet to access based off of user input.
	if (hashtag === "#cuarentena") {
		let x = "https://spreadsheets.google.com/feeds/list/15sxSPlNUgDd_-LMW4D_ynPj0PeIv1bThE2QQvgWxEQw/1/public/values?alt=json"
		return x
		console.log('chooseURL worked');
	} else if (hashtag === "#socialdistancing") {
		let x = "https://spreadsheets.google.com/feeds/list/1wo98z5203GH7-Qcek9I4XjHIIz_3_6y8DfovGjSVm68/1/public/values?alt=json"
		return x
		console.log('chooseURL worked');
	} else if (hashtag === "#quarantinelife") {
		let x = "https://spreadsheets.google.com/feeds/list/1SkG_zGxAy8cEbXdbPyHnd2588HwU4-Tn1EeAdybvMxk/1/public/values?alt=json"
		return x
		console.log('chooseURL worked');
	} else if (hashtag === "#stayathomechallenge") {
		let x = "https://spreadsheets.google.com/feeds/list/1u5d025lcRbPXjxKMbmvFFFcCtFXBYgKP7Q_3vkC2lXg/1/public/values?alt=json"
		return x
		console.log('chooseURL worked');
	} else if (hashtag === "#coronavirus") {
		let x = "https://spreadsheets.google.com/feeds/list/1nmQi2ZiJbjGNy6OMtp2ZY7B9U4GMe7rlecZXbqDwwHU/1/public/values?alt=json"
		return x
		console.log('chooseURL worked');
	}
}

function getData(entry, property) { // Entry = row, property = column
	property = property.replace(/[^A-Za-z0-9]+/, "").toLowerCase(); //puts things in lower case and removes non-alphanumeric characters
	const item = entry[`gsx$${property}`];
	if (item.$t) { //if it has $t then give me it, if it doesn't return without $t = text in the cell, wont be there if no text.
		return item.$t;
	}
	return item;
}

/*-------------------------------End of Pre-Built Functions-----------------------------------*/
url = ""
//Code for taking input from hashtag select menu and storing into variable 'hashtag'
$(".filter").on("change", function (e) { // Takes a hashtag input.
	hashtag = $(".filter").val(); // Saves selected value to hashtag
	$("#hashtagoutput").text(hashtag) //writes hashtag to the HTML
	url = chooseUrl(hashtag)

	//Code for taking input from slider select and storing into variable finalDate
	$("body").on("change", ".slider", function (e) {
		//const hsearch = e.target;

		const sliderValue = $(e.target).val();
		console.log(sliderValue)
		//Slider Javascript//
		var newDate = new Date(2020, 03, 01);
		newDate.setDate(sliderValue);

		month = newDate.toLocaleString('default', { month: 'long' });;
		day = newDate.getDate();
		//year = newDate.getFullYear();
		var finalDate = month + " " + day; //+ " " + year        //saves the info to the variable finalDate
		$("#dateoutput").text(finalDate); //writes finalDate to the HTML
		console.log(finalDate)

		if (hashtag != "" && finalDate != "") { //Check to see if both inputs have been filled. BROKEN: Needs to rerun everytime there is a new hashtag, not only on new date.
			let data;
			fetch(url) //jquery function that gets a url
				.then(r => r.json())
				.then(d => {
					data = d.feed.entry; //data is an array
				})
				.then(() => {
					const tweets = data.filter(row => getData(row, 'Date') === finalDate) //tweets is every row where the date = finaldate
					shuffle(tweets);
					const three = tweets.splice(0, 3);

					console.log("hi!");
					three.forEach((row, i) => {
						let embedcode = getData(row, "embed");
						const tweet_number = i + 1;
						embedcode = embedcode.replace(/<script([^\/]+)\/script>/, "");
						document.getElementById(`tweet${tweet_number}`).innerHTML = embedcode;
					});

					addTwitterJS();

				});
		};
	});
});

function addTwitterJS() {
	const newScript = document.createElement("script");
	newScript.src = "https://platform.twitter.com/widgets.js";
	newScript.async = true;
	newScript.charset = "utf-8";

	document.querySelector("body").appendChild(newScript);
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}