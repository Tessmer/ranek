<template>
  <form>
    <div class="user" v-if="showLoginData">
      <label for="name">Nome</label>
      <input id="name" name="name" type="text" v-model="name" />
      <label for="email">E-mail</label>
      <input id="email" name="email" type="text" v-model="email" />
      <label for="password">Senha</label>
      <input id="password" name="password" type="text" v-model="password" />
    </div>

    <label for="cep">CEP</label>
    <input id="cep" name="cep" type="number" v-model="cep" @keyup="fillCep" />
    <label for="street">Rua</label>
    <input id="street" name="street" type="text" v-model="street" />
    <label for="number">Número</label>
    <input id="number" name="number" type="text" v-model="number" />
    <label for="district">Bairro</label>
    <input id="district" name="district" type="text" v-model="district" />
    <label for="city">Cidade</label>
    <input id="city" name="city" type="text" v-model="city" />
    <label for="state">Estado</label>
    <input id="state" name="state" type="text" v-model="state" />
    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
import { mapFields } from "@/helpers.js";
import { getCep } from "@/services.js";

export default {
  computed: {
    ...mapFields({
      fields: [
        "name",
        "email",
        "password",
        "street",
        "cep",
        "number",
        "district",
        "city",
        "state",
      ],
      base: "user",
      mutation: "UPDATE_USER",
    }),
    showLoginData() {
      return !this.$store.state.login || this.$route.name === "user-edit";
    },
  },
  methods: {
    fillCep() {
      const cep = this.cep.replace(/\D/g, "");
      if (cep.length === 8) {
        getCep(cep).then((r) => {
          this.street = r.data.logradouro;
          this.district = r.data.bairro;
          this.state = r.data.uf;
          this.city = r.data.localidade;
        });
      }
    },
  },
};
</script>

<style scoped>
form,
.user {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.user {
  grid-column: 1/3;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>
