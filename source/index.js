Vue.component('slider-item', {
  template: '#slider-item-template',
  props: [
    'id', 'src'
  ]
});

Vue.component('slider', {
  template: '#slider-template',
  props: [
    'data'
  ],
  data: function () {
    const MAN_COUNTER = [1, 2, 3, 4, 5]
    const USER_ARR = this.data
    const WORK_ARR = new Array()
    _.forEach(MAN_COUNTER, function (value, key) {
      let img_link
      _.forEach(USER_ARR[Math.round(Math.random())], function (value, key) {if(key === "src") img_link = value})
      const obj = {
        'key': key,
        'src': img_link
      }
      WORK_ARR.push(obj)
    })
    return {
      users: WORK_ARR,
      add: null
    }
  },
  methods: {
    PREW_ELEMENT () {
      const USER_ARR = this.users
      const DATA = this.data
      const first_index = USER_ARR.indexOf(_.head(this.users))
      const last_index = USER_ARR.indexOf(_.last(this.users))
      const first_element = _.nth(document.querySelectorAll('.slider__item'), 1)
      const last_element = _.last(document.querySelectorAll('.slider__item'))
      const first_elementRect = first_element.getBoundingClientRect()
      const last_elementRect = last_element.getBoundingClientRect()
      const coordsFirst_element = { x: first_elementRect.x, y: first_elementRect.y, width: first_elementRect.width }
      const coordsLast_element = { x: last_elementRect.x, y: last_elementRect.y, width: last_elementRect.width }
      const groupA = new TWEEN.Group();
      const firstPrew = new TWEEN.Tween({ x: 0 }, groupA)
            .easing(TWEEN.Easing.Cubic.Out)
            .to(coordsFirst_element, 1000)
            .onStart(() => {})
            .onUpdate(() => {
              first_element.style.setProperty('transform', 'translate(' + -(coordsFirst_element.x + coordsFirst_element.width ) + 'px, ' + 0 + 'px)')
              first_element.style.setProperty('opacity', 0)
            })
            .start()
      const lastPrew = new TWEEN.Tween({x: 0}, groupA)
            .easing(TWEEN.Easing.Cubic.In)
            .to(coordsLast_element)
            .onStart(() => {})
            .onUpdate(() => {
              last_element.style.setProperty('transform', 'translate(' + 0 + 'px, ' + 0 + 'px)')
              last_element.style.setProperty('opacity', 1)
            })
            .start()
      groupA.update()
      animate()
      array_move(USER_ARR, first_index, last_index)
    },
    NEXT_ELEMENT () {
      const USER_ARR = this.users
      const DATA = this.data
      const first_index = USER_ARR.indexOf(_.head(this.users))
      const last_index = USER_ARR.indexOf(_.last(this.users))
      const first_element = _.nth(document.querySelectorAll('.slider__item'), 3)
      const last_element = _.first(document.querySelectorAll('.slider__item'))
      const first_elementRect = first_element.getBoundingClientRect()
      const last_elementRect = last_element.getBoundingClientRect()
      const coordsFirst_element = { x: first_elementRect.x, y: first_elementRect.y, width: first_elementRect.width }
      const coordsLast_element = { x: last_elementRect.x, y: last_elementRect.y, width: last_elementRect.width }
      const groupB = new TWEEN.Group()
      const firstPrew = new TWEEN.Tween({x: 0}, groupB)
            .easing(TWEEN.Easing.Cubic.Out)
            .to(coordsFirst_element, 1000)
            .onStart(() => {})
            .onUpdate(() => {
              first_element.style.setProperty('transform', 'translate(' + (coordsFirst_element.x +coordsFirst_element.width ) + 'px, ' + 0 + 'px)')
              first_element.style.setProperty('opacity', 0)
            })
            .onComplete(() => {
              first_element.removeAttribute('style')
            })
            .start()
      const lastPrew = new TWEEN.Tween({ x: 0 }, groupB)
            .easing(TWEEN.Easing.Cubic.Out)
            .to(coordsLast_element, 1000)
            .onStart(() => {})
            .onUpdate(() => {
              last_element.style.setProperty('transform', 'translate(' + 0 + 'px, ' + 0 + 'px)')
              last_element.style.setProperty('opacity', 1)
            })
            .start()
      groupB.update()
      animate()
      array_move(USER_ARR, last_index, first_index)
    }
  },
  mounted: () => {
    const last_element = _.last(document.querySelectorAll('.slider__item'))
    const first_element = _.first(document.querySelectorAll('.slider__item'))
    first_element.style.setProperty('opacity', 0)
    last_element.style.setProperty('opacity', 0)
    first_element.style.setProperty('transform', 'translate(' + -(window.innerWidth - last_element.offsetLeft) + 'px, ' + 0 + 'px)')
    last_element.style.setProperty('transform', 'translate(' + (window.innerWidth - last_element.offsetLeft) + 'px, ' + 0 + 'px)')
  },
  updated: () => {
    const last_element = _.last(document.querySelectorAll('.slider__item'))
    const first_element = _.first(document.querySelectorAll('.slider__item'))
    first_element.style.setProperty('transform', 'translate(' + -(window.innerWidth - last_element.offsetLeft) + 'px, ' + 0 + 'px)')
    first_element.style.setProperty('opacity', 0)
    last_element.style.setProperty('transform', 'translate(' + (window.innerWidth - last_element.offsetLeft) + 'px, ' + 0 + 'px)')
    last_element.style.setProperty('opacity', 0)
  }
});

new Vue({
  el: '#app',
  data () {
    return {
      user: [
        {
          'id': 12,
          'src': 'build/img/user1.png'
        },
        {
          'id': 2,
          'src': 'build/img/user2.png'
        }
      ]
    }
  }
});

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
      let k = new_index - arr.length + 1;
      while (k--) {
          arr.push(undefined);
      }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
};

function animate () {
  if (TWEEN.update()) {
    requestAnimationFrame(animate)
  }
}
