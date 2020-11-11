import axios from "axios";

export default {
  methods: {
    getCurrentMediaTypeGenresNames(genres, genre_ids) {
      if (genre_ids) {
        var genre_container = [];
        var k = 0;
        for (var i = 0; i < genre_ids.length; i++) {
          for (var j = 0; j < genres.length; j++) {
            if (genre_ids[i] === genres[j].id) {
              genre_container[k] = genres[j].name;
              k++;
            }
          }
        }
        if (genre_container.length === 0) {
          return;
        } else if (genre_container.length === 1) {
          return genre_container[0];
        } else if (genre_container.length > 1) {
          return genre_container[0] + "/" + genre_container[1];
        }
      }
    },
    async getCurrentMediaTypeGenres(media_type) {
      let genres1 = []
      await axios
      .get(
        `https://api.themoviedb.org/3/genre/${media_type}/list?api_key=f943d3d10cc39fd734122d69efabbacb`
      )
      .then((response) => {
        genres1 = response.data.genres;
      });
      return genres1
    }
  }
}