const http = require('../http/index')
const config = require("../config")

const {
    getToken,
    get_weather,
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
    // 计算在一起的天数
    // let together_day = dayjs().diff(config.love_date, "day")
    // 每日情话
    // let loveStr = await sweetNothings()
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
            // 天气
            weather: {
                value: weatherInfo.weather,
                color: randomColor(),
            },
            // 当前气温
            temp: {
                value: weatherInfo.temp + "°C",
                color: randomColor(),
            },
            // 最低气温
            low: {
                value: weatherInfo.low + "°C",
                color: randomColor(),
            },
            // 最高气温
            high: {
                value: weatherInfo.high + "°C",
                color: randomColor(),
            },
            // 风向
            wind: {
                value: weatherInfo.wind,
                color: randomColor(),
            },
            // 空气质量
            airQuality: {
                value: weatherInfo.airQuality,
                color: randomColor(),
            },
            // 湿度
            humidity: {
                value: weatherInfo.humidity,
                color: randomColor(),
            },
            // 宝贝的名字
            // dearName: {
            //   value: config.birthday1.name,
            //   color: randomColor(),
            // },
            // 我的名字
            // myName: {
            //   value: config.birthday2.name,
            //   color: randomColor(),
            // },
            // 距离宝贝生日
            // dearBrthDays: {
            //   value: brthDate(config.birthday1.birthday),
            //   color: randomColor(),
            // },
            // 距离我的生日
            // myBrthDays: {
            //   value: brthDate(config.birthday2.birthday),
            //   color: randomColor(),
            // },
            // 在一起的天数
            // loveDays: {
            //   value: together_day,
            //   color: randomColor(),
            // },
            // 每日情话
            // loveWords: {
            //   value: loveStr,
            //   color: randomColor(),
            // }
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