function makeApiCall() {
	var params = {
		// The ID of the spreadsheet to retrieve data from.
		spreadsheetId: '1WMcmhLorkb7XsemwiEfmYF6YMhFHQPlAxef9n-zQaG8', // TODO: Update placeholder value.

		// The A1 notation of the values to retrieve.
		range: '50CuarantenaTweets', // TODO: Update placeholder value.

		// How values should be represented in the output.
		// The default render option is ValueRenderOption.FORMATTED_VALUE.
		valueRenderOption: 'ValueRenderOption.FORMATTED_VALUE', // TODO: Update placeholder value.

		// How dates, times, and durations should be represented in the output.
		// This is ignored if value_render_option is
		// FORMATTED_VALUE.
		// The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
		dateTimeRenderOption: '', // TODO: Update placeholder value.
	};

	var request = gapi.client.sheets.spreadsheets.values.get(params);
	request.then(function (response) {
		// TODO: Change code below to process the `response` object:
		console.log(response.result);
	}, function (reason) {
		console.error('error: ' + reason.result.error.message);
	});
}

function initClient() {
	var API_KEY = 'AIzaSyDG-FyE5FOxjpW3aLB8f9HqMmNX7qhGt6o'; // TODO: Update placeholder with desired API key.

	var CLIENT_ID = '39319533562-iek6sbkpoi32r2ebpk798enhfof6f0k6.apps.googleusercontent.com'; // TODO: Update placeholder with desired client ID.

	// TODO: Authorize using one of the following scopes:
	//   'https://www.googleapis.com/auth/drive'
	//   'https://www.googleapis.com/auth/drive.file'
	//   'https://www.googleapis.com/auth/drive.readonly'
	//   'https://www.googleapis.com/auth/spreadsheets'
	//   'https://www.googleapis.com/auth/spreadsheets.readonly'
	var SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

	gapi.client.init({
		'apiKey': API_KEY,
		'clientId': CLIENT_ID,
		'scope': SCOPE,
		'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
	}).then(function () {
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
		updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
	});
}

function handleClientLoad() {
	gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
	if (isSignedIn) {
		makeApiCall();
	}
}

function handleSignInClick(event) {
	gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
	gapi.auth2.getAuthInstance().signOut();
}