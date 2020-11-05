export default {
  methods: {
    getMovieGenres(genres, genre_ids) {
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
  }
}