<script setup>
import { getItems } from "@/services/itemService";
import { onMounted, reactive } from "vue";
import Card from "@/components/Card.vue";

const state = reactive({
  items: [],
});

onMounted(async () => {
  const res = await getItems();
  if (res.status !== 200) {
    return;
  }
  console.log(res.data);
  state.items = res.data;
});
</script>

<template>
  <div class="home">
    <div class="album py-5 bg-light">
      <div class="container">
        <!-- 반응형이 적용된 클래스 xlarge면 3칸, large면 2칸, 그것보다 작으면 1칸 -->
        <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-3">
          <div class="col" v-for="item in state.items" :key="item.id">
            <Card :item="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
