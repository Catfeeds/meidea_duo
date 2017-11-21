var app = getApp();
Page({
  data: {
    aa:[1,2,3],
    allChoice:false,
    page:1,
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    total: 0,
    carts: [],
  },
  choiceClick (e) {
    this.setData({
      allChoice:!this.data.allChoice
    })
  },
  onShow:function(){
    this.loadProductData();
     this.sum();
  },
  onLoad() {
    
  },
  loadProductData(){
    var that = this;
    my.httpRequest({
      url: app.data.ceshiUrl + '/Api/Shopping/index',
      method:'post',
      data: {
        user_id: app.data.userId
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.cart);
        //--init data
        var cart = res.data.cart;
        that.setData({
          carts:cart,
        });
        //endInitData
      },
    });
  },
  sum() {
    var carts = this.data.carts;
    // 计算总金额
    var total = 0;
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        total += carts[i].num * carts[i].price;
      }
    }
    // 写回经点击修改后的数组
    this.setData({
      carts: carts,
      total: '¥ ' + total
    });
  },
  removeShopCard:function(e){
    var that = this;
    var cardId = e.currentTarget.dataset.cartid;
    my.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function(res) {
        res.confirm && my.httpRequest({
          url: app.data.ceshiUrl + '/Api/Shopping/delete',
          method:'post',
          data: {
            cart_id: cardId,
          },
          header: {
            'Content-Type':  'application/x-www-form-urlencoded'
          },
          success: function (res) {
            //--init data
            var data = res.data;
            if(data.status == 1){
              //that.data.productData.length =0;
              that.loadProductData();
            }else{
              my.showToast({
                content: '操作失败！',
                duration: 2000
              });
            }
          },
        });
      },
      fail: function() {
        // fail
        my.showToast({
          content: '网络异常！',
          duration: 2000
        });
      }
    });
  },
});
