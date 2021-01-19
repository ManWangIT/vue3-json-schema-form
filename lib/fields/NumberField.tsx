import { defineComponent, watch } from 'vue'
import { propValueDefine, CommonWidgetNames } from '../types'
import { getWidget } from '../theme'
export default defineComponent({
  name: 'NumberField',
  props: propValueDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const Value = e.target.value ? Number(e.target.value) : ''
      if (Number.isNaN(Value)) {
        props.onChange(undefined)
      } else {
        props.onChange(Value)
      }
    }
    const NumberWidgetRef = getWidget(CommonWidgetNames.NumberWidget)
    return () => {
      const { rootSchema, errorSchema, ...rest } = props
      const NumberWidget = NumberWidgetRef.value
      return (
        <NumberWidget {...rest} error={errorSchema.__errors}></NumberWidget>
      )
    }
  },
})
