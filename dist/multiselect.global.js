var VueformMultiselect=function(e,t){"use strict";function n(e){return-1!==[null,void 0,!1].indexOf(e)}function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,l=new Array(t);n<t;n++)l[n]=e[n];return l}function i(e){return String(e).toLowerCase().trim()}function u(t,a,o){var u=e.toRefs(t),s=u.options,c=u.mode,d=u.trackBy,v=u.limit,p=u.hideSelected,f=u.createTag,h=u.label,m=u.appendNewTag,g=u.multipleLabel,y=u.object,w=u.loading,b=u.delay,S=u.resolveOnLoad,k=u.minChars,V=u.filterResults,x=u.clearOnSearch,B=u.clearOnSelect,M=u.valueProp,O=u.canDeselect,N=u.max,A=o.internalValue,C=o.externalValue,q=o.search,P=o.blurSearch,T=o.clearSearch,D=o.update,E=o.blurInput,R=o.pointer,I=(o.required,o.multiselect),K=e.ref([]),j=e.ref([]),L=e.ref(!1),H=e.computed((function(){var e,t=j.value||[];return e=t,"[object Object]"===Object.prototype.toString.call(e)&&(t=Object.keys(t).map((function(e){var n,l=t[e];return r(n={},M.value,e),r(n,d.value,l),r(n,h.value,l),n}))),t=t.map((function(e,t){var n;return"object"===l(e)?e:(r(n={},M.value,t),r(n,d.value,e),r(n,h.value,e),n)})),K.value.length&&(t=t.concat(K.value)),t})),$=e.computed((function(){var e=H.value;return J.value.length&&(e=J.value.concat(e)),q.value&&V.value&&(e=e.filter((function(e){return-1!==i(e[d.value]).indexOf(i(q.value))}))),p.value&&(e=e.filter((function(e){return!ce(e)}))),v.value>0&&(e=e.slice(0,v.value)),e})),z=e.computed((function(){switch(c.value){case"single":return!n(A.value[M.value]);case"multiple":case"tags":return!n(A.value)&&A.value.length>0}})),F=e.computed((function(){switch(c.value){case"single":return!_.isEmpty(A.value);case"multiple":case"tags":return!n(A.value)&&A.value.length>0}})),W=e.computed((function(){return void 0!==g&&void 0!==g.value?g.value(A.value):A.value&&A.value.length>1?"".concat(A.value.length," elem kiválasztva"):"1 elem kiválasztva"})),U=e.computed((function(){return!H.value.length&&!L.value})),G=e.computed((function(){return H.value.length>0&&0==$.value.length})),J=e.computed((function(){var e;return!1!==f.value&&q.value?-1!==se(q.value)?[]:[(e={},r(e,M.value,q.value),r(e,h.value,q.value),r(e,d.value,q.value),e)]:[]})),Q=e.computed((function(){switch(c.value){case"single":return null;case"multiple":case"tags":return[]}})),X=e.computed((function(){return w.value||L.value})),Y=e.computed((function(){var e=0;return $.value.forEach((function(t){ae(t)&&e++})),e===$.value.length})),Z=e.computed((function(){var e=0;return H.value.forEach((function(t){ae(t)&&e++})),0===e})),ee=function(e){switch("object"!==l(e)&&(e=ue(e)),c.value){case"single":D(e);break;case"multiple":case"tags":D(A.value.concat(e))}a.emit("select",ne(e))},te=function(e){switch("object"!==l(e)&&(e=ue(e)),c.value){case"single":re();break;case"tags":case"multiple":D(A.value.filter((function(t){return t[M.value]!=e[M.value]})))}a.emit("deselect",ne(e))},ne=function(e){return y.value?e:e[M.value]},le=function(e){te(e)},re=function(){D(Q.value)},ae=function(e){if(!0===A.selected)return ee(e),!0;switch(c.value){case"single":return!n(A.value)&&A.value[M.value]==e[M.value];case"tags":case"multiple":return!n(A.value)&&-1!==A.value.map((function(e){return e[M.value]})).indexOf(e[M.value])}},oe=function(e){return!0===e.disabled},ie=function(){return!(void 0===N||-1===N.value||!z.value&&N.value>0)&&A.value.length>=N.value},ue=function(e){return H.value[H.value.map((function(e){return String(e[M.value])})).indexOf(String(e))]},se=function(e){return H.value.map((function(e){return i(e[d.value])})).indexOf(i(e))},ce=function(e){return"tags"===c.value&&p.value&&ae(e)},de=function(e){K.value.push(e)},ve=function(){n(C.value)||(A.value=fe(C.value))},pe=function(e){L.value=!0,s.value(q.value).then((function(t){j.value=t,"function"==typeof e&&e(t),L.value=!1}))},fe=function(e){return n(e)?"single"===c.value?{}:[]:y.value?e:"single"===c.value?ue(e)||{}:e.filter((function(e){return!!ue(e)})).map((function(e){return ue(e)}))};if("single"!==c.value&&!n(C.value)&&!Array.isArray(C.value))throw new Error('v-model must be an array when using "'.concat(c.value,'" mode'));return s&&"function"==typeof s.value?S.value?pe(ve):1==y.value&&ve():(j.value=s&&s.value?s.value:[],ve()),b.value>-1&&e.watch(q,(function(e){e.length<k.value||(L.value=!0,x.value&&(j.value=[]),setTimeout((function(){e==q.value&&s.value(q.value).then((function(t){e==q.value&&(j.value=t,R.value=$.value.filter((function(e){return!0!==e.disabled}))[0]||null,L.value=!1)}))}),b.value))}),{flush:"sync"}),e.watch(C,(function(e){var t,l,r;if(n(e))A.value=fe(e);else switch(c.value){case"single":(y.value?e[M.value]!=A.value[M.value]:e!=A.value[M.value])&&(A.value=fe(e));break;case"multiple":case"tags":t=y.value?e.map((function(e){return e[M.value]})):e,l=A.value.map((function(e){return e[M.value]})),r=l.slice().sort(),t.length===l.length&&t.slice().sort().every((function(e,t){return e===r[t]}))||(A.value=fe(e))}}),{deep:!0}),e.watch(c,(function(e){A.value=fe(null)}),{deep:!0}),e.watch((function(){return t.options}),(function(e){"function"!=typeof t.options&&(j.value=t.options)}),{flush:"sync"}),{filteredOptions:$,selectAll:function(e){Y.value||(I.value.querySelector(".multiselect-options"),re(),$.value.forEach((function(e,t){ee(e)})))},deselectAll:function(e){re()},isAll:Y,isClearAll:Z,hasSelected:z,multipleLabelText:W,extendedOptions:H,noOptions:U,noResults:G,resolving:L,busy:X,select:ee,deselect:te,remove:le,clear:re,isSelected:ae,isDisabled:oe,isMax:ie,getOption:ue,handleOptionClick:function(e){if(!oe(e))switch(c.value){case"single":if(ae(e))return void(O.value&&te(e));ee(e),P(),E();break;case"multiple":if(ae(e))return void te(e);if(ie())return;ee(e);break;case"tags":if(ae(e))return void te(e);if(ie())return;void 0===ue(e[M.value])&&f.value&&(a.emit("tag",e[M.value]),m.value&&de(e),T()),B.value&&T(),ee(e)}},handleTagRemove:function(e,t){0===t.button?le(e):t.preventDefault()},refreshOptions:function(e){pe(e)},resolveOptions:pe,hasValid:F}}function s(n,l,r){var a=e.toRefs(n),o=a.maxHeight,i=a.disabled,u=a.searchable,s=a.isSelectAll,c=r.multiselect,d=r.blurInput,v=r.blurSearch,p=r.clearSearch,f=r.focusInput,h=r.focusSearch,m=r.addOpen,g=e.ref(!1),y=(e.ref("dropdown-"+Math.random().toString().replace(".","-")),e.ref(!1)),w=e.ref(null),b=e.ref(null),S=e.computed((function(){return"".concat(o.value,"px")})),_=e.computed((function(){return"".concat(o.value-2-(s?40:0),"px")})),k=new IntersectionObserver((function(e){e.forEach((function(e){e.isIntersecting&&e.intersectionRatio<1&&V(e.target)}))})),V=function(e){var t=c.value.getBoundingClientRect();"body"===n.container&&(e.style.left=t.x+"px",e.style.top=t.bottom+"px");var l=x().x+x().width,r=x().y+x().height,a=e.getBoundingClientRect().x+e.getBoundingClientRect().width,o=e.getBoundingClientRect().y+e.getBoundingClientRect().height;a>l&&(e.style.removeProperty("left"),e.style.left=t.width-e.getBoundingClientRect().width+"px"),x().height>e.getBoundingClientRect().height&&o>r&&(e.style.removeProperty("top"),e.style.bottom=t.height+"px")},x=function(){return"body"===n.container?{x:0,y:0,width:window.innerWidth,height:window.innerHeight}:document.getElementById(n.container).getBoundingClientRect()},B=function(e){e.target.contains(c.value)&&V(b.value)},M=function(){u&&u.value?v():d()};return{isOpen:g,contentMaxHeight:S,resize:function(e){g.value&&M()},scrollMaxHeight:_,openDropdown:function(){if(!i.value&&!m.value){var e=c.value.querySelector(".multiselect-options"),r=c.value.querySelector(".selectall-button-container");"body"===n.container&&(document.addEventListener("scroll",B,!0),document.body.append(b.value)),g.value=!0,l.emit("open"),t.nextTick((function(){var t,n;c.value.clientWidth>e.clientWidth&&e.style.setProperty("min-width",c.value.clientWidth+"px"),r&&(r.style.width=e.clientWidth+"px"),t=e,n=c.value.getBoundingClientRect(),t.style.left=0,t.style.top=n.height+"px",t.style.removeProperty("width"),t.style.removeProperty("right"),t.style.removeProperty("bottom"),V(e),y.value||(k.observe(e),y.value=!0)}))}},closeDropdown:function(e){"body"===n.container&&(document.removeEventListener("scroll",B,!0),w.value.append(b.value)),c.value.querySelector(".multiselect-options").style.removeProperty("min-width"),g.value=!1,p(),l.emit("close")},open:function(){u&&u.value?h():f()},close:M,handleInputMousedown:function(e){g.value&&!u.value&&(c.value.querySelector(".multiselect-input").dispatchEvent(new Event("blur")),c.value.querySelector(".multiselect-input").blur(),e.preventDefault())},options_container:w,optionRows:b,setScrollPosition:B}}var c={inject:["force_validate"],name:"Multiselect",emits:["open","close","select","deselect","input","search-change","tag","update:modelValue","change","update:add"],props:{value:{required:!1},modelValue:{required:!1},options:{type:[Array,Object,Function],required:!1},id:{type:[String,Number],required:!1,default:"multiselect"},name:{type:[String,Number],required:!1,default:"multiselect"},disabled:{type:Boolean,required:!1,default:!1},label:{type:String,required:!1,default:"label"},trackBy:{type:String,required:!1,default:"label"},valueProp:{type:String,required:!1,default:"value"},placeholder:{type:String,required:!1,default:null},mode:{type:String,required:!1,default:"single"},searchable:{type:Boolean,required:!1,default:!1},limit:{type:Number,required:!1,default:-1},maxHeight:{type:Number,required:!1,default:300},hideSelected:{type:Boolean,required:!1,default:!0},createTag:{type:Boolean,required:!1,default:!1},appendNewTag:{type:Boolean,required:!1,default:!0},caret:{type:Boolean,required:!1,default:!0},loading:{type:Boolean,required:!1,default:!1},noOptionsText:{type:String,required:!1,default:"A lista üres"},noResultsText:{type:String,required:!1,default:"Nincs találat"},multipleLabel:{type:Function,required:!1},object:{type:Boolean,required:!1,default:!1},delay:{type:Number,required:!1,default:-1},minChars:{type:Number,required:!1,default:0},resolveOnLoad:{type:Boolean,required:!1,default:!0},filterResults:{type:Boolean,required:!1,default:!0},clearOnSearch:{type:Boolean,required:!1,default:!1},clearOnSelect:{type:Boolean,required:!1,default:!0},canDeselect:{type:Boolean,required:!1,default:!0},max:{type:Number,required:!1,default:-1},invalid:{type:Boolean,required:!1,default:!1},required:{type:Boolean,required:!1,default:!1},error_message_name:{type:String,default:""},add_error_message_name:{type:String,default:""},rand_error_num:{type:Number,default:Math.floor(1e4*Math.random())+1},error_point_name:{type:String,default:"global"},container:{type:String,default:"body"},modalInside:{type:Boolean,default:!1},inputmode:{type:Boolean,default:!1},isSelectAll:{type:Boolean,default:!1}},watch:{hasValid:{handler:function(e){let t=!1;!e&&this.required||(t=!0),this.ErrorMessage(t)}},invalid:{handler:function(e){this.ErrorMessage(this.is_valid)}},isAddOpen:{handler:function(e){this.AddErrorMessage(!e)},deep:!0},error_point_name:{handler:function(){this.ErrorMessage(this.is_valid)}},add_error_message_name:{handler:function(e){this.AddErrorMessage(!this.isAddOpen)}},required:{handler:function(){this.ErrorMessage(this.is_valid)},immediate:!0},inputmode:{handler:function(){this.isOpen.value=!1}}},methods:{ErrorMessage(e){this.ManageMessage(e,this.error_name)},AddErrorMessage(e){this.ManageMessage(e,this.add_error_name)},ManageMessage(e,t){void 0===this.validation_error.form_errors[this.error_point_name]&&(this.validation_error.form_errors[this.error_point_name]=[]),e?delete this.validation_error.form_errors[this.error_point_name][t.name]:this.validation_error.form_errors[this.error_point_name][t.name]=t.value}},computed:{error_name(){return""===this.error_message_name?{name:"error_messages.select_field_error_"+this.rand_error_num,value:"error_messages.select_field_error"}:{name:this.error_message_name,value:this.error_message_name}},add_error_name(){return""===this.add_error_message_name?{name:"error_messages.select_field_add_error_"+this.rand_error_num,value:"error_messages.select_field_add_error"}:{name:this.add_error_message_name,value:this.add_error_message_name}},is_valid(){let e=!0;return(this.invalid||this.isAddOpen||this.required&&!this.hasValid)&&(e=!1),e}},created(){window.addEventListener("resize",this.resize)},unmounted(){window.removeEventListener("resize",this.resize)},setup(l,r){const o=t.inject("validation_error"),i=function(t,n){var l=e.toRefs(t),r=l.value,a=l.modelValue,o=l.mode;return{internalValue:e.ref("single"!==o.value?[]:{}),externalValue:void 0!==n.expose?a:r}}(l,r),c=function(t,n,l){var r=e.toRefs(t),a=r.searchable,o=(r.id,e.ref(null)),i=e.computed((function(){return a.value?-1:0}));return{multiselect:o,tabindex:i,focusInput:function(){o.value.querySelector(".multiselect-input").focus()},blurInput:function(){o.value.querySelector(".multiselect-input").blur()}}}(l),d={pointer:e.ref(null)},v=function(t,l,r){var a=e.toRefs(t),o=a.object,i=a.valueProp,u=a.mode,s=r.internalValue,c=function(e){return o.value||n(e)?e:Array.isArray(e)?e.map((function(e){return e[i.value]})):e[i.value]},d=function(e){return n(e)?"single"===u.value?{}:[]:e};return{update:function(e){s.value=d(e);var t=c(e);l.emit("change",t),l.emit("input",t),l.emit("update:modelValue",t)}}}(l,r,{internalValue:i.internalValue}),p=function(t,n,l){var r=e.toRefs(t),a=r.searchable,o=r.mode,i=l.internalValue,u=(l.update,e.ref(null)),s=e.ref(null),c=e.computed((function(){return u.value?"".concat(u.value.length,"ch"):"tags"===o.value&&-1===[null,void 0].indexOf(i.value)&&i.value.length?"1ch":"100%"}));return e.watch(u,(function(e){n.emit("search-change",e)})),{search:u,input:s,tagsSearchWidth:c,clearSearch:function(){u.value=""},focusSearch:function(){s.value.focus()},blurSearch:function(){a.value&&e.nextTick((function(){s.value.blur()}))}}}(l,r,{internalValue:i.internalValue,update:v.update}),f=u(l,r,{externalValue:i.externalValue,internalValue:i.internalValue,search:p.search,blurSearch:p.blurSearch,clearSearch:p.clearSearch,update:v.update,blurInput:c.blurInput,pointer:d.pointer,required:l.required,multiselect:c.multiselect}),h=function(t,n,l){var r=e.toRefs(t),a=(r.hasAdd,r.options),o=(r.mode,l.select),i=l.update,u=e.ref(null),s=e.ref(!1),c=e.ref(null),d=e.computed((function(){return s.value})),v=function(){if(u.value){var t=p(u.value);if(t)return i(t),void o(t);var n={value:u.value,label:u.value};a.value.unshift(n),e.nextTick((function(){i(n),o(n)}))}},p=function(e){var t=!1;return a.value.forEach((function(n){n.label!==e||(t=n.value)})),t};return{add:u,isAddOpen:d,openAdd:function(){s.value?(v(),s.value=!1):(s.value=!0,u.value="",e.nextTick((function(){c.value.focus()})))},addinput:c}}(l,0,{update:v.update,select:f.select}),m=s(l,r,{multiselect:c.multiselect,blurInput:c.blurInput,blurSearch:p.blurSearch,clearSearch:p.clearSearch,focusInput:c.focusInput,focusSearch:p.focusSearch,addOpen:h.isAddOpen}),g=function(t,n,l){var r=e.toRefs(t),a=r.id,o=r.valueProp,i=l.filteredOptions,u=l.handleOptionClick,s=l.search,c=l.pointer,d=e.computed((function(){return i.value.filter((function(e){return!0!==e.disabled}))})),v=function(e){c.value=e},p=function(){c.value=d.value[0]||null},f=function(){c.value=null},h=function(){var e=document.getElementById(a.value).querySelector(".is-pointed");if(e){var t=e.parentElement;e.offsetTop+e.offsetHeight>t.clientHeight+t.scrollTop&&(t.scrollTop=e.offsetTop+e.offsetHeight-t.clientHeight),e.offsetTop<t.scrollTop&&(t.scrollTop=e.offsetTop)}};return e.watch(s,(function(e){p()})),{pointer:c,isPointed:function(e){return!!c.value&&c.value[o.value]==e[o.value]},setPointer:v,setPointerFirst:p,clearPointer:f,selectPointer:function(){c.value&&!0!==c.value.disabled?(u(c.value),f()):f()},forwardPointer:function(){if(null===c.value)v(d.value[0]||null);else{var t=d.value.map((function(e){return e[o.value]})).indexOf(c.value[o.value])+1;d.value.length<=t&&(t=0),v(d.value[t]||null)}e.nextTick((function(){h()}))},backwardPointer:function(t){if(null===c.value)v(d.value[d.value.length-1]||null);else{var n=d.value.map((function(e){return e[o.value]})).indexOf(c.value[o.value])-1;n<0&&(n=d.value.length-1),v(d.value[n]||null)}e.nextTick((function(){h()}))}}}(l,0,{filteredOptions:f.filteredOptions,handleOptionClick:f.handleOptionClick,search:p.search,pointer:d.pointer}),y=function(t,n,l){var r=e.toRefs(t).mode,o=l.internalValue,i=l.update,u=l.closeDropdown,s=l.clearPointer,c=l.search,d=l.isAddOpen;return{handleBackspace:function(e){("single"!==r.value||d.value)&&(d.value||i(a(o.value).slice(0,-1)))},handleEsc:function(e){u(),s(),e.target.blur()},handleSearchBackspace:function(e){""===c.value||d.value||e.stopPropagation()}}}(l,0,{internalValue:i.internalValue,update:v.update,closeDropdown:m.closeDropdown,clearPointer:g.clearPointer,search:p.search,isAddOpen:h.isAddOpen});return{...i,...m,...c,...d,...v,...p,...h,...f,...g,...y,validation_error:o}}};const d={class:"input-group"},v={class:"multiselect-single-label"},p={class:"text-truncate"},f={class:"multiselect-multiple-label"},h={key:2,class:"multiselect-search"},m={key:3,class:"multiselect-add"},g={key:4,class:"multiselect-tags"},y={class:"multiselect-tag"},w={class:"multiselect-placeholder"},b={class:"text-truncate"},S=t.createVNode("span",{class:"multiselect-caret"},null,-1),k={class:"multiselect-spinner"},V={class:"position-absolute selectall-button-container text-center"},x={class:"row g-0"},B={class:"col-6"},M=t.createVNode("i",{class:"mdi mdi-check"},null,-1),O=t.createTextVNode(" Mind kijelölése "),N={class:"col-6"},A=t.createVNode("i",{class:"mdi mdi-close"},null,-1),C=t.createTextVNode(" Egyik sem "),q={key:0,class:"mdi mdi-check me-2"},P={class:"multiselect-no-options"},T={class:"multiselect-no-results"};return c.render=function(e,n,l,r,a,o){const i=t.resolveComponent("perfect-scrollbar");return t.openBlock(),t.createBlock("div",{class:["multiselect",[`is-${l.mode}`,{"is-open":e.isOpen,"is-searchable":l.searchable,"is-disabled":l.disabled,"no-caret":!l.caret}]],id:l.id,onKeydown:n[37]||(n[37]=t.withKeys(t.withModifiers((()=>{}),["prevent"]),["enter"])),ref:"multiselect"},[t.createVNode("div",d,[t.createVNode("div",{class:["form-select multiselect-input",{"is-invalid":l.invalid||e.isAddOpen&&o.force_validate.value||o.force_validate.value&&l.required&&!e.hasValid,"is-valid":o.force_validate.value&&!l.invalid&&(!l.required||e.hasValid),"add-mode":e.isAddOpen}],error_message_name:l.error_message_name,add_error_message_name:l.add_error_message_name,tabindex:e.tabindex,onMousedown:n[20]||(n[20]=(...t)=>e.handleInputMousedown&&e.handleInputMousedown(...t)),onFocus:n[21]||(n[21]=(...t)=>e.openDropdown&&e.openDropdown(...t)),onBlur:n[22]||(n[22]=(...t)=>e.closeDropdown&&e.closeDropdown(...t)),onKeyup:[n[23]||(n[23]=t.withKeys(((...t)=>e.handleEsc&&e.handleEsc(...t)),["esc"])),n[24]||(n[24]=t.withKeys(((...t)=>e.selectPointer&&e.selectPointer(...t)),["enter"]))],onKeydown:[n[25]||(n[25]=t.withKeys(((...t)=>e.handleBackspace&&e.handleBackspace(...t)),["delete"])),n[26]||(n[26]=t.withKeys(t.withModifiers(((...t)=>e.backwardPointer&&e.backwardPointer(...t)),["prevent"]),["up"])),n[27]||(n[27]=t.withKeys(t.withModifiers(((...t)=>e.forwardPointer&&e.forwardPointer(...t)),["prevent"]),["down"]))]},[t.createCommentVNode(" Single label "),"single"==l.mode&&e.hasSelected&&!e.search&&e.internalValue&&!e.isAddOpen?t.renderSlot(e.$slots,"singlelabel",{key:0,value:e.internalValue},(()=>[t.createVNode("div",v,[t.createVNode("span",p,t.toDisplayString(e.internalValue[l.label]),1)])])):t.createCommentVNode("v-if",!0),t.createCommentVNode(" Multiple label "),"multiple"!=l.mode||!e.hasSelected||e.search||e.isAddOpen?t.createCommentVNode("v-if",!0):t.renderSlot(e.$slots,"multiplelabel",{key:1,values:e.internalValue},(()=>[t.createVNode("div",f,t.toDisplayString(e.multipleLabelText),1)])),t.createCommentVNode(" Search "),"tags"===l.mode||!l.searchable||l.disabled||e.isAddOpen?t.createCommentVNode("v-if",!0):(t.openBlock(),t.createBlock("div",h,[t.withDirectives(t.createVNode("input",{"onUpdate:modelValue":n[1]||(n[1]=t=>e.search=t),onFocus:n[2]||(n[2]=t.withModifiers(((...t)=>e.openDropdown&&e.openDropdown(...t)),["stop"])),onBlur:n[3]||(n[3]=t.withModifiers(((...t)=>e.closeDropdown&&e.closeDropdown(...t)),["stop"])),onKeyup:[n[4]||(n[4]=t.withKeys(t.withModifiers(((...t)=>e.handleEsc&&e.handleEsc(...t)),["stop"]),["esc"])),n[5]||(n[5]=t.withKeys(t.withModifiers(((...t)=>e.selectPointer&&e.selectPointer(...t)),["stop"]),["enter"]))],onKeydown:[n[6]||(n[6]=t.withKeys(((...t)=>e.handleSearchBackspace&&e.handleSearchBackspace(...t)),["delete"])),n[7]||(n[7]=t.withKeys(t.withModifiers(((...t)=>e.backwardPointer&&e.backwardPointer(...t)),["stop"]),["up"])),n[8]||(n[8]=t.withKeys(t.withModifiers(((...t)=>e.forwardPointer&&e.forwardPointer(...t)),["stop"]),["down"]))],ref:"input"},null,544),[[t.vModelText,e.search]])])),t.createCommentVNode(" Add Option Input "),e.isAddOpen?(t.openBlock(),t.createBlock("div",m,[t.withDirectives(t.createVNode("input",{placeholder:"Új elem hozzáadása","onUpdate:modelValue":n[9]||(n[9]=t=>e.add=t),ref:"addinput"},null,512),[[t.vModelText,e.add]])])):t.createCommentVNode("v-if",!0),t.createCommentVNode(" Tags (with search) "),"tags"==l.mode?(t.openBlock(),t.createBlock("div",g,[(t.openBlock(!0),t.createBlock(t.Fragment,null,t.renderList(e.internalValue,((r,a,o)=>(t.openBlock(),t.createBlock("span",{key:o},[t.renderSlot(e.$slots,"tag",{option:r,handleTagRemove:e.handleTagRemove,disabled:l.disabled},(()=>[t.createVNode("div",y,[t.createTextVNode(t.toDisplayString(r[l.label])+" ",1),l.disabled?t.createCommentVNode("v-if",!0):(t.openBlock(),t.createBlock("i",{key:0,onClick:n[10]||(n[10]=t.withModifiers((()=>{}),["prevent"])),onMousedown:t.withModifiers((t=>e.handleTagRemove(r,t)),["prevent","stop"])},null,40,["onMousedown"]))])]))])))),128)),l.searchable&&!l.disabled?(t.openBlock(),t.createBlock("div",{key:0,class:"multiselect-search",style:{width:e.tagsSearchWidth}},[t.withDirectives(t.createVNode("input",{"onUpdate:modelValue":n[11]||(n[11]=t=>e.search=t),onFocus:n[12]||(n[12]=t.withModifiers(((...t)=>e.openDropdown&&e.openDropdown(...t)),["stop"])),onBlur:n[13]||(n[13]=t.withModifiers(((...t)=>e.closeDropdown&&e.closeDropdown(...t)),["stop"])),onKeyup:[n[14]||(n[14]=t.withKeys(t.withModifiers(((...t)=>e.handleEsc&&e.handleEsc(...t)),["stop"]),["esc"])),n[15]||(n[15]=t.withKeys(t.withModifiers(((...t)=>e.selectPointer&&e.selectPointer(...t)),["stop"]),["enter"]))],onKeydown:[n[16]||(n[16]=t.withKeys(((...t)=>e.handleSearchBackspace&&e.handleSearchBackspace(...t)),["delete"])),n[17]||(n[17]=t.withKeys(t.withModifiers(((...t)=>e.backwardPointer&&e.backwardPointer(...t)),["stop"]),["up"])),n[18]||(n[18]=t.withKeys(t.withModifiers(((...t)=>e.forwardPointer&&e.forwardPointer(...t)),["stop"]),["down"]))],style:{width:e.tagsSearchWidth},ref:"input"},null,36),[[t.vModelText,e.search]])],4)):t.createCommentVNode("v-if",!0)])):t.createCommentVNode("v-if",!0),t.createCommentVNode(" Placeholder "),!l.placeholder||e.hasSelected||e.search||e.isAddOpen?t.createCommentVNode("v-if",!0):t.renderSlot(e.$slots,"placeholder",{key:5},(()=>[t.createVNode("div",w,[t.createVNode("span",b,t.toDisplayString(l.placeholder),1)])])),l.caret&&!e.busy?t.renderSlot(e.$slots,"caret",{key:6},(()=>[S])):t.createCommentVNode("v-if",!0),t.createVNode(t.Transition,{name:"multiselect-loading"},{default:t.withCtx((()=>[t.withDirectives(t.createVNode("div",k,null,512),[[t.vShow,e.busy]])])),_:1}),"single"!==l.mode&&e.hasSelected&&!l.disabled?(t.openBlock(),t.createBlock("a",{key:7,class:"multiselect-clear",onClick:n[19]||(n[19]=t.withModifiers(((...t)=>e.clear&&e.clear(...t)),["prevent"]))})):t.createCommentVNode("v-if",!0)],42,["error_message_name","add_error_message_name","tabindex"]),l.inputmode?(t.openBlock(),t.createBlock("div",{key:0,class:["btn",{"btn-success":e.isAddOpen,"btn-outline-secondary":!e.isAddOpen}],onClick:n[28]||(n[28]=(...t)=>e.openAdd&&e.openAdd(...t))},[t.createVNode("i",{class:["mdi",{"mdi-plus":!e.isAddOpen,"mdi-check":e.isAddOpen}]},null,2)],2)):t.createCommentVNode("v-if",!0)]),t.createCommentVNode(" Options "),e.resolving&&l.clearOnSearch?t.createCommentVNode("v-if",!0):(t.openBlock(),t.createBlock("div",{key:0,name:"multiselect",onAfterLeave:n[36]||(n[36]=(...t)=>e.clearSearch&&e.clearSearch(...t)),ref:"options_container"},[t.withDirectives(t.createVNode("div",{class:"multiselect-options shadow",ref:"optionRows",style:{maxHeight:e.contentMaxHeight}},[l.isSelectAll&&"single"!==l.mode?(t.openBlock(),t.createBlock("div",{key:0,class:"multiselect-select-all",onClick:n[33]||(n[33]=t.withModifiers((()=>{}),["stop","prevent"])),onMousedown:n[34]||(n[34]=t.withModifiers((()=>{}),["prevent"]))},[t.createVNode("div",V,[t.createVNode("div",x,[t.createVNode("div",B,[t.createVNode("div",{class:["p-2 text-truncate",{"bg-light":!e.isAll,"text-white":e.isAll,"bg-secondary":e.isAll}],onClick:n[29]||(n[29]=t.withModifiers(((...t)=>e.selectAll&&e.selectAll(...t)),["stop","prevent"])),onMousedown:n[30]||(n[30]=t.withModifiers((()=>{}),["prevent"]))},[M,O],34)]),t.createVNode("div",N,[t.createVNode("div",{class:["p-2 text-truncate",{"bg-light":!e.isClearAll,"text-white":e.isClearAll,"bg-secondary":e.isClearAll}],onClick:n[31]||(n[31]=t.withModifiers(((...t)=>e.deselectAll&&e.deselectAll(...t)),["stop","prevent"])),onMousedown:n[32]||(n[32]=t.withModifiers((()=>{}),["prevent"]))},[A,C],34)])])])],32)):t.createCommentVNode("v-if",!0),t.createVNode(i,{class:"d-flex flex-column flex-fill",style:{maxHeight:e.scrollMaxHeight}},{default:t.withCtx((()=>[t.renderSlot(e.$slots,"beforelist"),(t.openBlock(!0),t.createBlock(t.Fragment,null,t.renderList(e.filteredOptions,((r,a,o)=>(t.openBlock(),t.createBlock("a",{tabindex:-1,href:"",class:["multiselect-option dropdown-item",{"is-pointed":e.isPointed(r),active:e.isSelected(r),"is-disabled":e.isDisabled(r)}],key:o,onMousedown:n[35]||(n[35]=t.withModifiers((()=>{}),["prevent"])),onMouseenter:t=>e.setPointer(r),onClick:t.withModifiers((t=>e.handleOptionClick(r)),["stop","prevent"])},[t.renderSlot(e.$slots,"option",{option:r,search:e.search,selected:e.isSelected(r)},(()=>[t.createVNode("span",{class:"text-truncate",title:r[l.label]},[e.isSelected(r)?(t.openBlock(),t.createBlock("i",q)):t.createCommentVNode("v-if",!0),t.createTextVNode(" "+t.toDisplayString(r[l.label]),1)],8,["title"])]))],42,["onMouseenter","onClick"])))),128)),t.withDirectives(t.createVNode("span",null,[t.renderSlot(e.$slots,"nooptions",{},(()=>[t.createVNode("div",P,t.toDisplayString(l.noOptionsText),1)]))],512),[[t.vShow,e.noOptions]]),t.withDirectives(t.createVNode("span",null,[t.renderSlot(e.$slots,"noresults",{},(()=>[t.createVNode("div",T,t.toDisplayString(l.noResultsText),1)]))],512),[[t.vShow,e.noResults]]),t.renderSlot(e.$slots,"afterlist")])),_:3},8,["style"])],4),[[t.vShow,e.isOpen]])],544))],42,["id"])},c.__file="src/Multiselect.vue",c}(Vue,Vue);
