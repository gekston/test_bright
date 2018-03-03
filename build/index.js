'use strict';

Vue.component('slider-item', {
  template: '#slider-item-template',
  props: ['id', 'src']
});

Vue.component('slider', {
  template: '#slider-template',
  props: ['data'],
  data: function data() {
    var MAN_COUNTER = [1, 2, 3, 4, 5];
    var USER_ARR = this.data;
    var WORK_ARR = new Array();
    _.forEach(MAN_COUNTER, function (value, key) {
      var img_link = void 0;
      _.forEach(USER_ARR[Math.round(Math.random())], function (value, key) {
        if (key === "src") img_link = value;
      });
      var obj = {
        'key': key,
        'src': img_link
      };
      WORK_ARR.push(obj);
    });
    return {
      users: WORK_ARR,
      add: null
    };
  },
  methods: {
    PREW_ELEMENT: function PREW_ELEMENT() {
      var USER_ARR = this.users;
      var DATA = this.data;
      var first_index = USER_ARR.indexOf(_.head(this.users));
      var last_index = USER_ARR.indexOf(_.last(this.users));
      var first_element = _.nth(document.querySelectorAll('.slider__item'), 1);
      var last_element = _.last(document.querySelectorAll('.slider__item'));
      var first_elementRect = first_element.getBoundingClientRect();
      var last_elementRect = last_element.getBoundingClientRect();
      var coordsFirst_element = { x: first_elementRect.x, y: first_elementRect.y, width: first_elementRect.width };
      var coordsLast_element = { x: last_elementRect.x, y: last_elementRect.y, width: last_elementRect.width };
      var groupA = new TWEEN.Group();
      var firstPrew = new TWEEN.Tween({ x: 0 }, groupA).easing(TWEEN.Easing.Cubic.Out).to(coordsFirst_element, 1000).onStart(function () {}).onUpdate(function () {
        first_element.style.setProperty('transform', 'translate(' + -(coordsFirst_element.x + coordsFirst_element.width) + 'px, ' + 0 + 'px)');
        first_element.style.setProperty('opacity', 0);
      }).start();
      var lastPrew = new TWEEN.Tween({ x: 0 }, groupA).easing(TWEEN.Easing.Cubic.In).to(coordsLast_element).onStart(function () {}).onUpdate(function () {
        last_element.style.setProperty('transform', 'translate(' + 0 + 'px, ' + 0 + 'px)');
        last_element.style.setProperty('opacity', 1);
      }).start();
      groupA.update();
      animate();
      array_move(USER_ARR, first_index, last_index);
    },
    NEXT_ELEMENT: function NEXT_ELEMENT() {
      var USER_ARR = this.users;
      var DATA = this.data;
      var first_index = USER_ARR.indexOf(_.head(this.users));
      var last_index = USER_ARR.indexOf(_.last(this.users));
      var first_element = _.nth(document.querySelectorAll('.slider__item'), 3);
      var last_element = _.first(document.querySelectorAll('.slider__item'));
      var first_elementRect = first_element.getBoundingClientRect();
      var last_elementRect = last_element.getBoundingClientRect();
      var coordsFirst_element = { x: first_elementRect.x, y: first_elementRect.y, width: first_elementRect.width };
      var coordsLast_element = { x: last_elementRect.x, y: last_elementRect.y, width: last_elementRect.width };
      var groupB = new TWEEN.Group();
      var firstPrew = new TWEEN.Tween({ x: 0 }, groupB).easing(TWEEN.Easing.Cubic.Out).to(coordsFirst_element, 1000).onStart(function () {}).onUpdate(function () {
        first_element.style.setProperty('transform', 'translate(' + (coordsFirst_element.x + coordsFirst_element.width) + 'px, ' + 0 + 'px)');
        first_element.style.setProperty('opacity', 0);
      }).onComplete(function () {
        first_element.removeAttribute('style');
      }).start();
      var lastPrew = new TWEEN.Tween({ x: 0 }, groupB).easing(TWEEN.Easing.Cubic.Out).to(coordsLast_element, 1000).onStart(function () {}).onUpdate(function () {
        last_element.style.setProperty('transform', 'translate(' + 0 + 'px, ' + 0 + 'px)');
        last_element.style.setProperty('opacity', 1);
      }).start();
      groupB.update();
      animate();
      array_move(USER_ARR, last_index, first_index);
    }
  },
  mounted: function mounted() {
    var last_element = _.last(document.querySelectorAll('.slider__item'));
    var first_element = _.first(document.querySelectorAll('.slider__item'));
    first_element.style.setProperty('opacity', 0);
    last_element.style.setProperty('opacity', 0);
    first_element.style.setProperty('transform', 'translate(' + -(window.innerWidth - last_element.offsetLeft) + 'px, ' + 0 + 'px)');
    last_element.style.setProperty('transform', 'translate(' + (window.innerWidth - last_element.offsetLeft) + 'px, ' + 0 + 'px)');
  },
  updated: function updated() {
    var last_element = _.last(document.querySelectorAll('.slider__item'));
    var first_element = _.first(document.querySelectorAll('.slider__item'));
    first_element.style.setProperty('transform', 'translate(' + -(window.innerWidth - last_element.offsetLeft) + 'px, ' + 0 + 'px)');
    first_element.style.setProperty('opacity', 0);
    last_element.style.setProperty('transform', 'translate(' + (window.innerWidth - last_element.offsetLeft) + 'px, ' + 0 + 'px)');
    last_element.style.setProperty('opacity', 0);
  }
});

new Vue({
  el: '#app',
  data: function data() {
    return {
      user: [{
        'id': 12,
        'src': 'build/img/user1.png'
      }, {
        'id': 2,
        'src': 'build/img/user2.png'
      }]
    };
  }
});

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
};

function animate() {
  if (TWEEN.update()) {
    requestAnimationFrame(animate);
  }
}