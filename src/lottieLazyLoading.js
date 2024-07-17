const lazyLotties = [...document.querySelectorAll('[data-loading="lazy"]')];
const checkLoaded = (lottieEl) => !!(lottieEl.children.length && (lottieEl.children[0].tagName.toLowerCase() === 'svg' || lottieEl.children[0].tagName.toLowerCase() === 'canvas'));
  
if (!!lazyLotties.length) {
  function handlePlayLottie (entry, observer) {
    const lottieEl = entry.target;
      if (entry.isIntersecting) {
        lottieEl.dataset.loop = lottieEl.dataset.defaultLoop;
        lottieEl.dataset.autoplay = lottieEl.dataset.defaultAutoplay;
        lottieEl.dataset.duration = lottieEl.dataset.defaultDuration;
        lottieEl.dataset.state = 'playing';
        Webflow.require('lottie').createInstance(lottieEl);

        if (lottieEl.dataset.playOnce === 'true') {
          observer.unobserve(lottieEl);
        } 
      } else {
        lottieEl.dataset.duration = 0.01
        lottieEl.dataset.loop = 0;
        lottieEl.dataset.state = 'paused';
        Webflow.require('lottie').createInstance(lottieEl); 
      }
    }
  
  function handleLottieLoad(entry, observer, playObserver) {
      const lottieEl = entry.target;
 
      if (entry.isIntersecting && !checkLoaded(lottieEl) && lottieEl.style.display !== 'none') {  
        lottieEl.dataset.animationType = 'lottie';
        lottieEl.dataset.src = lottieEl.dataset.defaultSrc; 
        Webflow.require('lottie').createInstance(lottieEl);
        
        if(lottieEl.dataset.willTransform) {
            lottieEl.style.position = 'relative';
        }
        
        lottieEl.querySelector('img') && lottieEl.querySelector('img').remove();
        
        if (!(entry.boundingClientRect.bottom < 0 || entry.boundingClientRect.top - Math.max(document.documentElement.clientHeight, window.innerHeight) >= 0)) {
			handlePlayLottie(entry, playObserver)        
        }
        observer.unobserve(lottieEl);
        } 
    }
  
  function prepareLotties(lazyLottie) {
    lazyLottie.dataset.defaultSrc = lazyLottie.dataset.src;
    lazyLottie.dataset.defaultLoop = lazyLottie.dataset.loop;
    lazyLottie.dataset.defaultAutoplay = lazyLottie.dataset.autoplay;
    lazyLottie.dataset.state = 'paused';
    lazyLottie.dataset.src = '';
    lazyLottie.dataset.loop = 0;
    lazyLottie.dataset.animationType = 'lazy-lottie';
    lazyLottie.dataset.duration = 0.01;
    lazyLottie.dataset.autoplay = 0;
    lazyLottie.style.overflow = 'hidden';
    
    if(lazyLottie.dataset.poster) {
      lazyLottie.style.position !== 'absolute' && (lazyLottie.style.position = 'relative');
      lazyLottie.appendChild(Object.assign(document.createElement('img'), {
		src:lazyLottie.dataset.poster, 
		loading: 'eager',
	      	ariaHidden: 'true',
		style:'position:absolute;left:50%;transform:translate(-50%,-50%);',
	  }));
  	}

    if(lazyLottie.dataset.willTransform) {
      lazyLottie.style.left = '0px';
      lazyLottie.style.top = '0px';
      lazyLottie.style.position = 'absolute';
	}
  }

  lazyLotties.forEach((lazyLottie) => prepareLotties(lazyLottie));
    const lazyLottiePlayer = new IntersectionObserver((entries) => entries.forEach((entry) => {
		const lottieEl = entry.target;
		
		if(lottieEl.style.display !== 'none' && checkLoaded(lottieEl)) {
		 	handlePlayLottie(entry, lazyLottiePlayer);
		}
    }), { root: null, rootMargin: '0px'  });
  
    const lazyLottieLoader = new IntersectionObserver((entries) => entries.forEach((entry) => handleLottieLoad(entry, lazyLottieLoader, lazyLottiePlayer)), { root: null, rootMargin: '1250px' });
  
    lazyLotties.forEach((lottieElement) => lazyLottieLoader.observe(lottieElement));
    lazyLotties.forEach((lottieElement) => lazyLottiePlayer.observe(lottieElement));
}
