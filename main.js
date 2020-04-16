let hashtag = " "
let date_clicked = " "

$(".calendar").on("click", function (e) { // Takes a date input.
	e.preventDefault();
	date_clicked = e.target.id
	document.getElementById("dateoutput").innerHTML = date_clicked;
});

$(".filter").on("change", function (e) { // Takes a hashtag input.
	hashtag = $(".filter").val();
	document.getElementById("hashtagoutput").innerHTML = hashtag

	if (hashtag != " " & date_clicked != " ") {
		console.log("Publishing corresponding tweets!") //checks and writes both.
	};
});