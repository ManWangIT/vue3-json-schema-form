/*
 * @Author: your name
 * @Date: 2021-01-07 16:17:12
 * @LastEditTime: 2021-01-12 16:53:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-component\vue3-json-schema-form\lib\context.ts
 */
import { inject } from 'vue'
import { CommonFieldType, Theme } from './types'
export const SchemaFormContextKey = Symbol()

export function useVJSFContext() {
  const context: { SchemaItem: CommonFieldType } | undefined = inject(
    SchemaFormContextKey,
  )
  if (!context) {
    throw new Error('SchemaItem should be used')
  }
  return context
}
