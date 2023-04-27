<template>
  <section class="user">
    <nav class="sidenav">
      <ul>
        <li>
          <router-link :to="{ name: 'usuario' }">Produtos</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'compras' }">Compras</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'vendas' }">Vendas</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'usuario-editar' }"
            >Editar usuário</router-link
          >
        </li>
        <li>
          <button @click.prevent="logout">Sair</button>
        </li>
      </ul>
    </nav>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  methods: {
    logout() {
      const confirm = window.confirm("Deseja sair da conta?");

      if (confirm) {
        this.$store.dispatch("userLogout");
        this.$router.push("/login");
      } else {
        return;
      }
    },
  },
  created() {
    document.title = "Usuário";
  },
};
</script>

<style scoped>
.user {
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr;
  max-width: 900px;
  margin: 40px auto;
  grid-gap: 30px;
  padding: 20px;
}

@media screen and (max-width: 500px) {
  .user {
    grid-template-columns: 1fr;
    margin: 0px auto;
  }
}

.sidenav a,
.sidenav button {
  display: block;
  padding: 10px;
  background: #f4f7f5;
  margin-bottom: 10px;
  border-radius: 4px;
}

.sidenav a.router-link-exact-active,
.sidenav a:hover,
.sidenav button:hover {
  background: #87f;
  color: #fff;
}

.sidenav button {
  border: none;
  width: 100%;
  font-size: 1rem;
  text-align: left;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  cursor: pointer;
}
</style>
