import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine, ComonWidgetDefine } from '../types'
import { withWrapFormItem } from './FormItem'
const NumberWidgetComponent: ComonWidgetDefine = withWrapFormItem(
  defineComponent({
    name: 'NumberField',
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const Value = e.target.value ? Number(e.target.value) : ''
        if (Number.isNaN(Value)) {
          props.onChange(undefined)
        } else {
          props.onChange(Value)
        }
      }
      return () => {
        const value = props.value as any

        return <input type="number" value={value} onInput={handleChange} />
      }
    },
  }),
)

export default NumberWidgetComponent
