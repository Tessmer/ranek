<template>
  <section>
    <h2>Crie sua conta</h2>
    <ErrorNotes :erros="erros" />
    <transition mode="out-in">
      <button v-if="!create" class="btn" @click="create = true">
        Criar conta
      </button>
      <UserForm v-else>
        <button class="btn btn-form" @click.prevent="createUser">
          Criar usuário
        </button>
      </UserForm>
    </transition>
  </section>
</template>

<script>
import UserForm from "../components/UserForm.vue";
import ErrorNotes from "./ErrorNotes.vue";

export default {
  components: {
    UserForm,
    ErrorNotes,
  },
  data() {
    return {
      create: false,
      erros: [],
    };
  },
  methods: {
    async createUser() {
      this.erros = [];
      try {
        await this.$store.dispatch("createUser", this.$store.state.usuario);
        await this.$store.dispatch("userLogin", this.$store.state.usuario);
        await this.$store.dispatch("getUser");
        this.$router.push({ name: "usuario" });
      } catch (error) {
        this.erros.push(error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin: 40px 0 10px 0;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>
