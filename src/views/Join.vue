<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { join } from "@/services/accountService";

const router = useRouter();

const state = reactive({
  form: {
    name: "",
    loginId: "",
    loginPw: "",
  },
});

const submit = async () => {
  const res = await join(state.form);
  if (res.status === 200) {
    alert("회원가입을 축하합니다.");
    await router.push("/");
  }
};
</script>

<template>
  <div class="join">
    <div class="container">
      <form class="py-5 d-flex flex-column gap-3" @submit.prevent="submit">
        <!-- 회원가입 -->
        <h1 class="h5 mb-3">회원가입</h1>
        <!-- 입력창: 이름 -->
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="이름"
            v-model="state.form.name"
          />
          <label for="name">이름</label>
        </div>
        <!-- 입력창: 이메일 -->
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="loginId"
            placeholder="이메일"
            v-model="state.form.loginId"
          />
          <label for="loginId">이메일</label>
        </div>
        <!-- 입력창: 비밀번호 -->
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="loginPw"
            placeholder="패스워드"
            v-model="state.form.loginPw"
            autocomplete="off"
          />
          <label for="loginPw">패스워드</label>
        </div>
        <!-- 회원가입 버튼 -->
        <button class="w-100 h6 btn py-3 btn-primary">회원가입</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.join > .container {
  max-width: 576px;
}
</style>
