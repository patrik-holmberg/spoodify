Template.myPlaylist.helpers({
	tracks: function () {
		var tracks = Tracks.find({
			userId: Meteor.userId()
		})
		if(tracks.count() > 0) {
			return tracks
		}
	},
	minimized: function() {
		if(Session.get('minimized')) {
			return 'minimized';
		}
	},
	toggle: function() {
		if(Session.get('minimized')) {
			return 'fa-toggle-off'
		}
		else {
			return 'fa-toggle-on'
		}
	}
});

Template.myPlaylist.onRendered(function() {
	Session.setDefault('minimized', true)
})

Template.myPlaylist.events({
	'click .removeTrack': function () {
		Tracks.remove(this._id);
	},
	'click .toggle': function() {
		Session.set('minimized', !Session.get('minimized'));
	},
	'click .createPlaylist': function() {
		var name = prompt("Enter a name for your new playlist" , "WUNDERLIST");
		if(name) {
			Meteor.call('createPlaylistAndInsert', name, false, function (error, result) {
				console.log(error);
				console.log(result);
			});
		}
	},
	'click .createPlaylistAndReset': function() {
		var name = prompt("Enter a name for your new playlist" , "WUNDERLIST");
		if(name) {
			Meteor.call('createPlaylistAndInsert', name, true, function (error, result) {
				console.log(error);
				console.log(result);
			});
		}
	},
});