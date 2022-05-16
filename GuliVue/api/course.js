import request from '@/utils/request'
export default {
  //  分页查询课程
  getCourseList(page, limit, searchObj) {
    return request({
      url: `/eduservice/coursefront/getCourseFrontList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

  //  查询所有分类
  getAllSubject() {
    return request({
      url: `/eduservice/subject/getAllSubject`,
      method: 'get'
    })
  },

  //  获取课程详情
  getCourseInfo(courseId) {
    return request({
      url: `/eduservice/coursefront/getCourseFrontInfo/${courseId}`,
      method: 'get'
    })
  }
}
