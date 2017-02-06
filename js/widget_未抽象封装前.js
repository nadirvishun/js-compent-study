define(['jquery'], function($) {
    function Widget() {
        this.handlers = {};
    }
    Widget.prototype = {
        //自定义事件绑定
        on: function(type, handler) {
            if (typeof this.handlers[type] == 'undefined') {
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this; //连缀
        },
        //自定义事件执行
        fire: function(type, data) {
            if (this.handlers[type] instanceof Array) {
                var handlers = this.handlers[type];
                for (var i = 0, len = handlers.length; i < len; i++) {
                    handlers[i](data);
                }
            }
        },
        //自定义事件解绑
        off: function(type) {
            if (typeof this.handlers[type] != 'undefined') {
                this.handlers[type] = [];
            }
            return this; //连缀
        }
    }
    return { Widget: Widget }
})