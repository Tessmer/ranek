<template>
  <section>
    <div v-if="produto" class="product">
      <ul class="photos">
        <li v-for="(foto, index) in produto.fotos" :key="index">
          <img :src="foto.src" :alt="foto.titulo" />
        </li>
      </ul>
      <div class="info">
        <h1>{{ produto.nome }}</h1>
        <p class="price">{{ produto.preco | priceNumber }}</p>
        <p class="description">{{ produto.descricao }}</p>
        <transition v-if="produto.vendido === 'false'" mode="out-in">
          <button class="btn" v-if="!finalizar" @click="finalizar = true">
            Comprar
          </button>
          <ProductCheckout v-else :produto="produto" />
        </transition>
        <button v-else class="btn btn-disabled" disabled>
          Produto vendido
        </button>
      </div>
    </div>
    <LoadingPage v-else />
  </section>
</template>

<script>
import { api } from "@/services.js";

import ProductCheckout from "@/components/ProductCheckout.vue";

export default {
  props: ["id"],
  components: {
    ProductCheckout,
  },
  data() {
    return {
      produto: null,
      finalizar: false,
    };
  },
  methods: {
    getProduct() {
      api.get(`/produto/${this.id}`).then((r) => {
        this.produto = r.data;
      });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.price {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.photos {
  grid-row: 1 / 3;
}

.info {
  position: sticky;
  top: 20px;
}

.description {
  font-size: 1.2rem;
}

.btn {
  margin-top: 60px;
  width: 200px;
}

img {
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  border-radius: 4px;
}

@media screen and (max-width: 500px) {
  .product {
    grid-template-columns: 1fr;
  }
  .photos {
    grid-row: 2;
  }
  .info {
    position: initial;
  }
}
</style>
