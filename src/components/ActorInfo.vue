<template>
  <div>
    <div
      class="margin2"
      :class="getGender(actor.gender) === 'Male' ? 'blue' : 'pink'"
    >
      <div class="main">
        <img
          v-if="actor.profile_path && actor.profile_path !== ''"
          class="actor-photo"
          :src="`${globalImgAddress}92${actor.profile_path}`"
        />
        <img v-else class="actor-photo" src="@/assets/no-image.png" />
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
      <div v-if="actor.biography">
        <div class="title">Biography</div>
        <div class="justify">{{ actor.biography }}</div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
// import Slick from "vue-slick";
// // import movieGenresMixin from "@/mixins/movieGenresMixin";

export default {
  props: ["actor"],
  // // mixins: [movieGenresMixin],
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
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
