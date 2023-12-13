import request from '@/utils/request'

const api_name = '/admin/product/productUnit'

// 分页列表
export const getPageList = (page, limit) => {
  return request({
    url: `${api_name}/findByPage/${page}/${limit}`,
    method: 'get',
  })
}

// 获取全部信息
export const FindAllProductUnit = () => {
  return request({
    url: `${api_name}/findAll`,
    method: 'get',
  })
}

//添加
export const addUnit = (unit) => {
  return request({
    url: `${api_name}/addUnit`,
    method: 'post',
    data: unit
  })
}

//修改
export const updateUnit = (unit) => {
  return request({
    url: `${api_name}/updateUnit`,
    method: 'put',
    data: unit
  })
}

//删除
export const deleteUnit = (id) => {
  return request({
    url: `${api_name}/deleteUnit/${id}`,
    method: 'delete',
  })
}