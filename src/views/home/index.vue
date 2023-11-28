<script setup lang="ts">
import HelloWorld from "../../components/HelloWorld.vue";
import { exampleAPI } from "@/api/hello";
exampleAPI().then((res) => {
  console.log("getData: ", res);
  const { data } = res;
  console.log("list: ", data);
});
</script>

<template>
  <div>
    <HelloWorld msg="Vite + Vue + Tailwindcss + TypeScript" />
  </div>
</template>
