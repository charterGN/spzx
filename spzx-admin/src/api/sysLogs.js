import request from '@/utils/request'

const base_api = '/admin/system/sysLogs'

//操作日志列表
export const GetSysLogsListByPage = (current,limit,queryDto) => {
    return request({
      url: `${base_api}/findByPage/${current}/${limit}`, //路径
      method: 'get', //提交方式
      params: queryDto, //其他参数
    })
  }