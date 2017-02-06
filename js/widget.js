define(['jquery'], function($) {
    function Widget() {
        // this.handlers = {};
        this.boundingBox = null; //最外城容器
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
        },
        renderUI: function() {}, //接口：添加dom节点
        bindUI: function() {}, //接口：监听事件
        syncUI: function() {}, //接口：初始化组件属性
        render: function(container) { //方法：渲染组件
            this.renderUI();
            this.handlers = {};
            this.bindUI();
            this.syncUI();
            $(container || document.body).append(this.boundingBox);
        },
        destructor: function() {}, //接口：销毁前的处理
        destroy: function() { //方法：销毁组件
            this.destructor();
            this.boundingBox.off();
            this.boundingBox.remove();
        }
    }
    return { Widget: Widget }
})