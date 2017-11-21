var app = getApp();
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    circular:true,
    aa:[1,2],
    parData:false,
    num:0,
    pid:0,
    itemData: {},
    bannerItem: '',
    buynum: 1,
    num2:0,
      // 产品图片轮播
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    firstIndex: -1,
    quan:[],
    addNum:1,
    pictures: [ 'https://p0.meituan.net/movie/ea4ac75173a8273f3956e514a4c78018253143.jpeg',
      'https://p0.meituan.net/movie/5d4fa35c6d1215b5689257307c461dd2541448.jpeg',
      'https://p0.meituan.net/movie/0c49f98a93881b65b58c349eed219dba290900.jpg',
      'https://p1.meituan.net/movie/45f98822bd15082ae3932b6108b17a01265779.jpg',
      'https://p1.meituan.net/movie/722de9a7b0c1f9c262162d87eccaec7c451290.jpg',
      'https://p0.meituan.net/movie/cb9be5bbedb78ce2ef8e83c93f83caca474393.jpg',
      'https://p1.meituan.net/movie/a852b992cdec15319c717ba9fa9b7a35406466.jpg',
      'https://p1.meituan.net/movie/dc1f94811793e9c653170cba7b05bf3e484939.jpg'
    ],
  },
  navigatorClick (e) {
    my.switchTab({
      url: '../cart/cart'
    })
  },
  imgClick (e) {
    var index = e.currentTarget.dataset.index
        //数据源
       var pictures = this.data.pictures;
    my.previewImage({
      current: index,
      urls: pictures
    });
  },
  addClick (e) {
    var that = this
    console.log(e.target.id)
    if(e.target.id == 'aa') {
      if(that.data.addNum > 1) {
        that.setData({
          addNum:that.data.addNum -1
        })
      }
    }else if(e.target.id == 'bb') {
        that.setData({
          addNum:that.data.addNum + 1
        })
    }
  },
  parClick (e) {
    var that = this
    that.setData({
      parData:!that.data.parData
    })
    if(that.data.parData) {
      that.setData({
        num:90
      })
    }else {
       that.setData({
        num:0
      })
    }
  },
  onLoad(options) {
    var pid = options.pid;
    var that = this;
    that.setData({
        pid: pid,
      });
    my.httpRequest({
          url: app.data.ceshiUrl + '/Api/Product/detail',
          method: 'post',
          data: {
              pro_id: pid,
          },
          header: {
            'Content-Type':'application/x-www-form-urlencoded'
          },

          success: function (res) {
              console.log(res.data);
              //--init data 
              var status = res.data.status;
              if (status == 1) {
                  var content = res.data.content;
                  // WxParse.wxParse('content', 'html', content, that, 8);
                  that.setData({
                      pro: res.data.pro,
                      cate_id: res.data.pro.cid,
                      store: res.data.pro.store,
                      bannerItem:res.data.lun,
                      quan:res.data.quan,
                      param:res.data.param,
                      prodetail: res.data.prodetail,
                      prodetail2: res.data.prodetail[0],
                      shu: res.data.shu,
                      guei:res.data.guei,
                      num: res.data.num,
                      num2: res.data.num2,
                      ppid: res.data.ppid,
                  });
              } else {
                  my.showToast({
                      content: "没有数据",
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
