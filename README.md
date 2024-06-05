# Webflow Lottie Lazy Loader
A js package that when put into a webflow website will enable lazy loading of Lottie animations. This will also pause any off-screen Lottie animations to further improve performance.

## Usage
Paste the script into the **Footer code** of your Webflow page and apply a `data-loading: lazy` attribute to all the lottie elements you want lazy loaded.

```html
<script src='https://cdn.jsdelivr.net/gh/athlonstudio/webflow-lottie-lazy-loader@2.0/src/lottieLazyLoading.min.js'></script>
```

## Attributes
- `data-loading="lazy"` - Enables lazy loading on that Lottie element.
- `data-play-once="true"` - Makes it so that the Lottie element only plays one time and remains static after that first play.
- `data-poster="[image-URL]"` - Generates a placeholder image that loads with the page, and persists until you scroll and the Lottie element lazy loads in. This attribute may affect performance if you use large or there are too many lotties on your page. Small SVGs or WEBP reccomended.
- `data-will-transform="true"` - Flags an element that is inside of a carousel or other transforming parent so that it can be rendered properly and play correctly. (May affect loading and performance)

## Example 
### Footer Code section with the Lottie Lazy Loader script.
![An image of the Footer Code section with the Lottie Lazy Loader script.](https://github.com/athlonstudio/webflow-lottie-lazy-loader/assets/162381441/3d41b60b-3f74-4c88-8934-1652417cb3ee)

### Webflow Lottie Panel with the loading and poster attributes added.
![An image of the Webflow Lottie Panel with the loading and poster attributes added.](https://github.com/athlonstudio/webflow-lottie-lazy-loader/assets/162381441/b383f49c-f136-4f62-b076-e1055541c58b)
