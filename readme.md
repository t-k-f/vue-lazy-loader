# Vue.js Lazy loader directive

A lazy loading directive for vue.js

### Installing

```
npm install --save vue-lazy-loader
```

then

```
import VueLazyLoader from 'vue-lazy-loader'

Vue.directive('lazy', VueLazyLoader)
```

### Usage

```
<img v-lazy='/assets/img.jpg'> // set src

<div v-lazy='/assets/img.jpg'></div> // set background-image

<video v-lazy='/assets/img.jpg'></video> // set poster
```

### Scroll Reveal

If you want to load the pictures only when they are in viewport, pass the scroll position and the viewport height to the directive. If you want to wait to reveal the image on a certain event set reveal to false. Offset defines the offset from the bottom of page as factor.

```
<img v-lazy='{src: '/assets/img.jpg', scroll: SCROLL_POSITION, vh: VIEWPORT_HEIGHT, reveal: true, offset: 0.1}'>
```
