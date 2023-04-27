<template>
  <section>
    <h2>Crie sua conta</h2>
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
export default {
  components: {
    UserForm,
  },
  data() {
    return {
      create: false,
    };
  },
  methods: {
    async createUser() {
      try {
        await this.$store.dispatch("createUser", this.$store.state.user);
        await this.$store.dispatch("getUser", this.$store.state.user.email);
        this.$router.push({ name: "user" });
      } catch (error) {
        console.log(error);
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
