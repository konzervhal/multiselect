import { ref, toRefs, computed, watch, nextTick, inject } from 'composition-api'

export default function useAdd (props, context, dependencies)
{
  const { hasAdd, options, mode } = toRefs(props)

  // ============ DEPENDENCIES ============
  const select = dependencies.select
  const update = dependencies.update
  const isAddOpen = dependencies.isAddOpen
  const isSelected = dependencies.isSelected

  // ================ DATA ================

  const add = ref(null)
  const addinput = ref(null)
  const selectedItems = ref([])

  // =============== METHODS ==============

  const closeAddInput = () => {
      add.value = ''
      isAddOpen.value = false
  }

  const openAdd = () => {
    if(!isAddOpen.value) {
      isAddOpen.value = true;
      add.value = '';
      nextTick(()=>{
        addinput.value.focus();
      })
    } else {
      saveAdd()
      isAddOpen.value = false;
    }
  }

  const saveAdd = () => {
    if(!add.value) {
      return
    }

    const isAlready = checkAlready(add.value)
    if(isAlready.value) {
      if(!isSelected(isAlready)) {
        select(isAlready.value)
      }
      return
    }

    let val = {'value': props.inputPrefix+add.value, 'label': add.value, additem: true};
    options.value.unshift(val);

    nextTick(()=>{
        select(val)
    })
  }

  const checkAlready = (value) => {
    let isAlready = false;
    options.value.forEach((item) => {
      if(item.label === value) {
        isAlready = item;
        return;
      }
    })
    return isAlready;
  }

  return {
    add,
    isAddOpen,
    openAdd,
    addinput,
    closeAddInput,
  }
}
