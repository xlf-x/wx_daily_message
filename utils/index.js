const http = require('../http/index')
const config = require("../config")

// 导入 dayjs 模块
const dayjs = require("dayjs")
// 导入 dayjs 插件
const weekday = require('dayjs/plugin/weekday')
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter")
// 使用 dayjs 插件
dayjs.extend(weekday)
dayjs.extend(isSameOrAfter);

module.exports = {
    // 获取token
    async getToken () {
        const params = {
            grant_type: 'client_credential',
            appid: config.app_id,
            secret: config.app_secret,
        };
        let res = await http.get('https://api.weixin.qq.com/cgi-bin/token', params);
        return res.data.access_token;
    },
    // 获取天气情况
    async get_weather() {
        const params = {
            area: config.city,
            AppCode: '4389d0fed73f4d62b8cfff2e69a254bb',
        }
        const headers = {
            Authorization: 'APPCODE 4389d0fed73f4d62b8cfff2e69a254bb'
        }
        let res = await http.get(`https://qryweather.market.alicloudapi.com/lundroid/queryweather`, params, headers,)
        // console.log('天气接口返回', res)
        const todayWeather = res.data.data.info.f1
        // console.log('当天天气', todayWeather)
        return todayWeather
    },
    // 获取当前时间：格式 2022年8月25日 星期五
    getCurrentDate() {
        let days = ""
        switch (dayjs().weekday()) { // 当前星期几
        case 1:
            days = '星期一';
            break;
        case 2:
            days = '星期二';
            break;
        case 3:
            days = '星期三';
            break;
        case 4:
            days = '星期四';
            break;
        case 5:
            days = '星期五';
            break;
        case 6:
            days = '星期六';
            break;
        case 0:
            days = '星期日';
            break;
        }
        return dayjs().format('YYYY-MM-DD') + " " + days
    },
    // 计算生日还有多少天
    brthDate(brth) {
        const nowDate = dayjs().format('YYYY-MM-DD'); // 当前日期（格式：年-月-日）
        let birthDays = ""
        // 判断一个日期是否大于等于另一个日期：判断生日 是否大于等于 当前日期（返回布尔值）
        if (dayjs(brth).isSameOrAfter(nowDate)) {
            // 生日还没过
            birthDays =  dayjs(brth).diff(dayjs(), 'day') // 获取两个日期相差的天数
            // if (birthDays === 0) console.log("今天是宝贝的生日，生日快乐");
        } else {
            // 生日已过,计算距离下一次生日还有多少天
            let nextBirthYears = dayjs().year() + 1 // 下一次生日年份等于当前年份+1
            let nextBirth = nextBirthYears + "-" + dayjs(brth).format('MM-DD') // 下一次生日年月日
            birthDays = dayjs(nextBirth).diff(dayjs(), 'day') // 获取两个日期相差的天数
        }
        return birthDays
    },
    // 随机颜色
    randomColor() {
        let randomColor = "#" + parseInt(Math.random() * 0x1000000).toString(16).padStart(6, "0")
        return randomColor
    },
}