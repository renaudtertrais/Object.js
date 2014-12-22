(function() {

    var extend = function(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    out[key] = arguments[i][key];
            }
        }

        return out;
    };


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
