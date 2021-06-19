<template>
  <div class="LicenseErrors">
    <h3>
      <small>Licensing API</small>
      An error has occurred
    </h3>
    <div class="LicenseErrorsTable">
      <table>
        <thead>
          <tr>
            <th>Error Title</th>
            <th>Message</th>
            <th>Code</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(e, i) in errors" :key="i">
            <td>
              {{ e.title }}
            </td>
            <td>
              <div v-if="e.source != null">
                <code>{{ e.source.pointer }}</code>
              </div>
              {{ e.detail }}
            </td>
            <td>
              <code>{{ e.code ?? "N/A" }}</code>
            </td>
            <td>
              <button type="button" @click="clearErrors(e)">Clear</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LicenseErrors",
  computed: {
    ...mapGetters(["errors"]),
    ...mapActions(["clearError"]),
  },
  methods: {
    clearErrors(error) {
      this.$store.dispatch("clearError", error);
    },
  },
};
</script>

<style scoped>
.LicenseErrors {
  position: relative;
  width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #fff;
  border: 2px solid #fe0000;
  border-radius: 0.5rem;
}
h3 {
  margin: 0 0 1rem;
}
small {
  display: block;
  font-size: 0.875rem;
  font-weight: 400;
  text-transform: uppercase;
  color: #a6afbd;
  margin-bottom: 0.25rem;
}
button {
  background: #fe0000;
  border: 2px solid #c52712;
}

:active {
  background: #c52712;
}

.LicenseErrorsTable {
  overflow-x: auto;
  border-top: 1px solid #e2e2e2;
}
</style>
