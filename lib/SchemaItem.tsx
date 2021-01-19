import { computed, defineComponent, PropType } from 'vue'
import { Schema, SchemaTypes, propValueDefine } from './types'
import StringField from './fields/StringField'
import NumberField from './fields/NumberField'
import ObjectField from './fields/ObjectField'
import ArrayField from './fields/ArrayField'
import { retrieveSchema } from './utils'

export default defineComponent({
  name: 'SchemaItem',
  props: propValueDefine,
  setup(props) {
    const retrieveSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props
      return retrieveSchema(schema, rootSchema, value)
    })
    return () => {
      const { schema } = props
      const retrieveSchema = retrieveSchemaRef.value
      const type = schema.type
      let Component: any

      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }
        case SchemaTypes.OBJECT: {
          Component = ObjectField
          break
        }
        case SchemaTypes.ARRAY: {
          Component = ArrayField
          break
        }
        default: {
          console.warn(`${type} is not supported`)
        }
      }

      return <Component {...props} schema={retrieveSchema}></Component>
    }
  },
})
