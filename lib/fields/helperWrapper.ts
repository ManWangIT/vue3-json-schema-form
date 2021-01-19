/*
 * @Author: your name
 * @Date: 2021-01-09 15:06:41
 * @LastEditTime: 2021-01-09 15:47:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-component\vue3-json-schema-form\lib\fields\helperWrapper.ts
 */
import { PropsDefine } from '../types'

export const helperWrap = (props: PropsDefine) => {
  const { value } = props
  const arrValue = Array.isArray(value) ? value : []
  const handleAdd = (index: number) => {
    arrValue.splice(index + 1, 0, null)
    props.onChange(arrValue)
  }
  const handleDelete = (index: number) => {
    arrValue.splice(index, 1)
    props.onChange(arrValue)
  }
  const handleUp = (index: number) => {
    if (index === 0) return

    const item = arrValue.splice(index, 1) //先删除这一项
    arrValue.splice(index - 1, 0, item[0])
    props.onChange(arrValue)
  }
  const handleDown = (index: number) => {
    if (arrValue.length - 1 === index) return
    const item = arrValue.splice(index, 1) //先删除这一项
    arrValue.splice(index + 1, 0, item[0])
    props.onChange(arrValue)
  }
  return {
    handleAdd,
    handleDelete,
    handleUp,
    handleDown,
  }
}
