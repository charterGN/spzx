import request from '@/utils/request'

const base_api = '/admin/order/orderInfo'

// 订单统计
export const GetOrderStatisticsData = searchObj => {
  return request({
    url: `${base_api}/getOrderStatisticsData`,
    method: 'get',
    params: searchObj,
  })
}

//订单信息列表
export const GetOrderInfoByPage = (current,limit,queryDto) => {
  return request({
    url: `${base_api}/findByPage/${current}/${limit}`, //路径
    method: 'get', //提交方式
    params: queryDto, //其他参数
  })
}

//获取订单item信息
export const GetOrderItem = (orderId) => {
  return request({
    url: `${base_api}/getOrderItem/${orderId}`, //路径
    method: 'get', //提交方式
  })
}