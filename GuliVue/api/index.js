import request from '@/utils/request'
export default {
  //  查询热门课程和老师
  getIndexList() {
    return request({
      url: `/eduservice/indexfront/index`,
      method: 'get'
    })
  }
}
