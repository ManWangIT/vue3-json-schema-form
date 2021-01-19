import { defineComponent, ref, Ref } from 'vue'
import { createUseStyles } from 'vue-jss'
import MonacoEditor from '@/components/MonacoEditor' //!依赖包  npm install --save jss jss-preset-default

function toJson(data: unknown) {
  return JSON.stringify(data, null, 2)
}
const schema = {
  type: 'string',
}
const useStyles = createUseStyles({
  editor: {
    minHeight: 400,
    width: '100%',
  },
})
export default defineComponent({
  setup() {
    const schemaRef: Ref<unknown> = ref(schema)
    const handleCodeChange = (code: string) => {
      let schemas: unknown
      try {
        schemas = JSON.parse(code)
      } catch (err) {
        console.log(err)
      }
      schemaRef.value = schemas
    }
    const classRef = useStyles()

    return () => {
      const code = toJson(schemaRef.value)
      const classes = classRef.value
      return (
        <div>
          <MonacoEditor
            class={classes.editor}
            code={code}
            onChange={handleCodeChange}
            title="Schema"
          ></MonacoEditor>
        </div>
      )
    }
  },
})
