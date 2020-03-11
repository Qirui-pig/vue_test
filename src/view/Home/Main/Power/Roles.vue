<template>
  <div class="roles">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>

      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 弹出框 -->
    <el-dialog title="提示"  :visible.sync="showRole" @close="closeTree" width="50%">
      <!-- 树组件 -->
      <el-tree
        :data="roleTree"
        :props="TreeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
        >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showRole = false">取 消</el-button>
        <el-button type="primary" @click="postTree">确 定</el-button>
      </span>
    </el-dialog>
    
    <el-card class="box-card">

      <el-button type="primary">添加角色</el-button>
        </el-col>

      <el-table :data="roles" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- <pre>{{scope.row}}</pre>  -->
            <el-row :class="['bdbottom', index === 0 ? 'bdtop': '','vcenter']" v-for="(item,index) in scope.row.children" :key="item.id">
              <el-col :span="5">
                <el-tag closable>{{item.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row :class="[indey==0?'':'bdtop','vcenter']" v-for="(itemy,indey) in item.children" :key="itemy.id">
                  <el-col :span="6">
                    <el-tag closable type="success">{{itemy.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                      <el-tag closable  @close="removeRightById(scope.row,itemz.id)" type="warning" v-for="itemz in itemy.children" :key="itemz.id">{{itemz.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>

        <el-table-column label="操作" width="300px">
          <template slot-scope="scope" style="dispaly:flex">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
            >编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
            >删除</el-button>
           
              <el-button type="warning" @click="showSetRightsDialog(scope.row)" size="mini" icon="el-icon-setting">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "Roles",
  data() {
    return {
      roles:[],
      roleTree:[],
      showRole:false,
      // 树形控件 绑定对象
      TreeProps:{
        children:'children',
        label: 'authName'
      },
      defKeys:[],
      roleId:'',
    }
  },
  created() {
    this.getRoles()
  },
  methods: {
    async getRoles(){
     const { data:ret } = await this.$http.get('roles')
     if(ret.meta.status !== 200)return this.$message.error('用户角色数据请求失败')
     this.$message.success('用户角色数据请求成功')
     this.roles = ret.data
    },
    async removeRightById(role,Cid){
      // 弹框确认用户删除
      const confirmRet = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).catch(err=>err)
      if(confirmRet!=='confirm'){
        return this.$message.error('取消的删除')
      }
      
      const {data:ret} = await this.$http.delete(`roles/${role.id}/rights/${Cid}`)
      if(ret.meta.status !== 200)return this.$message.error('删除失败')
      this.$message.success('删除成功')
      role.children = ret.data
    },
    async showSetRightsDialog(role){
      // 展示分配权限的对话框
      // 获取所有权限的数据
      const { data:ret } = await this.$http.get('rights/tree')
      if( ret.meta.status !== 200) return this.$message.error('tree获取失败')
      this.$message.success('tree获取成功')
      // 权限树
      this.roleTree = ret.data
      // 为树复选
      this.getLeafKeys(role,this.defKeys)
      // 获取id值
      this.roleId = role.id
      this.showRole = true
    },
    // 通过递归形式获取角色的三级节点
    getLeafKeys(node, arr){
      if(!node.children){
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item,arr)
      })
    },
    closeTree(){
      this.defKeys=[]
    },
    async postTree(){
      const keys =[
         ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const idStr = keys.join(',')
      const { data:ret } = await this.$http.post(`roles/${this.roleId}/rights`,{rids:idStr})
      if( ret.meta.status !== 200 )return this.$message.error('数据保存失败')
      this.$message.success('数据保存成功')

      this.showRole = false

      this.getRoles()
    }
  },
};
</script>

<style lang="less" scoped>
.roles {
  margin: 30px;
}
.el-tag{
  margin: 7px;
}
.bdtop{
  border-top: 1px solid #eee;
}
.bdbottom{
  border-bottom: 1px solid #eee;
}
.vcenter{
  display: flex;
  align-items: center;
}
</style>