<template>
  <section>
    <h2>Endereço de envio</h2>
    <ErrorNotes :erros="erros" />
    <UserForm>
      <button class="btn" @click.prevent="finalizeShop">
        Finalizar compra
      </button>
    </UserForm>
  </section>
</template>

<script>
import { mapState } from "vuex";

import UserForm from "@/components/UserForm.vue";
import ErrorNotes from "./ErrorNotes.vue";
import { api } from "@/services.js";

export default {
  components: {
    UserForm,
    ErrorNotes,
  },
  props: ["produto"],
  data() {
    return {
      erros: [],
    };
  },
  computed: {
    ...mapState(["usuario"]),
    buy() {
      return {
        comprador_id: this.usuario.email,
        vendedor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: {
          cep: this.usuario.cep,
          rua: this.usuario.rua,
          numero: this.usuario.numero,
          bairro: this.usuario.bairro,
          cidade: this.usuario.cidade,
          estado: this.usuario.estado,
        },
      };
    },
  },
  methods: {
    createTransaction() {
      return api.post("/transacao", this.buy).then(() => {
        this.$router.push({ name: "compras" });
      });
    },
    async createUser() {
      try {
        await this.$store.dispatch("createUser", this.$store.state.usuario);
        await this.$store.dispatch("userLogin", this.$store.state.usuario);
        await this.$store.dispatch("getUser");
        await this.createTransaction();
      } catch (error) {
        this.erros.push(error.response.data.message);
      }
    },
    finalizeShop() {
      this.erros = [];
      if (this.$store.state.login) {
        this.createTransaction();
      } else {
        this.createUser();
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 40px 0 20px 0;
}

.btn {
  background: #e80;
}
</style>
