//Hashtag//

let hashtag = " "
//let date_clicked = " "

/* Commented out the Date buttons

$(".calendar").on("click", function (e) { // Takes a date input.
	e.preventDefault();
	date_clicked = e.target.id
	document.getElementById("dateoutput").innerHTML = date_clicked;
});

 */

$(".filter").on("change", function (e) { // Takes a hashtag input.
	hashtag = $(".filter").val();
	document.getElementById("hashtagoutput").innerHTML = hashtag

	if (hashtag != " " & date_clicked != " ") {
		console.log("Publishing corresponding tweets!") //checks and writes both.
	};
});

$("body").on("change", ".slider", function (e) {
	//const hsearch = e.target;

	const sliderValue = $(e.target).val();


	//Slider Javascript//
	var newDate = new Date(2020, 02, 15);
	newDate.setDate(sliderValue);

	month = newDate.toLocaleString('default', { month: 'long' });;
	day = newDate.getDate();
	year = newDate.getFullYear();
	var finalDate = month + " " + day + " " + year
	year;

	console.log(finalDate)
	$("#dateoutput").text(finalDate);
});