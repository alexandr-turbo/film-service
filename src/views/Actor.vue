<template id="about-actor-template">
  <div class="actor">
    <div v-if="actor !== null">
      <div class="container">
        <ActorInfo :actor="actor" />
        <div class="beauty">
          <button class="home-btn" @click="m(1)">Cast</button>
          <button class="home-btn" @click="m(2)">Crew</button>
        </div>
        <template v-if="roles.length && cast">
          <div class="title">Cast</div>
          <div v-for="(role, index) in roles1" :key="role.id">
            <ActorCastCover :role="role" :index="index" :movieGenres="movieGenres" :tvshowGenres="tvshowGenres"/>
          </div>
        </template>
        <template v-if="crews.length && !cast">
          <div class="title">Crew</div>
          <div v-for="(crew, index) in crews1" :key="crew.id">
            <ActorCrewCover :crew="crew" :index="index" :movieGenres="movieGenres" :tvshowGenres="tvshowGenres"/>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ActorInfo from "../components/ActorInfo.vue";
import ActorCastCover from "../components/ActorCastCover.vue";
import ActorCrewCover from "../components/ActorCrewCover.vue";

export default {
  data: () => ({
    // return {
      cast: true,
      actor: null,
      movieGenres: null,
      tvshowGenres: null,
      roles: [],
      crews: [],
      roles1: [],
      crews1: [],
      scrollHeight: 0,
      interval: null,
      i: 0,
      j: 0
  }),
  components: {
    ActorInfo,
    ActorCastCover,
    ActorCrewCover
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    m(z) {
      if(z === 1 && !this.roles1.length && this.cast !== true) {
        this.cast = true
          for(; this.i < this.roles.length;) {
            this.roles1.push(this.roles[this.i])
            this.i++
            return
          }
      }
      else if(z === 2 && !this.crews1.length && this.cast !== false) {
        this.cast = false
          for(; this.j < this.crews.length;) {
            this.crews1.push(this.crews[this.j])
            this.j++
            return
          }
      }
      else if(z === 1 && this.roles1.length && this.cast !== true) {
        this.cast = true
      }
      else if(z === 2 && this.crews1.length && this.cast !== false) {
        this.cast = false
      }
    },
    onScroll() {
      this.scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
      )
      if(this.scrollHeight - document.documentElement.clientHeight - window.pageYOffset < 100 && this.cast === true) {
        
        for(; this.i < this.roles.length;) {
          this.roles1.push(this.roles[this.i])
          this.i++
          return
        }
      }
      if(this.scrollHeight - document.documentElement.clientHeight - window.pageYOffset < 100 && this.cast === false) {
        
        for(; this.j < this.crews.length;) {
          this.crews1.push(this.crews[this.j])
          this.j++
          return
        }
      }
    }
  },
  async created() {
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
          this.crews = response.data.crew;
        }
        if(this.scrollHeight - document.documentElement.clientHeight - window.pageYOffset < 100) {
          for(; this.i < this.roles.length;) {
            this.roles1.push(this.roles[this.i])
            this.i++
            return
          }
        }
        if(this.scrollHeight - document.documentElement.clientHeight - window.pageYOffset < 100) {
          for(; this.j < this.crews.length;) {
            this.crews1.push(this.crews[this.j])
            this.j++
            return
          }
        }
      });
    this.movieGenres = this.$store.state.MovieGenres
    this.tvshowGenres = this.$store.state.TVShowGenres
  },
};
</script>

<style scoped>
.actor {
  background: -webkit-linear-gradient(285deg, #251431 0%, #161130 22%);
  background: -o-linear-gradient(285deg, #251431 0%, #161130 22%);
  background: linear-gradient(165deg, #251431 0%, #161130 22%);
  color: #fff;
}
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
}
.main3 {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
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
.title-btn {
  font-size: 32px;
  
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
.home-btn {
  background: none;
  border: none;
  background-image: -webkit-gradient(linear, left top, right top, from(rgba(255, 86, 132, 0.4)), color-stop(68%, rgba(83, 50, 201, 0.4))), -webkit-gradient(linear, left top, right top, from(rgba(255, 86, 132, 0.4)), color-stop(68%, rgba(83, 50, 201, 0.4)));
  background-image: -webkit-linear-gradient(left, rgba(255, 86, 132, 0.4) 0%, rgba(83, 50, 201, 0.4) 68%), -webkit-linear-gradient(left, rgba(255, 86, 132, 0.4) 0%, rgba(83, 50, 201, 0.4) 68%);
  background-image: -o-linear-gradient(left, rgba(255, 86, 132, 0.4) 0%, rgba(83, 50, 201, 0.4) 68%), -o-linear-gradient(left, rgba(255, 86, 132, 0.4) 0%, rgba(83, 50, 201, 0.4) 68%);
  background-image: linear-gradient(90deg, rgba(255, 86, 132, 0.4) 0%, rgba(83, 50, 201, 0.4) 68%), linear-gradient(90deg, rgba(255, 86, 132, 0.4) 0%, rgba(83, 50, 201, 0.4) 68%);
  border-image-slice: 1;
  border-left: 3px solid rgba(255, 86, 132, 0.4);
  border-right: 3px solid rgba(83, 50, 201, 0.4);
  border-radius: 10px;
  background-position: 0 0, 0 100%;
  background-repeat: no-repeat;
  background-size: 100% 3px;
  color: #fff;
  cursor: pointer;
  display: block;
  font-family: "Alegreya Sans", sans-serif;
  font-weight: bold;
  letter-spacing: .4rem;
  outline: none;
  padding: 30px 100px;
  margin: 25px 10px 0;
  text-transform: uppercase;
}
.beauty {
  display: flex;
  justify-content: center;
}
</style>
