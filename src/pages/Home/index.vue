<template>
  <main>
    <pre>{{ usersFetch.data }}</pre>
  </main>
</template>

<script setup lang="ts">
import {useFetch} from "../../composable/useFetch";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const usersFetch = useFetch<Post[]>({url: 'users'});
</script>