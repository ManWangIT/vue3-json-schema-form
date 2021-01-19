/*
 * @Author: your name
 * @Date: 2021-01-04 11:42:02
 * @LastEditTime: 2021-01-04 15:59:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-component\vue3-json-schema-form\schema-tests\test1.js
 */

 //!ajv  一种校验库
 const Ajv = require("ajv").default
const ajv = new Ajv()
require("ajv-keywords")(ajv)
require("ajv-formats")(ajv)
 const schema = {
   type:'object',
   properties:{
     foo:{type:"string",regexp:"/foo/i",format:"test"},
     bar:{type:"string",regexp:{pattern:"bar",flags:"i"}},
     app:{type:"string",format:"email",testq:false}
   },
   required:["app"]
 }
 ajv.addFormat('test',function (data) {
   console.log(data,2222)
   return true
   })
   ajv.addKeyword('testq',{
    //  compile(sch,parentSchema){
    //    console.log(sch,parentSchema)
    //    return()=>true
    //  },
     metaSchema:{
       type:'boolean'
     },
     macro(sch,parentSchema){
        return{
          minLength:18
        }
     }
   })
 const data = {
   foo:"Food",
   bar:"barem",
   app:"app@sssd.com"
 }

 const validate = ajv.compile(schema)
 const valid = validate(data)
 if(!valid)console.log(validate.errors)