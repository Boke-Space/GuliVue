import request from '@/utils/request'
export default {
  //  根据邮箱发送验证码
  sendCode(email) {
    return request({
      url: `/edumsm/msm/sendEamil/${email}`,
      method: 'get'
    })
  },

  //  用户注册
  registerMember(item) {
    return request({
      url: `/educenter/member/register`,
      method: 'post',
      data: item
    })
  }

}
