(function() {

    // Need extend method of jQuery. If jQuery not loaded, create a jQuery ultra-light version
    if (!window.jQuery) {
        jQuery = {
            extend: function() {
                var options, name, src, copy, copyIsArray, clone,
                    target = arguments[0] || {},
                    i = 1,
                    length = arguments.length,
                    deep = false;

                // Handle a deep copy situation
                if (typeof target === "boolean") {
                    deep = target;

                    // Skip the boolean and the target
                    target = arguments[i] || {};
                    i++;
                }

                // Handle case when target is a string or something (possible in deep copy)
                if (typeof target !== "object" && !jQuery.isFunction(target)) {
                    target = {};
                }

                // Extend jQuery itself if only one argument is passed
                if (i === length) {
                    target = this;
                    i--;
                }

                for (; i < length; i++) {
                    // Only deal with non-null/undefined values
                    if ((options = arguments[i]) != null) {
                        // Extend the base object
                        for (name in options) {
                            src = target[name];
                            copy = options[name];

                            // Prevent never-ending loop
                            if (target === copy) {
                                continue;
                            }

                            // Recurse if we're merging plain objects or arrays
                            if (deep && copy && (jQuery.isPlainObject(copy) ||
                                    (copyIsArray = jQuery.isArray(copy)))) {

                                if (copyIsArray) {
                                    copyIsArray = false;
                                    clone = src && jQuery.isArray(src) ? src : [];

                                } else {
                                    clone = src && jQuery.isPlainObject(src) ? src : {};
                                }

                                // Never move original objects, clone them
                                target[name] = jQuery.extend(deep, clone, copy);

                                // Don't bring in undefined values
                            } else if (copy !== undefined) {
                                target[name] = copy;
                            }
                        }
                    }
                }

                // Return the modified object
                return target;
            },
            isFunction: function(obj) {
                return jQuery.type(obj) === "function";
            },

            isArray: Array.isArray,

            isPlainObject: function(obj) {
                // Not plain objects:
                // - Any object or value whose internal [[Class]] property is not "[object Object]"
                // - DOM nodes
                // - window
                if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                    return false;
                }

                if (obj.constructor &&
                    !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }

                // If the function hasn't returned already, we're confident that
                // |obj| is a plain object, created by {} or constructed with new Object
                return true;
            },

            type: function(obj) {
                if (obj == null) {
                    return obj + "";
                }
                // Support: Android<4.0 (functionish RegExp)
                return typeof obj === "object" || typeof obj === "function" ?
                    class2type[toString.call(obj)] || "object" :
                    typeof obj;
            }
        };
    }

    // extend Object prototype with an attribute and a method
    Object.prototype = jQuery.extend(Object.prototype, {
        Parent: null,
        parent: function() {
            var args = Array.prototype.slice.call(arguments, 0);
            args = args.sort();
            if (this.Parent && args.length) {
                var method = args.shift();
                if (typeof(this.Parent[method]) === 'function') {
                    return this.Parent[method].apply(this, args);
                }
            }
        }
    });

    // add a static method to Object to be able to extend the class
    Object.extend = function(proto) {
        proto = proto || {};
        var child = function() {
            if (typeof(this.constructor) === 'function') {
                this.constructor.apply(this, arguments);
            }
        };
        proto.Parent = this.prototype;
        child.prototype = jQuery.extend({}, this.prototype, proto);
        child.extend = Object.extend;
        return child;
    };

})();
