import type { Ref, InjectionKey } from 'vue'

export type nameType = string | number;

export interface CollapseProps {
  modelValue: nameType[]
  accordion?: boolean
}

export interface CollapseItemProps {
  name: nameType
  title?: string
  disabled?: boolean
}

export interface collapseContext {
  activeItems: Ref<nameType[]>
  handleItemClick: (name: nameType) => void
}

export interface CollapseEmits {
  (e: 'update:modelValue', values: nameType[]): void
  (e: 'change', values: nameType[]): void
}
export const collapseContextKey: InjectionKey<collapseContext> = Symbol('collapseContextKey')