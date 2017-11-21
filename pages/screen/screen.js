var app = getApp();
Page({
  data: {
    bb:[1,2,3],
    iconImg:false,
    iconHidden:false,
    classifyHidden:false,
    showHidden:false,
    scale: 14,
    longitude: 120.131441,
    latitude: 30.279383,
    markers: [{
      iconPath: "/image/green_tri.png",
      id: 10,
      latitude: 30.279383,
      longitude: 120.131441,
      width: 50,
      height: 50
    }],
    pro: [],
    key: '',
    catid: 0,
    array: [],
    housetype_list: [
         {
            name: '综合排序',
            id: '0',
         },

         {
            name: '热度',
            id: '1',
         },
         {
            name: '价格最高',
            id: '2',
         },
         {
            name: '价格最低',
            id: '3',
         },
      ],
  },
  // 隐藏
  hiddenClick (e) {
    this.setData({
      iconHidden:false,
      showHidden:false,
      classifyHidden:false
    })
  },
  // 选项卡1
  tab01Click (e) {
    var that = this;
    that.setData({
      iconHidden:that.data.iconHidden == false?true:false,
      showHidden:that.data.showHidden == false?true:false
    })
    if(that.data.classifyHidden == true) {
      that.setData({
        classifyHidden:false
      })
    }
  },
  // 选项卡2
  tab02Click (e) {
    var that = this;
    that.setData({
      iconHidden:false,
      classifyHidden:false,
      showHidden:false
    })
  },
  // 选项卡3
  tab03Click (e) {
    var that = this;
    that.setData({
      classifyHidden:that.data.classifyHidden == false? true:false,
      showHidden:that.data.showHidden == false? true : false
    })
    if(that.data.iconHidden == true) {
      that.setData({
        iconHidden:false
      })
    }
  },
  // 排序 --列表
  listClick (e) {
    var that = this;
    console.log(e)
    that.setData({
      iconImg:e.currentTarget.dataset.id,
      iconHidden:false,
      showHidden:false
    })
  },
  onLoad(options) {
    var that = this;
       my.httpRequest({
           url: app.data.ceshiUrl + '/Api/Category/getProduct',
           method: 'post',
           data: {
               cate_id: options.cid,
               key:options.key,
           },
           header: {
             'Content-Type':'application/x-www-form-urlencoded'
           },

           success: function (res) {
               //--init data 
            //    console.log(res.data.pro);
               var status = res.data.status;
               if (status == 1) {
                    that.setData({
                        pro: res.data.pro,
                        key: res.data.key,
                        catid: res.data.catid,
                        array: res.data.category,
                    });
                   
               }else {
                   that.setData({
                       array: res.data.category,
                   });
                   my.showToast({
                       content: res.data.err,
                       duration: 2000,
                   });
               }
           },
           fail: function (e) {
               my.showToast({
                   content: '网络异常！',
                   duration: 2000,
               });
           },

       });
  },
});
