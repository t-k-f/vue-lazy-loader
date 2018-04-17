const fetch = (el, binding, vnode) =>
{
    const image = new Image()
    image.onload = () =>
    {
        if (vnode.tag === 'img')
        {
            el.src = binding.value
        }
        else if (vnode.tag === 'video')
        {
            el.setAttribute('poster', binding.value)
        }
        else
        {
            el.style.backgroundImage = 'url(' + binding.value + ')'
        }
        el.classList.add('loaded')
    }
    image.src = binding.value
}

const isCurrent = (el, binding, vnode) =>
{
    if (vnode.tag === 'img')
    {
        return (el.src === binding.value)
    }
    else if (vnode.tag === 'video')
    {
        return (el.getAttribute('poster') === binding.value)
    }
    else
    {
        return (el.style.backgroundImage.slice(5, -2) === binding.value)
    }
}

export default
{
    bind (el, binding, vnode)
    {
        el.classList.add('lazy')
        fetch(el, binding, vnode)
    },
    update (el, binding, vnode)
    {
        if (!isCurrent(el, binding, vnode))
        {
            el.classList.remove('loaded')
            fetch(el, binding, vnode)
        }
    }
}
