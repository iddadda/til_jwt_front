<script setup>
import { getItems, removeItem, removeAll } from "@/services/cartService";
import { onMounted, reactive, computed } from "vue";
import { useAccountStore } from "@/stores/account";
import { useRouter } from "vue-router";

const account = useAccountStore();
const router = useRouter();

// 반응형 상태
const state = reactive({
  items: [],
});

// 장바구니 상품 조회
const load = async () => {
  if (account.state.loggedIn === false) {
    alert("로그인하세요");
    router.push("/");
  }
  const res = await getItems();
  if (res === undefined || res.status !== 200) {
    return;
  }
  state.items = res.data;
};

onMounted(() => {
  load();
});

// 장바구니 상품 삭제
const remove = async (cartId) => {
  if (confirm("삭제하시겠습니까?")) {
    const res = await removeItem(cartId);
    if (res === undefined || res.status !== 200) {
      return;
    }
  }
  // 다시 리로딩 or 방금 삭제한 객체만 state.items에서 삭제한다
  load();
};

// 장바구니 전체 비우기
const clear = async () => {
  if (confirm("장바구니를 비우겠습니까?")) {
    const res = await removeAll();
    if (res === undefined || res.status !== 200) {
      return;
    }
  }
  state.items = [];
};

// 장바구니 합계액
const computedTotalPrice = computed(() => {
  let result = 0;
  state.items.forEach((i) => {
    result += i.price - (i.price * i.discountPer) / 100;
  });
  return result;
});

const computedTotalItem = computed(() => {
  let result = 0;
  state.items.forEach((i) => {
    result++;
  });
  return result;
});
</script>

<template>
  <div class="cart">
    <div class="container">
      <template v-if="state.items.length">
        <div class="d-flex justify-content-end">
          <button @click="clear" class="btn btn-danger mt-5">
            장바구니 비우기
          </button>
        </div>
        <ul class="items">
          <li v-for="i in state.items" :key="i.id">
            <img :src="`pic/item/${i.imgPath}`" :alt="`상품 사진(${i.name})`" />
            <b class="name">{{ i.name }}</b>
            <span class="price">
              {{
                (i.price - (i.price * i.discountPer) / 100).toLocaleString()
              }}원
            </span>
            <span class="remove float-end" @click="remove(i.id)" title="삭제"
              >&times;</span
            >
          </li>
        </ul>
        <div class="total_order">
          <div>
            <b>수량: </b>
            <span> {{ computedTotalItem }}개</span>
          </div>
          <div>
            <b> 총 금액: </b>
            <span> {{ computedTotalPrice.toLocaleString() }}원</span>
          </div>
        </div>
        <div class="act">
          <router-link to="/order" class="btn btn-dark">주문하기</router-link>
        </div>
      </template>
      <div class="text-center py-5" v-else>장바구니가 비었습니다.</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  font-size: 20px;

  .items {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    border: 1px solid #eee;
    margin-top: 25px;
    margin-bottom: 25px;
  }

  img {
    width: 150px;
    height: 150px;
  }

  .name {
    margin-left: 25px;
  }

  .price {
    margin-left: 25px;
  }

  .remove {
    cursor: pointer;
    font-size: 30px;
    padding: 5px 15px;
  }

  .total_order {
    display: flex;
    flex-direction: column;
    margin: 25px 0 20px 0;
  }
}

.act .btn {
  width: 300px;
  display: block;
  margin: 0 auto;
  padding: 30px 50px;
  font-size: 20px;
}
</style>
