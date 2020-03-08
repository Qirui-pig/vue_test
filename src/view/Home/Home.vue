<template>
  <div id="home">
    <el-button type="info" @click="out">退出</el-button>
  </div>  
</template>

<script>
export default {
  name:'Home',
  methods: {
    out(){
      window.sessionStorage.clear()
      this.$router.push('./login')
    }
  },

}
</script>

<style>

</style>