import { defineComponent, ref } from 'vue'
import ArrayItemWrapper from './ArrayItemWrapper'
import { propValueDefine, Schema, SelectionWidgetNames } from '../types'
import { useVJSFContext } from '../context'
import { helperWrap } from './helperWrapper'
import { getWidget } from '../theme'
export default defineComponent({
  name: 'ArrayField',
  props: propValueDefine,
  setup(props) {
    const context = useVJSFContext()
    const handleMultiTypeChange = (v: any, index: number) => {
      const { value } = props
      const arrValue = Array.isArray(value) ? value : []
      arrValue[index] = v
      props.onChange(arrValue)
    }
    const { handleAdd, handleDelete, handleUp, handleDown } = helperWrap(props)
    const SelectionWidgetRef = getWidget(SelectionWidgetNames.SelectionsWidget)
    return () => {
      const { schema, rootSchema, value, errorSchema } = props
      const SelectionWidget = SelectionWidgetRef.value
      const SchemaItem = context.SchemaItem
      const isMultiType = Array.isArray(schema.items)
      const isSelect = schema.items && (schema.items as any).enum

      if (isMultiType) {
        /**
         * 数组格式  items:[{type:string},{type:number}]
         */
        const arrValue = Array.isArray(value) ? value : []
        const items: Schema[] = schema.items as any
        return items.map((s: Schema, index: number) => (
          <SchemaItem
            schema={s}
            key={index}
            rootSchema={rootSchema}
            value={arrValue[index]}
            onChange={(v: any) => handleMultiTypeChange(v, index)}
            errorSchema={errorSchema[index]}
          ></SchemaItem>
        ))
      } else if (!isSelect) {
        const arrValue = Array.isArray(value) ? value : []
        return arrValue.map((val: Schema, index: number) => (
          <ArrayItemWrapper
            onAdd={handleAdd}
            onDelete={handleDelete}
            onDown={handleDown}
            onUp={handleUp}
            index={index}
          >
            <SchemaItem
              schema={schema.items as Schema}
              rootSchema={rootSchema}
              key={index}
              value={val}
              onChange={(v: any) => handleMultiTypeChange(v, index)}
              errorSchema={errorSchema[index]}
            ></SchemaItem>{' '}
          </ArrayItemWrapper>
        ))
      } else {
        const enumOptions = (schema.items as any).enum
        const selectOptions = enumOptions.map((e: string) => ({
          label: e,
          value: e,
        }))
        return (
          <SelectionWidget
            onChange={props.onChange}
            schema={schema}
            options={selectOptions}
            value={value}
            error={errorSchema.__errors}
          ></SelectionWidget>
        )
      }
    }
  },
})
