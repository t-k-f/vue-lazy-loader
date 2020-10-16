export default {
    install: (app, options) =>
    {
        const setImage = (el) =>
        {
            if (el.tagName === 'IMG')
            {
                return el
            }

            el.image = new Image()

            return el.image
        }

        const setLoad = (el) =>
        {
            const source = el.dataset.lazyLoad
            const image = setImage(el)

            image.src = source
            image.onload = () => setOnload(el)
        }

        const setOnload = (el) =>
        {
            if (el.tagName === 'VIDEO')
            {
                el.poster = el.source
            }
            else if (el.tagName !== 'IMG')
            {
                el.style.backgroundImage = `url(${el.source})`
            }

            el.classList.add('loaded')
            observer.unobserve(el)
        }

        const setObserverCallback = (items) =>
        {
            items.forEach(item =>
            {
                if(!item.isIntersecting)
                {
                    return
                }

                setLoad(item.target)
            })
        }

        const observerOptionsDefault = { root: null, rootMargin: '0px', threshold: [0, 1] }
        const observerOptions = Object.assign(observerOptionsDefault, options)
        const observer = new IntersectionObserver(setObserverCallback, observerOptions)

        app.directive('lazy', {
            mounted (el, binding)
            {
                el.dataset.lazyLoad = binding.value
                el.classList.add('lazy')
                observer.observe(el)
            },
            updated (el, binding)
            {
                if (binding.oldValue === binding.value)
                {
                    return
                }

                el.dataset.lazyLoad = binding.value
                el.classList.remove('loaded')
                observer.observe(el)
            },
            beforeUnmount (el)
            {
                if (el.image) el.image = null
            }
        })
    }
}
