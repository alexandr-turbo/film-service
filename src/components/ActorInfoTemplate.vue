<template>
  <div> 
    <div class="actor-info-template" v-if="actor.profile_path && actor.profile_path !== '' || actor.name || actor.birthday || actor.place_of_birth || actor.gender || actor.known_for_department || actor.biography">
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
            {{'actor-info-template-years-old' | localize}}),
          </div>
          <div v-if="actor.place_of_birth">{{ actor.gender === 1 ? 'actor-info-template-female-born' : 'actor-info-template-male-born' | localize}} {{ actor.place_of_birth }}</div>
          <div>
            {{ getGender(actor.gender) }} | {{ actor.known_for_department }}
          </div>
        </div>
      </div>
      <div class="actor-info-template__biography" v-if="actor.biography">
        <div>{{ actor.biography }}</div>
      </div>
    </div>
    <div class="actor-info-template" v-else>
      <div class="actor-info-template__bio">
        {{'actor-info-template-no-info' | localize}}
      </div>
    </div>
  </div>
</template>
<script>

import localize from '@/filters/localize'
export default {
  props: ["actor"],
  methods: {
    getGender(gender) {
      return gender === 1 ? localize('actor-info-template-female') : localize('actor-info-template-male');
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
        localize("actor-info-template-january"),
        localize("actor-info-template-february"),
        localize("actor-info-template-march"),
        localize("actor-info-template-april"),
        localize("actor-info-template-may"),
        localize("actor-info-template-june"),
        localize("actor-info-template-july"),
        localize("actor-info-template-august"),
        localize("actor-info-template-september"),
        localize("actor-info-template-october"),
        localize("actor-info-template-november"),
        localize("actor-info-template-december"),
      ];
      let prettyDate = ''
      if(this.$store.getters.locale === 'en-US') {
        prettyDate = months[+arr[1] - 1] + " " + arr[2] + ", " + arr[0];
      } else if(this.$store.getters.locale === 'ru-RU') {
        prettyDate = arr[2] + " " + months[+arr[1] - 1] + ", " + arr[0];
      }
      return prettyDate;
    },
  },
};
</script>
<style scoped>
.actor-info-template {
  padding: 20px;
  border-radius: 10px;
  border: var(--accent-color) 1px solid;
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
