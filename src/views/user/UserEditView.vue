<template>
  <section>
    <UserForm>
      <button class="btn" @click.prevent="updateUser">Editar</button>
    </UserForm>
    <ErrorNotes :erros="erros" />
  </section>
</template>

<script>
import ErrorNotes from "@/components/ErrorNotes.vue";
import UserForm from "@/components/UserForm.vue";

import { api } from "@/services.js";

export default {
  components: {
    UserForm,
    ErrorNotes,
  },
  data() {
    return {
      erros: [],
    };
  },
  methods: {
    updateUser() {
      this.erros = [];
      api
        .put(`/usuario`, this.$store.state.usuario)
        .then(() => {
          this.$store.dispatch("getUser");
          this.$router.push({ name: "usuario" });
        })
        .catch((error) => {
          this.erros.push(error.response.data.message);
        });
    },
  },
};
</script>

<style></style>
