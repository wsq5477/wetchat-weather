# wetchat-weather
# 目录
* [display:flex](#dis)
   * flex-direciton
   * flex-wrap
   * justify-content
   * align-items
   * flex-shrink
   * flex-grow
* [bindtap](#bindtap)
### <a id="dis">display:flex</a>
意为"弹性布局",用来为盒状模型提供最大的灵活性.任何一个容器都可以指定为Flex布局.
<br>ps:设为Flex布局以后,子元素的float,clear,vertical-align(垂直对齐方式)属性将失效.
#### flex-direciton属性
row(默认值):主轴为水平方向,起点在左端.
<br>row-reverse:主轴在水平方向,起点在右端.
<br>column:主轴为垂直方向,起点在上沿.
<br>column-reverse:主轴在垂直方向,起点在下沿.
#### flex-wrap属性
定义：如果一条轴线排不下，将如何换行.
<br>nowrap:不换行.
<br>wrap:换行,第一行在上方.
<br>wrap-reverse:换行，第一行在下方.
#### justify-content属性
对齐方式,类似于align-text
<br>flex-start(默认值):左对齐
<br>flex-end:右对齐
<br>center:居中
<br>space-between:两端对齐,项目之间间隔相等
<br>space-around:每个项目两侧的间隔相等,所以项目之间的间隔比项目与边框的间隔大一倍
![](/images/justify-content.png)
#### align-items属性
flex-start:交叉轴的起点对齐
<br>flex-end:交叉轴的终点对齐
<br>center:交叉轴的中点对齐
<br>baseline:项目的第一行文字的基线对齐
<br>stretch:如果项目未设置高度或设为auto,将占满整个容器的高度
![](/images/align-items.png)
#### flex-shrink属性
当设置为0时则不按比例压缩,设置为1时进行压缩
#### flex-grow属性
按比例放大,默认为0,即不放大,如果所有项目的flex-grow属性都为1,则它们将等分剩余空间(如果有的话).如果一个项目的flex-grow属性为2,其他项目都为1,则前者占据的剩余空间将比其他项多一倍
<br>[参考文献](https://blog.csdn.net/linda_417/article/details/51507176)
### <a id="bindtap">bindtap</a>
[微信小程序之点击事件](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)
<br>bindtap和catchtap都是微信小程序点击事件,但是bindtap不会阻止冒泡,catchtap会阻止冒泡
<br>当为bindtap时点击最内层会同时触发外部的点击事件,而catchtap则不会,因为其不会向父元素进行冒泡
<br>[详情参考](https://www.jianshu.com/p/065f7b8bc87b)
