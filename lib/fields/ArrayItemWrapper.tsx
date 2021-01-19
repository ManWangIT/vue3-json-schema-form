import { defineComponent, PropType } from 'vue'
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  box: {
    border: '1px solid blue',
    marginBottom: '15px',
  },
  container: {
    padding: '10px 20px',
    backgroundColor: '#ccc',
    textAlign: 'right',
  },
  buttons: {
    '& + &': {
      marginLeft: '10px',
    },
  },
})
export default defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    index: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classesRef = useStyles()

    return () => {
      const { onAdd, onDown, onDelete, onUp, index } = props
      const classes = classesRef.value
      return (
        <div class={classes.box}>
          <div class={classes.container}>
            <button class={classes.buttons} onClick={(e: any) => onAdd(index)}>
              新增
            </button>
            <button
              class={classes.buttons}
              onClick={(e: any) => onDelete(index)}
            >
              删除
            </button>
            <button class={classes.buttons} onClick={(e: any) => onUp(index)}>
              上移
            </button>
            <button class={classes.buttons} onClick={(e: any) => onDown(index)}>
              下移
            </button>
          </div>
          <div>{slots.default && slots.default()}</div>
        </div>
      )
    }
  },
})
