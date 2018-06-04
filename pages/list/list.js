const dateMap=
{
  1:"星期一",
  2:"星期二",
  3:"星期三",
  4:"星期四",
  5:"星期五",
  6:"星期六",
  0:"星期日",
}
Page({
   data:{
     futureWeather:[],
     city:"广州市"
   },
   onLoad(options){
     this.setData({
       city:options.city
     })
     this.getWeather()
   },
   onPullDownRefresh()
   {
     this.getWeather(function()
     {
       wx.stopPullDownRefresh()
     })
   },
   getWeather(callback)
   {
     let that=this
     wx.request({
       url: 'https://test-miniprogram.com/api/weather/future',
       data: {
         time: new Date().getTime(),
         city: that.data.city
       },
       success:function(res){
         let result = res.data.result
         that.setFutureWeather(result)
       },
       complete:function()
       {
        callback&&callback()
       }
     })
   },
   //设置未来几天的天气
   setFutureWeather(result)
   {
     let futureWeather=[]
     for(let i=0;i<7;i++)
     {
       let today = new Date()
       today.setDate(today.getDate()+i)
       futureWeather.push(
         {
            week:dateMap[today.getDay()],
            date:`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
            temp:`${result[i].minTemp}-${result[i].maxTemp}`,
            weather:`/images/${result[i].weather}-icon.png`
         }
       )
     }
     futureWeather[0].week="今天"
     this.setData({
       futureWeather:futureWeather
     })
   }
})