<script lang="ts" setup>
import { ref } from "vue";

const titulo = ref("Título");
</script>

<template>
<h1>{{ titulo }}</h1>
<input v-model="titulo" type="text" class="form-control" />
</template>
