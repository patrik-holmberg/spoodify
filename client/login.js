Template.login.events({
	'click .login': function () {
		var options = {
			showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
			requestPermissions: ['user-read-email', 'playlist-read-private', 'playlist-modify-private'] // Spotify access scopes.
		};
		Meteor.loginWithSpotify(options);
	}
});