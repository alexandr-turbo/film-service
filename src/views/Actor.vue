<template id="about-actor-template">
  <div class="actor">
    <div v-if="actor !== null">
      <div class="container">
        <ActorInfo :actor="actor" />
          <button class="title" @click="m(1)">Cast</button>
          <button class="title" @click="m(2)">Crew</button>

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
        console.log(z)
        this.cast = true
        // if(this.scrollHeight - document.documentElement.clientHeight - window.pageYOffset < 100) {
          for(; this.i < this.roles.length;) {
            this.roles1.push(this.roles[this.i])
            this.i++
            return
          }
        // }
      }
      else if(z === 2 && !this.crews1.length && this.cast !== false) {
        console.log(z)
        this.cast = false
        // if(this.scrollHeight - document.documentElement.clientHeight - window.pageYOffset < 100) {
          for(; this.j < this.crews.length;) {
            this.crews1.push(this.crews[this.j])
            this.j++
            return
          }
        // }
      }
      else if(z === 1 && this.roles1.length && this.cast !== true) {
        console.log(z)
        this.cast = true
        // if(this.scrollHeight - document.documentElement.clientHeight - window.pageYOffset < 100) {
          // for(; this.i < this.roles.length;) {
          //   this.roles1.push(this.roles[this.i])
          //   this.i++
          //   return
          // }
        // }
      }
      else if(z === 2 && this.crews1.length && this.cast !== false) {
        console.log(z)
        this.cast = false
        // if(this.scrollHeight - document.documentElement.clientHeight - window.pageYOffset < 100) {
          // for(; this.j < this.crews.length;) {
          //   this.crews1.push(this.crews[this.j])
          //   this.j++
          //   return
          // }
        // }
      }
    },
    onScroll() {
      this.scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
      )
      console.log(this.scrollHeight)
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
    
    // console.log(this.scrollHeight - document.documentElement.clientHeight - window.pageYOffset);
    // let scrollHeight = Math.max(
    //   document.body.scrollHeight, document.documentElement.scrollHeight,
    //   document.body.offsetHeight, document.documentElement.offsetHeight,
    //   document.body.clientHeight, document.documentElement.clientHeight
    // );
    // console.log(window.pageYOffset)
    // console.log(scrollHeight)

    // console.log(document.documentElement.clientHeight)
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
          this.crews = response.data.crew;
        }
        if(this.scrollHeight - document.documentElement.clientHeight - window.pageYOffset < 100) {
          // this.cast = true
          for(; this.i < this.roles.length;) {
            this.roles1.push(this.roles[this.i])
            this.i++
            return
          }
        }
        if(this.scrollHeight - document.documentElement.clientHeight - window.pageYOffset < 100) {
          // this.cast = false
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
