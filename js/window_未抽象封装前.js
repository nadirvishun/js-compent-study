define(['jquery', 'widget', 'jqueryUI'], function($, widget, $UI) {
    function Window() {
        //参数配置
        this.cfg = {
            width: 500, //默认宽度
            height: 300, //默认高度
            title: "系统消息", //默认标题
            content: '', //默认消息内容
            hasCloseBtn: false, //是否有关闭按钮
            hasMask: true, //是否模态
            isDraggable: true, //是否可以拖动
            dragHandle: null, //拖动位置配置
            skinClassName: null, //默认皮肤
            text4AlertBtn: "确定", //默认按钮文字
            handler4AlertBtn: null, //点击确认按钮触发的事件
            handler4CloseBtn: null, //点击关闭按钮触发的事件
        };
        //自定义事件,方便可以实现绑定多个方法
        this.handlers = {};
    }
    /*原生js继承的一种方法
    Window.prototype = Object.create(widget.Widget.prototype); //继承
    Window.prototype.alert = function(cfg) {
        var CFG = $.extend(this.cfg, cfg);
        //模态
        var mask = null;
        var that = this;
        if (CFG.hasMask) {
            mask = $('<div class="window_mask"></div>');
            mask.appendTo('body');
        }
        //主框体
        var boundingBox = $("<div class='window_boundingBox'>" +
            "<div class='window_header'>" + CFG.title + "</div>" +
            "<div class='window_body'>" + CFG.content + "</div>" +
            "<div class='window_footer'>" +
            "<input type='button' value='" + CFG.text4AlertBtn + "' class='window_alertBtn'>" +
            "</div>" +
            "</div>");
        boundingBox.appendTo('body');
        //确认按钮
        var btn = boundingBox.find(".window_alertBtn");
        btn.on('click', function() {
            // CFG.handler4AlertBtn && CFG.handler4AlertBtn();
            boundingBox.remove();
            mask && mask.remove();
            that.fire('alert');
        });
        //宽高位置参数
        boundingBox.css({
            width: CFG.width + "px",
            height: CFG.height + "px",
            left: (CFG.x || (window.innerWidth - CFG.width) / 2) + "px",
            top: (CFG.y || (window.innerHeight - CFG.height) / 2) + "px",
        });
        //关闭按钮
        if (CFG.hasCloseBtn) {
            var closeBtn = $('<span class="window_closeBtn">X</span>');
            closeBtn.appendTo(boundingBox);
            closeBtn.on('click', function() {
                // CFG.handler4CloseBtn && CFG.handler4CloseBtn();
                boundingBox.remove();
                mask && mask.remove();
                that.fire('close');
            })
        }
        //自定义事件绑定(确认按钮和关闭按钮)
        if (CFG.handler4AlertBtn) {
            this.on('alert', CFG.handler4AlertBtn);
        }
        if (CFG.handler4CloseBtn) {
            this.on('close', CFG.handler4CloseBtn);
        }
        //皮肤切换
        if (CFG.skinClassName) {
            boundingBox.addClass(CFG.skinClassName);
        }
        //拖动
        if (CFG.isDraggable) {
            if (CFG.dragHandle) {
                boundingBox.draggable({
                    handle: CFG.dragHandle,
                    containment: "window"
                });
            } else {
                boundingBox.draggable({
                    containment: "window"
                });
            }
        }
        return this; //连缀
    };
    */
    //通过jquery中的$.extend来继承widget中的方法
    Window.prototype = $.extend({}, new widget.Widget(), {
        //alert弹出框
        alert: function(cfg) {
            var CFG = $.extend(this.cfg, cfg);
            //模态
            var mask = null;
            var that = this;
            if (CFG.hasMask) {
                mask = $('<div class="window_mask"></div>');
                mask.appendTo('body');
            }
            //主框体
            var boundingBox = $("<div class='window_boundingBox'>" +
                "<div class='window_header'>" + CFG.title + "</div>" +
                "<div class='window_body'>" + CFG.content + "</div>" +
                "<div class='window_footer'>" +
                "<input type='button' value='" + CFG.text4AlertBtn + "' class='window_alertBtn'>" +
                "</div>" +
                "</div>");
            boundingBox.appendTo('body');
            //确认按钮
            var btn = boundingBox.find(".window_alertBtn");
            btn.on('click', function() {
                // CFG.handler4AlertBtn && CFG.handler4AlertBtn();
                boundingBox.remove();
                mask && mask.remove();
                that.fire('alert');
            });
            //宽高位置参数
            boundingBox.css({
                width: CFG.width + "px",
                height: CFG.height + "px",
                left: (CFG.x || (window.innerWidth - CFG.width) / 2) + "px",
                top: (CFG.y || (window.innerHeight - CFG.height) / 2) + "px",
            });
            //关闭按钮
            if (CFG.hasCloseBtn) {
                var closeBtn = $('<span class="window_closeBtn">X</span>');
                closeBtn.appendTo(boundingBox);
                closeBtn.on('click', function() {
                    // CFG.handler4CloseBtn && CFG.handler4CloseBtn();
                    boundingBox.remove();
                    mask && mask.remove();
                    that.fire('close');
                })
            }
            //自定义事件绑定(确认按钮和关闭按钮)
            if (CFG.handler4AlertBtn) {
                this.on('alert', CFG.handler4AlertBtn);
            }
            if (CFG.handler4CloseBtn) {
                this.on('close', CFG.handler4CloseBtn);
            }
            //皮肤切换
            if (CFG.skinClassName) {
                boundingBox.addClass(CFG.skinClassName);
            }
            //拖动
            if (CFG.isDraggable) {
                if (CFG.dragHandle) {
                    boundingBox.draggable({
                        handle: CFG.dragHandle,
                        containment: "window"
                    });
                } else {
                    boundingBox.draggable({
                        containment: "window"
                    });
                }
            }
            return this; //连缀
        },
        //confirm弹出框
        confirm: function() {},
        //prompt弹出框
        prompt: function() {}
    });
    return { Window: Window }
});