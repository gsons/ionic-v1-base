     app.factory('$loading', function($ionicLoading) {
         return {
             show: function(_showBackdrop, _content, _icon, _class) {
                 var showBackdrop = _showBackdrop || false;
                 var icon = _icon || 'ios';
                 var mclass = _class || '';
                 var content = _content || "";
                 var style = showBackdrop ? "<style>.loading-container .loading{background-color: rgba(0, 0, 0,0.6);}</style>" :
                     "<style>.loading-container .loading{background-color: rgba(0, 0, 0,0.2);}</style>";
                 $ionicLoading.show({
                     template: style + '<ion-spinner icon="' + icon + '" class="' + mclass + '"></ion-spinner><div>' + content + '</div>',
                     content: 'Loading',
                     animation: '',
                     showBackdrop: showBackdrop,
                     minWidth: 500,
                     showDelay: 0
                 });
             },
             hide: function() {
                 $ionicLoading.hide();
             }
         }
     });
     app.factory("$confirm", function($ionicPopup) {
         return {
             show: function(_option, _callback, _callback_cancle) {
                 var title = _option.title || '提示';
                 var content = _option.content || '';
                 var callback = _callback || function() {};
                 var callback_cancle = _callback_cancle || function() {};
                 var popup = $ionicPopup.confirm({
                     template: content,
                     title: title,
                     buttons: [{
                         text: '确定',
                         type: 'button-positive',
                         onTap: function(e) {
                             return 1;
                         }
                     }, {
                         text: '取消',
                         type: 'button-assertive',
                     }]
                 });
                 popup.then(function(res) {
                     if (res) {
                         callback();
                     } else {
                         callback_cancle();
                     }
                 })
             },
         }
     });
     app.filter('Datetranslater', function() {

         return function(_time) {
             var time = _time;
             var date = new Date(time);
             var nowtime = new Date().getTime();
             //当天
             if (date.toDateString() === new Date().toDateString()) {
                 return formatDate(date, 'HH:mm');
             }
             //六天以内
             else if (nowtime - time < 6 * 24 * 60 * 60 * 1000) {
                 return formatDate(date, 'w HH:mm');
             }
             //本月
             else if (date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear()) {
                 return formatDate(date, 'MM-dd HH:mm');
             } else if (date.getFullYear() == new Date().getFullYear()) {
                 return formatDate(date, 'yyyy-MM-dd HH:mm');
             } else {
                 return formatDate(date, 'yyyy-MM-dd HH:mm');
             }

         }

         function formatDate(date, fmt) {
             date = date == undefined ? new Date() : date;
             date = typeof date == 'number' ? new Date(date) : date;
             fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
             var obj = {
                 'y': date.getFullYear(), // 年份，注意必须用getFullYear
                 'M': date.getMonth() + 1, // 月份，注意是从0-11
                 'd': date.getDate(), // 日期
                 'q': Math.floor((date.getMonth() + 3) / 3), // 季度
                 'w': date.getDay(), // 星期，注意是0-6
                 'H': date.getHours(), // 24小时制
                 'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
                 'm': date.getMinutes(), // 分钟
                 's': date.getSeconds(), // 秒
                 'S': date.getMilliseconds() // 毫秒
             };
             var week = ['日', '一', '二', '三', '四', '五', '六'];
             for (var i in obj) {
                 fmt = fmt.replace(new RegExp(i + '+', 'g'), function(m) {
                     var val = obj[i] + '';
                     if (i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
                     for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
                     return m.length == 1 ? val : val.substring(val.length - m.length);
                 });
             }
             return fmt;
         }


     });