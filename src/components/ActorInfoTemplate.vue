<template>
  <div>
    <div
      class="actor-info-template"
      v-if="
        actor.profile_path ||
        actor.name ||
        actor.birthday ||
        actor.place_of_birth ||
        actor.gender ||
        actor.known_for_department ||
        actor.biography
      "
    >
      <div class="actor-info-template__bio">
        <img
          v-if="actor.profile_path"
          class="actor-info-template__actor-photo"
          :src="`${globalImgAddress}185${actor.profile_path}`"
        />
        <img
          v-else
          class="actor-info-template__actor-photo"
          src="@/assets/no-image.png"
        />
        <div class="actor-info-template__actor-description">
          <div>{{ actor.name }}</div>
          <div v-if="actor.birthday">
            {{ getPrettyDate(actor.birthday) }} ({{ getAge(actor.birthday) }}
            {{ "actor-info-template-years-old" | localize }}),
          </div>
          <div v-if="actor.place_of_birth">
            {{
              actor.gender === 1
                ? "actor-info-template-female-born"
                : "actor-info-template-male-born" | localize
            }}
            {{ actor.place_of_birth }}
          </div>
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
        {{ "actor-info-template-no-info" | localize }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import localize from "@/filters/localize";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class ActorInfoTemplate extends Vue {
  @Prop()
  actor!: any;

  getGender(gender: number) {
    return localize(
      gender === 1 ? "actor-info-template-female" : "actor-info-template-male"
    );
  }
  getAge(birthdayDate: any) {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let dateOfBirthday = new Date(birthdayDate);
    let dateOfBirthdayThisYear = new Date(
      today.getFullYear(),
      dateOfBirthday.getMonth(),
      dateOfBirthday.getDate()
    );
    let age;
    age = today.getFullYear() - dateOfBirthday.getFullYear();
    if (today < dateOfBirthdayThisYear) {
      age = age - 1;
    }
    return age;
  }
  getPrettyDate(currentDate: string) {
    let arr = currentDate.split("-");
    let months = [
      "actor-info-template-january",
      "actor-info-template-february",
      "actor-info-template-march",
      "actor-info-template-april",
      "actor-info-template-may",
      "actor-info-template-june",
      "actor-info-template-july",
      "actor-info-template-august",
      "actor-info-template-september",
      "actor-info-template-october",
      "actor-info-template-november",
      "actor-info-template-december",
    ];
    let prettyDate = "";
    if (this.$store.getters.locale === "en-US") {
      prettyDate = localize(months[+arr[1] - 1]) + " " + arr[2] + ", " + arr[0];
    } else if (this.$store.getters.locale === "uk-UA") {
      prettyDate = arr[2] + " " + localize(months[+arr[1] - 1]) + ", " + arr[0];
    }
    return prettyDate;
  }
}
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
