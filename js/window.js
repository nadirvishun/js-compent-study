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
            //alert相关
            text4AlertBtn: "确定", //alert默认按钮文字
            handler4AlertBtn: null, //alert点击确认按钮触发的事件
            handler4CloseBtn: null, //alert点击关闭按钮触发的事件
            //confirm相关
            text4ConfirmBtn: "确定", //confirm的文字
            text4CancelBtn: "取消", //confirm的文字
            handler4ConfirmBtn: null, //confirm点击确认按钮触发的事件
            handler4CancelBtn: null, //confirm点击取消按钮触发的事件
            //prompt相关
            text4PromptBtn: "确定", //prompt文字
            isPromptInputPassword: false, //输入框是否为密码类型
            defaultValue4PromptInput: "", //输入框的默认值
            maxlength4PromptInput: 10, //输入框的最大字数
            handler4PromptBtn: null //prompt点击确定按钮触发的事件
        };
        //自定义事件,方便可以实现绑定多个方法
        this.handlers = {};
    }
    //通过jquery中的$.extend来继承widget中的方法
    Window.prototype = $.extend({}, new widget.Widget(), {
        //展示视图，会覆盖widget中的接口
        renderUI: function() {
            var footerContent = "";
            switch (this.cfg.winType) {
                case "alert":
                    footerContent = "<input type='button' value='" + this.cfg.text4AlertBtn + "' class='window_alertBtn'>";
                    break;
                case "confirm":
                    footerContent = '<input type="button" value="' + this.cfg.text4ConfirmBtn + '" class="window_confirmBtn">' +
                        '<input type="button" value="' + this.cfg.text4CancelBtn + '" class="window_cancelBtn">';
                    break;
                case "prompt":
                    this.cfg.content += '<p class="window_promptInputWrapper">' +
                        '<input type="' + (this.cfg.isPromptInputPassword ? "password" : "text") +
                        '" value="' + this.cfg.defaultValue4PromptInput +
                        '" maxlength="' + this.cfg.maxlength4PromptInput +
                        '" class="window_promptInput"></p>';
                    footerContent = '<input type="button" value="' + this.cfg.text4PromptBtn + '" class="window_promptBtn">' +
                        '<input type="button" value="' + this.cfg.text4CancelBtn + '" class="window_cancelBtn">';
                    break;
            }
            this.boundingBox = $("<div class='window_boundingBox'>" +
                "<div class='window_body'>" + this.cfg.content + "</div>" +
                "</div>");
            //如果是通用的，则不需要头和尾
            if (this.cfg.winType != "common") {
                this.boundingBox.prepend("<div class='window_header'>" + this.cfg.title + "</div>");
                this.boundingBox.append("<div class='window_footer'>" + footerContent + "</div>");
            }
            if (this.cfg.hasMask) {
                this._mask = $('<div class="window_mask"></div>');
                this._mask.appendTo('body');
            }
            //关闭按钮
            if (this.cfg.hasCloseBtn) {
                this.boundingBox.append('<span class="window_closeBtn">X</span>');
            }
            // 获取prompt中的输入框
            this._promptInput = this.boundingBox.find(".window_promptInput");
        },
        //绑定事件，会覆盖widget中的接口
        bindUI: function() {
            var that = this;
            this.boundingBox.on('click', '.window_alertBtn', function() { //触发alert确认事件
                that.fire('alert'); //触发事件
                that.destroy(); //触发后去除相关dom
            }).on('click', '.window_closeBtn', function() { //触发关闭事件
                that.fire("close");
                that.destroy();
            }).on('click', '.window_confirmBtn', function() { //触发confirm确认事件
                that.fire("confirm");
                that.destroy();
            }).on('click', '.window_cancelBtn', function() { //触发confirm取消事件
                that.fire("cancel");
                that.destroy();
            }).on('click', '.window_promptBtn', function() { //触发prompt提交事件
                that.fire("prompt", that._promptInput.val());
                that.destroy();
            })
            if (this.cfg.handler4AlertBtn) {
                this.on("alert", this.cfg.handler4AlertBtn);
            }
            if (this.cfg.handler4CloseBtn) {
                this.on("close", this.cfg.handler4CloseBtn);
            }
            if (this.cfg.handler4ConfrimBtn) {
                this.on("confirm", this.cfg.handler4ConfrimBtn);
            }
            if (this.cfg.handler4CancelBtn) {
                this.on("cancel", this.cfg.handler4CancelBtn);
            }
            if (this.cfg.handler4PromptBtn) {
                this.on("prompt", this.cfg.handler4PromptBtn);
            }
        },
        //初始化属性，会覆盖widget中的接口
        syncUI: function() {
            this.boundingBox.css({
                width: this.cfg.width + "px",
                height: this.cfg.height + "px",
                left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + "px",
                top: (this.cfg.y || (window.innerHeight - this.cfg.height) / 2) + "px",
            });
            if (this.cfg.skinClassName) {
                this.boundingBox.addClass(this.cfg.skinClassName);
            }
            if (this.cfg.isDraggable) {
                if (this.cfg.dragHandle) {
                    this.boundingBox.draggable({
                        handle: this.cfg.dragHandle,
                        containment: "window"
                    });
                } else {
                    this.boundingBox.draggable({
                        containment: "window"
                    });
                }
            }
        },
        //销毁前的处理，这里是去除模态遮罩层
        destructor: function() {
            this._mask && this._mask.remove();
        },
        //alert弹出框
        alert: function(cfg) {
            $.extend(this.cfg, cfg, { winType: "alert" })
            this.render();
            return this;
        },
        //confirm弹出框
        confirm: function(cfg) {
            $.extend(this.cfg, cfg, { winType: "confirm" })
            this.render();
            return this;
        },
        //prompt弹出框
        prompt: function(cfg) {
            $.extend(this.cfg, cfg, { winType: "prompt" })
            this.render();
            this._promptInput.focus(); //弹出时获取焦点
            return this;
        },
        //common弹出框
        common: function(cfg) {
            $.extend(this.cfg, cfg, { winType: "common" })
            this.render();
            return this;
        }
    });
    return { Window: Window }
});