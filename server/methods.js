Meteor.methods({
  searchArtist: function(query) {
    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.searchArtists(query, { limit: 6 });

    // Need to refresh token
    if (checkTokenRefreshed(response, spotifyApi)) {
      response = spotifyApi.searchArtists(query, { limit: 6 });
    }

    return response.data.body.artists.items;
  },
  searchArtistTopTracks: function(artistId) {
    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.getArtistTopTracks(artistId, 'SE');

    // Need to refresh token
    if (checkTokenRefreshed(response, spotifyApi)) {
      response = spotifyApi.getArtistTopTracks(artistId, 'SE');
    }
    
    return response.data.body.tracks;
  },
  createPlaylistAndInsert: function(playlistName, resetList) {
    var resetList = resetList || false;

    // Call
    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.createPlaylist(Meteor.user().services.spotify.id, playlistName, { public: false });

    // Need to refresh token
    if (checkTokenRefreshed(response, spotifyApi)) {
      response = spotifyApi.createPlaylist(Meteor.user().services.spotify.id, playlistName, { public: false });
    }

    var selectedTracks = Tracks.find({
      userId: this.userId
    })

    // Put songs into the playlist.
    var uris = selectedTracks.map(function(track) {
      return track.uri;
    });
    spotifyApi.addTracksToPlaylist(Meteor.user().services.spotify.id, response.data.body.id, uris, {});

    if(resetList) {
      Tracks.remove({
        userId: this.userId
      });
    }
    return response.data.body;
  },
  getFollowerCount: function() {
    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.getMe();
    if (checkTokenRefreshed(response, spotifyApi)) {
      response = spotifyApi.getMySavedTracks({});
    }

    return response.data.body.followers.total;

  },
  getSavedTracksCount: function() {
    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.getMySavedTracks({});
    if (checkTokenRefreshed(response, spotifyApi)) {
      response = spotifyApi.getMySavedTracks({});
    }

    return response.data.body.total;
  },
  getSavedPlaylists: function() {
    var spotifyApi = new SpotifyWebApi();
    var response = spotifyApi.getUserPlaylists(Meteor.user().services.spotify.id, {});

    if (checkTokenRefreshed(response, spotifyApi)) {
      response = spotifyApi.getUserPlaylists(Meteor.user().services.spotify.id, {});
    }

    return response.data.body;
  }
});

var checkTokenRefreshed = function(response, api) {
  if (response.error && response.error.statusCode === 401) {
    api.refreshAndUpdateAccessToken();
    return true;
  } else {
    return false;
  }
}