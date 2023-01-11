import feather from 'feather-icons';

export default class ImageSlider {
  constructor(root) {
    // 🚀 Props
    this.root = root;
    this.slideIndex = 1;
    this.isMoving = false;

    // 🚀 Render Skeleton
    this.root.innerHTML = `
    <div class='progress'></div>
    <ul class='nav'>
      <button data-nav='prev'>${feather.icons['arrow-left'].toSvg()}</button>
      <button data-nav='next'>${feather.icons['arrow-right'].toSvg()}</button>
    </ul>
    <ul class='slides' data-slides=''></ul>
    `;

    // 🚀 Query Selectors
    this.DOM = {
      slider: root.querySelector('[data-slides]'),
      nav: root.querySelectorAll('[data-nav]'),
    };

    console.log(getComputedStyle(document.querySelector('.image-slider')).getPropertyValue('--slide-progress'));

    // 🚀 Events Listeners
    this.initSlider();
    this.DOM.nav.forEach(btn => btn.addEventListener('click', this.moveSlider));
    this.DOM.slider.addEventListener('transitionend', this.onSlideChange);
    window.addEventListener('keyup', this.onKeyUp);
  }

  //===============================================
  // 🚀 Methods
  //===============================================
  /**
   * @function initSlider - Render slides HTML
   * @returns {Promise<void>}
   */
  initSlider = async () => {
    const data = Array.from({ length: 6 }, (v, i) => i + 1);
    data.push(data[0]);
    data.unshift(data[data.length - 2]);
    this.DOM.slider.innerHTML = `${data.map((i) => `<li><img src='https://via.placeholder.com/400/${['ea7070', 'fdc4b6', 'e59572', '2694ab', '9dd3a8', 'd9d9f3'][Math.floor(Math.random() * ['#ea7070', '#fdc4b6', '#e59572', '#2694ab', '#9dd3a8', '#d9d9f3'].length)]}/333333/?text=Image ${i}' alt=''></li>`).join('')}`;
    this.moveSlides();
  };

  //===============================================
  /**
   * @function moveSlider - Move slider to left/right
   * @param nav
   */
  moveSlider = ({ target: { dataset: { nav } } }) => {
    switch (nav) {
      case 'next':
        if (this.isMoving) return;
        this.moveHandler(nav);
        break;
      case 'prev':
        if (this.isMoving) return;
        this.moveHandler();
        break;
      default:
        break;
    }
  };
  //===============================================
  /**
   * @function moveHandler - Slide move handler
   * @param direction
   */
  moveHandler = direction => {
    this.isMoving = true;
    this.DOM.slider.style.transition = `transform 450ms ease-in-out`;
    direction !== 'next' ? (this.slideIndex -= 1) : (this.slideIndex += 1);
    this.moveSlides();
  };

  //===============================================
  /**
   * @function moveSlides - Move slides
   */
  moveSlides = () => {
    const root = document.querySelector('.image-slider');
    this.DOM.slider.style.transform = `translateX(-${this.slideIndex * 100}%)`;
    const slidesArray = [...this.DOM.slider.querySelectorAll('img')];
    root.style.setProperty('--slide-progress', `${(100 / (slidesArray.length - 3)) * (this.slideIndex - 1)}%`);
  };

  //===============================================
  /**
   * @function onSlideChange - Slide change event handler
   */
  onSlideChange = () => {
    const root = document.querySelector('.image-slider');
    const slidesArray = [...this.DOM.slider.querySelectorAll('img')];
    this.isMoving = false;
    root.style.setProperty('--slide-progress--transition', `${this.slideIndex === slidesArray.length - 1 ? 'none' : 'all 400ms cubic-bezier(0.82, 0.02, 0.39, 1.01)'}`);

    if (this.slideIndex === 0) this.slideIndex = slidesArray.length - 2;
    if (this.slideIndex === slidesArray.length - 1) this.slideIndex = 1;
    this.DOM.slider.style.transition = 'none';
    this.moveSlides();
  };

  //===============================================
  /**
   * @function onKeyUp - Move slides on key up
   * @param key
   */
  onKeyUp = ({ key }) => {
    if (this.isMoving) return;
    switch (key) {
      case 'ArrowLeft':
        this.moveHandler();
        break;
      case 'ArrowRight':
        this.moveHandler('next');
        break;
      default:
        break;
    }
  };
}
