import { defineComponent, watchEffect } from 'vue'
import { CommonWidgetPropsDefine, AllComponentDefine } from '../types'
import { createUseStyles } from 'vue-jss'
const cssStyles = createUseStyles({
  'form-item': {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    margin: '10px 0',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginBottom: '10px',
  },
})
export const FormItem = defineComponent({
  name: 'FormItem',
  props: CommonWidgetPropsDefine,
  setup(props, { slots }) {
    watchEffect(() => {
      console.log(props, 11111)
    })
    const classStyleRef = cssStyles()
    return () => {
      const style = classStyleRef.value
      const { schema, error } = props
      return (
        <div>
          <div class={style['form-item']}>
            <label class={style.label}>{schema.title}：</label>
            <div>{slots.default && slots.default()}</div>
          </div>

          <div class={style.error}>{error?.length && error[0]}</div>
        </div>
      )
    }
  },
})

export const withWrapFormItem = (Widget: any) => {
  return defineComponent({
    name: `Wrapped${Widget.name}`,
    props: CommonWidgetPropsDefine,
    setup(props, { attrs }) {
      return () => {
        return (
          <FormItem {...props}>
            <Widget {...props} {...attrs}></Widget>
          </FormItem>
        )
      }
    },
  }) as any
}
