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
