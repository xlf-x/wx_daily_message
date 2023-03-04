const http = require('../http/index')
const config = require("../config")

const {
    getToken,
    get_weather,
    get_horoscope,
    getCurrentDate,
    brthDate,
    sweetNothings,
    randomColor,
} = require('./index')
  

const templateMessageSend = async function () {
    const token = await getToken();
    const url = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + token;
    // 天气信息
    let weatherInfo = await get_weather()
    // 星座运势
    let starLucky = await get_horoscope()
    // 模板id 配置项
    const params = {
        touser: config.user,
        template_id: config.template_id,
        url: 'http://weixin.qq.com/download',
        topcolor: '#FF0000',
        data: {
            // 当前日期
            nowDate: {
                value: getCurrentDate(),
                color: randomColor(),
            },
            // 省份
            province: {
                value: weatherInfo.province,
                color: randomColor(),
            },
            // 城市
            city: {
                value: weatherInfo.city,
                color: randomColor(),
            },
            // 当前天气
            weather: {
                value: weatherInfo.weather,
                color: randomColor(),
            },
            // 当天天气
            todayWeather: {
                value: weatherInfo.todayWeather,
                color: randomColor(),
            },
            // 当前气温
            temp: {
                value: weatherInfo.temperature + "°C",
                color: randomColor(),
            },
            // 最低气温
            low: {
                value: weatherInfo.night_low_temperature + "°C",
                color: randomColor(),
            },
            // 最高气温
            high: {
                value: weatherInfo.day_high_temperature + "°C",
                color: randomColor(),
            },
            // 湿度
            humidity: {
                value: weatherInfo.sd,
                color: randomColor(),
            },
            // 星座名
            starName: {
                value: starLucky.starName,
            },
            // 综合星座运势指数
            starLuckySummary: {
                value: starLucky.summary_star,
                color: randomColor(),
            },
            // 幸运数字
            luckyNum: {
                value: starLucky.lucky_num,
                color: randomColor(),
            },
            // 今日提醒
            dayNotice: {
                value: starLucky.day_notice,
                color: randomColor(),
            },
        },
    };
    let res = await http.post(url, params);
    switch (res.data.errcode) {
        case 40001:
            console.log("推送消息失败,请检查 appId/appSecret 是否正确");
            break
        case 40003:
            console.log("推送消息失败,请检查微信号是否正确");
            break
        case 40037:
            console.log("推送消息失败,请检查模板id是否正确");
            break
        case 0:
            console.log("推送消息成功");
            break
    }
}
module.exports = templateMessageSend