/*
 * @Author: your name
 * @Date: 2021-01-06 09:32:45
 * @LastEditTime: 2021-01-18 14:21:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-component\vue3-json-schema-form\lib\types.ts
 */
import { PropType, defineComponent, DefineComponent } from 'vue'
import { ErrorSchema } from './validator'
export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean',
}

type SchemaRef = { $ref: string }

// type Schema = any
export interface Schema {
  type?: SchemaTypes | string
  const?: any
  format?: string

  title?: string
  default?: any

  properties?: {
    [key: string]: Schema
  }
  items?: Schema | Schema[] | SchemaRef
  uniqueItems?: any
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef
  }
  oneOf?: Schema[]
  anyOf?: Schema[]
  allOf?: Schema[]
  // TODO: uiSchema
  // vjsf?: VueJsonSchemaConfig
  required?: string[]
  enum?: any[]
  enumNames?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  additionalItems?: Schema

  minLength?: number
  maxLength?: number
  minimun?: number
  maximum?: number
  multipleOf?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
}

export const propValueDefine = {
  errorSchema: {
    type: Object as PropType<ErrorSchema>,
    default: {},
  },
  rootSchema: {
    type: Object as PropType<Schema>,
    required: true,
  },
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
} as const

export declare const props: {
  value: any
  onChange: (v: any) => void
  schema: Schema
  rootSchema: Schema
}
export interface PropsDefine {
  value: any
  onChange: (v: any) => void
  schema: Schema
  rootSchema: Schema
}
const TypeHelperComponent = defineComponent({
  props: propValueDefine,
})
export type CommonFieldType = typeof TypeHelperComponent
export interface OptionsDefine {
  [key: string]: any
}

export interface OptionsDefineT {
  label: string
  value: any
}

export const CommonWidgetPropsDefine = {
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  error: {
    type: Array as PropType<string[]>,
  },
  schema: {
    type: Object as PropType<OptionsDefine>,
    required: true,
  },
} as const
export const SelectionWidgetPropsDefine = {
  ...CommonWidgetPropsDefine,
  options: {
    type: Array as PropType<OptionsDefine[]>,
    required: true,
  },
} as const
export type ComonWidgetDefine = DefineComponent<
  typeof CommonWidgetPropsDefine,
  {},
  {}
>
export type SelectionComonWidgetDefine = DefineComponent<
  typeof SelectionWidgetPropsDefine,
  {},
  {}
>
export type AllComponentDefine = ComonWidgetDefine
export enum SelectionWidgetNames {
  SelectionsWidget = 'SelectionWidget',
}

export enum CommonWidgetNames {
  TextWidget = 'TextWidget',
  NumberWidget = 'NumberWidget',
}
export interface Theme {
  widgets: {
    [SelectionWidgetNames.SelectionsWidget]: SelectionComonWidgetDefine
    [CommonWidgetNames.TextWidget]: ComonWidgetDefine
    [CommonWidgetNames.NumberWidget]: ComonWidgetDefine
  }
}
