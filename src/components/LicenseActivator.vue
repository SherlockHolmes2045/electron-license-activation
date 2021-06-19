<template>
  <div class="LicenseActivator">
    <h3>
      <small>Activate Device</small>
      Your device has not been activated
    </h3>
    <form @submit.prevent="validateLicense">
      <div class="LicenseActivatorTable">
        <table>
          <thead>
            <tr>
              <th>Device Name</th>
              <th>Fingerprint</th>
              <th>Platform</th>
              <th>Version</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Enter a name for your device"
                  v-model="name"
                />
              </td>
              <td>
                <input type="text" v-model="fingerprint" disabled readOnly />
              </td>
              <td>
                <input type="text" v-model="platform" disabled readOnly />
              </td>
              <td>
                <input type="text" v-model="version" disabled readOnly />
              </td>
              <td>
                <button type="submit">Activate</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import os from "os";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LicenseActivator",
  computed: {
    version() {
      return `v${ipcRenderer.sendSync("GET_APP_VERSION")}`;
    },
    electron() {
      return `v${process.versions.electron}`;
    },
    platform() {
      return process.platform;
    },
    name() {
      return os.hostname();
    },
    ...mapGetters(["fingerprint"]),
  },
  methods: {
    ...mapActions(["activateMachineForLicense"]),
    validateLicense() {
      this.activateMachineForLicense({
        name: this.name,
        platform: this.platform,
        version: this.version,
      });
    },
  },
};
</script>

<style scoped>
.LicenseActivator {
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

.LicenseActivatorTable {
  overflow-x: auto;
  border-top: 1px solid #e2e2e2;
}
</style>
