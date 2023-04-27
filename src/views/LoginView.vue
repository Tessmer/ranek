<template>
  <section class="login">
    <h1>Login</h1>

    <form>
      <label for="email">E-mail</label>
      <input type="email" name="email" id="email" v-model="login.email" />
      <label for="password">Senha</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="login.password"
      />
      <button class="btn" @click.prevent="logar">Logar</button>
    </form>
    <p class="lost"><a href="/" target="_blank">Perdeu a senha?</a></p>
    <CreateAccount />
  </section>
</template>

<script>
import CreateAccount from "@/components/CreateAccount.vue";

export default {
  components: {
    CreateAccount,
  },
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    logar() {
      this.$store.dispatch("getUser", this.login.email);
      this.$router.push({ name: "user" });
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}

form {
  display: grid;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.lost {
  text-align: center;
  margin: 20px auto 0 auto;
}

.lost a:hover {
  color: #87f;
  text-decoration: underline;
}
</style>
