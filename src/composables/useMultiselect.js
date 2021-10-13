import { ref, toRefs, computed, refs, nextTick, watch } from 'composition-api'

export default function useMultiselect (props, context, dep)
{
  const { searchable, disabled, isSelectAll, maxHeight } = toRefs(props)

  // ============ DEPENDENCIES ============

  const input = dep.input
  const open = dep.open
  const close = dep.close
  const clearSearch = dep.clearSearch
  const isOpen = dep.isOpen
  const isAddOpen = dep.isAddOpen

  // ================ DATA ================

  const multiselect = ref(null)

  const isActive = ref(false)

  const dropDownId = ref('dropdown-'+Math.random().toString().replace('.','-'))
  const observed = ref(false)
  const options_container = ref(null)
  const optionRows = ref(null)

  // ============== COMPUTED ==============

  const tabindex = computed(() => {
    return searchable.value || disabled.value ? -1 : 0
  })

   const contentMaxHeight = computed(() => {
    return `${maxHeight.value + 40}px`
  })

  const scrollMaxHeight = computed(() => {
    return  `${maxHeight.value - 2 - (isSelectAll.value ? 40 : 0) }px`
  })

  // =============== METHODS ==============

  /** -- sajat hack -- **/
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
      item.style.right = 'inherit'
      item.style.bottom = 'inherit'
      item.style.transform = 'inherit'
      item.style.left = m.x+'px';
      item.style.top = m.bottom+'px';
    }

    let contx = containerBound().x + containerBound().width;
    let conty = containerBound().y + containerBound().height;
    let dropx = item.getBoundingClientRect().x + item.getBoundingClientRect().width;
    let dropy = item.getBoundingClientRect().y + item.getBoundingClientRect().height;

    if(dropx > contx) {
      // item.style.removeProperty('left');
      item.style.left = m.x - (item.getBoundingClientRect().width - m.width)+'px'  //(m.width - item.getBoundingClientRect().width)+'px';
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
    if (disabled.value || isAddOpen.value ) { //||
      return
    }

    let d = multiselect.value.querySelector('.multiselect-dropdown');
    if(!d) return

    let c = multiselect.value.querySelector('.selectall-button-container');
    if(props.container === 'body') {
      document.addEventListener('scroll', setScrollPosition, true)
      document.body.append(optionRows.value)
    }

    isOpen.value = true
    context.emit('open')

    nextTick(() => {
      if(multiselect.value.clientWidth > d.clientWidth) {
        d.style.setProperty('min-width', multiselect.value.clientWidth + 2 +'px')
      }

      if(c) {
        c.style.width = d.clientWidth +"px";
      }

      resetDropPosition(d)
      setDropPosition(d)

      if(!observed.value) {
        observeCallback.observe(d);
        observed.value = true;
      }
    })
  }

  const closeDropdown = (e) => {
    if(props.container === 'body') {
      document.removeEventListener('scroll', setScrollPosition, true)
      options_container.value.append(optionRows.value)
    }

    let d = multiselect.value.querySelector('.multiselect-dropdown')
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

   const containerBound = () => {
    if(props.container === 'body') {
      return {'x': 0, 'y': 0, 'width': window.innerWidth, 'height': window.innerHeight}
    } else {
      return document.getElementById(props.container).getBoundingClientRect();
    }
  }

  const handleInputMousedown = (e) => {
    if (isOpen.value && !searchable.value) {
      multiselect.value.querySelector('.multiselect-input').dispatchEvent(new Event('blur'))
      multiselect.value.querySelector('.multiselect-input').blur()
      e.preventDefault()
    }
  }
  /** -- sajat hack vege -- **/


  const blur = () => {
    if (searchable.value) {
      input.value.blur()
    }

    multiselect.value.blur()
  }

  const handleFocus = () => {
    if (searchable.value && !disabled.value) {
      if(input.value) {
        input.value.focus()
      }
    }
  }

  const activate = () => {
    if (disabled.value) {
      return
    }
    isActive.value = true
    // open()
    openDropdown()
  }

  const deactivate = () => {
    isActive.value = false

    setTimeout(() => {
      if (!isActive.value) {
        // close()
        closeDropdown()
        clearSearch()
      }
    }, 1)
  }

  const handleCaretClick = () => {
    deactivate()
    blur()
  }

  return {
    multiselect,
    tabindex,
    isActive,
    blur,
    handleFocus,
    activate,
    deactivate,
    handleCaretClick,
    contentMaxHeight,
    resize,
    scrollMaxHeight,
    openDropdown,
    closeDropdown,
    handleInputMousedown,
    options_container,
    optionRows,
    setScrollPosition,
  }
}
