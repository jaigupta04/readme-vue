<template>
  <v-card class="github-form" max-width="400px" style="margin: 0 auto;">
    <v-card-text>
      <v-form @submit.prevent="submit">

        <v-text-field
          v-model="githubId"
          label="GitHub ID"
          variant="outlined"
          required
          class="white-text-field"
        />
        <v-text-field
          v-model="repoName"
          label="Repository Name"
          variant="outlined"
          required
          class="white-text-field"
        />
        <v-text-field
          v-model="branchName"
          label="Branch Name"
          variant="outlined"
          required
          class="white-text-field"
        />
        <v-text-field
          v-model="fileName"
          label="File Name"
          variant="outlined"
          required
          class="white-text-field"
        />

      <v-divider color="white"></v-divider>

      <div class="button-wrapper white-text-field">
        <v-btn type="submit" color="#4969ED" rounded>
          Generate README
        </v-btn>
      </div>

    </v-form>
  </v-card-text>
  </v-card>
</template>

<script>
export default {

  props: {
    doGet: Function,
    doPost: Function,
    api: String
  },

  data() {
    return {
      githubId: null,
      repoName: null,
      branchName: null,
      fileName: null,
    };
  },

  methods: {
    async submit() {
      if (this.githubId === null || this.repoName === null || this.branchName === null || this.fileName === null) {
        alert('Please Fill Amount Properly.');
        return; 
      }

      const resp = await this.doGet('/api' + this.api, {
        githubId: this.githubId,
        repoName: this.repoName,
        branchName: this.branchName,
        fileName: this.fileName,
      });
    },
  },
};
</script>

<style scoped>

.github-form {
  background-color: #040D21;
  border-radius: 6px;
  padding: 20px;
  border-radius: 10px !important;
}

.btn-primary {
  background-color: #4969ED;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.button-wrapper {
  margin-top: 15px; 
  display: flex;
  justify-content: center;
}

.white-text-field {
  color: white;
  font-weight: bold;
}
</style>
