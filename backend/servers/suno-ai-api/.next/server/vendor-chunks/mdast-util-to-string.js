"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/mdast-util-to-string";
exports.ids = ["vendor-chunks/mdast-util-to-string"];
exports.modules = {

/***/ "(rsc)/./node_modules/mdast-util-to-string/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/mdast-util-to-string/lib/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   toString: () => (/* binding */ toString)\n/* harmony export */ });\n/**\n * @typedef {import('mdast').Nodes} Nodes\n *\n * @typedef Options\n *   Configuration (optional).\n * @property {boolean | null | undefined} [includeImageAlt=true]\n *   Whether to use `alt` for `image`s (default: `true`).\n * @property {boolean | null | undefined} [includeHtml=true]\n *   Whether to use `value` of HTML (default: `true`).\n */\n\n/** @type {Options} */\nconst emptyOptions = {}\n\n/**\n * Get the text content of a node or list of nodes.\n *\n * Prefers the node’s plain-text fields, otherwise serializes its children,\n * and if the given value is an array, serialize the nodes in it.\n *\n * @param {unknown} [value]\n *   Thing to serialize, typically `Node`.\n * @param {Options | null | undefined} [options]\n *   Configuration (optional).\n * @returns {string}\n *   Serialized `value`.\n */\nfunction toString(value, options) {\n  const settings = options || emptyOptions\n  const includeImageAlt =\n    typeof settings.includeImageAlt === 'boolean'\n      ? settings.includeImageAlt\n      : true\n  const includeHtml =\n    typeof settings.includeHtml === 'boolean' ? settings.includeHtml : true\n\n  return one(value, includeImageAlt, includeHtml)\n}\n\n/**\n * One node or several nodes.\n *\n * @param {unknown} value\n *   Thing to serialize.\n * @param {boolean} includeImageAlt\n *   Include image `alt`s.\n * @param {boolean} includeHtml\n *   Include HTML.\n * @returns {string}\n *   Serialized node.\n */\nfunction one(value, includeImageAlt, includeHtml) {\n  if (node(value)) {\n    if ('value' in value) {\n      return value.type === 'html' && !includeHtml ? '' : value.value\n    }\n\n    if (includeImageAlt && 'alt' in value && value.alt) {\n      return value.alt\n    }\n\n    if ('children' in value) {\n      return all(value.children, includeImageAlt, includeHtml)\n    }\n  }\n\n  if (Array.isArray(value)) {\n    return all(value, includeImageAlt, includeHtml)\n  }\n\n  return ''\n}\n\n/**\n * Serialize a list of nodes.\n *\n * @param {Array<unknown>} values\n *   Thing to serialize.\n * @param {boolean} includeImageAlt\n *   Include image `alt`s.\n * @param {boolean} includeHtml\n *   Include HTML.\n * @returns {string}\n *   Serialized nodes.\n */\nfunction all(values, includeImageAlt, includeHtml) {\n  /** @type {Array<string>} */\n  const result = []\n  let index = -1\n\n  while (++index < values.length) {\n    result[index] = one(values[index], includeImageAlt, includeHtml)\n  }\n\n  return result.join('')\n}\n\n/**\n * Check if `value` looks like a node.\n *\n * @param {unknown} value\n *   Thing.\n * @returns {value is Nodes}\n *   Whether `value` is a node.\n */\nfunction node(value) {\n  return Boolean(value && typeof value === 'object')\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC10by1zdHJpbmcvbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBLGFBQWEsdUJBQXVCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLGNBQWMsNEJBQTRCO0FBQzFDO0FBQ0EsY0FBYyw0QkFBNEI7QUFDMUM7QUFDQTs7QUFFQSxXQUFXLFNBQVM7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsV0FBVyw0QkFBNEI7QUFDdkM7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZUFBZTtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3Vuby1hcGkvLi9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC10by1zdHJpbmcvbGliL2luZGV4LmpzP2RhNWUiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdCcpLk5vZGVzfSBOb2Rlc1xuICpcbiAqIEB0eXBlZGVmIE9wdGlvbnNcbiAqICAgQ29uZmlndXJhdGlvbiAob3B0aW9uYWwpLlxuICogQHByb3BlcnR5IHtib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZH0gW2luY2x1ZGVJbWFnZUFsdD10cnVlXVxuICogICBXaGV0aGVyIHRvIHVzZSBgYWx0YCBmb3IgYGltYWdlYHMgKGRlZmF1bHQ6IGB0cnVlYCkuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkfSBbaW5jbHVkZUh0bWw9dHJ1ZV1cbiAqICAgV2hldGhlciB0byB1c2UgYHZhbHVlYCBvZiBIVE1MIChkZWZhdWx0OiBgdHJ1ZWApLlxuICovXG5cbi8qKiBAdHlwZSB7T3B0aW9uc30gKi9cbmNvbnN0IGVtcHR5T3B0aW9ucyA9IHt9XG5cbi8qKlxuICogR2V0IHRoZSB0ZXh0IGNvbnRlbnQgb2YgYSBub2RlIG9yIGxpc3Qgb2Ygbm9kZXMuXG4gKlxuICogUHJlZmVycyB0aGUgbm9kZeKAmXMgcGxhaW4tdGV4dCBmaWVsZHMsIG90aGVyd2lzZSBzZXJpYWxpemVzIGl0cyBjaGlsZHJlbixcbiAqIGFuZCBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gYXJyYXksIHNlcmlhbGl6ZSB0aGUgbm9kZXMgaW4gaXQuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBbdmFsdWVdXG4gKiAgIFRoaW5nIHRvIHNlcmlhbGl6ZSwgdHlwaWNhbGx5IGBOb2RlYC5cbiAqIEBwYXJhbSB7T3B0aW9ucyB8IG51bGwgfCB1bmRlZmluZWR9IFtvcHRpb25zXVxuICogICBDb25maWd1cmF0aW9uIChvcHRpb25hbCkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogICBTZXJpYWxpemVkIGB2YWx1ZWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSwgb3B0aW9ucykge1xuICBjb25zdCBzZXR0aW5ncyA9IG9wdGlvbnMgfHwgZW1wdHlPcHRpb25zXG4gIGNvbnN0IGluY2x1ZGVJbWFnZUFsdCA9XG4gICAgdHlwZW9mIHNldHRpbmdzLmluY2x1ZGVJbWFnZUFsdCA9PT0gJ2Jvb2xlYW4nXG4gICAgICA/IHNldHRpbmdzLmluY2x1ZGVJbWFnZUFsdFxuICAgICAgOiB0cnVlXG4gIGNvbnN0IGluY2x1ZGVIdG1sID1cbiAgICB0eXBlb2Ygc2V0dGluZ3MuaW5jbHVkZUh0bWwgPT09ICdib29sZWFuJyA/IHNldHRpbmdzLmluY2x1ZGVIdG1sIDogdHJ1ZVxuXG4gIHJldHVybiBvbmUodmFsdWUsIGluY2x1ZGVJbWFnZUFsdCwgaW5jbHVkZUh0bWwpXG59XG5cbi8qKlxuICogT25lIG5vZGUgb3Igc2V2ZXJhbCBub2Rlcy5cbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IHZhbHVlXG4gKiAgIFRoaW5nIHRvIHNlcmlhbGl6ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZUltYWdlQWx0XG4gKiAgIEluY2x1ZGUgaW1hZ2UgYGFsdGBzLlxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlSHRtbFxuICogICBJbmNsdWRlIEhUTUwuXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogICBTZXJpYWxpemVkIG5vZGUuXG4gKi9cbmZ1bmN0aW9uIG9uZSh2YWx1ZSwgaW5jbHVkZUltYWdlQWx0LCBpbmNsdWRlSHRtbCkge1xuICBpZiAobm9kZSh2YWx1ZSkpIHtcbiAgICBpZiAoJ3ZhbHVlJyBpbiB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnR5cGUgPT09ICdodG1sJyAmJiAhaW5jbHVkZUh0bWwgPyAnJyA6IHZhbHVlLnZhbHVlXG4gICAgfVxuXG4gICAgaWYgKGluY2x1ZGVJbWFnZUFsdCAmJiAnYWx0JyBpbiB2YWx1ZSAmJiB2YWx1ZS5hbHQpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5hbHRcbiAgICB9XG5cbiAgICBpZiAoJ2NoaWxkcmVuJyBpbiB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGFsbCh2YWx1ZS5jaGlsZHJlbiwgaW5jbHVkZUltYWdlQWx0LCBpbmNsdWRlSHRtbClcbiAgICB9XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gYWxsKHZhbHVlLCBpbmNsdWRlSW1hZ2VBbHQsIGluY2x1ZGVIdG1sKVxuICB9XG5cbiAgcmV0dXJuICcnXG59XG5cbi8qKlxuICogU2VyaWFsaXplIGEgbGlzdCBvZiBub2Rlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PHVua25vd24+fSB2YWx1ZXNcbiAqICAgVGhpbmcgdG8gc2VyaWFsaXplLlxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlSW1hZ2VBbHRcbiAqICAgSW5jbHVkZSBpbWFnZSBgYWx0YHMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVIdG1sXG4gKiAgIEluY2x1ZGUgSFRNTC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiAgIFNlcmlhbGl6ZWQgbm9kZXMuXG4gKi9cbmZ1bmN0aW9uIGFsbCh2YWx1ZXMsIGluY2x1ZGVJbWFnZUFsdCwgaW5jbHVkZUh0bWwpIHtcbiAgLyoqIEB0eXBlIHtBcnJheTxzdHJpbmc+fSAqL1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBsZXQgaW5kZXggPSAtMVxuXG4gIHdoaWxlICgrK2luZGV4IDwgdmFsdWVzLmxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBvbmUodmFsdWVzW2luZGV4XSwgaW5jbHVkZUltYWdlQWx0LCBpbmNsdWRlSHRtbClcbiAgfVxuXG4gIHJldHVybiByZXN1bHQuam9pbignJylcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBgdmFsdWVgIGxvb2tzIGxpa2UgYSBub2RlLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gdmFsdWVcbiAqICAgVGhpbmcuXG4gKiBAcmV0dXJucyB7dmFsdWUgaXMgTm9kZXN9XG4gKiAgIFdoZXRoZXIgYHZhbHVlYCBpcyBhIG5vZGUuXG4gKi9cbmZ1bmN0aW9uIG5vZGUodmFsdWUpIHtcbiAgcmV0dXJuIEJvb2xlYW4odmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jylcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/mdast-util-to-string/lib/index.js\n");

/***/ })

};
;