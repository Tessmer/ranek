import Vue from "vue";
import Vuex from "vuex";

import { api } from "@/services.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
    usuario_produtos: null,
  },
  getters: {},
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USER(state, payload) {
      state.usuario = Object.assign(state.usuario, payload);
    },
    UPDATE_USER_PRODUCTS(state, payload) {
      state.usuario_produtos = payload;
    },
    ADD_USER_PRODUCTS(state, payload) {
      state.usuario_produtos.unshift(payload);
    },
  },
  actions: {
    getUserProducts(context) {
      return api
        .get(`/produto?usuario_id=${context.state.usuario.id}`)
        .then((r) => {
          context.commit("UPDATE_USER_PRODUCTS", r.data);
        });
    },
    getUser(context) {
      return api.get(`/usuario`).then((r) => {
        context.commit("UPDATE_USER", r.data);
        context.commit("UPDATE_LOGIN", true);
      });
    },
    createUser(context, payload) {
      context.commit("UPDATE_USER", { id: payload.email });
      return api.post(`/usuario`, payload);
    },
    userLogin(context, payload) {
      return api
        .login({
          username: payload.email,
          password: payload.senha,
        })
        .then((r) => {
          window.localStorage.token = `Bearer ${r.data.token}`;
        });
    },
    userLogout(context) {
      context.commit("UPDATE_USER", {
        id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      });
      window.localStorage.removeItem("token");
      context.commit("UPDATE_LOGIN", false);
    },
  },
  modules: {},
});
