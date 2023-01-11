import feather from 'feather-icons';
import axios from 'axios';
import { showNotification } from '../modules/showNotification.js';
import { getRandomNumber } from '../modules/getRandomNumber.js';

export default class ReviewSlider {
  constructor(root) {
    // 🚀 Props
    this.root = root;
    this.initialAxios = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com/users?_start=0&_limit=5',
    });
    this.reviews = null;
    this.slideIndex = 0;

    // 🚀 Render Skeleton
    this.root.innerHTML = `
    <div class='header'>
      <h3>What Our Clients Say</h3>
      <p>We partner with some pretty amazing people! Here’s what they say about us.</p>
    </div>
    <div class='body'>
      <ul class='nav'>
        <button data-nav='prev'>${feather.icons['arrow-left'].toSvg()}</button>
        <button data-nav='next'>${feather.icons['arrow-right'].toSvg()}</button>
      </ul>
      <ul class='slides' data-slides=''></ul>
    </div>
    `;

    // 🚀 Query Selectors
    this.DOM = {
      slider: root.querySelector('[data-slides]'),
      nav: root.querySelectorAll('[data-nav]'),
    };

    // 🚀 Events Listeners
    this.initSlider();
    this.DOM.nav.forEach(btn => btn.addEventListener('click', this.moveSlider));
  }

  //===============================================
  // 🚀 Methods
  //===============================================
  /**
   * @function initSlider - Fetch data from API and render slides HTML
   * @returns {Promise<void>}
   */
  initSlider = async () => {
    try {
      const { data } = await this.initialAxios.get();

      if (data.length === 0) {
        showNotification('danger', 'Something went wrong, open developer console.');
        return;
      }

      this.reviews = data;

      this.DOM.slider.innerHTML = `
      ${this.reviews.map(({ id, name, address: { street, city } }) => `
        <li>
          <img src='https://randomuser.me/api/portraits/men/${id}.jpg' alt='${name}'>
          <h3 class='h5'>${name}</h3>
          <p>${street}, ${city}</p>
          <p>${Array.from({ length: getRandomNumber(1, 5) }).map(i => feather.icons.star.toSvg()).join('')}</p>
          <p>doloribus at sed quis culpa deserunt consectetur qui praesentium accusamus fugiat dicta voluptatem rerum ut voluptate autem voluptatem repellendus aspernatur dolorem in</p>
        </li>
      `).join('')}
      `;
    } catch (e) {
      showNotification('danger', 'Something went wrong, open developer console.');
      console.log(e);
    }
  };

  //===============================================
  /**
   * @function moveSlider - Move slider to left/right
   * @param nav
   */
  moveSlider = ({ target: { dataset: { nav } } }) => {
    switch (nav) {
      case 'next':
        this.slideIndex === this.reviews.length - 1 ? this.slideIndex = 0 : this.slideIndex++;
        break;
      case 'prev':
        this.slideIndex === 0 ? this.slideIndex = this.reviews.length - 1 : this.slideIndex--;
        break;
      default:
        break;
    }
    this.DOM.slider.style.transform = `translate(${-100 * this.slideIndex}%)`;
  };
}
