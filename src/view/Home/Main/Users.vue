<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>

      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加用户弹窗 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%">
      <!-- 内容主体区 -->
      <el-form :model="addForm" :rules="addFromRules" ref="addFromRef" lable-width="70px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item  label="用户密码" prop="password">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item  label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 栅格系统 24满 gutter 之间的距离 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <!-- 添加用户 -->
        <el-col :span="2">
          <el-button type="success" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- table -->
      <el-table :data="users" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190px">
          <template slot-scope="scope" style="dispaly:flex">
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
            <el-tooltip
              class="item"
              :enterable="false"
              effect="dark"
              content="分配角色"
              placement="top"
            >
              <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import LoginVue from "../../../components/login/Login.vue";
export default {
  name: "Users",
  data() {
    return {
      // 定义用户获取的参数
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2
      },
      users: [],
      total: 0,
      addDialogVisible: false,
      // 添加用户
      addForm:{username:'',password:'',email:'',mobile:''},
      // 表单验证规则
      addFromRules:{
        username:[{required:true,message:'请输入用户名',trigger:'blur'},{min:3,max:10,message:'用户名长度在3-10',trigger:'blur'}],
        password:[{required:true,message:'请输入密码',trigger:'blur'},{min:6,max:15,message:'用户名长度在6-15',trigger:'blur'}],
        email:[{}],
        mobile:[]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: ret } = await this.$http.get("users", {
        params: this.queryInfo
      });
      if (ret.meta.status !== 200)
        return this.$message.error("获取用户数据失败");
      this.$message.success("用户数据获取成功");
      // console.log(ret.data.total);
      this.users = ret.data.users;
      this.total = ret.data.total;
    },
    // 监听pagesize改变时间
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听页码改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 监听switch开关状态的改变
    async userStateChanged(userInfo) {
      // console.log(userInfo.mg_state);
      const { data: ret } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      );
      if (ret.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state;
        return this.$message.error("修改状态失败");
      }
      this.$message.success("成功修改了用户状态");
    }
  }
};
</script>

<style lang="less" scoped>
.users {
  margin: 30px;
}
</style>