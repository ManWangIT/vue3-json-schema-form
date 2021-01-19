import { defineComponent } from 'vue'

const ProsType = {
  msg: String,
  age: {
    type: Number,
    required: true,
  },
} as const

export default defineComponent({
  props: ProsType,
  setup(props) {
    return () => {
      return <div>{props.age}</div>
    }
  },
})
