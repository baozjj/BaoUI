import type { Placement, Options } from '@popperjs/core'

export type Trigger = 'hover' | 'click'

export interface TooltipProps {
  content?: string
  trigger?: Trigger
  placement?: Placement
  manual?: boolean
  popperOptions?: Partial<Options>
  transition?: string
  openDelay?: number
  closeDelay?: number
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean) : void
}

export interface TooltipInstance {
  show: () => void
  hide: () => void
}