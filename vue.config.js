/*
 * @Author: your name
 * @Date: 2021-01-06 14:45:10
 * @LastEditTime: 2021-01-19 15:27:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-component\vue3-json-schema-form\vue.config.js
 */
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

const TYPE = process.env.TYPE === 'lib' ? true : false
module.exports = {
  chainWebpack(config) {
    if (!TYPE) {
      config.plugin('monaco').use(new MonacoWebpackPlugin())
    }

    config.plugin('circular').use(new CircularDependencyPlugin())
  },
}
