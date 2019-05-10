# Vue.js Lazy loader plugin

A lazy loading directive for vue.js based on [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

### Installing

```
npm install --save vue-lazy-loader
```

then

```
import VueLazyLoader from 'vue-lazy-loader'

Vue.use(VueLazyLoader, { root: null, rootMargin: '0px', threshold: [0.75, 1] })
```

### Usage

```
<img v-lazy='/assets/img.jpg'> // set src

<div v-lazy='/assets/img.jpg'></div> // set background-image

<video v-lazy='/assets/img.jpg'></video> // set poster
```

### Scroll Reveal

Pictures are loaded on demand by when they are visible in the viewport. For possible option [see](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

### Updating Options

```
Vue.$vll.observer({
    root: null,
    rootMargin: '0px',
    threshold: [0, 1]
})
```

### Browser support

If a browser doesn't support intersectionObserver the plugin will just plain lazy load the images, without waiting for the images to appear in the viewport.
