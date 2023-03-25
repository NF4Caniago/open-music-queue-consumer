/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    const queryPlaylistInformation = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId],
    };
    const queryPlaylistSongs = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs
      INNER JOIN playlist_songs ON songs.id = playlist_songs.song_id
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };
    const PlaylistInformation = await this._pool.query(queryPlaylistInformation);
    const songs = await this._pool.query(queryPlaylistSongs);
    return {
      playlist: {
        id: PlaylistInformation.rows[0].id,
        name: PlaylistInformation.rows[0].name,
        songs: songs.rows,
      },
    };
  }
}

module.exports = PlaylistsService;
