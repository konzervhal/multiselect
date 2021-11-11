import { ref, toRefs, computed, watch, nextTick } from 'composition-api'

export default function useSearch (props, context, dep)
{

// dependencies
  const dropdown = dep.dropdown
  const multiselect = dep.multiselect

  // ================ DATA ================

  const search = ref(null)

  const input = ref(null)


  // =============== METHODS ==============

  const clearSearch = () => {
    search.value = ''
  }

  const handleSearchInput = (e) => {
    search.value = e.target.value
    if(multiselect.value) {
      nextTick(()=>{
        const d = multiselect.optionRows.value;
        if(multiselect.value.clientWidth > d.clientWidth) {
          d.style.setProperty('min-width', multiselect.value.clientWidth + 2 +'px')
        }
      })
    }
  }

  const handlePaste = (e) => {
    context.emit('paste', e)
  }

  // ============== WATCHERS ==============

  watch(search, (val) => {
    context.emit('search-change', val)
  })

  return {
    search,
    input,
    clearSearch,
    handleSearchInput,
    handlePaste,
  }
}
