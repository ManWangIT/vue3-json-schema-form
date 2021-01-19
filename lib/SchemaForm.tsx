import { Schema, Theme } from './types'
import {
  defineComponent,
  PropType,
  provide,
  Ref,
  shallowRef,
  watch,
  watchEffect,
} from 'vue'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'
import Ajv, { Options } from 'ajv'
import { validateFormData, ErrorSchema } from './validator'

const defaultAjvOptions: Options = {
  allErrors: true,
}

interface ContextRef {
  doValidate: () => {
    errors: any[]
    valid: boolean
  }
}
export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: unknown) => void>,
      required: true,
    },
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>,
    },
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    locale: {
      type: String as PropType<string>,
    },
  },
  setup(props, { slots, emit, attrs }) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }
    const context = {
      SchemaItem,
    }
    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({})
    const validatorRef: Ref<Ajv> = shallowRef() as any
    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      })
    })
    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              const valid = validatorRef.value.validate(
                props.schema,
                props.value,
              ) as boolean
              const result = validateFormData(
                validatorRef.value,
                props.value,
                props.schema,
                props.locale,
              )
              errorSchemaRef.value = result.errorSchema
              return result
            },
          }
        }
      },
      {
        immediate: true,
      },
    )
    provide(SchemaFormContextKey, context)
    return () => {
      const { schema, value } = props
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
          errorSchema={errorSchemaRef.value}
        ></SchemaItem>
      )
    }
  },
})
