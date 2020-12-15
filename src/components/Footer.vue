<template>
  <div class="footer">
    <div class="container">
      <div class="flex2">
        <div>
          <div class="flex">
            <div class="brand">Film cloud</div>
            <!-- <div class="block"> -->
            <router-link class="nounder" to="/">
              <div>Home</div>
            </router-link>
            <router-link
              class="nounder"
              to="/discover?movie&sort_by=popularity.desc&vote_average.gte=&with_people=&with_genres=&year=&page=1"
            >
              <div>Discover</div>
            </router-link>
            <!-- </div> -->
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
.footer {
  background: #1c262b;
  color: white;
}
.input {
  height: 24px;
  outline: none;
}
.input2 {
  max-height: 24px;
  margin: 0;
}
.relat {
  position: relative;
}
.home-link {
  position: absolute;
  height: 40px;
  left: 10%;
  top: calc(50% - (40px / 2));
}
.discover-link {
  position: absolute;
  height: 40px;
  right: 10%;
  top: calc(50% - (40px / 2));
}
.formheight {
  display: flex;
  align-items: center;
}
.button2 {
  margin: 0;
  padding: 0;
  border: 0;
  /* height: 30px; */
  outline: none;
}
.inputfield {
  height: 32px;
  width: 30vw;
  border: 0;
  border-radius: 20px;
  outline: none;
  padding-left: 18px;
  padding-right: 100px;
  font-size: 18px;
}
.imageclass {
  /* border: 0; */
  height: 16px;
  /* margin: auto; */
  /* padding: 0; */
  /* width: auto; */
}
.buttonclass {
  border-radius: 20px;
  outline: none;
  /* height: 24px; */
  /* margin: auto; */
  padding: 9px 30px;
  background: #eb4e7a;
  border: 0;
  margin-left: -76px;
  display: flex;
  align-items: center;
}
.flex {
  display: flex;
  align-items: center;
}
.flex2 {
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
}
.nounder {
  text-decoration: none;
  color: white;
  vertical-align: bottom;
  display: inline-block;
  vertical-align: bottom;
  margin-left: 24px;
}
.brand {
  text-transform: uppercase;
  font-size: 32px;
}
.block {
  position: relative;
  display: inline-block;
}
</style>
