<template>
  <section v-if="shops">
    <h2>Compras</h2>
    <div class="products-wrapper" v-for="(shop, index) in shops" :key="index">
      <ProductItem v-if="shop.product" :product="shop.product">
        <p class="merchant">
          <span>Vendedor:</span>
          {{ shop.merchant_id }}
        </p>
      </ProductItem>
    </div>
  </section>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";

import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
  components: {
    ProductItem,
  },
  data() {
    return {
      shops: null,
    };
  },
  computed: {
    ...mapState(["user", "login"]),
  },
  methods: {
    getShops() {
      api.get(`/transaction?client_id=${this.user.id}`).then((r) => {
        this.shops = r.data;
      });
    },
  },
  watch: {
    login() {
      this.getShops();
    },
  },
  created() {
    if (this.login) {
      this.getShops();
    }
  },
};
</script>

<style scoped>
.product-wrapper {
  margin-bottom: 40px;
}

.merchant span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>
