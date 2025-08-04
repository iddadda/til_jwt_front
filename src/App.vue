<script setup>
import Header from "@/components/Header.vue";
import Footer from "./components/Footer.vue";

// // 로그인 여부 확인
// const checkAccount = async () => {
//   console.log("로그인 체크");
//   const res = await check();
//   if (res === undefined || res.status != 200) {
//     account.setChecked(false);
//     return;
//   }
//   account.setChecked(true);
//   account.setLoggedIn(res.data > 0);
// };
// onMounted(() => {
//   checkAccount();
// });
// // path가 바뀔때마다 2번째 인자가 호출됨
// watch(
//   () => route.path,
//   () => {
//     checkAccount();
//   }
// );
</script>

<template>
  <Header />
  <router-view />
  <Footer />
</template>

<style scoped></style>
