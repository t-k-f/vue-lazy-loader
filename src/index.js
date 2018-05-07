import Vue from 'vue'

/* Fetch images */

const fetch = (el, src, vnode) =>
{
    el.image.onload = () =>
    {
        el.classList.add('loaded')
        if (vnode.tag === 'img')
        {
            el.src = src
            return
        }

        if (vnode.tag === 'video')
        {
            el.setAttribute('poster', src)
            return
        }

        el.style.backgroundImage = 'url(' + src + ')'
    }

    el.image.src = src
}

/* Check if image is current */

const isCurrent = (el, src, vnode) =>
{
    const bindingValue = normalizeUrl(src)

    if (vnode.tag === 'img')
    {
        return (normalizeUrl(el.src) === bindingValue)
    }

    if (vnode.tag === 'video')
    {
        return (normalizeUrl(el.getAttribute('poster')) === bindingValue)
    }

    return (normalizeUrl(el.style.backgroundImage.slice(5, -2)) === bindingValue)
}

/* normalize urls */

const normalizeUrl = (url) =>
{
    return url.replace(/(^\w+:|^)\/\//, '')
}

/* check if should be revealed */

const isReveal = (el, binding) =>
{
    if (typeof binding.value.reveal === 'undefined')
    {
        return
    }

    if (typeof binding.value.scroll !== 'number' && binding.value.reveal === true)
    {
        return true
    }

    if (el.getBoundingClientRect().y < binding.value.vh)
    {
        return true
    }
}

/* check if binding is obj */

const isObj = (binding) =>
{
    return (typeof binding.value === 'string') ? binding.value : binding.value.src
}

export default
{
    bind (el, binding, vnode)
    {
        el.classList.add('lazy')
        el.image = new Image()
    },
    inserted (el, binding, vnode)
    {
        if (typeof binding.value !== 'string' || !isReveal(el, binding))
        {
            return
        }

        fetch(el, isObj(binding), vnode)
    },
    update (el, binding, vnode)
    {
        if (typeof binding.value !== 'string' || !isReveal(el, binding))
        {
            return
        }

        if (!isCurrent(el, isObj(binding), vnode))
        {
            el.classList.remove('loaded')
            fetch(el, isObj(binding), vnode)
        }
    },
    unbind (el)
    {
        el.image.src = ''
        el.image = null
    }
}
