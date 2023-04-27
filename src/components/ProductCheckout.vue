<template>
  <section>
    <h2>Endereço de envio</h2>
    <UserForm>
      <button class="btn" @click.prevent="finalizeShop">
        Finalizar compra
      </button>
    </UserForm>
  </section>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import { api } from "@/services.js";

import { mapState } from "vuex";

export default {
  components: {
    UserForm,
  },
  props: ["product"],
  computed: {
    ...mapState(["user"]),
    buy() {
      return {
        client_id: this.user.email,
        merchant_id: this.product.user_id,
        product: this.product,
        address: {
          cep: this.user.cep,
          street: this.user.street,
          number: this.user.number,
          district: this.user.district,
          city: this.user.city,
          state: this.user.state,
        },
      };
    },
  },
  methods: {
    createTransaction() {
      return api.post("/transaction", this.buy).then(() => {
        this.$router.push({ name: "shops" });
      });
    },
    async createUser() {
      try {
        await this.$store.dispatch("createUser", this.$store.state.user);
        await this.$store.dispatch("getUser", this.$store.state.user.email);
        await this.createTransaction();
      } catch (error) {
        console.log(error);
      }
    },
    finalizeShop() {
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
