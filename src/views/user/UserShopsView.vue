<template>
  <section>
    <div v-if="compras">
      <h2>Compras</h2>
      <div
        class="products-wrapper"
        v-for="(compra, index) in compras"
        :key="index"
      >
        <ProductItem v-if="compra.produto" :produto="compra.produto">
          <p class="merchant">
            <span>Vendedor:</span>
            {{ compra.vendedor_id }}
          </p>
        </ProductItem>
      </div>
    </div>
    <LoadingPage v-else />
  </section>
</template>

<script>
import LoadingPage from "@/components/LoadingPage.vue";
import ProductItem from "@/components/ProductItem.vue";

import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
  components: {
    ProductItem,
    LoadingPage,
  },
  data() {
    return {
      compras: null,
    };
  },
  computed: {
    ...mapState(["usuario", "login"]),
  },
  methods: {
    getShops() {
      api.get(`/transacao?tipo=comprador_id`).then((r) => {
        this.compras = r.data;
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
