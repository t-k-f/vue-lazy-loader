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

const isCurrent = (el, binding) =>
{
    if(!el.image.src)
    {
        return
    }

    if (typeof binding.value === 'string')
    {
        return (binding.value === binding.oldValue)
    }

    return (binding.value.src === binding.oldValue.src)
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
            return el.getBoundingClientRect().y || el.getBoundingClientRect().top < value.vh * offset
        }

        return true
    }
}

/* return image url */

const getImageUrl = (binding) =>
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

        fetch(el, getImageUrl(binding), vnode)
    },
    update (el, binding, vnode)
    {
        if (!isReveal(el, binding))
        {
            return
        }

        if (!isCurrent(el, binding))
        {
            el.classList.remove('loaded')
            fetch(el, getImageUrl(binding), vnode)
        }
    },
    unbind (el)
    {
        el.image.src = ''
        el.image = null
    }
}
