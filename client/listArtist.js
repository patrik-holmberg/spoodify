Template.listArtist.helpers({
	data: function () {
		return Session.get('currentArtist');
	},
});

Template.listArtist.events({
	'click .addTrack': function () {
		this.userId = Meteor.userId();
		Tracks.insert(this);
	}
});