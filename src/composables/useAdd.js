import { ref, toRefs, computed, watch, nextTick } from 'composition-api'

export default function useAdd (props, context, dependencies)
{
  const { hasAdd, options, mode } = toRefs(props)

  // ============ DEPENDENCIES ============
  const select = dependencies.select
  const update = dependencies.update

  // ================ DATA ================

  const add = ref(null)
  const isOpen = ref(false)
  const addinput = ref(null)

  // ============== COMPUTED ==============

  // const tagsSearchWidth = computed(() => {
  //   if (search.value) {
  //     return `${search.value.length}ch`
  //   }

  //   if (mode.value !== 'tags' || [null, undefined].indexOf(internalValue.value) !== -1 || !internalValue.value.length) {
  //     return '100%'
  //   }

  //   return '1ch'
  // })
    const isAddOpen = computed(() => {
      return isOpen.value;
    })


  // =============== METHODS ==============

  // const clearSearch = () => {
  //   search.value = ''
  // }

  // const focusSearch = () => {
  //   input.value.focus()
  // }

  // const blurAdd = () => {
  //   nextTick(()=>{
  //     add.value = ''
  //     isOpen.value = false
  //     addinput.value.blur()
  //   })
  // }

  const openAdd = () => {
    if(!isOpen.value) {
      isOpen.value = true;
      add.value = '';
      nextTick(()=>{
        addinput.value.focus();
      })
    } else {
      saveAdd()
      isOpen.value = false;
    }
  }

  const saveAdd = () => {
    if(!add.value) {
      return
    }

    const isAlready = checkAlready(add.value)
    if(isAlready) {
      update(isAlready)
      select(isAlready)
      return
    }

    let val = {'value': props.inputPrefix+add.value, 'label': add.value};
    options.value.unshift(val);
    nextTick(()=>{
      update(val)
      select(val)
    })
  }

  const checkAlready = (value) => {
    let isAlready = false;
    options.value.forEach((item) => {
      if(item.label === value) {
        isAlready = item.value;
        return;
      }
    })
    return isAlready;
  }

  // ============== WATCHERS ==============

  // watch(search, (val) => {
  //   context.emit('search-change', val)
  // })

  return {
    add,
    isAddOpen,
    openAdd,
    addinput,
    // blurAdd,
    // tagsSearchWidth,
    // clearSearch,
    // focusSearch,
    // blurSearch,
  }
}
