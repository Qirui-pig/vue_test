<template>
  <div class="login_container">
    <vueCanvasNest class="canvas" :config="{color:'139,0,139',zIndex: 120, count: 508}"></vueCanvasNest>
    <div class="login_box">

      <div class="avatar_box">
        <img src="../../assets/img/2.jpg" alt />
      </div>

      <el-form ref="LoginFormRef" :rules="LoginRules"  :model="LoginForm"  label-width="0px" class="login_main">

        <el-form-item  prop="username"> 
          <el-input v-model="LoginForm.username" 
          prefix-icon="iconfont icon-user"
          placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item  prop="password">
          <el-input v-model="LoginForm.password" 
          prefix-icon="iconfont icon-3702mima"
          placeholder="请输入密码"
          type="password"
          ></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="enter" plain>登陆</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      

    </div>
  </div>
</template>

<script>
import vueCanvasNest from 'vue-canvas-nest'

export default {
  name: "Login",
  components:{
    vueCanvasNest
  },
  data() {
    return {
      LoginForm:{
        username:'admin',
        password:'123456'
      },
      LoginRules:{
        username:[{required: true, message: '请输入用户名', trigger: 'blur'},
        { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }],
        password:[{required: true, message: '密码不能为空', trigger: 'blur'}]
      }
    }
  },
  methods: {
    reset(){
      this.$refs.LoginFormRef.resetFields()
    },
    enter(){
      this.$refs.LoginFormRef.validate(async valid=>{
        if(!valid)return;
        
        const { data:ret } = await this.$http.post('login',this.LoginForm)

        if(ret.meta.status !== 200) return this.$message.error('登陆失败')
        this.$message.success('登陆成功')

        // 登陆后把token 保存到客户端的sessionStorage中
          // token 只在网站打开期间有效 所以保存在sessionStorage中
        // console.log(data.data.token);
        window.sessionStorage.setItem('token',ret.data.token)
        
        // 跳转
        this.$router.push('/home')
      })
    }

  },

};
</script>

<style lang="less" scoped>
.login_container {
  // background-color: #eee;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: skyblue;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.avatar_box {
  width: 130px;
  height: 130px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login_main{
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
}
.btns{
  display: flex;
  justify-content: flex-end;
}
.canvas{
  background-color: rgba(130,206,235, 0.7);
}
</style>