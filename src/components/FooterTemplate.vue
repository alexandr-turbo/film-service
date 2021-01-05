<template>
  <div class="footer-template">
    <div class="footer-template__container">
      <div class="footer-template__bio">
        <div>
          <div class="footer-template__header">
            <div class="footer-template__title">Film cloud</div>
            <div class="footer-template__links">
              <router-link class="footer-template__link" to="/">
                <div>Home</div>
              </router-link>
              <router-link
                class="footer-template__link"
                to="/discover?mediatype=movie&sort_by=popularity.desc&vote_average.gte=&with_people=&with_genres=&year=&page=1"
              >
                <div>Discover</div>
              </router-link>
            </div>
          </div>
          <div>
            Code and design by Aleksandr Savostian
          </div>
        </div>
        <img class="footer-template__db-image" src="@/assets/TMDB.png" />
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.footer-template {
  background: var(--secondary-bg);
  color: white;
}
.footer-template__container {
  padding: 2rem 0;
  margin: 0 auto;
  max-width: 80%;
}
@media (max-width: 479px) {
  .footer-template__container {
    max-width: 90%;
  }
}
@media (max-width: 683px) {
  .footer-template__bio {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media (min-width: 684px) {
  .footer-template__bio {
    display: flex;
    justify-content: space-between;
  }
}
@media (max-width: 479px) {
  .footer-template__header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media (min-width: 480px) {
  .footer-template__header {
    display: flex;
    align-items: center;
  }
}
.footer-template__title {
  text-transform: uppercase;
  font-size: 32px;
}
.footer-template__link {
  text-decoration: none;
  color: white;
  vertical-align: bottom;
  display: inline-block;
  vertical-align: bottom;
  margin-left: 24px;
}
@media (max-width: 479px) {
  .footer-template__link:first-child {
    margin-left: 0;
  }
}
.footer-template__db-image {
  width: 162px;
  height: auto;
  margin: 10px 0;
}
</style>
