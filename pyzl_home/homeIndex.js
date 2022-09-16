console.log('===> home index');
debugger
function openEventList(type, mainArea) {
    //  console.log(isMobile());
    $(".layuimini-tool").click();
    var sideW = $(".layui-side").width();//获取左侧导航的宽度;折叠与不折叠的影响;
    var isMobileFlag = isMobile();
    var offset, area, closeBtn;
    if (isMobileFlag) {//是手机;
        offset = ['0px', "10%"];//在indextab中打开的弹窗;top,left;
        area = ["90%", "100%"];
        closeBtn = false;
    } else {//是PC;
        closeBtn = true;
        //console.log(mainArea);
        if (mainArea) {//判断左侧导航有没折叠;
            offset = ['12px', "00"];//在indextab中打开的弹窗;top,left;
            area = ["90%", "90%"];

        } else {
            var bodyFlag = $("body").hasClass("indexbody");//是在我的首页里点击的创建公单和检索中心;
            //console.log(bodyFlag);
            if (bodyFlag) {
                offset = ['00px', sideW];//在首页左侧打开的弹窗;
            } else {
                offset = ['60px', sideW];//在首页左侧打开的弹窗;
            };

            area = ['100%', '100%'];
        };
    }
    //iframe层
    if (type == "0") {
        var title = "创建工单(点击界面外任意地方可关闭页面)";
    } else if (type == "1") {
        var title = "检索中心(点击界面外任意地方可关闭页面)";
    }
    window.parent.parent.frames.layer.open({
        type: 2,
        title: title,
        shadeClose: true,
        shade: 0.3,
        //closeBtn: closeBtn,
        area: area,
        offset: offset,
        content: '/Shortcut/EventAllList?type=' + type, //iframe的url
        yes: function (index, layero) {
            window.parent.parent.location.reload();
        }, end: function () {
            //var elements;
            layui.use(['element', 'layer', 'jquery'], function () {
                var thiswin = window;
                var elements = layui.element;
            })
            //var url = $(".tabs-panels .panel").eq($('.tabs-selected').index()).find("iframe").attr("src");
            //$(".tabs-panels .panel").eq($('.tabs-selected').index()).find("iframe").attr("src", url);
            //window.parent.element.init()
            //window.parent.elements.render('tab', '/NewFunction/HomePage');
            //window.parent.parent.frames.element.render('tab', '/NewFunction/HomePage');
            $("#mainTab").tabs('select', '/NewFunction/HomePage');
            $("#tab_menu-tabrefresh").trigger("click");
            //parent.parent.location.reload();
        }
        //content: '/WorkOrderManage/EventAllList?type='+type //iframe的url
    });
}





//判断是手机
function isMobile() {
    var userAgentInfo = navigator.userAgent;

    var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];

    var mobile_flag = false;

    //根据userAgent判断是否是手机
    for (var v = 0; v < mobileAgents.length; v++) {
        if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
            mobile_flag = true;
            break;
        }
    }
    var screen_width = window.screen.width;
    var screen_height = window.screen.height;

    //根据屏幕分辨率判断是否是手机
    if (screen_width < 500 && screen_height < 800) {
        mobile_flag = true;
    }

    return mobile_flag;
};


//打开检索中心;
function openSearchDetail(Name, EventMainId, type, project) {
    if (type == "0") {
        goProductUrl(project, Name, EventMainId)
    } else {
        try {
            var token = $("#token").val();
            goProductUrl(project, Name, "/EventBaseManage/Index?tableName=" + EventMainId + "&Name=" + Name + "&formSearchCenter=true&token=" + token + "");
        } catch (e) {
            goProductUrl(project, Name, "/EventBaseManage/Index?tableName=" + EventMainId + "&Name=" + Name + "&formSearchCenter=true");
        }
        //goProductUrl(project, Name, "/EventBaseManage/Index?tableName=" + EventMainId + "&Name=" + Name + "&formSearchCenter=true");
    }
    ///EventBaseManage/Index?tableName=653d26b8-6da0-45ad-85fd-5feeb1698bd4&Name=%E5%9F%B9%E8%AE%AD;
    //if (EventMainId == "设备清册") {
    //    window.parent.parent.frames.addTab(Name, "/PMSManager/MainIndex");
    //}
    //else {
    //    window.parent.parent.frames.addTab(Name, "/EventBaseManage/Index?tableName=" + EventMainId + "&Name=" + Name + "&formSearchCenter=true");
    //}
    //var indexFlag = $("body .LoadEventAllList").closest("div").hasClass("ShortcutTtile");
    //console.log("indexFlag " + indexFlag);
    //var index = parent.layer.getFrameIndex(window.name);
    //parent.layer.close(index);
};



//打开工单创建框
function openWorkOrder(Name, EventMainId, dataType) {
    //window.parent.frames.addTab(Name, "/EventBaseManage/Index?tableName=" + EventMainId);
    var openAddWorkUrl;
    //if (dataType == "1") {//是事件;打开事件的新增;
    //    openAddWorkUrl = '/WorkOrderCommon/Add?tableName=' + EventMainId + '&Name=' + Name;//事件的url
    //} else if (dataType == "2") {//是事件组合;打开事件组合新增;
    //    openAddWorkUrl = '/WorkOrderCommon/Add?EventMainId=' + EventMainId + '&Name=' + Name;//事件组合的url
    //};

    openAddWorkUrl = '/WorkOrderCommon/Add?tableName=' + EventMainId + '&Name=' + Name;//事件的url
    window.parent.parent.frames.layer.open({
        type: 2,
        title: '新增--->' + Name,
        shadeClose: true,
        shade: 0.3,
        area: ['100%', '100%'],//[宽,高]
        //offset: ['60px', '200px'],
        content: openAddWorkUrl,
        yes: function (index, layero) {
            var body = layer.getChildFrame('body', index);
            getEventBaseMsg(body);//获取内容;


        },
        btn2: function (index) {
            layer.close(index);
        },
    });

};


//删除文件夹中的事件;
function DeleteShortcutFileBag(el) {
    var ID = $(el).closest("li").data("resid");
    $.ajax({
        url: "/Shortcut/DeleteShortcutFileBag",
        type: "post",
        data: {
            "ID": ID
        },
        dataType: "json",
        success: function (result) {
            //console.log(result);
            if (result.code == 0) {
                $(el).closest("li").remove();
                layer.msg(result.msg);
            }
        }
    })
};
