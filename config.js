const config = {
    // 公众号配置
    app_id: "", // 公众号appId
    app_secret: "", // 公众号appSecret
    user: "", // 接收公众号消息的微信号
    template_id: "", // 模板 id
    // 信息配置
    city: "合肥", // 所在城市
    birthday1: { "name": "宝贝", "birthday": "2022-12-27" }, // 宝贝生日（阳历），姓名和生日，生日格式为"年-月-日"
    birthday2: { "name": "我的", "birthday": "2022-11-28" }, // 我的生日，同上
    love_date: "2021-8-25", // 在一起的日期，年月日以"-"分隔
    loveStr: "", // 如果填写,则以填写内容为主，如果不填写则自动获取土味情话语句
}
module.exports = config