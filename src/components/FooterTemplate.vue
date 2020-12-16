<template>
  <div class="footer-template">
    <div class="footer-template__container">
      <div class="footer-template__bio">
        <div>
          <div class="footer-template__header">
            <div class="footer-template__title">Film cloud</div>
            <router-link class="footer-template__links" to="/">
              <div>Home</div>
            </router-link>
            <router-link
              class="footer-template__links"
              to="/discover?movie&sort_by=popularity.desc&vote_average.gte=&with_people=&with_genres=&year=&page=1"
            >
              <div>Discover</div>
            </router-link>
          </div>
          <div>
            Code and design by Aleksandr Savostian
          </div>
        </div>
        <img src="@/assets/TMDB.png" />
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.footer-template {
  background: #1c262b;
  color: white;
}
.footer-template__container {
  padding: 2rem 0;
  margin: 0 auto;
  max-width: 80%;
}
.footer-template__bio {
  display: flex;
  justify-content: space-between;
}
.footer-template__header {
  display: flex;
  align-items: center;
}
.footer-template__title {
  text-transform: uppercase;
  font-size: 32px;
}
.footer-template__links {
  text-decoration: none;
  color: white;
  vertical-align: bottom;
  display: inline-block;
  vertical-align: bottom;
  margin-left: 24px;
}
</style>
