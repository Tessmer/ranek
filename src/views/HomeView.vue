<template>
  <section>
    <h1>Compre ou venda</h1>
    <SearchProducts />
    <ProductsList />
  </section>
</template>

<script>
import SearchProducts from "@/components/SearchProducts.vue";
import ProductsList from "@/components/ProductsList.vue";

export default {
  components: {
    SearchProducts,
    ProductsList,
  },
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #87f;
  margin-top: 40px;
  text-align: center;
}
</style>
