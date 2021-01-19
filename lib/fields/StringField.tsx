import { defineComponent } from 'vue'
import { propValueDefine, CommonWidgetNames } from '../types'
import { getWidget } from '../theme'
export default defineComponent({
  name: 'StringField',
  props: propValueDefine,
  setup(props) {
    const handleChange = (v: string) => {
      props.onChange(v)
    }
    const TextWidgetRef = getWidget(CommonWidgetNames.TextWidget)
    return () => {
      const TextWidget = TextWidgetRef.value
      const { rootSchema, errorSchema, ...rest } = props
      return (
        <TextWidget
          {...rest}
          onChange={handleChange}
          error={errorSchema.__errors}
        ></TextWidget>
      )
    }
  },
})
