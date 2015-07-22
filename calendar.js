var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  ScrollView,
  TouchableHighlight,
} = React;

var Calendar = React.createClass({
  getInitialState: function(){
    //开始时间
    var startTime = this.props.startTime || new Date();
    var holiday = this.props.holiday || {
      "国庆节": "2015-10-1"
    };
    //显示月份的个数
    var num = this.props.num || 3;
    return {
      startTime: startTime,
      num: num
    };
  },
  render: function() {
    var date = this.state.startTime;
    var num = this.state.num;
    var items = [];
    var dateNow = new Date();

    for(var n = 0; n < num; n++){
      /*循环完成一个月*/
      var rows = [];
      var newDate = new Date(date.getFullYear(), date.getMonth() + 1 + n, 0); //天数
      var week = new Date(date.getFullYear(), date.getMonth() + n, 1).getDay(); //月份开始的星期

      if(week === 0){
        week = 7;
      }
      var counts = newDate.getDate();
      var rowCounts = Math.ceil((counts + week - 1) / 7); //本月行数
      for(var i = 0; i < rowCounts; i++){
        var days = [];
        for(var j = (i * 7) + 1; j < ((i+1) * 7) + 1; j++){
          //根据每个月开始的［星期］往后推
          var dayNum = j - week + 1;
          if(dayNum > 0 && j < counts + week){
            //如果当前日期小于今天，则变灰
            var dateStr = date.getFullYear() + '-' + (date.getMonth() + n + 1) + '-' + dayNum;
            var grayStyle = {};
            if(dateNow >= new Date(date.getFullYear(), date.getMonth() + n, dayNum + 1)){
              grayStyle = {
                color:'#ccc'
              };
            }
            days.push(
              <TouchableHighlight style={[styles.flex_1]} underlayColor="#fff" onPress={this.props.touchEvent?this.props.touchEvent.bind(this, dateStr):null}>
                <View >
                  <Text style={grayStyle}>{dayNum}</Text>
                </View>
              </TouchableHighlight>
            );
          }else{
            days.push(
              <View style={[styles.flex_1]}>
                <Text></Text>
              </View>
            );
          }

        }
        rows.push(
          <View style={styles.row}>{days}</View>
        );
      }
      items.push(
        <View style={[styles.cm_bottom]}>
          <View style={styles.month}>
            <Text style={styles.month_text}>{newDate.getFullYear()}年{newDate.getMonth() + 1}月</Text>
          </View>
          {rows}
        </View>
      );

    }

    return (
        <View style={styles.calendar_container}>

          <View style={[styles.row, styles.row_header]}>
            <View style={[styles.flex_1]}>
              <Text>一</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text>二</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text>三</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text>四</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text>五</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text style={styles.week_highlight}>六</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text style={styles.week_highlight}>日</Text>
            </View>
          </View>

          <ScrollView style={{flex:1,}}>

            {items}

          </ScrollView>

        </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:30,
  },
  flex_1:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  calendar_container:{
    backgroundColor:'#fff',
    flex:1,
    borderTopWidth:1/PixelRatio.get(),
    borderBottomWidth:1/PixelRatio.get(),
    borderColor:'#ccc'
  },
  row_header:{
    backgroundColor:'#F5F5F5',
    borderBottomWidth:1/PixelRatio.get(),
    borderBottomColor:'#ccc',
  },
  row:{
    flexDirection:'row',
    height:35,
  },
  month:{
    alignItems:'center',
    justifyContent:'center',
    height:40,
  },
  month_text:{
    fontSize:18,
    fontWeight:'400',
  },
  week_highlight:{
    color:'#126AFF'
  },
  cm_bottom:{
    borderBottomWidth:1/PixelRatio.get(),
    borderBottomColor:'#ccc',
  }
});

module.exports = Calendar;