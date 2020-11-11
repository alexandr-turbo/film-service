<template id="about-actor-template">
  <div class="actor">
    <div v-if="actor !== null">
      <div class="container">
        <div
          class="margin2"
          :class="getGender(actor.gender) === 'Male' ? 'blue' : 'pink'"
        >
          <div class="main">
            <img
              v-if="actor.profile_path && actor.profile_path !== ''"
              class="actor-photo"
              :src="`https://image.tmdb.org/t/p/w92${actor.profile_path}`"
            />
            <img v-else class="actor-photo" src="../../public/no-image.png" />
            <div class="actor-description">
              <div>{{ actor.name }}</div>
              <div v-if="actor.birthday">
                {{ getPrettyDate(actor.birthday) }} ({{
                  getAge(actor.birthday)
                }}
                y/o),
              </div>
              <div v-if="actor.place_of_birth">
                in {{ actor.place_of_birth }}
              </div>
              <div>
                {{ getGender(actor.gender) }} | {{ actor.known_for_department }}
              </div>
            </div>
          </div>
          <div class="title">Biography</div>
          <div class="justify">{{ actor.biography }}</div>
        </div>
        <template v-if="roles.length">
          <div class="title">Cast</div>
          <router-link
            tag="div"
            class="margin"
            v-for="(role, index) in roles"
            :key="role.id"
            :to="{
              name: 'movie',
              params: { movieID: role.id, movieType: role.media_type },
            }"
          >
            <div :class="index % 2 === 0 ? 'lightgray' : 'lightblue'">
              <div :class="index % 2 === 0 ? 'main2' : 'main3'">
                <img
                  v-if="role.poster_path && role.poster_path !== ''"
                  class="movie-image"
                  :class="index % 2 === 0 ? 'left-image' : 'right-image'"
                  :src="`https://image.tmdb.org/t/p/w1280${role.poster_path}`"
                />
                <img
                  v-else
                  class="movie-image"
                  :class="index % 2 === 0 ? 'left-image' : 'right-image'"
                  src="../../public/no-image.png"
                />
                <div class="actor-description">
                  <div>Title: {{ role.title }}</div>
                  <div>Original title: {{ role.original_title }}</div>
                  <div>Character: {{ role.character }}</div>
                  <div>
                    Genres:
                    {{
                      role.media_type === "movie"
                        ? getCurrentMediaTypeGenresNames(
                            movieGenres,
                            role.genre_ids
                          )
                        : getCurrentMediaTypeGenresNames(
                            tvshowGenres,
                            role.genre_ids
                          )
                    }}
                  </div>
                  <div>Media type: {{ role.media_type }}</div>
                  <div>Release date: {{ role.release_date }}</div>
                  <div>Rating: {{ role.vote_average }}</div>
                </div>
              </div>
              <div class="justify">Overview: {{ role.overview }}</div>
            </div>
          </router-link>
        </template>
        <template v-if="crew.length">
          <div class="title">Crew</div>
          <router-link
            tag="div"
            class="margin"
            v-for="(crew, index) in crew"
            :key="crew.id"
            :to="{
              name: 'movie',
              params: { movieID: crew.id, movieType: crew.media_type },
            }"
          >
            <div :class="index % 2 === 0 ? 'lightgray' : 'lightblue'">
              <div :class="index % 2 === 0 ? 'main2' : 'main3'">
                <img
                  v-if="crew.poster_path && crew.poster_path !== ''"
                  class="movie-image"
                  :class="index % 2 === 0 ? 'left-image' : 'right-image'"
                  :src="`https://image.tmdb.org/t/p/w1280${crew.poster_path}`"
                />
                <img
                  v-else
                  class="movie-image"
                  :class="index % 2 === 0 ? 'left-image' : 'right-image'"
                  src="../../public/no-image.png"
                />
                <div class="actor-description">
                  <div>Title: {{ crew.title }}</div>
                  <div>Original title: {{ crew.original_title }}</div>
                  <div>Job: {{ crew.job }}</div>
                  <div>
                    Genres:
                    {{
                      crew.media_type === "movie"
                        ? getCurrentMediaTypeGenresNames(
                            movieGenres,
                            crew.genre_ids
                          )
                        : getCurrentMediaTypeGenresNames(
                            tvshowGenres,
                            crew.genre_ids
                          )
                    }}
                  </div>
                  <div>Department: {{ crew.department }}</div>
                  <div>Media type: {{ crew.media_type }}</div>
                  <div>Release date: {{ crew.release_date }}</div>
                  <div>Rating: {{ crew.vote_average }}</div>
                </div>
              </div>
              <div class="justify">Overview: {{ crew.overview }}</div>
            </div>
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import movieGenresMixin from "@/mixins/movieGenresMixin";

export default {
  data() {
    return {
      actor: null,
      movieGenres: null,
      tvshowGenres: null,
      roles: [],
      crew: [],
    };
  },
  // props: ['actorID', 'person'],
  mixins: [movieGenresMixin],
  async created() {
    // axios.get(`https://api.themoviedb.org/3/person${this.actorID}?api_key=f943d3d10cc39fd734122d69efabbacb`)
    axios
      .get(
        `https://api.themoviedb.org/3${this.$route.path}?api_key=f943d3d10cc39fd734122d69efabbacb`
      )
      .then((response) => {
        this.actor = response.data;
      }),
      axios
        .get(
          `https://api.themoviedb.org/3${this.$route.path}/combined_credits?api_key=f943d3d10cc39fd734122d69efabbacb`
        )
        .then((response) => {
          if (response.data.cast) {
            this.roles = response.data.cast;
          }
          if (response.data.crew) {
            this.crew = response.data.crew;
          }
        });
    // this.movieGenres = await this.getCurrentMediaTypeGenres("movie");
    // this.tvshowGenres = await this.getCurrentMediaTypeGenres("tv");
    this.movieGenres = this.$store.state.MovieGenres
    this.tvshowGenres = this.$store.state.TVShowGenres
  },
  methods: {
    getGender(gender) {
      return gender === 1 ? "Female" : "Male";
    },
    getAge(birthdayDate) {
      var now = new Date();
      var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      var dateOfBirthday = new Date(birthdayDate);
      var dateOfBirthdayThisYear = new Date(
        today.getFullYear(),
        dateOfBirthday.getMonth(),
        dateOfBirthday.getDate()
      );
      var age;
      age = today.getFullYear() - dateOfBirthday.getFullYear();
      if (today < dateOfBirthdayThisYear) {
        age = age - 1;
      }
      return age;
    },
    getPrettyDate(currentDate) {
      let arr = currentDate.split("-");
      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var prettyDate = months[+arr[1] - 1] + " " + arr[2] + ", " + arr[0];
      return prettyDate;
    },
  },
};
</script>

<style scoped>
.actor-image {
  border-radius: 5px;
  height: 190px;
  width: auto;
  margin-left: auto;
  margin-right: auto;
}
.movie-image {
  border-radius: 5px;
  height: 240px;
  width: auto;
}
.left-image {
  margin-right: 32px;
  margin-bottom: 32px;
}
.right-image {
  margin-left: 32px;
  margin-bottom: 32px;
}
.main {
  display: flex;
  justify-content: center;
}
.main2 {
  display: flex;
  align-items: center;
  /* background: lightblue; */
}
.main3 {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  /* background: lightgray; */
}
.justify {
  text-align: justify;
}
.actor-photo {
  border-radius: 5px;
  height: 240px;
  width: auto;
  margin-right: 16px;
}
.actor-description {
  margin: auto 0;
}
.title {
  font-size: 32px;
}
.genres {
  display: flex;
}
.lightgray {
  border-radius: 10px;
  background: lightgray;
  padding: 20px;
}
.lightblue {
  border-radius: 10px;
  background: lightyellow;
  padding: 20px;
}
.margin {
  margin: 25px 0;
  border-radius: 10px;
  border: lightseagreen 1px solid;
}
.margin2 {
  padding: 20px;
  border-radius: 10px;
  border: lightseagreen 1px solid;
}
.blue {
  background: lightblue;
}
.pink {
  background: lightpink;
}
/* .actor {
    background: #0D0032;
  } */
</style>
