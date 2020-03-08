<template>
  <div id="app">
    <transition name='slide'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style>

</style>
