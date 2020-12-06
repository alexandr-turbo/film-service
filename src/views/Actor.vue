<template id="about-actor-template">
  <div class="actor">
    <div v-if="actor !== null">
      <div class="container">
        <!-- <div v-for="i in 100" :key="i">
          <img v-lazy="`https://via.placeholder.com/728x90.png?text=` + i" width="100%" height="400">
        </div> -->
        <ActorInfo :actor="actor" />
        <template v-if="roles.length">
          <div class="title">Cast</div>
          <div v-for="(role, index) in roles" :key="role.id">
            <ActorCastCover :role="role" :index="index" :movieGenres="movieGenres" :tvshowGenres="tvshowGenres"/>
          </div>
        </template>
        <template v-if="crew.length">
          <div class="title">Crew</div>
          <div v-for="(crew, index) in crew" :key="crew.id">
            <ActorCrewCover :crew="crew" :index="index" :movieGenres="movieGenres" :tvshowGenres="tvshowGenres"/>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import movieGenresMixin from "@/mixins/movieGenresMixin";
import ActorInfo from "../components/ActorInfo.vue";
import ActorCastCover from "../components/ActorCastCover.vue";
import ActorCrewCover from "../components/ActorCrewCover.vue";

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
  // // mixins: [movieGenresMixin],
  components: {
    ActorInfo, ActorCastCover, ActorCrewCover
  },
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
  // methods: {
  //   getGender(gender) {
  //     return gender === 1 ? "Female" : "Male";
  //   },
  //   getAge(birthdayDate) {
  //     var now = new Date();
  //     var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  //     var dateOfBirthday = new Date(birthdayDate);
  //     var dateOfBirthdayThisYear = new Date(
  //       today.getFullYear(),
  //       dateOfBirthday.getMonth(),
  //       dateOfBirthday.getDate()
  //     );
  //     var age;
  //     age = today.getFullYear() - dateOfBirthday.getFullYear();
  //     if (today < dateOfBirthdayThisYear) {
  //       age = age - 1;
  //     }
  //     return age;
  //   },
  //   getPrettyDate(currentDate) {
  //     let arr = currentDate.split("-");
  //     let months = [
  //       "Jan",
  //       "Feb",
  //       "Mar",
  //       "Apr",
  //       "May",
  //       "Jun",
  //       "Jul",
  //       "Aug",
  //       "Sep",
  //       "Oct",
  //       "Nov",
  //       "Dec",
  //     ];
  //     var prettyDate = months[+arr[1] - 1] + " " + arr[2] + ", " + arr[0];
  //     return prettyDate;
  //   },
  // },
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
