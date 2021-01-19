import { defineComponent, ref, watch, PropType } from 'vue'
import {
  SelectionWidgetPropsDefine,
  SelectionComonWidgetDefine,
} from '../types'
import { FormItem, withWrapFormItem } from './FormItem'
const selectionsComponent: SelectionComonWidgetDefine = withWrapFormItem(
  defineComponent({
    name: 'SelectionWidget',
    props: SelectionWidgetPropsDefine,
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
        return
        ;<FormItem {...props}>
          <select v-model={currentValueRef.value}>
            {options.map((op) => (
              <option value={op.value}>{op.label}</option>
            ))}
          </select>
        </FormItem>
      }
    },
  }),
)

export default selectionsComponent
