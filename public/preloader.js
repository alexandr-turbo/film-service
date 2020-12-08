// let  images = document.images;
// let  images_total_count = images.length;
// let  images_loaded_count = 0;
// let  preloader = document.getElementById('page-preloader');
// let  perc_display = document.getElementById('load_perc');

// for (let i = 0; i < images_total_count; i++) {
//   let image_clone = new Image();
//   image_clone.onload = image_loaded;
//   image_clone.onerror = image_loaded;
//   image_clone.src = images[i].src;
// }

// function image_loaded() {
//   images_loaded_count++;
//   perc_display.innerHTML = (((100/images_total_count) * images_loaded_count) << 0) + '%';
//   if(images_loaded_count >= images_total_count) {
//     setTimeout(() => {
//       if(!preloader.classList.contains('done')) {
//         preloader.classList.add('done');
//       }
//     }, 1000);
//   }
// }
// document.body.onload = function() {

//   setTimeout(() => {
//     let preloader = document.getElementById('page-preloader');
//     if (!preloader.classList.contains('done')) {
//       preloader.classList.add('done')
//     }
//   }, 1000)
// }