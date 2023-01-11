// 🚀 Libraries
import feather from 'feather-icons';
// 🚀 Styles
import './style.scss';
// 🚀 Classes
import ReviewSlider from './classes/ReviewSlider.js';
import ImageSlider from './classes/ImageSlider.js';

// 🚀 Render Skeleton
const app = document.querySelector('#app');
app.innerHTML = `
<div class='app-container'>
  <div id='root' class='sliders'>
    <h3>Review Slider</h3>
    <div class='review-slider'></div>
    <h3>Image Slider</h3>
    <div class='image-slider'></div>
  </div>
  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${feather.icons.github.toSvg()}</a>
</div>`;

// 🚀 Class Instance
new ReviewSlider(document.querySelector('.review-slider'));
new ImageSlider(document.querySelector('.image-slider'));
