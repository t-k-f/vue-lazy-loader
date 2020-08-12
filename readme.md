# Vue.js Lazy loader plugin

A lazy loading directive for vue.js 3.x based on [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

### Installing

```
npm install --save vue-lazy-loader
```

then

```
import VueLazyLoader from 'vue-lazy-loader'

createApp(App).use(VueLazyLoader, VueLazyLoader, { root: null, rootMargin: '0px', threshold: [0.75, 1] })
```

### Usage

```
<img v-lazy='/assets/img.jpg'> // set src

<div v-lazy='/assets/img.jpg'></div> // set background-image

<video v-lazy='/assets/img.jpg'></video> // set poster
```

### Scroll Reveal

Pictures are loaded on demand by when they are visible in the viewport. For possible option [see](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

### Browser support

Support for IE11 was removed in Version 3.0.0 and above.
For supported browsers see [https://caniuse.com/#feat=intersectionobserver](https://caniuse.com/#feat=intersectionobserver)

### Vue.js 2x

Please install the package version @2.0.0
