<template>
  <div> 
    <div class="actor-info-template">
      <div class="actor-info-template__bio">
        <img
          v-if="actor.profile_path && actor.profile_path !== ''"
          class="actor-info-template__actor-photo"
          :src="`${globalImgAddress}185${actor.profile_path}`"
        />
        <img v-else class="actor-info-template__actor-photo" src="@/assets/no-image.png" />
        <div class="actor-info-template__actor-description">
          <div>{{ actor.name }}</div>
          <div v-if="actor.birthday">
            {{ getPrettyDate(actor.birthday) }} ({{ getAge(actor.birthday) }}
            y/o),
          </div>
          <div v-if="actor.place_of_birth">Born in {{ actor.place_of_birth }}</div>
          <div>
            {{ getGender(actor.gender) }} | {{ actor.known_for_department }}
          </div>
        </div>
      </div>
      <div class="actor-info-template__biography" v-if="actor.biography">
        <div>{{ actor.biography }}</div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: ["actor"],
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
.actor-info-template {
  padding: 20px;
  border-radius: 10px;
  border: #eb4e7a 1px solid;
}
@media (max-width: 539px) {
  .actor-info-template__bio {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media (min-width: 540px) {
  .actor-info-template__bio {
    display: flex;
    justify-content: center;
  }
}
@media (max-width: 539px) {
  .actor-info-template__actor-photo {
    border-radius: 5px;
    height: 240px;
    width: auto;
  }
}
@media (min-width: 540px) {
  .actor-info-template__actor-photo {
    border-radius: 5px;
    height: 240px;
    width: auto;
    margin-right: 16px;
  }
}
@media (max-width: 539px) {
  .actor-info-template__actor-description {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }
}
@media (min-width: 540px) {
  .actor-info-template__actor-description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
}
.actor-info-template__biography {
  text-align: justify;
  margin-top: 25px;
}
</style>
