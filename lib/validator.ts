/*
 * @Author: your name
 * @Date: 2021-01-15 15:10:46
 * @LastEditTime: 2021-01-18 11:51:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-component\vue3-json-schema-form\lib\validator.ts
 */
const i18n = require('ajv-i18n')
import Ajv, { ErrorObject } from 'ajv'
import toPath from 'lodash.topath'


import { Schema } from './types'
interface TransformedErrorObject {
  name: string
  message: string | undefined
  dataPath: string
  params: Record<string, any>
  schemaPath: string
}
interface ErrorSchemaObject {
  [level: string]: ErrorSchema
}
export type ErrorSchema = ErrorSchemaObject & { __errors?: string[] }
function toErrorSchema(errors: TransformedErrorObject[]) {
  if (errors.length < 1) return {}
  
  return errors.reduce((errorSchema, error) => {
    const { dataPath, message } = error
    const path = toPath(dataPath)
    let parent = errorSchema
    if (path.length > 0 && path[0] === '') {
      path.splice(0, 1)
    }
    for (const segment of path.slice(0)) {
      if (!(segment in parent)) {
        ;(parent as any)[segment] = {}
      }
      parent = parent[segment]
    }
    if (Array.isArray(parent.__errors)) {
      parent.__errors = parent.__errors.concat(message || '')
    } else {
      if (message) {
        parent.__errors = [message]
      }
    }
    return errorSchema
  }, {} as ErrorSchema)
}

function transformErrors(errors: ErrorObject[] | null | undefined) {
  if (errors == null || errors == undefined) return []

  return errors.map(({ message, dataPath, keyword, params, schemaPath }) => {
    return {
      name: keyword,
      message,
      dataPath,
      params,
      schemaPath,
    }
  })
}

export function validateFormData(
  validator: Ajv,
  formData: any,
  schema: Schema,
  locale: string = 'zh',
) {
  let validationError = null
  try {
    validator.validate(schema, formData)
  } catch (err) {
    validationError = err
  }

  i18n[locale](validator.errors)

  let errors = transformErrors(validator.errors)

  if (validationError) {
    errors = [
      ...errors,
      {
        message: validationError.message,
      } as TransformedErrorObject,
    ]
  }

  const errorSchema = toErrorSchema(errors)
  return {
    errors,
    errorSchema,
    valid: errors.length === 0,
  }
}
