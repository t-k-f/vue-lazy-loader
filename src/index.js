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

/* check if image should be revealed */

const isReveal = (el, binding) =>
{
    const value = binding.value

    if (typeof value === 'string')
    {
        return true
    }

    if (typeof value.src === 'undefined')
    {
        throw 'src key is missing';
    }

    if (typeof value.reveal === 'undefined' || value.reveal)
    {
        if (typeof value.scroll === 'number' && typeof value.vh === 'undefined')
        {
            throw 'vh key is missing';
        }

        if (typeof value.scroll === 'undefined' && typeof value.vh === 'number')
        {
            throw 'scroll key is missing';
        }

        if (typeof value.scroll === 'number' && typeof value.vh === 'number')
        {
            const offset = (typeof value.offset === 'number') ? 1 - value.offset : 1
            return el.getBoundingClientRect().y < value.vh * offset
        }

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
        if (!isReveal(el, binding))
        {
            return
        }

        fetch(el, isObj(binding), vnode)
    },
    update (el, binding, vnode)
    {
        if (!isReveal(el, binding))
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
