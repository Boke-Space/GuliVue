<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">

        <el-form-item :rules="[{ required: true, message: '请输入手机', trigger: 'blur' }]" class="input-prepend restyle" prop="mobile">
          <div>
            <el-input v-model="user.mobile" type="text" placeholder="手机"/>
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]" class="input-prepend" prop="password">
          <div>
            <el-input v-model="user.password" type="password" placeholder="密码"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://qy.free.idcfengye.com/api/ucenter/weixinLogin/login"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
// import '~/assets/css/sign.css'
// import '~/assets/css/iconfont.css'
import cookie from 'js-cookie'
import login from '../api/login'
export default {
  layout: 'sign',

  data() {
    return {
      user: {
        mobile: '',
        password: ''
      },
      loginInfo: {}
    }
  },

  methods: {
    checkEamil(rule, value, callback) {
      if (!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value))) {
        return callback(new Error('郵箱格式不正确'))
      }
      return callback()
    },
    //  登录
    submitLogin() {
      login.submitLogin(this.user)
        .then(response => {
          // 获取token存放到cookie中
          cookie.set('guli_token', response.data.data.token, { domain: 'localhost' }) //  domain 作用范围
          //  获取用户信息存储到cookie中
          login.getUserInfo()
            .then(response => {
              this.loginInfo = JSON.stringify(response.data.data.userInfo)
              cookie.set('guli_ucenter', this.loginInfo, { domain: 'localhost' }) //  domain 作用范围
              window.location.href = '/'
            })
        })
    }
  }
}
</script>
<style>
.el-form-item__error{
  z-index: 9999999;
}
</style>
