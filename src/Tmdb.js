const API_KEY = "91844b2968da2a9ae7fb7d3c6b398f52";
const API_BASE = "https://api.themoviedb.org/3";

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
};

export default {
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Netflix Originals",
        items: await basicFetch(
          `/discover/tv?with_networks=213&api_key=${API_KEY}`
        ),
      },
      {
        slug: "trending",
        title: "Trending",
        items: await basicFetch(`/movie/popular?api_key=${API_KEY}`),
      },
      {
        slug: "toprated",
        title: "Top Rated",
        items: await basicFetch(`/movie/top_rated?api_key=${API_KEY}`),
      },
      {
        slug: "action",
        title: "Action",
        items: await basicFetch(
          `/discover/movie?with_genres=28&api_key=${API_KEY}`
        ),
      },
      {
        slug: "horror",
        title: "Horror",
        items: await basicFetch(
          `/discover/movie?with_genres=27&api_key=${API_KEY}`
        ),
      },
      {
        slug: "thriller",
        title: "Thriller",
        items: await basicFetch(
          `/discover/movie?with_genres=53&api_key=${API_KEY}`
        ),
      },
    ];
  },

  getInfo: async (id, type) => {
    let info = {};

    if (id) {
      switch (type) {
        case "movie":
          info = await basicFetch(`/movie/${id}?api_key=${API_KEY}`);
          break;
        case "tv":
          info = await basicFetch(`/tv/${id}?api_key=${API_KEY}`);
          break;
        default:
          info = null;
      }
    }
    return info;
  },
};
