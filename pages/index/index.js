//将相应的英文映射为中文
const weatherMap=
{
  "sunny":"晴天",
  "cloudy":"多云",
  "overcast":"阴",
  "lightrain":"小雨",
  "heavyrain":"大雨",
  "snow":"雪"
}
//将相应的天气映射为导航栏颜色
const weatherBg=
{
    "sunny": "#cbeefd",
    "cloudy": "#deeef6",
    "overcast": "c6ced2",
    "lightrain": "bdd5e1",
    "heavyrain": "c5ccd0",
    "snow": "aae1fc"
}
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js');

const UNLOCATIONSTATE = 0
const LOCATIONSTATE = 1
const STATE = 2
Page({ 
  data:{
    nowTemp:"",
    nowWeather:"",
    nowBg:"",
    hourlyWeather:[],
    todayDate:"",
    todayTemp:"",
    city:"广州市",
    locationType:STATE,
  },
  //刷新
  onPullDownRefresh()
  {
    this.getNow(
      function()
      {
        wx.stopPullDownRefresh()
      }
    )
  },
  onLoad() {
     this.qqmapsdk = new QQMapWX({
       key:"YE2BZ-4T73S-XU5OP-6XQXT-KGNA5-UWFEY"
     })
     let that=this
     wx.getSetting({
       success: function (res) {
         let auth = res.authSetting["scope.userLocation"]
         that.setData({
           locationType: auth ? LOCATIONSTATE : (auth == false) ? UNLOCATIONSTATE : STATE,
         })
         if (auth) {
           that.getLocation()
         }
         else{
           that.getNow()
         }
     }
     })
    },
  getNow(callback)
  {
    let that = this;
    //天气的API，根据城市名称获取当日的天气情况
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data:
      {
        city: that.data.city
      },
      success: function (res) {
        let result = res.data.result
        that.setNow(result)
        that.setHourlyWeather(result)
        that.setTodayWeather(result)
      },
      complete:function()
      {
        callback&&callback()//如果存在callback就执行回调函数
      }      
    })
  },
  //设置当前的天气
  setNow(result)
  {
    let temp = result.now.temp
    let weather = result.now.weather
    this.setData(
      {
        nowTemp: temp,
        nowWeather: weatherMap[weather],
        nowBg: "/images/" + weather + "-bg.png"//设置动态背景图片
      })
    //设置导航栏颜色
    wx.setNavigationBarColor(
      {
        frontColor: "#000000",
        backgroundColor: weatherBg[weather]
      })
  },
  //设置未来的天气
  setHourlyWeather(result)
  {
    let forecast = result.forecast
    let nowHour = new Date().getHours()
    let hourlyWeather = []
    for (let i = 0; i < 8; i++) {
      hourlyWeather.push(
        {
          time: (i*3 + nowHour) % 24 + "时",
          icon: "/images/" + forecast[i].weather + "-icon.png",
          temp: forecast[i].temp + "°"
        })
    }
    hourlyWeather[0].time = "现在"
    this.setData({
      hourlyWeather: hourlyWeather
    })
  },
  //获取今天的最高和最低温度
  setTodayWeather(result)
  {
    let maxTemp=result.today.maxTemp
    let minTemp=result.today.minTemp
    let todayDate=new Date()
     this.setData({
       todayTemp:minTemp+"~"+maxTemp,
       todayDate:`${todayDate.getFullYear()}-${todayDate.getMonth()+1}-${todayDate.getDate()}`
     })
  },
  //跳转到下一个页面
  onFutureWeather()
    {
      let that=this
        wx.navigateTo({
          url: '/pages/list/list?city='+that.data.city,
        })
    },
    //获取当前地点
  onCityLocation()
  {
    var that=this
    if(this.data.locationType===UNLOCATIONSTATE)
    {
      wx.openSetting(
        {
          success:function(res)
          {
            let auth=res.authSetting["scope.userLocation"]
            if(auth)
            {
               that.getLocation()
            }
          }
        }
      )
    }
    else{
      this.getLocation()
    }
  },
  getLocation()
  {
    let that = this;
    wx.getLocation({
      success: function(res) {
        that.qqmapsdk.reverseGeocoder({
           location:
           {
             latitude:res.latitude,
             longitude:res.longitude
           },
           success:function(res)
           {
             let city=res.result.address_component.city;
             that.setData({
               city:city,
               locationType: LOCATIONSTATE
             })
             that.getNow()
           }
         })
      },
      fail: function () {
        that.setData(
          {
            locationType: UNLOCATIONSTATE
          }
        )
      }
    })
  }
})
