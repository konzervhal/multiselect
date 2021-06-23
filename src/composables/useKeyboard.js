import { toRefs } from 'composition-api'

export default function useKeyboard (props, context, dependencies)
{
  const { mode } = toRefs(props)

  // ============ DEPENDENCIES ============

  const internalValue = dependencies.internalValue
  const update = dependencies.update
  const closeDropdown = dependencies.closeDropdown
  const clearPointer = dependencies.clearPointer
  const search = dependencies.search
  const isAddOpen = dependencies.isAddOpen


  // =============== METHODS ==============

  const handleBackspace = (e) => {
    if (mode.value === 'single' && !isAddOpen.value) {
      return
    }

    if(!isAddOpen.value) {
      update([...internalValue.value].slice(0,-1))
    }
  }

  const handleEsc = (e) => {
    closeDropdown()
    clearPointer()
    e.target.blur()
  }

  const handleSearchBackspace = (e) => {
    if (search.value !== '' && !isAddOpen.value) {
      e.stopPropagation()
    }
  }

  return {
    handleBackspace,
    handleEsc,
    handleSearchBackspace,
  }
}
