<script lang="ts" setup>
import { ref } from "vue";

const titulo = ref("Título");
</script>

<template>
<h1 class="h1green">{{ titulo }}</h1>
<input type="text" v-model="titulo" />
</template>

<style scoped>
.h1green {
  color: red;
}
</style>