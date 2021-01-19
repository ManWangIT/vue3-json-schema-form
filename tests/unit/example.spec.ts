/*
 * @Author: your name
 * @Date: 2020-12-30 17:10:22
 * @LastEditTime: 2021-01-12 16:05:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-component\vue3-json-schema-form\tests\unit\example.spec.ts
 */
import { mount } from '@vue/test-utils'
import NumberField from '../../lib/fields/NumberField'
import JsonSchema from '../../lib'

describe('HelloWorld.vue', () => {
  it('测试一个form表单是否正确渲染', async () => {
    let value = ''
    const wrapper = mount(JsonSchema as any, {
      props: {
        schema: {
          type: 'number',
        },
        value: value,
        onChange: (v: any) => {
          value = v
        },
      },
    })
    const numberFiled = wrapper.findComponent(NumberField)

    expect(numberFiled.exists()).toBeTruthy()

    const input = numberFiled.find('input')
    input.element.value = '21312'
    input.trigger('input')
    expect(value).toEqual(21312)
    // await numberFiled.props('onChange')('王帅')

    // expect(value).toEqual('王帅1')
  })
})
