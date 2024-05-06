const lazyLotties = [...document.querySelectorAll('[data-loading="lazy"]')];
const checkLoaded = (lottieEl) => lottieEl.children.length && (lottieEl.children[0].tagName.toLowerCase() === 'svg' || lottieEl.children[0].tagName.toLowerCase() === 'canvas');

if (!!lazyLotties.length) {
  lazyLotties.forEach((lazyLottie) => {
    lazyLottie.dataset.defaultSrc = lazyLottie.dataset.src;
    lazyLottie.dataset.src = '';
    lazyLottie.dataset.animationType = 'lazy-lottie';
    lazyLottie.setAttribute('looping', lazyLottie.dataset.loop);
    lazyLottie.style.overflow = 'hidden';
    
    if(lazyLottie.dataset.poster) {
      lazyLottie.style.position !== 'absolute' && (lazyLottie.style.position = 'relative');
      lazyLottie.appendChild(Object.assign(document.createElement('img'),{
            src:lazyLottie.dataset.poster, 
            loading: 'eager',
            style:'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);',
          }));
      }
    });

    const lazyLottieLoader = new IntersectionObserver((entries) => entries.forEach(async (entry) => {
      const lottieEl = entry.target;
 
      if (entry.isIntersecting && !checkLoaded(lottieEl) && lottieEl.style.display !== 'none') {  
          lottieEl.dataset.animationType = 'lottie';
          lottieEl.dataset.src = lottieEl.dataset.defaultSrc; 
          lottieEl.dataset.state = 'paused';
          lottieEl.dataset.duration = 0.01
          lottieEl.dataset.loop = lottieEl.dataset.looping;
          await Webflow.require('lottie').createInstance(lottieEl);
          lottieEl.querySelector('img') && lottieEl.querySelector('img').remove();
          lazyLottieLoader.unobserve(lottieEl);
        } 
    }), { root: null, rootMargin: '1250px' });
  
    const lazyLottiePlayer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      const lottieEl = entry.target;
      
      if(checkLoaded(lottieEl) && lottieEl.style.display !== 'none') {
         if (entry.isIntersecting) {
                console.log('playing')
                lottieEl.dataset.state = 'playing';
                lottieEl.dataset.duration = 0;
                lottieEl.dataset.loop = lottieEl.dataset.looping;
                Webflow.require('lottie').createInstance(lottieEl);

                if (lottieEl.dataset.playOnce === 'true') {
                  lazyLottiePlayer.unobserve(lottieEl);
                } 
             } else {
                console.log('paused')
                  lottieEl.dataset.duration = 0.01
                  lottieEl.dataset.loop = 0;
                  Webflow.require('lottie').createInstance(lottieEl); 
             }
      }
    }), { root: null });
  
    lazyLotties.forEach((lottieElement) => lazyLottieLoader.observe(lottieElement));
    lazyLotties.forEach((lottieElement) => lazyLottiePlayer.observe(lottieElement));
}