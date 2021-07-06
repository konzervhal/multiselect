<template>
  <div
    class="multiselect"
    :class="[`is-${mode}`, {
      'is-open': isOpen,
      'is-searchable': searchable,
      'is-disabled': disabled,
      'no-caret': !caret,
    }]"
    :id="id"
    @keydown.prevent.enter
    ref="multiselect"
  >
    <div class="input-group">
    <div
      class="form-select multiselect-input"
      :class="{
        'is-invalid':(invalid || (isAddOpen && force_validate) || ( force_validate && required && !hasValid )),
        'is-valid': (force_validate && (!invalid && (!required || hasValid))),
        'add-mode': isAddOpen,
      }"
      :error_message_name="error_message_name"
      :add_error_message_name="add_error_message_name"
      :tabindex="tabindex"
      @mousedown="handleInputMousedown"
      @focus="openDropdown"
      @blur="closeDropdown"
      @keyup.esc="handleEsc"
      @keyup.enter="selectPointer"
      @keydown.delete="handleBackspace"
      @keydown.prevent.up="backwardPointer"
      @keydown.prevent.down="forwardPointer"
    >
      <!-- Single label -->
      <template v-if="mode == 'single' && hasSelected && !search && internalValue && !isAddOpen">
        <slot name="singlelabel" :value="internalValue">
          <div class="multiselect-single-label">
            <span class="text-truncate">{{ internalValue[label] }}</span>
          </div>
        </slot>
      </template>

      <!-- Multiple label -->
      <template v-if="mode == 'multiple' && hasSelected && !search && !isAddOpen">
        <slot name="multiplelabel" :values="internalValue">
          <div class="multiselect-multiple-label">
            {{ multipleLabelText }}
          </div>
        </slot>
      </template>

      <!-- Search -->
      <template v-if="mode !== 'tags' && searchable && !disabled && !isAddOpen">
        <div class="multiselect-search">
          <input
            v-model="search"
            @focus.stop="openDropdown"
            @blur.stop="closeDropdown"
            @keyup.stop.esc="handleEsc"
            @keyup.stop.enter="selectPointer"
            @keydown.delete="handleSearchBackspace"
            @keydown.stop.up="backwardPointer"
            @keydown.stop.down="forwardPointer"
            ref="input"
          />
        </div>
      </template>

      <!-- Add Option Input -->
      <template v-if="isAddOpen">
        <div class="multiselect-add">
          <input
            placeholder="Új elem hozzáadása"
            v-model="add"
            ref="addinput"
          />
        </div>
      </template>

      <!-- Tags (with search) -->
      <template v-if="mode == 'tags'">
        <div class="multiselect-tags">

          <span v-for="(option, i, key) in internalValue" :key="key">
            <slot name="tag" :option="option" :handleTagRemove="handleTagRemove" :disabled="disabled">
              <div class="multiselect-tag">
                {{ option[label] }}
                <i
                  v-if="!disabled"
                  @click.prevent
                  @mousedown.prevent.stop="handleTagRemove(option, $event)"
                ></i>
              </div>
            </slot>
          </span>

          <div
            v-if="searchable && !disabled"
            class="multiselect-search"
            :style="{ width: tagsSearchWidth }"
          >
            <input
              v-model="search"
              @focus.stop="openDropdown"
              @blur.stop="closeDropdown"
              @keyup.stop.esc="handleEsc"
              @keyup.stop.enter="selectPointer"
              @keydown.delete="handleSearchBackspace"
              @keydown.stop.up="backwardPointer"
              @keydown.stop.down="forwardPointer"
              :style="{ width: tagsSearchWidth }"
              ref="input"
            />
          </div>
        </div>
      </template>

      <!-- Placeholder -->
      <template v-if="placeholder && !hasSelected && !search && !isAddOpen">
        <slot name="placeholder">
          <div class="multiselect-placeholder">
            <span class="text-truncate">{{ placeholder }}</span>
          </div>
        </slot>
      </template>

      <slot v-if="caret && !busy" name="caret">
        <span class="multiselect-caret"></span>
      </slot>

      <transition name="multiselect-loading">
        <div v-show="busy" class="multiselect-spinner" />
      </transition>

      <a
        v-if="mode !== 'single' && hasSelected && !disabled"
        class="multiselect-clear"
        @click.prevent="clear"
      ></a>
    </div>
    <div v-if="inputmode && !disabled" class="btn" :class="{
      'btn-success': isAddOpen,
      'btn-outline-secondary': !isAddOpen
      }"
      @click="openAdd"><i class="mdi" :class="{'mdi-plus': !isAddOpen, 'mdi-check':isAddOpen}"></i>
    </div>
  </div>

    <!-- Options -->
    <div v-if="!resolving || !clearOnSearch" name="multiselect" @after-leave="clearSearch" ref="options_container">
      <div
        v-show="isOpen"
        class="multiselect-options shadow"
        ref="optionRows"
        :style="{ 'maxHeight': contentMaxHeight}"
      >
            <div class="multiselect-select-all" v-if="isSelectAll && mode !== 'single'" @click.stop.prevent @mousedown.prevent>
              <div class="position-absolute selectall-button-container text-center">
                  <div class="row g-0">
                    <div class="col-6">
                      <div class="p-2 text-truncate" @click.stop.prevent="selectAll" @mousedown.prevent :class="{
                          'bg-light':!isAll,
                          'text-white':isAll,
                          'bg-secondary':isAll,
                        }">
                        <i class="mdi mdi-check"></i> Mind kijelölése
                      </div>
                    </div>
                     <div class="col-6">
                       <div class="p-2 text-truncate" @click.stop.prevent="deselectAll" @mousedown.prevent :class="{
                          'bg-light':!isClearAll,
                          'text-white':isClearAll,
                          'bg-secondary':isClearAll,
                        }">
                        <i class="mdi mdi-close"></i> Egyik sem
                       </div>
                     </div>
                  </div>
              </div>
            </div>
          <perfect-scrollbar class="d-flex flex-column flex-fill" :style="{maxHeight: scrollMaxHeight}">


            <slot name="beforelist">
            </slot>
            <a
              v-for="(option, i, key) in filteredOptions"
              :tabindex="-1"
              href=""
              class="multiselect-option dropdown-item"
              :class="{
                'is-pointed': isPointed(option),
                'active': isSelected(option),
                'is-disabled': isDisabled(option),
              }"
              :key="key"
              @mousedown.prevent
              @mouseenter="setPointer(option)"
              @click.stop.prevent="handleOptionClick(option)"
            >
              <slot name="option" :option="option" :search="search" :selected="isSelected(option)">
                <span class="text-truncate" :title="option[label]"><i class="mdi mdi-check me-2" v-if="isSelected(option)" /> {{ option[label] }}</span>
              </slot>
            </a>

            <span v-show="noOptions">
              <slot name="nooptions">
                <div class="multiselect-no-options">{{ noOptionsText }}</div>
              </slot>
            </span>

            <span v-show="noResults">
              <slot name="noresults">
                <div class="multiselect-no-results">{{ noResultsText }}</div>
              </slot>
            </span>

            <slot name="afterlist"></slot>
          </perfect-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
  import useData from './composables/useData'
  import useValue from './composables/useValue'
  import useSearch from './composables/useSearch'
  import usePointer from './composables/usePointer'
  import useOptions from './composables/useOptions'
  import usePointerAction from './composables/usePointerAction'
  import useDropdown from './composables/useDropdown'
  import useMultiselect from './composables/useMultiselect'
  import useKeyboard from './composables/useKeyboard'
  import useAdd from './composables/useAdd'
  import {inject} from 'vue'

  export default {
    name: 'Multiselect',
    emits: [
      'open', 'close', 'select', 'deselect',
      'input', 'search-change', 'tag', 'update:modelValue',
      'change','update:add'
    ],
    props: {
      value: {
        required: false,
      },
      modelValue: {
        required: false,
      },
      options: {
        type: [Array, Object, Function],
        required: false,
      },
      id: {
        type: [String, Number],
        required: false,
        default: 'multiselect',
      },
      name: {
        type: [String, Number],
        required: false,
        default: 'multiselect',
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },
      label: {
        type: String,
        required: false,
        default: 'label',
      },
      trackBy: {
        type: String,
        required: false,
        default: 'label',
      },
      valueProp: {
        type: String,
        required: false,
        default: 'value',
      },
      placeholder: {
        type: String,
        required: false,
        default: null,
      },
      mode: {
        type: String,
        required: false,
        default: 'single', // single|multiple|tags
      },
      searchable: {
        type: Boolean,
        required: false,
        default: false,
      },
      limit: {
        type: Number,
        required: false,
        default: -1,
      },
      maxHeight: {
        type: Number,
        required: false,
        default: 300,
      },
      hideSelected: {
        type: Boolean,
        required: false,
        default: true,
      },
      createTag: {
        type: Boolean,
        required: false,
        default: false,
      },
      appendNewTag: {
        type: Boolean,
        required: false,
        default: true,
      },
      caret: {
        type: Boolean,
        required: false,
        default: true,
      },
      loading: {
        type: Boolean,
        required: false,
        default: false,
      },
      noOptionsText: {
        type: String,
        required: false,
        default: 'A lista üres',
      },
      noResultsText: {
        type: String,
        required: false,
        default: 'Nincs találat',
      },
      multipleLabel: {
        type: Function,
        required: false,
      },
      object: {
        type: Boolean,
        required: false,
        default: false,
      },
      delay: {
        type: Number,
        required: false,
        default: -1,
      },
      minChars: {
        type: Number,
        required: false,
        default: 0,
      },
      resolveOnLoad: {
        type: Boolean,
        required: false,
        default: true,
      },
      filterResults: {
        type: Boolean,
        required: false,
        default: true,
      },
      clearOnSearch: {
        type: Boolean,
        required: false,
        default: false,
      },
      clearOnSelect: {
        type: Boolean,
        required: false,
        default: true,
      },
      canDeselect: {
        type: Boolean,
        required: false,
        default: true,
      },
      max: {
        type: Number,
        required: false,
        default: -1,
      },
      invalid: {
        type:Boolean,
        required:false,
        default:false
      },
      required: {
        type:Boolean,
        required:false,
        default:false
      },
      error_message_name: {
        type:String,
        default:''
      },
      add_error_message_name: {
        type:String,
        default:''
      },
      rand_error_num:{
        type:Number,
        default:Math.floor(Math.random() * 10000) + 1
      },
      // identity_code: {
      //   type:String,
      //   default: 'ref-' + (Math.floor(Math.random()*100000) + 1)
      // },
      error_point_name: {
      	type:String,
      	default:'global'
      },
      container: {
        type:String,
        default:'body',
      },
      modalInside: {
        type:Boolean,
        default:false
      },
      inputmode: {
        type:Boolean,
        default: false
      },
      isSelectAll: {
        type:Boolean,
        default:false
      }
    },
    watch: {
	  hasValid:{
	  	handler: function(newval){
	  		let valid = false;
	  		if(newval || !this.required ){
	  			valid = true;
	  		}
  			this.ErrorMessage(valid);
	  	}
	  },
	  invalid:{
	  	handler: function(newval){
	  		this.ErrorMessage(this.is_valid);
	  	}
	  },
      isAddOpen: {
        handler: function(value) {
          this.AddErrorMessage(!value)
        }, deep:true
      },
      error_point_name:{
        handler: function(){
            this.ErrorMessage(this.is_valid);
        }
      },
      add_error_message_name: {
        handler: function(value) {
          this.AddErrorMessage(!this.isAddOpen)
        }
      },
      required:{
        handler: function(){
            this.ErrorMessage(this.is_valid);
        },immediate: true
      },
      //ha menet közben változik az inputmode, fixen csukódjon be a hozzáadás lehetőség.
      inputmode:{
      	handler: function(){
      		this.isOpen.value = false;
      	}
      }
    },
    methods: {
      ErrorMessage(valid) {
        this.ManageMessage(valid, this.error_name)
      },
      AddErrorMessage(valid){
        this.ManageMessage(valid, this.add_error_name)
      },
      ManageMessage(valid, e_name){
          if( typeof this.validation_error.form_errors[this.error_point_name] === "undefined") {
            this.validation_error.form_errors[this.error_point_name] = [];
          }
          if(!valid) {
              this.validation_error.form_errors[this.error_point_name][e_name.name] = e_name.value;
          } else {
            delete this.validation_error.form_errors[this.error_point_name][e_name.name];
          }
      },
    },
    computed:{
      error_name() {
        if(this.error_message_name === '') {
          return {'name': "error_messages.select_field_error_"+this.rand_error_num, 'value': 'error_messages.select_field_error'}
        } else {
          return {name: this.error_message_name, value: this.error_message_name}
        }
      },
      add_error_name() {
        if(this.add_error_message_name === '') {
          return {'name': "error_messages.select_field_add_error_"+this.rand_error_num, 'value': 'error_messages.select_field_add_error'}
        } else {
          return {name: this.add_error_message_name, value: this.add_error_message_name}
        }
      },
      is_valid(){
      	let valid = true;
	    if(this.invalid || this.isAddOpen || this.required && !this.hasValid ){
	      valid = false;
	    }
	    return valid;
      }
    },
    created() {
      window.addEventListener("resize", this.resize);
    },
    unmounted() {
      window.removeEventListener("resize", this.resize);
    },
    setup(props, context)
    {
      const force_validate = inject('force_validate', false)
      const validation_error = inject('validation_error')
      const value = useValue(props, context)
      const multiselect = useMultiselect(props, context)
      const pointer = usePointer(props, context)

      const data = useData(props, context, {
        internalValue: value.internalValue,
      })

      const search = useSearch(props, context, {
        internalValue: value.internalValue,
        update: data.update,
      })

      const options = useOptions(props, context, {
        externalValue: value.externalValue,
        internalValue: value.internalValue,
        search: search.search,
        blurSearch: search.blurSearch,
        clearSearch: search.clearSearch,
        update: data.update,
        blurInput: multiselect.blurInput,
        pointer: pointer.pointer,
        required: props.required,
        multiselect: multiselect.multiselect,
      })

      const add = useAdd(props, context, {
        update: data.update,
        select: options.select,
      })

      const dropdown = useDropdown(props, context, {
        multiselect: multiselect.multiselect,
        blurInput: multiselect.blurInput,
        blurSearch: search.blurSearch,
        clearSearch: search.clearSearch,
        focusInput: multiselect.focusInput,
        focusSearch: search.focusSearch,
        addOpen: add.isAddOpen,
      })

      const pointerAction = usePointerAction(props, context, {
        filteredOptions: options.filteredOptions,
        handleOptionClick: options.handleOptionClick,
        search: search.search,
        pointer: pointer.pointer,
      })

      const keyboard = useKeyboard(props, context, {
        internalValue: value.internalValue,
        update: data.update,
        closeDropdown: dropdown.closeDropdown,
        clearPointer: pointerAction.clearPointer,
        search: search.search,
        isAddOpen: add.isAddOpen,
      })

      return {
        ...value,
        ...dropdown,
        ...multiselect,
        ...pointer,
        ...data,
        ...search,
        ...add,
        ...options,
        ...pointerAction,
        ...keyboard,
        validation_error,
        force_validate,
      }
    }
  }
</script>
