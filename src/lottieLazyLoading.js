const lazyLotties = [...document.querySelectorAll('[data-loading="lazy"]')];
const isDisplayNone = (el) => getComputedStyle(el).display === 'none';

if (!!lazyLotties.length){
  lazyLotties.forEach((lazyLottie) => {
    lazyLottie.dataset.defaultSrc = lazyLottie.dataset.src;
    lazyLottie.dataset.src = '';
    lazyLottie.dataset.animationType = 'lazy-lottie';
    lazyLottie.style.cssText = 'overflow:hidden;position:relative';
    if(lazyLottie.dataset.poster) {
  lazyLottie.appendChild(Object.assign(document.createElement('img'),{
        src:lazyLottie.dataset.poster, 
        loading: 'eager',
        style:'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);',
      }));
    }
  })

    const lazyLottieObserver = new IntersectionObserver((entries) => entries.forEach(async (entry) => {
      const lottieEl = entry.target;
      const isLoaded = lottieEl.children.length && (lottieEl.children[0].tagName === 'SVG' || lottieEl.children[0].tagName === 'CANVAS');

      if (entry.isIntersecting && !isDisplayNone(lottieEl)) {
        lottieEl.dataset.state = 'playing';
        
        if (!isLoaded) {
          lottieEl.dataset.animationType = 'lottie';
          lottieEl.dataset.src = lottieEl.dataset.defaultSrc;
          
          await Webflow.require('lottie').createInstance(lottieEl);
        lottieEl.querySelector('img') && lottieEl.querySelector('img').remove();
          
          if (!parseFloat(lottieEl.dataset.loop)){
            lazyLottieObserver.unobserve(lottieEl);
          } 
          
        }	else {
          lottieEl.dataset.duration = 0;
          lottieEl.dataset.loop = 1;
          Webflow.require('lottie').createInstance(lottieEl);
        }
      } else if (isLoaded) { 
          lottieEl.dataset.state = 'paused';
          lottieEl.dataset.duration = 0.01
          lottieEl.dataset.loop = 0;
          Webflow.require('lottie').createInstance(lottieEl);
      }
    }), { rootMargin: `${window.innerHeight/100}px` });
    lazyLotties.forEach((lottieElement) => lazyLottieObserver.observe(lottieElement));
}