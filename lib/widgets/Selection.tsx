import { defineComponent, ref, watch, PropType } from 'vue'
import { propValueDefine } from '../types'
import { OptionsDefine } from './types'
const PropsOhterDefine = {
  ...propValueDefine,
  options: {
    type: Array as PropType<OptionsDefine[]>,
    required: true,
  },
} as const
export default defineComponent({
  name: 'SelectionWidget',
  props: PropsOhterDefine,
  setup(props) {
    const currentValueRef = ref(props.value)
    watch(currentValueRef, (newVal) => {
      if (newVal !== props.value) {
        props.onChange(newVal)
      }
    })
    watch(
      () => props.value,
      (newV) => {
        if (newV !== currentValueRef.value) {
          currentValueRef.value = newV
        }
      },
    )
    return () => {
      const { options } = props
      console.log(options)
      return (
        <select v-model={currentValueRef.value}>
          {options.map((op) => (
            <option value={op.value}>{op.label}</option>
          ))}
        </select>
      )
    }
  },
})
