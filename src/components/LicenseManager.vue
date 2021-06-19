<template>
  <div class="LicenseManager">
    <h3>
      <small>Manage devices</small>
      Using {{ machines.length }} of {{ license.attributes.maxMachines }} seats
    </h3>
    <p class="LicenseManagerInfo">
      The current device
      <em v-if="machines.some((m) => m.attributes.fingerprint === fingerprint)"
        >is</em
      >
      <em v-else>is not</em> activated. Deactivate devices to free up seats.
    </p>
    <div class="LicenseManagerTable">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Device Name</th>
            <th>Activated On</th>
            <th>Platform</th>
            <th>Version</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="machine in machines" :key="machine.id">
            <td>
              <code>{{ machine.id.slice(0, 8) }}</code>
            </td>
            <td>
              {{ machine.attributes.name }}
              <span
                class="LicenseManagerTag"
                v-if="machine.attributes.fingerprint === fingerprint"
                >Current</span
              >
            </td>
            <td>
              <input
                type="date"
                :value="machine.attributes.created.split('T')[0]"
                disabled
              />
            </td>
            <td>
              <code>{{ machine.attributes.platform }}</code>
            </td>
            <td>
              <code>{{ machine.attributes.metadata.version }}</code>
            </td>
            <td>
              <button type="button" @click="deactivateMachine">
                Deactivate
              </button>
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
  name: "LicenseManager",
  computed: {
    ...mapGetters([
      "errors",
      "validation",
      "license",
      "machines",
      "fingerprint",
    ]),
    ...mapActions(["reset", "deactivateMachineForLicense"]),
  },
  methods: {
    deactivateMachine() {
      this.deactivateMachineForLicense();
    },
  },
};
</script>

<style scoped>
.LicenseManager {
  position: relative;
  width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #edeff3;
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

.LicenseManagerInfo {
  margin-top: 0;
}

.LicenseManagerTag {
  color: #fff;
  font-size: 0.75rem;
  font-weight: 400;
  padding: 0.15rem 0.5rem;
  background: #12c570;
  border-radius: 1rem;
  margin-left: 0.5rem;
}

.LicenseManagerTable {
  overflow-x: auto;
  border-top: 1px solid #e2e2e2;
}
</style>
