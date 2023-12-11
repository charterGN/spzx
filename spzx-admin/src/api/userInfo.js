import request from '@/utils/request'

const api_name = '/admin/user/userInfo';

// 分页列表
export const getPageList = (page, limit, searchObj) => {
  return request({
    url: `${api_name}/findByPage/${page}/${limit}`,
    method: 'get',
    params: searchObj,
  })
}

// 获取用户地址
export const findUserAddressByUserId = userId => {
  return request({
    url: `${api_name}/findUserAddressByUserId/${userId}`,
    method: 'get',
  })
}

export const updateStatus = (userId, status) => {
  return request({
    url: `${api_name}/updateStatus/${userId}/{status}`,
    method: 'get',
  })
}