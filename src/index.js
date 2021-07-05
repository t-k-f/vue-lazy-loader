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
            const source = el.dataset.lazyLoad

            if (el.tagName === 'VIDEO')
            {
                el.poster = source
            }
            else if (el.tagName !== 'IMG')
            {
                el.style.backgroundImage = `url(${source})`
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

        let observerOptionsDefault
        let observerOptions
        let observer

        try
        {
            observerOptionsDefault = { root: null, rootMargin: '0px', threshold: [0, 1] }
            observerOptions = Object.assign(observerOptionsDefault, options)
            observer = new IntersectionObserver(setObserverCallback, observerOptions)
        }
        catch (error)
        {
            observer = {}
        }

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
