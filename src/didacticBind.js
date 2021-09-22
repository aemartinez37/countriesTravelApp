export function didacticBind(fn, obj) {
  return function () {

    //Using apply: array of arguments
    return fn.apply(obj, arguments);

    //Using call: arguments separated by comma
    /* return fn.call(obj, ...arguments); */
  };
}
