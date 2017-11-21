var app = getApp();
Page({
  data: {
    imgUrls:'',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    classify:'',
    shop: '',
    renqi:'',
    indicatorDots: true,
    autoplay: true,
    interval: 1000,
    circular:true
  },
  onLoad() {
    var that = this;
    my.httpRequest({
        url: app.data.ceshiUrl + '/Api/Index/index',
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
            that.setData({
                imgUrls: res.data.ggtop,
                classify: res.data.procat,
                shop: res.data.shop,
                renqi: res.data.renqi,
                tubiao: res.data.tubiao,
            })
        }
    });
  },
});
