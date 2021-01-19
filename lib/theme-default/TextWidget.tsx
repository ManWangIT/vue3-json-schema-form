import { defineComponent, nextTick, watchEffect } from 'vue'
import { CommonWidgetPropsDefine, ComonWidgetDefine } from '../types'
import { withWrapFormItem } from './FormItem'
const TextWidgetComponent: ComonWidgetDefine = withWrapFormItem(
  defineComponent({
    name: 'StringField',
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleInput = (e: any) => {
        const value = e.target.value
        e.target.value = props.value
        props.onChange(value)
      }
      watchEffect(() => {
        console.log(props.error)
      })
      return () => {
        const value = props.value as any

        return <input type="text" value={value} onInput={handleInput} />
      }
    },
  }),
)

export default TextWidgetComponent
