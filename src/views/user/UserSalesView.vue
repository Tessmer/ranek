<template>
  <section>
    <div v-if="vendas">
      <h2>Vendas</h2>
      <div
        class="products-wrapper"
        v-for="(venda, index) in vendas"
        :key="index"
      >
        <ProductItem v-if="venda.produto" :produto="venda.produto">
          <p class="client">
            <span>Comprador:</span>
            {{ venda.comprador_id }}
          </p>
        </ProductItem>
        <div class="delivery">
          <h3>Entrega:</h3>
          <ul v-if="venda.endereco">
            <li v-for="(value, key) in venda.endereco" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <LoadingPage v-else />
  </section>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import LoadingPage from "@/components/LoadingPage.vue";

import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
  components: {
    ProductItem,
    LoadingPage,
  },
  data() {
    return {
      vendas: null,
    };
  },
  computed: {
    ...mapState(["usuario", "login"]),
  },
  methods: {
    getSales() {
      api.get(`/transacao?tipo=vendedor_id`).then((r) => {
        this.vendas = r.data;
      });
    },
  },
  watch: {
    login() {
      this.getSales();
    },
  },
  created() {
    if (this.login) {
      this.getSales();
    }
  },
};
</script>

<style scoped>
.product-wrapper {
  margin-bottom: 40px;
}

.client span {
  color: #e80;
}

.delivery {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  margin: 0;
  justify-self: end;
}

@media screen and (max-width: 500px) {
  .delivery {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }

  h3 {
    justify-self: start;
  }
}
</style>
