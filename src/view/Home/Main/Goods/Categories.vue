<template>
  <div class="cate">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>

      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-button type="primary">新增分类</el-button>

      <tree-table
        :data="Cate"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        :show-row-hover="false"
        border
        style="width:1000px"
        class="tree-table"
      >
        <template slot="isok" slot-scope="scope">
          <i class="el-icon-check" v-if="scope.row.cat_deleted == false" style="color:green"></i>
          <i class="el-icon-close" v-else style="color:red"></i>
        </template>
        <template slot="sort" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level == 1" type="success">二级</el-tag>
          <el-tag v-else type="warning">三级</el-tag>
        </template>
        <template slot="operate" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </tree-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Categories",
  data() {
    return {
      Cate: [],
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      // table 指定列的定义
      columns: [
        { label: "分类名称", prop: "cat_name" },
        // 模板列        表示模板名称
        {
          label: "是否有效",
          prop: "cat_deleted",
          type: "template",
          template: "isok",
          align: "center"
        },
        {
          label: "排序",
          prop: "cat_level",
          type: "template",
          template: "sort",
          align: "center"
        },
        {
          label: "操作",
          type: "template",
          template: "operate",
          align: "center"
        }
      ]
    };
  },
  created() {
    this.getCate();
  },
  methods: {
    async getCate() {
      const { data: ret } = await this.$http.get("categories", {
        params: this.queryInfo
      });
      if (ret.meta.status == 200){
      //   return this.$message.error("商品分类获取失败");
      // this.$message.success("商品分类获取成功");
      // console.log(ret);
      this.total = ret.data.total;
      this.Cate = ret.data.result;}
    },
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getCate();
    },
    handleCurrentChange(newNum){
      this.queryInfo.pagenum = newNum
      this.getCate();
    }
  }
};
</script>

<style lang="less" scoped>
.cate {
  margin: 30px;
}
.tree-table{
  margin-top: 15px;
}
</style>