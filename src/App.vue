<template>
  <v-app>
    <v-main class="bg-grey">
      <v-container fluid class="d-flex justify-center align-center fill-height">
        <router-view :doGet="doGet" :doPost="doPost" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { RouterView } from 'vue-router'
import axios from "axios";

export default {
  data() {
    return {
      location: undefined,
      session: undefined,
      snackbar: false,
      snackbarText: '',
    }
  },

  methods: {
    async doRequest(req, retry) {
      let resp = null;
      let options = { ...req, validateStatus: status => [ 200, 201, 400, 401, 403 ].includes(status) };
      if (retry) {
        try {
          resp = await axios(options);
        } catch(e) {
          await new Promise(resolve => setTimeout(resolve, 100));
          return await this.doRequest(req, retry - 1);
        }
      } else {
        resp = await axios(options);
      }

      if (resp.status == 401) {
        document.cookie = 'sessionId=; path=/;';
        window.location.reload();
      } else if (resp.status == 201 || resp.status == 400 || resp.status == 403) {
        while (this.snackbar) await new Promise(resolve => setTimeout(resolve, 100));
        this.snackbarText = resp.data;
        this.snackbar = true;
      } else {
        return resp.data;
      }
    },

    async doGet(api, query = {}, retry = 3) {
      return await this.doRequest({ method: 'get', url: api, params: query }, retry);
    },

    async doPost(api, body = {}, retry = 0) {
      let data = await this.doRequest({ method: 'post', url: api, data: body }, retry);
      if (data && data.message) {
        while (this.snackbar) await new Promise(resolve => setTimeout(resolve, 100));
        this.snackbarText = data.message;
        this.snackbar = true;
      }
      return data;
    }
  }
};
</script>

<style>
body {
  background-color: #000000;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fill-height {
  height: 100vh;
}

.bg-grey {
  background-color: #212121;
}
</style>
