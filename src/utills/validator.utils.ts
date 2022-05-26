/*
 *
 *  Creates a validation config for multiple validators
 *  
 *  thier are three ways to put a config for requried validation 
 *  [  "pattern",                                                   for this you to pass like { pattern: "" }
 *    { name: "pattern", options: { pattern: "/{(/\)}/g" } },       for this you to pass like { pattern: "/{(/\)}/g" }
 *    { name: "pattern", options: { min: 1, max: 2  } }             for this you to pass like { pattern: { min: 1, max: 2 } }
 *  ]  
 * 
 *  for multiple validations pass in the config
 *  e.g
 *   [Parameter] config = {
 *                  pattern: "/{(/\)}/g",
 *                  length: { min: 3, max: 255 },
 *                  isNotEmpty: "",
 *                  .....
 *              }
 * 
*/

export function handleValidationObject(config) {
  if (!Object.keys(config).length) {
    return []
  }
  let validators = [];
  for (let v in config) {
    let obj = {} as any;
    if (!config[v]) {
      validators.push(v);
    } else {
      obj.name = v;
      if (typeof config[v] !== 'object') {
        obj.options = {
          [v]: config[v]
        }
      } else {
        obj.options = config[v]
      }
      validators.push(obj);
    }
  }
  return validators;
}