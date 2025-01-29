<template>
  <main>
    <h1 style="text-align: center; margin: 40px 0;">Dashboard</h1>
    <pre v-if="!boardsFetch.isLoading">{{ boardsFetch.isLoading }}</pre>
    <div
        v-else
        style="display: grid; grid-template-columns: repeat(3, 1fr); max-width: fit-content; gap: 36px; margin:auto;"
    >
      <RouterLink v-for="item in boardsFetch.data.value" :to="`/${item.id}`">
        <a-card :title="`${item?.id}. ${item?.name}`" style="width: 300px">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>

          <div style="display: flex; gap: 16px;">
            <a-button>
              Edit
            </a-button>
            
            <a-button>
              Delete
            </a-button>
          </div>
        </a-card>
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import {useFetch} from "../../composable/useFetch";
// import {EditOutlined} from '@ant-design/icons-vue';

type Boards = {
  id: number;
  name: string;
};

const boardsFetch = useFetch<Boards[]>({url: 'boards'});
</script>