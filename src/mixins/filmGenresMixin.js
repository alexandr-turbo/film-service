export default {
  methods: {
    getCurrentMediaTypeGenresNames(genres, genreIDs) {
      if (genreIDs) {
        let genreContainer = [];
        let genreContainerPosition = 0;
        for (let genreIDPosition = 0; genreIDPosition < genreIDs.length; genreIDPosition++) {
          for (let genrePosition = 0; genrePosition < genres.length; genrePosition++) {
            if (genreIDs[genreIDPosition] === genres[genrePosition].id) {
              genreContainer[genreContainerPosition] = genres[genrePosition].name;
              genreContainerPosition++;
            }
          }
        }
        if (genreContainer.length === 0) {
          return;
        } else if (genreContainer.length === 1) {
          return genreContainer[0];
        } else if (genreContainer.length > 1) {
          return genreContainer[0] + "/" + genreContainer[1];
        }
      }
    }
  }
}