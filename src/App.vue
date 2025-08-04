<script setup>
import Header from "@/components/Header.vue";
import Footer from "./components/Footer.vue";
import { watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { check } from "./services/accountService";
import { useAccountStore } from "./stores/account";

const route = useRoute();
const account = useAccountStore();

// 로그인 여부 확인
const checkAccount = async () => {
  console.log("로그인 체크");
  const res = await check();
  if (res === undefined || res.status != 200) {
    account.setChecked(false);
    return;
  }
  account.setChecked(true);
  account.setLoggedIn(res.data > 0);
};
onMounted(() => {
  checkAccount();
});
// path가 바뀔때마다 2번째 인자가 호출됨
watch(
  () => route.path,
  () => {
    checkAccount();
  }
);
</script>

<template>
  <template v-if="account.state.checked">
    <Header />
    <router-view />
    <Footer />
  </template>
  <template v-else> 서버 통신 오류 </template>
</template>

<style scoped></style>
