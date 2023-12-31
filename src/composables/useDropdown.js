import { ref, toRefs } from 'composition-api'

export default function useDropdown (props, context, dep)
{
  const { disabled } = toRefs(props)

  // ============= DEPENDENCIES ==============


  // ================ DATA ================

  const isOpen = ref(false)

  // =============== METHODS ==============

  const open = () => {
    if (isOpen.value || disabled.value) {
      return
    }

    isOpen.value = true
    context.emit('open')
  }

  const close = () => {
    if (!isOpen.value) {
      return
    }

    isOpen.value = false
    context.emit('close')
  }

  return {
    isOpen,
    open,
    close,
  }
}
