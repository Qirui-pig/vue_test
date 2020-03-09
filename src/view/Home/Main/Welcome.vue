<template>
  <div class="welcome">
    <div>
      <p>欢迎回来</p>
      <p>{{date}}</p>
    </div>
  </div>  
</template>

<script>
export default {
  name:'Welcome',
  data() {
    return {
      date: new Date().toLocaleString()
    }
  },
}
</script>

<style lang='less' scoped>
.welcome{
  height: 100%;
  margin:0;
  background-image: url('../../../assets/img/home.jpg');
  background-position: center;
  background-size: cover;
  position: relative;
  div{
    width: 400px;
    height: 200px;
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translateX(-50%) translateY(-50%);
    p{
    font-size: 24px;
    color: #fff;}
  }
}


</style>