Template.searchArtist.events({
	'submit .search-artist': function (e) {
		e.preventDefault();
		Session.set('loading', true);
		Session.set('searchResult', false);
		Session.set('currentArtist', false);
		Meteor.call('searchArtist', e.target.searchTerm.value, function (error, result) {
			Session.set('searchResult', result);
			Session.set('loading', false);
		});
	},
});

Template.searchResult.events({
	'click .loadArtist': function () {
		Session.set('searchResult', false);
		self = this;
		Meteor.call('searchArtistTopTracks', self.id, function (error, result) {
			self.tracks = result;
			Session.set('currentArtist', self);
		});		
	}
});

Template.searchResult.helpers({
	result: function () {
		return Session.get('searchResult');
	},
	loading: function() {
		return Session.get('loading');
	}
});