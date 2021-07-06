import { ref, toRefs, computed, refs } from 'composition-api'
import {nextTick} from 'vue'

export default function useDropdown (props, context, dependencies)
{
  const { maxHeight, disabled, searchable, isSelectAll } = toRefs(props)

  // ============ DEPENDENCIES ============

  const multiselect = dependencies.multiselect
  const blurInput = dependencies.blurInput
  const blurSearch = dependencies.blurSearch
  const clearSearch = dependencies.clearSearch
  const focusInput = dependencies.focusInput
  const focusSearch = dependencies.focusSearch
  const addOpen = dependencies.addOpen

  // ================ DATA ================

  const isOpen = ref(false)
  const dropDownId = ref('dropdown-'+Math.random().toString().replace('.','-'))
  const observed = ref(false)
  const options_container = ref(null)
  const optionRows = ref(null)

  // ============== COMPUTED ==============

  const contentMaxHeight = computed(() => {
    return `${maxHeight.value + 40}px`
  })

  const scrollMaxHeight = computed(() => {
    return  `${maxHeight.value - 2 - (isSelectAll.value ? 40 : 0) }px`
  })

  // =============== METHODS ==============
  const observeCallback = new IntersectionObserver(function(items) {

        items.forEach( item => {
          if(item.isIntersecting) {
            if(item.intersectionRatio < 1) {
              setDropPosition(item.target)
            }
          }
        })
  })

  const resize = (event) => {
    if(isOpen.value) {
      close()
    }
  }


  const setDropPosition = (item) => {
    let m = multiselect.value.getBoundingClientRect();
    if(props.container === 'body') {
      item.style.left = m.x+'px';
      item.style.top = m.bottom+'px';
    }

    let contx = containerBound().x + containerBound().width;
    let conty = containerBound().y + containerBound().height;
    let dropx = item.getBoundingClientRect().x + item.getBoundingClientRect().width;
    let dropy = item.getBoundingClientRect().y + item.getBoundingClientRect().height;

    if(dropx > contx) {
      item.style.removeProperty('left');
      item.style.left = (m.width - item.getBoundingClientRect().width)+'px';
    }

    if(containerBound().height > item.getBoundingClientRect().height) {
      if(dropy > conty) {
          item.style.removeProperty('top');
          item.style.bottom = m.height+'px';
      }
    }
  }

  const resetDropPosition = (item) => {

    let m = multiselect.value.getBoundingClientRect();
    item.style.left = 0;
    item.style.top = m.height+'px';
    item.style.removeProperty('width');
    item.style.removeProperty('right')
    item.style.removeProperty('bottom')
  }

  const openDropdown = () => {
    if (disabled.value || addOpen.value) {
      return
    }

    let d = multiselect.value.querySelector('.multiselect-options');
    let c = multiselect.value.querySelector('.selectall-button-container');
    if(props.container === 'body') {
      document.addEventListener('scroll', setScrollPosition, true)
      document.body.append(optionRows.value)
    }

    isOpen.value = true
    context.emit('open')

    nextTick(() => {
      if(multiselect.value.clientWidth > d.clientWidth) {
        d.style.setProperty('min-width', multiselect.value.clientWidth+'px')
      }

      if(c) {
        c.style.width = d.clientWidth+"px";
      }

      resetDropPosition(d)
      setDropPosition(d)

      if(!observed.value) {
        observeCallback.observe(d);
        observed.value = true;
      }
    })
  }

  const containerBound = () => {
    if(props.container === 'body') {
      return {'x': 0, 'y': 0, 'width': window.innerWidth, 'height': window.innerHeight}
    } else {
      return document.getElementById(props.container).getBoundingClientRect();
    }
  }

  const closeDropdown = (e) => {
    if(props.container === 'body') {
      document.removeEventListener('scroll', setScrollPosition, true)
      options_container.value.append(optionRows.value)
    }

    let d = multiselect.value.querySelector('.multiselect-options')
    d.style.removeProperty('min-width')
    isOpen.value = false
    clearSearch();
    context.emit('close')
  }

  const setScrollPosition = (e) => {
    if(e.target.contains(multiselect.value)) {
      setDropPosition(optionRows.value)
    }
  }

  const open = () => {
    if (searchable && searchable.value) {
      focusSearch()
    } else {
      focusInput()
    }
  }

  const close = () => {
    if (searchable && searchable.value) {
      blurSearch()
    } else {
      blurInput()
    }
  }

  const handleInputMousedown = (e) => {
    if (isOpen.value && !searchable.value) {
      multiselect.value.querySelector('.multiselect-input').dispatchEvent(new Event('blur'))
      multiselect.value.querySelector('.multiselect-input').blur()
      e.preventDefault()
    }
  }

  return {
    isOpen,
    contentMaxHeight,
    resize,
    scrollMaxHeight,
    openDropdown,
    closeDropdown,
    open,
    close,
    handleInputMousedown,
    options_container,
    optionRows,
    setScrollPosition,
  }
}
