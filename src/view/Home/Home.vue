<template>
  <el-container class="home">
    <el-header>
      <div class="nav_left">
        <img src="../../assets/img/3.png" alt />
        <span>Yours Manage System</span>
      </div>
      <el-button type="info" @click="out">退出</el-button>
    </el-header>

    <el-container>

      <el-aside :width="isActive?'64px':'200px'">
        <div class="toggle-buttom"  @click="toggleCollapse">|||</div>

        <el-menu :collapse='isActive' class="munu" text-color='#fff' 
        background-color="#333744" unique-opened :collapse-transition='false'
        router :default-active="ActivePath"
        >

          <el-submenu v-for="item in menuList" :key="item.id" :index="item.id+''">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i><span>{{item.authName}}</span>
            </template>


              <el-menu-item :index="'/'+childrenItem.path" 
              v-for="childrenItem in item.children" :key='childrenItem.id'
              @click="SavaNavState('/'+childrenItem.path)"
              >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{childrenItem.authName}}</span>
                </template>
              </el-menu-item>
            
          </el-submenu>


        </el-menu>
      </el-aside>

      <el-main>

          <router-view></router-view>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  created() {
    this.getMenuList()
    this.ActivePath = window.sessionStorage.getItem('path')
  }, 
  data() {
    return {
      menuList:[],
      iconsObj:{
        '125':'iconfont icon-user',
        '103':'iconfont icon-showpassword',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-tijikongjian'
      },
      isActive:false,
      ActivePath:''
    }
  },
  methods: {
    out() {
      window.sessionStorage.clear();
      this.$router.push("./login");
    },
    async getMenuList(){
      const {data:ret} = await this.$http.get('menus')
      if(ret.meta.status !== 200)return this.$message.error('请登陆')
      this.$message.success('成功获取列表')
      this.menuList = ret.data
    },
    toggleCollapse(){
      this.isActive = !this.isActive
    },
    SavaNavState(path){
      window.sessionStorage.setItem('path',path)
      this.ActivePath = path
    }
  },
  
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
.el-header {
  background-color: #333744;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: white;
  font-size: 24px;
  user-select:none;

  .nav_left {
    margin-left: 10px;
    display: flex;
    align-items: center;
    user-select:none;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
}
.el-aside {
  background-color: #333744;
  user-select:none;
  .el-menu{
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
  padding: 0;
  margin: 0;
  border: 0;
}
.iconfont{
  margin-right: 10px;
  font-size: 20px;
}
.toggle-buttom{
  background-color: #4a5064;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>