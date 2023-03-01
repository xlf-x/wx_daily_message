/************** 注意：此文件中的代码，不要做任何修改 ****************/
const templateMessageSend = require('./utils/templateMessageSend')
// 定时器（Cron）：定时推送消息
const schedule = require('node-schedule');

// 调试用，直接推送模板消息
templateMessageSend()

// 定时执行 推送模板消息的方法
const scheduleCronstyle = () => {
	// （定时器规则：秒/分/时/日/月/年，*号可理解为"每"的意思，如 0 0 8 * 这个*表示每日）
	schedule.scheduleJob('0 0 7 * * *', () => {
		templateMessageSend()
	});
}
// scheduleCronstyle()
console.log('app.js start')