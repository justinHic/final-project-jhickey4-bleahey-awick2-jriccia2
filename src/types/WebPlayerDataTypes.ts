/**
 * An interface representing the Spotify artist data that the web player uses.
 * @property {string} name The name of the artist.
 */
export interface Artist {
  name: string;
}

/**
 * An interface representing the Spotify image data that the web player uses.
 * @property {string} url The URL of the image.
 */
export interface Image {
  url: string;
}

/**
 * An interface representing the Spotify album data that the web player uses.
 * @property {Image[]} images The images of the album.
 */
export interface Album {
  images: Image[];
}

/**
 * An interface representing the Spotify track data that the web player uses.
 * @property {string} name The name of the track.
 * @property {Album} album The album that the track is from.
 * @property {Artist[]} artists The artists that made the track.
 */
export interface Track {
  name: string;
  album: Album;
  artists: Artist[];
}

/**
 * An empty track object.
 */
export const emptyTrack: Track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};
