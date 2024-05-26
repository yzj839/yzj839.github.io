var map = new AMap.Map("container", {
    resizeEnable: true,
    center: [113.326977, 23.401293],
    zoom: 12,

});
var logMapinfo = function () {
    var zoom = map.getZoom(); //获取当前地图级别
    console.log(zoom)
    return zoom;
};
logMapinfo();

//function mapZoomstart(){
//document.querySelector("#text").innerText = '缩放开始';
//}
function mapZoom() {
    if (logMapinfo() < 12) {
        //toastr.info("请放大地图至14级以上")
        ele11 = document.getElementsByClassName('info')
        for (var i = 0; i < ele11.length; i++) {
            //ele[i].style.display = "block";
            //ele[i].style.visibility = "visible";
            ele11[i].style.display = "none";
            ele11[i].style.zoom = 3 - 0.1 * logMapinfo();
        }
        qiehuan = document.getElementById('qiehuan')
        qiehuan.style.display = "none";
    }
    else if (logMapinfo() >= 12) {
        ele11 = document.getElementsByClassName('info')
        for (var i = 0; i < ele11.length; i++) {
            //ele[i].style.display = "block";
            //ele[i].style.visibility = "visible";
            ele11[i].style.display = "block";
            ele11[i].style.zoom = 3 - 0.1 * logMapinfo();
        }
        qiehuan = document.getElementById('qiehuan')
        qiehuan.style.display = "block";

    }
    //document.querySelector("#text").innerText = '正在缩放';
}
//function mapZoomend(){
//  document.querySelector("#text").innerText = '缩放结束';
//}

// 事件绑定

console.log("绑定事件!");
//map.on('zoomstart', mapZoomstart);
map.on('zoomchange', mapZoom);
//map.on('zoomend', mapZoomend);

//输入提示
var auto = new AMap.AutoComplete({
    input: "tipinput"
})
var messageOpts = {
    "showDuration": "1000",// 显示的动画时间
    "hideDuration": "1000",// 消失的动画时间
    "timeOut": "1000",// 弹窗展现时间
    "showEasing": "swing",//显示时的动画缓冲方式
    "hideEasing": "linear",//消失时的动画缓冲方式
    "showMethod": "fadeIn",//显示时的动画方式
    "hideMethod": "fadeOut", //消失时的动画方式
    "allowHtml": true,// 允许弹窗内容包含 HTML 语言
};
toastr.options = messageOpts;
//添加控件
AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {

    //添加一个缩放控件
    map.addControl(new BasicControl.Zoom({
        position: 'lt'
    }));

    //缩放控件，显示Zoom值
    map.addControl(new BasicControl.Zoom({
        position: 'lb',
        showZoomNum: true
    }));

    //图层切换控件
    map.addControl(new BasicControl.LayerSwitcher({
        position: 'rt'
    }));
});
var CurMarker
var lastMarker
var def_data = {
    "id": 0,
    "LngLat": "",
    "m_Station": "",
    "d_Station": ""
}
//创建覆盖物群组，传入覆盖物组成的数组
var overlayGroup = new AMap.OverlayGroup();
map.add(overlayGroup);
//函数封装
function make_marker(C_Lng, C_Lat, new_data) {

    marker = new AMap.Marker({
        position: [C_Lng, C_Lat], //位置
        offset: new AMap.Pixel(-9.5, -32),//偏移
        //icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png', //图标可选，可以使用本地或者在线图标
        //content:content,
        content: '<img width="19px" height="32px" src="//webapi.amap.com/theme/v1.3/markers/b/mark_bs.png">',
        //webapi.amap.com/theme/v1.3/markers/b/mark_bs.png
        extData: new_data
    });
    marker.setLabel({
        direction: 'right',
        offset: new AMap.Pixel(10, 0),  //设置文本标注偏移量
        content: "<div class='info'>" + new_data.r_Name + "</div>", //设置文本标注内容
    });
    overlayGroup.addOverlay(marker)
    CurMarker = marker
    lastMarker = marker
    // 在这里添加点击事件的处理逻辑
    marker.on('click', function (e) {
        //map.remove(e.target);
        CurMarker = e.target
        //overlayGroup.setOptions({icon:'//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',})
        //CurMarker.setIcon('//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png')
        document.getElementById("LngLat").value = e.target.getExtData().LngLat
        document.getElementById("MaintainStation").value = e.target.getExtData().m_Station
        document.getElementById("DesignStation").value = e.target.getExtData().d_Station
        document.getElementById("RoadName").value = e.target.getExtData().r_Name
        document.getElementById("Information").value = e.target.getExtData().I_formation
        document.getElementById("Direction").value = e.target.getExtData().d_Direction
        document.getElementById("list").value = e.target.getExtData().f_pic
        $("#containerinput").show();
        imgurl = 'https://lsj-2.frp.one:36318/images/' + e.target.getExtData().id + '&pw=sjy_xjdyz'
        //console.log(imgurl)


    });
}
function ap_data(id, LngLat, m_Station, d_Station, r_Name, I_formation, d_Direction, f_pic) {
    obj = new Object();
    obj.id = id
    obj.LngLat = LngLat;
    obj.m_Station = m_Station;
    obj.d_Station = d_Station;
    obj.r_Name = r_Name;
    obj.I_formation = I_formation;
    obj.d_Direction = d_Direction;
    obj.f_pic = f_pic;
    return obj;
}

function createPic() {
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth();//得到月份
    var date = now.getDate();//得到日期
    var hour = now.getHours();//得到小时
    var minu = now.getMinutes();//得到分钟
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    var number = now.getSeconds() % 43; //这将产生一个基于目前时间的0到42的整数。
    var time = year + month + date + hour + minu;
    return time + "_" + number;
}
function updata(i) {
    if (lastMarker)
        map.remove(lastMarker)
    AllOverlays = map.getAllOverlays()
    var jwd = AllOverlays[i]
    map.remove(jwd)
    //alert("保存成功");
    $("#databody").empty();
    toastr.info("删除成功！")
    console.log('删除成功');
    var contents = JSON.stringify(createtable());
    localStorage.setItem('trafficdata', contents);
    $("#containerinput").hide();

}
function JumpMarker(i) {
    AllOverlays = map.getAllOverlays()
    CurMarker = AllOverlays[i];
    document.getElementById("LngLat").value = CurMarker.getExtData().LngLat
    document.getElementById("MaintainStation").value = CurMarker.getExtData().m_Station
    document.getElementById("DesignStation").value = CurMarker.getExtData().d_Station
    document.getElementById("RoadName").value = CurMarker.getExtData().r_Name
    document.getElementById("Information").value = CurMarker.getExtData().I_formation
    document.getElementById("Direction").value = CurMarker.getExtData().d_Direction
    document.getElementById("list").value = CurMarker.getExtData().f_pic
    $("#container").show();
    $("#containerinput").show();
    $("#data").hide();

    //同时传入缩放级别和中心点经纬度
    map.setZoomAndCenter(14, CurMarker.getPosition(), false, 1000);
    //map.setZoomAndCenter(14, [116.205467, 39.907761], false, 2000); //另一种写法
}
function createtable() {
    var content = [];
    $("#databody").empty()
    AllOverlays = map.getAllOverlays()
    var delname = []
    for (i = 0; i < AllOverlays.length; i++) {
        ExtData = AllOverlays[i].getExtData()
        content.push(ExtData);
        //toastr.info(ExtData.LngLat)
        var new_row = document.createElement("tr")
        var new_td = document.createElement("td")
        new_td.innerHTML = ExtData.id
        new_row.appendChild(new_td)

        var new_td = document.createElement("td")
        new_td.innerHTML = ExtData.LngLat
        new_row.appendChild(new_td)

        var new_td = document.createElement("td")
        new_td.innerHTML = ExtData.m_Station
        new_row.appendChild(new_td)

        var new_td = document.createElement("td")
        new_td.innerHTML = ExtData.d_Station
        new_row.appendChild(new_td)

        var new_td = document.createElement("td")
        new_td.innerHTML = ExtData.r_Name
        new_row.appendChild(new_td)

        var new_td = document.createElement("td")
        new_td.innerHTML = ExtData.I_formation
        new_row.appendChild(new_td)

        var new_td = document.createElement("td")
        new_td.innerHTML = ExtData.d_Direction
        new_row.appendChild(new_td)

        //var new_td = document.createElement("td")
        //new_td.innerHTML = ExtData.f_pic
        //new_row.appendChild(new_td)

        var new_td = document.createElement("td")
        var new_btn = document.createElement("button")
        new_btn.innerText = "跳转"
        new_btn.setAttribute('tip', i) // 设置属性值
        new_btn.onclick = function () {
            JumpMarker(this.getAttribute("tip"))
        }
        new_td.appendChild(new_btn)
        var new_btn2 = document.createElement("button")
        new_btn2.innerText = "删除"
        new_btn2.setAttribute('tip', i) // 设置属性值
        new_td.appendChild(new_btn2)
        new_btn2.onclick = function () {
            //toastr.info(this.getAttribute("tip"))
            updata(this.getAttribute("tip"))
        }

        new_row.appendChild(new_td)

        document.getElementById("databody").appendChild(new_row)
    }

    return content
}

//读取现有数据
if (!window.localStorage) {
    alert("浏览器不支持localstorage,请更换浏览器");
}
else {
    //主逻辑业务
    console.log('浏览器支持localstorage!');
}
//读取服务器数据至缓存

    $.ajax({
        url: 'https://lsj-2.frp.one:36318/'+'items/read_json&pw=sjy_xjdyz',
        type: 'GET',
        contentType: false,
        processData: false,
        cache: false,
        success: function (data) {
            if (data) {
                localStorage.setItem('trafficdata', data);
                console.log("读取服务器数据成功");
            } else {
                console.log("读取服务器数据失败");
            }
        }
    });

var data = localStorage.getItem('trafficdata');
if (data != null) {
    var contents = JSON.parse(data);
    for (i = 0; i < contents.length; i++) {
        //console.log(contents[i].LngLat.split(','));
        //console.log(contents[i]);
        if (contents[i] != null) {
            make_marker(Number(contents[i].LngLat.split(',')[0]), Number(contents[i].LngLat.split(',')[1]), contents[i])
            lastMarker = null
        }

    }
    createtable()

    console.log('读取原始数据');
} else {
    console.log('未找到myStorage, contents返回值为 null');
}
//为地图注册click事件获取鼠标点击出的经纬度坐标
map.on('click', function (e) {
    var C_Lng = e.lnglat.getLng()
    var C_Lat = e.lnglat.getLat()
    //重置信息卡
    document.getElementById("LngLat").value = C_Lng + ',' + C_Lat
    document.getElementById("MaintainStation").value = ""
    document.getElementById("DesignStation").value = ""
    document.getElementById("RoadName").value = ""
    document.getElementById("Information").value = ""
    document.getElementById("Direction").value = ""
    document.getElementById('list').value = '';
    //var content = document.createElement('div');
    var new_data = new ap_data(Date.now(), C_Lng + ',' + C_Lat, '', '', '')
    if (lastMarker)
        map.remove(lastMarker)
    make_marker(C_Lng, C_Lat, new_data)

    $("#containerinput").show();
});
//
//绑定事件
$(document).ready(function () {



    $(function () {
        //
        $("#down").on("click", function (e) {


            //var blob = new Blob([contents], { type: "text/plain;charset=utf-8" });
            //saveAs(blob, "save.json");
            //alert("添加成功");
            var datas = localStorage.getItem("trafficdata");
            //toastr.info(datas)
            const blob = new Blob([datas], { type: "text/plain;charset=utf-8" });
            filename = createPic()
            saveAs(blob, filename + ".json");

        });



        $("#save").on("click", function (e) {
            //绑定保存事件
            //alert("保存成功");
            toastr.info("保存成功！")
            m_Station = document.getElementById("MaintainStation").value
            d_Station = document.getElementById("DesignStation").value
            LngLat = document.getElementById("LngLat").value
            r_Name = document.getElementById("RoadName").value;
            I_formation = document.getElementById("Information").value;
            d_Direction = document.getElementById("Direction").value;
            f_pic = document.getElementById('list').innerHTML;
            lastMarker = null

            //alert(CurMarker.getExtData().m_Station);
            var Cur_data = new ap_data(Date.now(), LngLat, m_Station, d_Station, r_Name, I_formation, d_Direction, f_pic)
            CurMarker.setExtData(Cur_data)

            CurMarker.setLabel({
                direction: 'right',
                offset: new AMap.Pixel(10, 0),  //设置文本标注偏移量
                content: "<div class='info'>" + Cur_data.r_Name + "</div>", //设置文本标注内容
            });
            //CurMarker.m_Station=m_Station
            //CurMarker.d_Station=d_Station;
            //保存到本地

            var contents = JSON.stringify(createtable());
            localStorage.setItem('trafficdata', contents);
            $("#containerinput").hide();



            //发送axios.post(url,options }
            //axios.post('http://localhost:3000/register', {
            // username: "55555",
            //password: "this.password"
            //})
            //.then(response => {
            //     console.log('服务器响应:', response.data);
            //     // 处理服务器响应
            // })
            //  .catch(error => {
            //    console.error('出现错误:', error);
            //    // 处理错误
            // });
            //for (var i = 0, len = overlayGroup.length; i < len; i++) {

            //data = JSON.stringify(overlayGroup[i]);
            //fs.writeFile('./Data/Traffic.json', data, err => {
            // if (err) {
            //      console.log('写入出错了');
            //  } else {
            //      console.log('文件写入成功');
            // }
            // })


            // }
        });


    });
});