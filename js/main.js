require.config({
    paths: {
        jquery: 'jquery-3.1.1.min',
        jqueryUI: 'jquery-ui.min'
    }
});
require(['jquery', 'window'], function($, w) {
    //alert配置
    $("#a").on('click', function() {
        var win = new w.Window();
        win.alert({
            title: "提示",
            content: "welcome!",
            width: 300,
            height: 150,
            y: 50,
            hasCloseBtn: true,
            // hasMask: false,
            text4AlertBtn: "是啊",
            // skinClassName: "window_skin_a",
            dragHandle: ".window_header",
            handler4AlertBtn: function() {
                alert('you click the alert button');
            },
            handler4CloseBtn: function() {
                alert('you click the close button');
            },
        }).on("alert", function() {
            alert('the third alert handler');
        }).on('close', function() {
            alert('the third close handler');
        })
        win.on("alert", function() { alert('the second alert handler'); });
        win.on('close', function() { alert('the second colose handler'); });
        // win.off('close');
    });
    //confirm配置
    $("#b").on('click', function() {
        var win = new w.Window();
        win.confirm({
            title: "确认消息",
            content: "您确定要这样操作吗？",
            width: 300,
            height: 150,
            y: 50,
            hasCloseBtn: true,
            dragHandle: ".window_header",
        }).on("confirm", function() {
            alert('点击了确定按钮');
        }).on('cancel', function() {
            alert('点击了取消按钮');
        })
    });
    //prompt配置
    $("#c").on('click', function() {
        var win = new w.Window();
        win.prompt({
            title: "请输入您的名字",
            content: "我们将会为您保密您的输入的信息",
            width: 300,
            height: 150,
            y: 50,
            hasCloseBtn: true,
            dragHandle: ".window_header",
            text4PromptBtn: "输入",
            defaultValue4PromptInput: "张三",
        }).on("prompt", function(inputValue) {
            alert('您输入的内容是：' + inputValue);
        });
    });
    //common配置
    $("#d").on('click', function() {
        var win = new w.Window();
        win.common({
            content: "通用弹窗",
            width: 300,
            height: 150,
            y: 50,
            hasCloseBtn: true
        });
    });

});