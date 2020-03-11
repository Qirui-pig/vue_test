<template>
  <div class="rights">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>

      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == '0'" type="info">一级</el-tag>
            <el-tag v-if="scope.row.level == '1'" type="success">二级</el-tag>
            <el-tag v-if="scope.row.level == '2'" >三级</el-tag>
          </template>
        </el-table-column>

      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Rights",
  data() {
    return {
      rightsList:[]
    }
  },
  created() {
    this.getRightList()
  },
  methods: {
    async getRightList(){
      const { data:ret } = await this.$http.get('rights/list')
      if(ret.meta.status !== 200)return this.$message.error('权限列表请求失败')
      this.$message.success('权限列表请求成功')
      this.rightsList = ret.data
    }


  },
};
</script>

<style lang='less' scoped>
.rights {
  margin: 30px;
}
</style>