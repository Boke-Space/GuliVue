<template>
  <div class="main">
    <div class="title">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="params">

        <el-form-item :rules="[{ required: true, message: '请输入你的昵称', trigger: 'blur' }]" class="input-prepend restyle" prop="nickname">
          <div>
            <el-input v-model="params.nickname" type="text" placeholder="你的昵称"/>
            <i class="iconfont icon-user"/>
          </div>
        </el-form-item>

        <el-form-item :rules="[{ required: true, message: '请输入手机', trigger: 'blur' }]" class="input-prepend restyle no-radius" prop="eamil">
          <div>
            <el-input v-model="params.mobile" type="text" placeholder="手机"/>
            <i class="iconfont icon-phone"/>
          </div>
        </el-form-item>

        <el-form-item :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]" class="input-prepend restyle no-radius" prop="code">
          <div style="width: 100%;display: block;float: left;position: relative">
            <el-input v-model="params.code" type="text" placeholder="验证码"/>
            <i class="iconfont icon-phone"/>
          </div>
          <div class="btn" style="position:absolute;right: 0;top: 6px;width: 40%;">
            <a :value="codeTest" href="javascript:" type="button" style="border: none;background-color: none" @click="getCodeFun()">{{ codeTest }}</a>
          </div>
        </el-form-item>

        <el-form-item :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]" class="input-prepend" prop="password">
          <div>
            <el-input v-model="params.password" type="password" placeholder="设置密码"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-up-button" value="注册" @click="submitRegister()">
        </div>
        <p class="sign-up-msg">
          点击 “注册” 即表示您同意并愿意遵守简书
          <br>
          <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">用户协议</a>
          和
          <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a> 。
        </p>
      </el-form>
      <!-- 更多注册方式 -->
      <div class="more-sign">
        <h6>社交帐号直接注册</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://huaan.free.idcfengye.com/api/ucenter/wx/login"><i
            class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import '~/assets/css/sign.css'
// import '~/assets/css/iconfont.css'
import register from '../api/register'

export default {
  layout: 'sign',
  data() {
    return {
      params: { // 封装注册输入数据
        mobile: '',
        code: '', // 验证码
        nickname: '',
        password: ''
      },
      sending: true, // 是否发送验证码
      second: 60, // 倒计时间
      codeTest: '获取验证码'
    }
  },
  methods: {
    checkEmail(rule, value, callback) {
      if (!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value))) {
        return callback(new Error('郵箱格式不正确'))
      }
      return callback()
    },
    // 倒计时
    timeDown() {
      const result = setInterval(() => {
        --this.second
        this.codeTest = this.second
        if (this.second < 1) {
          clearInterval(result)
          this.sending = true
          // this.disabled = false;
          this.second = 60
          this.codeTest = '获取验证码'
        }
      }, 1000)
    },
    // 注册提交
    submitRegister() {
      register.registerMember(this.params)
        .then(() => {
        // 提示注册成功
          this.$message({
            type: 'success',
            message: '注册成功'
          })
          this.$router.push({ path: '/login' })
        })
    },
    // 通过输入邮箱发送验证码
    getCodeFun() {
      register.sendCode(this.params.mobile)
        .then(() => {
          // 调用倒计时方法
          this.sending = false
          this.timeDown()
        })
    }
  }
}
</script>
