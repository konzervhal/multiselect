<template>
  <div class="input-group">
  <div
    ref="multiselect"
    :tabindex="tabindex"
    :class="classList.container"
    :id="id"
    @focusin="activate"
    @click="activate"
    @focusout="deactivate"
    @keydown="handleKeydown"
    @focus="handleFocus"
    :error_message_name="error_message_name"
    :error_message_index="error_message_index"
    :add_error_message_name="add_error_message_name"
    :add_error_message_index="add_error_message_index"
  >
        <!-- Search -->
        <template v-if="mode !== 'tags' && searchable && !disabled  && !isAddOpen">
          <input
            :type="inputType"
            :modelValue="search"
            :value="search"
            :class="classList.search"
            :autocomplete="autocomplete"
            @input="handleSearchInput"
            @paste.stop="handlePaste"
            @mousedown="handleInputMousedown"
            ref="input"
          />
        </template>


        <!-- Add Option Input -->
        <template v-if="isAddOpen">
          <div class="multiselect-add">
            <input
              placeholder="Új elem hozzáadása"
              v-model="add"
              ref="addinput"
              v-maska="GetCustomMask"
            />
          </div>
        </template>

        <!-- Tags (with search) -->
        <template v-if="mode == 'tags'">
          <div :class="classList.tags">

            <slot
              v-for="(option, i, key) in iv"
              name="tag"
              :option="option"
              :handleTagRemove="handleTagRemove"
              :disabled="disabled"
            >
              <span :class="classList.tag" :key="key">
                {{ option[label] }}
                <span
                  v-if="!disabled"
                  :class="classList.tagRemove"
                  @mousedown.prevent="handleTagRemove(option, $event)"
                >
                  <span :class="classList.tagRemoveIcon"></span>
                </span>
              </span>
            </slot>

            <div :class="classList.tagsSearchWrapper">
              <!-- Used for measuring search width -->
              <span :class="classList.tagsSearchCopy">{{ search }}</span>

              <!-- Actual search input -->
              <input
                v-if="searchable && !disabled"
                :type="inputType"
                :modelValue="search"
                :value="search"
                :class="classList.tagsSearch"
                :autocomplete="autocomplete"
                @input="handleSearchInput"
                @paste.stop="handlePaste"
                ref="input"
              />
            </div>
          </div>
        </template>

        <!-- Single label -->
        <template v-if="mode == 'single' && hasSelected && !search && iv && !isAddOpen">
          <slot name="singlelabel" :value="iv">
            <div :class="classList.singleLabel">
              <span class="text-truncate">{{ iv[label] }}</span>
            </div>
          </slot>
        </template>

        <!-- Multiple label -->
        <template v-if="mode == 'multiple' && hasSelected && !search && !isAddOpen">
          <slot name="multiplelabel" :values="iv">
            <div :class="classList.multipleLabel">
              {{ multipleLabelText }}
            </div>
          </slot>
        </template>

        <!-- Placeholder -->
        <template v-if="placeholder && !hasSelected && !search && !isAddOpen">
          <slot name="placeholder">
            <div :class="classList.placeholder">
              {{ placeholder }}
            </div>
          </slot>
        </template>

        <!-- Spinner -->
        <slot v-if="busy" name="spinner">
          <span :class="classList.spinner"></span>
        </slot>

        <!-- Clear -->
        <!--       <slot v-if="hasSelected && !disabled && canClear && !busy" name="clear" :clear="clear">
          <span :class="classList.clear" @mousedown="clear"><span :class="classList.clearIcon"></span></span>
        </slot> -->

        <!-- Caret -->
        <slot v-if="caret" name="caret">
          <span :class="classList.caret" @click="handleCaretClick"></span>
        </slot>

        <!-- Options -->
        <div ref=options_container>
        <div
          :class="classList.dropdown"
          tabindex="-1"
          ref="optionRows"
        >
          <div class="position-relative">
            <div class="multiselect-select-all" v-if="isSelectAll && mode !== 'single'" @click.stop.prevent @mousedown.prevent>
              <div class="position-absolute selectall-button-container text-center">
                  <div class="row g-0">
                    <div class="col-6">
                      <div class="p-2 text-truncate" @click.stop.prevent="selectAll" @mousedown.prevent :class="{
                          'selectall-check-all':!isAll,
                          'selectall-check-none':isAll,
                        }">
                        <i class="mdi mdi-check"></i> Mind kijelölése
                      </div>
                    </div>
                     <div class="col-6">
                       <div class="p-2 text-truncate" @click.stop.prevent="deselectAll" @mousedown.prevent :class="{
                          'selectall-check-all':!isClearAll,
                          'selectall-check-none':isClearAll,
                        }">
                        <i class="mdi mdi-close"></i> Egyik sem
                       </div>
                     </div>
                  </div>
              </div>
            </div>

            <perfect-scrollbar class="d-flex flex-column flex-fill" :style="{maxHeight: scrollMaxHeight}">
              <slot name="beforelist" :options="fo"></slot>

              <ul :class="classList.options">
                <template v-if="groups">
                  <li
                    v-for="(group, i, key) in fg"
                    :class="classList.group"
                    :key="key"
                  >
                    <div
                      :class="classList.groupLabel(group)"
                      :data-pointed="isPointed(group)"
                      @mousedown.prevent
                      @mouseenter="setPointer(group)"
                      @click.stop.prevent="handleGroupClick(group)"
                    >
                      <slot name="grouplabel" :group="group">
                        <span>{{ group[groupLabel] }}</span>
                      </slot>
                    </div>

                    <ul :class="classList.groupOptions">
                      <li
                        v-for="(option, i, key) in group.__VISIBLE__"
                        :class="classList.option(option, group)"
                        :key="key"
                        @mousedown.prevent
                        :data-pointed="isPointed(option)"
                        @mouseenter="setPointer(option)"
                        @click.stop.prevent="handleOptionClick(option)"
                      >
                        <slot name="option" :option="option" :search="search">
                          <span class="d-flex w-100">
                            <span class="flex-grow-1 text-truncate">{{ option[label] }}</span>
                            <span class="pe-2" v-if="option.additem" @click.stop.prevent="handleRemoveOption(option, $event)">
                              <span class="rounded-circle remove-option bg-danger d-flex justify-content-center text-white"><i class="mdi mdi-trash-can"></i></span>
                            </span>
                          </span>
                        </slot>
                      </li>
                    </ul>
                  </li>
                </template>
                <template v-else>
                  <li
                    v-for="(option, i, key) in fo"
                    :class="classList.option(option)"
                    :key="key"
                    @mousedown.prevent
                    :data-pointed="isPointed(option)"
                    @mouseenter="setPointer(option)"
                    @click.stop.prevent="handleOptionClick(option)"
                  >
                    <slot name="option" :option="option" :search="search">
                      <span class="d-flex w-100">
                        <span class="flex-grow-1 text-truncate">{{ option[label] }}</span>
                        <span class="pe-2" v-if="option.additem" @click.stop.prevent="handleRemoveOption(option, $event)">
                          <span class="rounded-circle remove-option bg-danger d-flex justify-content-center text-white"><i class="mdi mdi-trash-can"></i></span>
                        </span>
                      </span>
                    </slot>
                  </li>
                </template>
              </ul>

              <slot v-if="noOptions" name="nooptions">
                <div :class="classList.noOptions" v-html="noOptionsText"></div>
              </slot>

              <slot v-if="noResults" name="noresults">
                <div :class="classList.noResults" v-html="noResultsText"></div>
              </slot>

              <slot name="afterlist" :options="fo"></slot>
            </perfect-scrollbar>

            <div class="multiselect-close-all d-flex align-items-center selectall-check-all cursor-pointer" v-if="mode !== 'single'">
              <div class="text-center closeall-button-container col-12"><i class="mdi mdi-playlist-check"></i> Kész</div>
            </div>
          </div>
        </div>
            </div>

        <!-- Hacky input element to show HTML5 required warning -->
        <input v-if="required" :class="classList.fakeInput" tabindex="-1" :value="textValue" required/>

        <!-- Native input support -->
        <template v-if="nativeSupport">
          <input v-if="mode == 'single'" type="hidden" :name="name" :value="plainValue !== undefined ? plainValue : ''" />
          <template v-else>
            <input v-for="(v, i) in plainValue" type="hidden" :name="`${name}[]`" :value="v" :key="i" />
          </template>
        </template>

        <!-- Create height for empty input -->
        <div :class="classList.spacer"></div>
      </div>
      <!-- add open button -->
      <div v-if="inputmode && mode !== 'tags' && !disabled" :class="classList.addButton" ref="addGomb"
        @click.prevent="openAdd"><i :class="classList.addButtonIcon"></i>
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
  import useClasses from './composables/useClasses'
  import useAdd from './composables/useAdd'
  import {inject, ref, provide, reactive} from 'vue'

  export default {
    name: 'Multiselect',
    emits: [
      'open', 'close', 'select', 'deselect',
      'input', 'search-change', 'tag', 'update:modelValue',
      'change', 'clear'
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
        default: () => ([])
      },
      id: {
        type: [String, Number],
        required: false,
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
      hideSelected: {
        type: Boolean,
        required: false,
        default: false,
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
        default: false,
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
      canClear: {
        type: Boolean,
        required: false,
        default: true,
      },
      max: {
        type: Number,
        required: false,
        default: -1,
      },
      showOptions: {
        type: Boolean,
        required: false,
        default: true,
      },
      addTagOn: {
        type: Array,
        required: false,
        default: () => (['enter']),
      },
      required: {
        type: Boolean,
        required: false,
        default: false,
      },
      openDirection: {
        type: String,
        required: false,
        default: 'bottom',
      },
      nativeSupport: {
        type: Boolean,
        required: false,
        default: false,
      },
      classes: {
        type: Object,
        required: false,
        default: () => ({})
      },
      strict: {
        type: Boolean,
        required: false,
        default: true,
      },
      closeOnSelect: {
        type: Boolean,
        required: false,
        default: false,
      },
      autocomplete: {
        type: String,
        required: false,
      },
      groups: {
        type: Boolean,
        required: false,
        default: false,
      },
      groupLabel: {
        type: String,
        required: false,
        default: 'label',
      },
      groupOptions: {
        type: String,
        required: false,
        default: 'options',
      },
      groupHideEmpty: {
        type: Boolean,
        required: false,
        default: false,
      },
      groupSelect: {
        type: Boolean,
        required: false,
        default: true,
      },
      inputType: {
        type: String,
        required: false,
        default: 'text',
      },

      isSelectAll: {
        type:Boolean,
        default:false
      },
      maxHeight :{
        type: Number,
        required:false,
        default:320
      },
      container: {
        type:String,
        default:'body',
      },
      inputmode: {
        type:Boolean,
        default: false
      },
      error_message_index:{
            type: String,
            default: ''
        },
      error_message_name: {
        type:String,
        default:''
      },
      add_error_message_index:{
            type: String,
            default: ''
        },
      add_error_message_name: {
        type:String,
        default:''
      },
      rand_error_num:{
        type:Number,
        default:Math.floor(Math.random() * 10000) + 1
      },
      error_point_name: {
        type:String,
        default:'global'
      },
      invalid: {
        type:Boolean,
        required:false,
        default:false
      },
      inputPrefix: {
        type:String,
        default: "new_"
      },
      mask: {
        type: Object,
        default: {mask: 'F*', tokens: {'F': {pattern: /./}}},
      },
      InputModeFieldValidate: {
        type:Function,
        default:(value)=>{ return value}
      },
      closeOnDeselect: {
        type: Boolean,
        required: false,
        default: true,
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
          this.isInvalid = newval;
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
      // error_message_index:{
      //   handler: function(newval){
      //       if(newval){
      //         if(this.validation_error.form_errors[this.error_point_name][this.error_message_name]){
      //           delete this.validation_error.form_errors[this.error_point_name][this.error_message_name];
      //         }
      //         this.ErrorMessage(this.is_valid);
      //       }
      //   },immediate: true
      // },
      add_error_message_name: {
        handler: function(value) {
          this.AddErrorMessage(!this.isAddOpen)
        }
      },
      required:{
        handler: function(newval){
            this.isRequired = newval;
            this.ErrorMessage(this.is_valid);
        },immediate: true
      },
      //ha menet közben változik az inputmode, fixen csukódjon be a hozzáadás lehetőség.
      inputmode:{
        handler: function(){
          this.isOpen = false;
          this.isAddOpen = false;
        }
      },
    },
    methods: {
      ErrorMessage(valid) {
        this.ManageMessage(valid, this.GetErrorMessageName(this.error_message_name, this.error_message_index ? this.error_message_index : this.error_message_name))
      },
      AddErrorMessage(valid){
        this.ManageMessage(valid, this.GetErrorMessageName(this.add_error_message, this.add_error_message_index ? this.add_error_message_index : this.add_error_message,true))
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
      GetErrorMessageName(message, index,is_add_error = false) {
            if (message === "") {
            	if(is_add_error){
      					return {
    	                    name: 'fields.error_messages.select_field_add_error_'+this.rand_error_num,
    	                    value: 'fields.error_messages.select_field_add_error'
      	                }; // alltalanos hibaszoveg
            	}else{
	                return {
	                    name: 'fields.error_messages.select_field_error_'+this.rand_error_num,
	                    value: 'fields.error_messages.select_field_error'
	                }; // alltalanos hibaszoveg
            	}
            }
            return {name: index, value: message}; // spec vezerelt hibaszoveg
        },
    },
    computed:{
    	ErrorName() {
            return this.GetErrorMessageName(this.error_message_name, this.error_message_index ? this.error_message_index : this.error_message_name)
        },
        AddErrorName(){
        	return this.GetErrorMessageName(this.add_error_message_name, this.add_error_message_index ? this.add_error_message_index : this.add_error_message_name, true)
        },
      is_valid(){
        let valid = true;
        if(this.invalid || this.isAddOpen || this.required && !this.hasValid ){
          valid = false;
        }
        return valid;
      },
      GetCustomMask() {
          return {...this.mask, ...{customvalidate: {postvalidate: this.InputModeFieldValidate}}}
      }
    },
    created() {
      window.addEventListener("resize", this.resize);
    },
    unmounted() {
      delete this.validation_error.form_errors[this.error_point_name][this.ErrorName.name];
      delete this.validation_error.form_errors[this.error_point_name][this.AddErrorName.name];
      window.removeEventListener("resize", this.resize);
    },
    setup(props, context)
    {
      const multi = ref(false)
      const force_validate = inject('force_validate', false)
      const validation_error = inject('validation_error')
      const value = useValue(props, context)
      const dropdown = useDropdown(props, context)
      const search = useSearch(props, context, {multiselect: multi, dropdown: dropdown})
      const pointer = usePointer(props, context)
      const isAddOpen = ref(false)


      const multiselect = useMultiselect(props, context, {
        input: search.input,
        clearSearch: search.clearSearch,
        open: dropdown.open,
        close: dropdown.close,
        isOpen: dropdown.isOpen,
        isAddOpen: isAddOpen,
        multi: multi,
      })

      const data = useData(props, context, {
        iv: value.iv,
      })

      const options = useOptions(props, context, {
        ev: value.ev,
        iv: value.iv,
        search: search.search,
        clearSearch: search.clearSearch,
        update: data.update,
        pointer: pointer.pointer,
        clearPointer: pointer.clearPointer,
        blur: multiselect.blur,
        deactivate: multiselect.deactivate,
        multiselect: multiselect.multiselect,
        updateDropPosition: multiselect.updateDropPosition,
      })

      const add = useAdd(props, context, {
        update: data.update,
        select: options.select,
        isSelected: options.isSelected,
        isAddOpen: isAddOpen,
      })

      const pointerAction = usePointerAction(props, context, {
        fo: options.fo,
        fg: options.fg,
        handleOptionClick: options.handleOptionClick,
        handleGroupClick: options.handleGroupClick,
        search: search.search,
        pointer: pointer.pointer,
        setPointer: pointer.setPointer,
        clearPointer: pointer.clearPointer,
        multiselect: multiselect.multiselect,
      })

      const keyboard = useKeyboard(props, context, {
        iv: value.iv,
        update: data.update,
        search: search.search,
        setPointer: pointer.setPointer,
        selectPointer: pointerAction.selectPointer,
        backwardPointer: pointerAction.backwardPointer,
        forwardPointer: pointerAction.forwardPointer,
        blur: multiselect.blur,
        fo: options.fo,
        isAddOpen: isAddOpen,
        multiselect: multiselect.multiselect,
      })

      const classes = useClasses(props, context, {
        isOpen: dropdown.isOpen,
        isPointed: pointerAction.isPointed,
        canPointGroups: pointerAction.canPointGroups,
        isSelected: options.isSelected,
        isDisabled: options.isDisabled,
        isActive: multiselect.isActive,
        resolving: options.resolving,
        fo: options.fo,
        isAddOpen: isAddOpen,
        hasValid: options.hasValid,
        force_validate: force_validate,
        addValue: add.add
      })

      return {
        ...value,
        ...dropdown,
        ...multiselect,
        ...pointer,
        ...data,
        ...search,
        ...options,
        ...pointerAction,
        ...keyboard,
        ...classes,
        ...add,
        validation_error,
        force_validate,
      }
    }
  }
</script>
