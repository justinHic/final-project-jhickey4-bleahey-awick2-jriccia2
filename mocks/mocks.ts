export const mockResponse = {
  seeds: [
    {
      afterFilteringSize: 0,
      afterRelinkingSize: 0,
      href: "string",
      id: "string",
      initialPoolSize: 0,
      type: "string",
    },
  ],
  tracks: [
    {
      album: {
        album_type: "compilation",
        total_tracks: 9,
        available_markets: ["CA", "BR", "IT"],
        external_urls: {
          spotify: "string",
        },
        href: "string",
        id: "2up3OPMp9Tb4dAKM2erWXQ",
        images: [
          {
            url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            height: 300,
            width: 300,
          },
        ],
        name: "string",
        release_date: "1981-12",
        release_date_precision: "year",
        restrictions: {
          reason: "market",
        },
        type: "album",
        uri: "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
        copyrights: [
          {
            text: "string",
            type: "string",
          },
        ],
        external_ids: {
          isrc: "string",
          ean: "string",
          upc: "string",
        },
        genres: ["Egg punk", "Noise rock"],
        label: "string",
        popularity: 0,
        album_group: "compilation",
        artists: [
          {
            external_urls: {
              spotify: "string",
            },
            href: "string",
            id: "string",
            name: "string",
            type: "artist",
            uri: "string",
          },
        ],
      },
      artists: [
        {
          external_urls: {
            spotify: "string",
          },
          followers: {
            href: "string",
            total: 0,
          },
          genres: ["Prog rock", "Grunge"],
          href: "string",
          id: "string",
          images: [
            {
              url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
              height: 300,
              width: 300,
            },
          ],
          name: "string",
          popularity: 0,
          type: "artist",
          uri: "string",
        },
      ],
      available_markets: ["string"],
      disc_number: 0,
      duration_ms: 0,
      explicit: false,
      external_ids: {
        isrc: "string",
        ean: "string",
        upc: "string",
      },
      external_urls: {
        spotify: "string",
      },
      href: "string",
      id: "string",
      is_playable: false,
      linked_from: {},
      restrictions: {
        reason: "string",
      },
      name: "string",
      popularity: 0,
      preview_url: "string",
      track_number: 0,
      type: "track",
      uri: "string",
      is_local: false,
    },
  ],
};

export const mockResponse2 = {
  seeds: [
    {
      afterFilteringSize: 0,
      afterRelinkingSize: 0,
      href: "string",
      id: "string",
      initialPoolSize: 0,
      type: "string",
    },
  ],
  tracks: [
    {
      album: {
        album_type: "compilation",
        total_tracks: 9,
        available_markets: ["CA", "BR", "IT"],
        external_urls: {
          spotify: "string",
        },
        href: "string",
        id: "2up3OPMp9Tb4dAKM2erWXQ",
        images: [
          {
            url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
            height: 300,
            width: 300,
          },
        ],
        name: "string",
        release_date: "1981-12",
        release_date_precision: "year",
        restrictions: {
          reason: "market",
        },
        type: "album",
        uri: "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
        copyrights: [
          {
            text: "string",
            type: "string",
          },
        ],
        external_ids: {
          isrc: "string",
          ean: "string",
          upc: "string",
        },
        genres: ["Egg punk", "Noise rock"],
        label: "string",
        popularity: 0,
        album_group: "compilation",
        artists: [
          {
            external_urls: {
              spotify: "string",
            },
            href: "string",
            id: "string",
            name: "string",
            type: "artist",
            uri: "string",
          },
        ],
      },
      artists: [
        {
          external_urls: {
            spotify: "string",
          },
          followers: {
            href: "string",
            total: 0,
          },
          genres: ["Prog rock", "Grunge"],
          href: "string",
          id: "string",
          images: [
            {
              url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
              height: 300,
              width: 300,
            },
          ],
          name: "string",
          popularity: 0,
          type: "artist",
          uri: "string",
        },
      ],
      available_markets: ["string"],
      disc_number: 0,
      duration_ms: 0,
      explicit: false,
      external_ids: {
        isrc: "string",
        ean: "string",
        upc: "string",
      },
      external_urls: {
        spotify: "string",
      },
      href: "string",
      id: "string",
      is_playable: false,
      linked_from: {},
      restrictions: {
        reason: "string",
      },
      name: "string",
      popularity: 0,
      preview_url: "string",
      track_number: 0,
      type: "track",
      uri: "string2",
      is_local: false,
    },
  ],
};

export const mockExchangeResponse = {
  access_token: "access",
  token_type: "Bearer",
  expires_in: 3600,
  refresh_token: "refresh",
  scope: "streaming user-modify-playback-state user-read-email user-read-private",
};

export const mockExchangeResponse2 = {
  access_token: "access2",
  token_type: "Bearer",
  expires_in: 3600,
  refresh_token: "refresh2",
  scope:
    "streaming user-modify-playback-state user-read-email user-read-private",
};

export const mockPlaylistsResponse = {
  collaborative: false,
  description: "string",
  external_urls: {
    spotify: "string",
  },
  followers: {
    href: "string",
    total: 0,
  },
  href: "string",
  id: "string",
  images: [
    {
      url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      height: 300,
      width: 300,
    },
  ],
  name: "string",
  owner: {
    external_urls: {
      spotify: "string",
    },
    followers: {
      href: "string",
      total: 0,
    },
    href: "string",
    id: "string",
    type: "user",
    uri: "string",
    display_name: "string",
  },
  public: false,
  snapshot_id: "string",
  tracks: {
    href: "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
    limit: 20,
    next: "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    offset: 0,
    previous: "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    total: 4,
    items: [
      {
        added_at: "string",
        added_by: {
          external_urls: {
            spotify: "string",
          },
          followers: {
            href: "string",
            total: 0,
          },
          href: "string",
          id: "string",
          type: "user",
          uri: "string",
        },
        is_local: false,
        track: {
          album: {
            album_type: "compilation",
            total_tracks: 9,
            available_markets: ["CA", "BR", "IT"],
            external_urls: {
              spotify: "string",
            },
            href: "string",
            id: "2up3OPMp9Tb4dAKM2erWXQ",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                height: 300,
                width: 300,
              },
            ],
            name: "string",
            release_date: "1981-12",
            release_date_precision: "year",
            restrictions: {
              reason: "market",
            },
            type: "album",
            uri: "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
            copyrights: [
              {
                text: "string",
                type: "string",
              },
            ],
            external_ids: {
              isrc: "string",
              ean: "string",
              upc: "string",
            },
            genres: ["Egg punk", "Noise rock"],
            label: "string",
            popularity: 0,
            album_group: "compilation",
            artists: [
              {
                external_urls: {
                  spotify: "string",
                },
                href: "string",
                id: "string",
                name: "string",
                type: "artist",
                uri: "string",
              },
            ],
          },
          artists: [
            {
              external_urls: {
                spotify: "string",
              },
              followers: {
                href: "string",
                total: 0,
              },
              genres: ["Prog rock", "Grunge"],
              href: "string",
              id: "string",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                  height: 300,
                  width: 300,
                },
              ],
              name: "string",
              popularity: 0,
              type: "artist",
              uri: "string",
            },
          ],
          available_markets: ["string"],
          disc_number: 0,
          duration_ms: 0,
          explicit: false,
          external_ids: {
            isrc: "string",
            ean: "string",
            upc: "string",
          },
          external_urls: {
            spotify: "string",
          },
          href: "string",
          id: "string",
          is_playable: false,
          linked_from: {},
          restrictions: {
            reason: "string",
          },
          name: "string",
          popularity: 0,
          preview_url: "string",
          track_number: 0,
          type: "track",
          uri: "string",
          is_local: false,
        },
      },
    ],
  },
  type: "string",
  uri: "string",
};

export const mockPlaylistsResponse2 = {
  collaborative: false,
  description: "string2",
  external_urls: {
    spotify: "string",
  },
  followers: {
    href: "string",
    total: 0,
  },
  href: "string",
  id: "string2",
  images: [
    {
      url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      height: 300,
      width: 300,
    },
  ],
  name: "string2",
  owner: {
    external_urls: {
      spotify: "string",
    },
    followers: {
      href: "string",
      total: 0,
    },
    href: "string",
    id: "string",
    type: "user",
    uri: "string",
    display_name: "string",
  },
  public: false,
  snapshot_id: "string",
  tracks: {
    href: "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
    limit: 20,
    next: "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    offset: 0,
    previous: "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
    total: 4,
    items: [
      {
        added_at: "string",
        added_by: {
          external_urls: {
            spotify: "string",
          },
          followers: {
            href: "string",
            total: 0,
          },
          href: "string",
          id: "string",
          type: "user",
          uri: "string",
        },
        is_local: false,
        track: {
          album: {
            album_type: "compilation",
            total_tracks: 9,
            available_markets: ["CA", "BR", "IT"],
            external_urls: {
              spotify: "string",
            },
            href: "string",
            id: "2up3OPMp9Tb4dAKM2erWXQ",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                height: 300,
                width: 300,
              },
            ],
            name: "string",
            release_date: "1981-12",
            release_date_precision: "year",
            restrictions: {
              reason: "market",
            },
            type: "album",
            uri: "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
            copyrights: [
              {
                text: "string",
                type: "string",
              },
            ],
            external_ids: {
              isrc: "string",
              ean: "string",
              upc: "string",
            },
            genres: ["Egg punk", "Noise rock"],
            label: "string",
            popularity: 0,
            album_group: "compilation",
            artists: [
              {
                external_urls: {
                  spotify: "string",
                },
                href: "string",
                id: "string",
                name: "string",
                type: "artist",
                uri: "string",
              },
            ],
          },
          artists: [
            {
              external_urls: {
                spotify: "string",
              },
              followers: {
                href: "string",
                total: 0,
              },
              genres: ["Prog rock", "Grunge"],
              href: "string",
              id: "string",
              images: [
                {
                  url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                  height: 300,
                  width: 300,
                },
              ],
              name: "string",
              popularity: 0,
              type: "artist",
              uri: "string",
            },
          ],
          available_markets: ["string"],
          disc_number: 0,
          duration_ms: 0,
          explicit: false,
          external_ids: {
            isrc: "string",
            ean: "string",
            upc: "string",
          },
          external_urls: {
            spotify: "string",
          },
          href: "string",
          id: "string",
          is_playable: false,
          linked_from: {},
          restrictions: {
            reason: "string",
          },
          name: "string",
          popularity: 0,
          preview_url: "string",
          track_number: 0,
          type: "track",
          uri: "string",
          is_local: false,
        },
      },
    ],
  },
  type: "string",
  uri: "string",
};

export const mockPlaylistsTracksResponse = {
  snapshot_id: "abc",
};

export const mockPlaylistsTracksResponse2 = {
  snapshot_id: "abc2",
};

export const mockProfileResponse = {
  country: "string",
  display_name: "string",
  email: "string",
  explicit_content: {
    filter_enabled: false,
    filter_locked: false,
  },
  external_urls: {
    spotify: "string",
  },
  followers: {
    href: "string",
    total: 0,
  },
  href: "string",
  id: "string",
  images: [
    {
      url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      height: 300,
      width: 300,
    },
  ],
  product: "string",
  type: "string",
  uri: "string",
};

export const mockProfileResponse2 = {
  country: "string",
  display_name: "string1",
  email: "string",
  explicit_content: {
    filter_enabled: false,
    filter_locked: false,
  },
  external_urls: {
    spotify: "string",
  },
  followers: {
    href: "string",
    total: 0,
  },
  href: "string",
  id: "string1",
  images: [
    {
      url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
      height: 300,
      width: 300,
    },
  ],
  product: "string",
  type: "string",
  uri: "string",
};

export const mockQueueResponse = {
  status: 202,
}