/*
 * @Author: your name
 * @Date: 2021-01-05 15:45:35
 * @LastEditTime: 2021-01-18 13:47:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-component\vue3-json-schema-form\src\demos\simple.ts
 */
export default {
  name: 'Simple',
  schema: {
    description: 'A simple form example.',
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      firstName: {
        type: 'string',
        default: 'Chuck',
        title: '贤者',
        minLength: 12,
      },
      lastName: {
        type: 'string',
        title: '后者',
        minLength: 9,
      },
      telephone: {
        type: 'number',
        minLength: 11,
        title: '手机号',
      },
      staticArray: {
        type: 'array',
        items: [
          { type: 'string', title: '革命' },
          { type: 'number', title: '电话' },
        ],
      },
      staticArray1: {
        type: 'array',
        items: { type: 'string', title: '幸福知数' },
      },
      selectArray: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['数学', '语文', '英语', '地理'],
          title: '科目',
        },
      },
    },
  },
  uiSchema: {
    title: 'A registration form',
    properties: {
      firstName: {
        title: 'First name',
      },
      lastName: {
        title: 'Last name',
      },
      telephone: {
        title: 'Telephone',
      },
    },
  },
  default: {
    firstName: 'Chuck',
    lastName: 'Norris',
    age: 75,
    bio: 'Roundhouse kicking asses since 1940',
    password: 'noneed',
    staticArray1: ['jonke'],
  },
}
