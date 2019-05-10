import Vue from 'vue'

export default {

    install (Vue, options)
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

        const setLoader = (items, observer) =>
        {
            for (var i = 0; i < items.length; i++)
            {
                if (!items[i].isIntersecting)
                {
                    continue
                }

                setSource(items[i].target, items[i].target.source)
            }
        }

        const setOnload = (el) =>
        {
            if (el.tagName === 'VIDEO')
            {
                el.poster = el.source
            }

            else if (el.tagName !== 'IMG')
            {
                el.style.backgroundImage = 'url(' + el.source + ')'
            }

            el.classList.add('loaded')
            observer.unobserve(el)
        }

        const setUnload = (el) =>
        {
            el.classList.remove('loaded')
            observer.observe(el)
        }

        const setSource = (target, source) =>
        {
            if (target.tagName === 'IMG')
            {
                target.src = source
                return
            }

            target.image.src = source
        }

        const setObserverPolyfill = () =>
        {
            return {
                observe: (el) =>
                {
                    setSource(el, el.source)
                },
                unobserve: (el) =>
                {
                }
            }
        }

        const observerOptionsDefault = { root: null, rootMargin: '0px', threshold: [0, 1] }
        const observerOptions = options || observerOptionsDefault
        const observerFallback = (!('IntersectionObserver' in window) || !('IntersectionObserverEntry' in window) || !('intersectionRatio' in window.IntersectionObserverEntry.prototype))

        var observer = (observerFallback) ? setObserverPolyfill() : new IntersectionObserver(setLoader, observerOptions)

        Vue.directive('lazy', {
            inserted (el, binding, vnode)
            {
                const image = setImage(el)

                el.source = binding.value
                el.classList.add('lazy')

                observer.observe(el)
                image.onload = () =>
                {
                    setOnload(el)
                }
            },
            update (el, binding)
            {
                if (el.source === binding.value)
                {
                    return
                }

                el.source = binding.value

                setUnload(el)
            },
            unbind (el)
            {
                if (el.image) el.image = null
            }
        })

        Vue.prototype.$vll =
        {
            observer: (options) =>
            {
                const assignOptions = Object.assign({}, observerOptionsDefault)
                Object.assign(assignOptions, options)

                observer = new IntersectionObserver(setLoader, assignOptions)
            }
        }
    }
}
