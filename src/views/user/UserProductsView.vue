<template>
  <section>
    <h2>Adicionar produto</h2>
    <AddProduct />
    <h2>Seus produtos</h2>
    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in usuario_produtos" :key="index">
        <ProductItem :produto="produto">
          <p>{{ produto.descricao }}</p>
          <button class="delete" @click="deleteProduct(produto.id)">
            Deletar
          </button>
        </ProductItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import AddProduct from "@/components/AddProduct.vue";
import ProductItem from "@/components/ProductItem.vue";

import { api } from "@/services.js";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    AddProduct,
    ProductItem,
  },
  computed: {
    ...mapState(["login", "usuario", "usuario_produtos"]),
  },
  methods: {
    ...mapActions(["getUserProducts"]),
    deleteProduct(id) {
      const confirm = window.confirm("Deseja remover este produto?");

      if (confirm) {
        api
          .delete(`/produto/${id}`)
          .then(() => {
            this.getUserProducts();
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    },
  },
  watch: {
    login() {
      this.getUserProducts();
    },
  },
  created() {
    if (this.login) {
      this.getUserProducts();
    }
    document.title = "Usuário | Produtos";
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.delete {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url("../../assets/remove.svg") no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}
</style>
