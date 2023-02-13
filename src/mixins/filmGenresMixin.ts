import { IGenre } from "@/interfaces/IGenre";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class filmGenresMixin extends Vue {
  getCurrentMediaTypeGenresNames(genres: Array<IGenre>, genreIDs: Array<string>) {
    if (genres.length && genreIDs.length) {
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