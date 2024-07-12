import { defineComponent, } from "vue";
import type { PropType } from 'vue'
import type { Placement, Options } from '@popperjs/core'
import type { MenuOption } from './types'
import Tooltip from '../Tooltip/index.vue'
import type { TooltipInstance } from '../Tooltip/types';

export default defineComponent({
  name: "vDropdown",
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom'
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'hover'
    },
    transition: {
      type: String,
      default: 'fade'
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0
    },
    popperOptions: {
      type: Object as PropType<Options>,
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true,
    },
    hideAfterClick: {
      type: Boolean,
      default: true,
    },
    manual: {
      type: Boolean,
    },
  },
  setup(props) {
    return () => (
      <div
        class="v-dropdown"
      >
            <Tooltip
              trigger={props.trigger}
              placement={props.placement}
              popperOptions={props.popperOptions}
              openDelay={props.openDelay}
              closeDelay={props.closeDelay}
            >
            </Tooltip>
      </div>
    )
  }
})