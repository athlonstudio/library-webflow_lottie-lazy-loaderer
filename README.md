# Webflow Lottie Lazy Loader
A js package that when put into a webflow website will enable lazy loading of lottie animations.

## Usage
Paste the script into the **Footer code** of your webflow page and apply a `data-loading: lazy` attribute to all the lottie elements you want lazy loaded.

```html
<script src='https://cdn.jsdelivr.net/gh/athlonstudio/webflow-lottie-lazy-loader@main/src/lottieLazyLoading.min.js'></script>
```

## Attributes
`data-loading: lazy` - Makes a lottie element load in on scroll
`data-poster: [image-URL]` - Generates a placeholder image until the lottie element loads in (may affect performance if you use large or too many images). SVGs or WEBP reccomended
