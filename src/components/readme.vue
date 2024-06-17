<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="github-form" max-width="400px">
      <v-card-text>
        <v-form @submit.prevent="submit">

          <v-text-field
            v-model="githubId"
            label="GitHub ID"
            variant="outlined"
            required
            class="white-text-field"
            :placeholder="getPlaceholder('GitHub ID')"
          />
          <v-text-field
            v-model="repoName"
            label="Repository Name"
            variant="outlined"
            required
            class="white-text-field"
            :placeholder="getPlaceholder('Repository Name')"
          />
          <v-text-field
            v-model="branchName"
            label="Branch Name"
            variant="outlined"
            required
            class="white-text-field"
            :placeholder="getPlaceholder('Branch Name')"
          />
          <v-text-field
            v-model="fileName"
            label="File Name"
            variant="outlined"
            required
            class="white-text-field"
            :placeholder="getPlaceholder('File Name')"
          />

          <v-divider class="divider"></v-divider>

          <div class="button-wrapper">
            <v-btn type="submit" color="#4969ED" rounded class="submit-btn">
              Generate README
            </v-btn>
          </div>
        </v-form>
      </v-card-text>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Response</v-card-title>
          <v-card-text>
            <pre>{{ response }}</pre>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    doGet: Function,
    doPost: Function,
    api: String,
  },

  data() {
    return {
      githubId: null,
      repoName: null,
      branchName: null,
      fileName: null,
      dialog: false,
      response: '',
    };
  },

  methods: {
    async submit() {
      if (
        this.githubId === null ||
        this.repoName === null ||
        this.branchName === null ||
        this.fileName === null
      ) {
        alert('Please fill in all fields properly.');
        return;
      }

      try {
        const resp = await this.doGet('/api' + this.api, {
          githubId: this.githubId,
          repoName: this.repoName,
          branchName: this.branchName,
          fileName: this.fileName,
        });

        this.response = resp;
        this.dialog = true;
      } catch (error) {
        console.error('Error generating README:', error);
        alert('An error occurred while generating README.');
      }
    },

    getPlaceholder(label) {
      return `\u25CB ${label}`; // Use ○ (white circle) as placeholder indicator
    }
  },
};
</script>

<style scoped>
.github-form {
  background-color: #040D21;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.4);
}

.white-text-field .v-input__control .v-input__slot input {
  color: white !important;
  caret-color: white !important;
}

.white-text-field .v-label {
  color: white !important;
}

.white-text-field .v-input__control .v-input__slot::before,
.white-text-field .v-input__control .v-input__slot::after {
  border-color: white !important;
}

.divider {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: white;
}

.button-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.submit-btn {
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #3b4c9b;
}

.fill-height {
  height: 100vh;
}

.v-container {
  padding: 0 !important;
}

.v-card-text {
  display: flex;
  flex-direction: column;
}

.v-dialog .v-card {
  background-color: #0d47a1;
  color: white;
}

.v-dialog .v-card .v-card-title {
  background-color: #4969ED;
  color: white;
}
</style>
