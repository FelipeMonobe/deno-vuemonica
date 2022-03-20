<script lang="ts" setup>
import { ref } from "vue";

const titulo = ref("Título");
</script>

<template>
<h1 class="h1red">{{ titulo }}</h1>
<input type="text" v-model="titulo" />
</template>

<style scoped>
.h1red {
  color: red;
}
</style>