<template>
  <main>
    <Readme :doGet="doGet" :doPost="doPost" api="/" />
  </main>
</template>

<script>
import Readme from '../components/readme.vue';

export default {
  components: {
    Readme
  },

  props: {
    doGet: Function,
    doPost: Function
  },

  data() {
    return {};
  }
}
</script>
