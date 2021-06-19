<template>
  <div class="LicenseInfo">
    <h2>
      <small>{{ license?.attributes?.name ?? "License key" }}</small>
      {{ license?.attributes?.key ?? "N/A" }}
      <span class="LicenseInfoValidTag" v-if="validation?.valid">Valid</span>
      <span class="LicenseInfoInvalidTag" v-else>Invalid</span>
    </h2>
    <div class="LicenseInfoTable">
      <table>
        <thead>
          <tr>
            <th>Issued On</th>
            <th>Valid Until</th>
            <th># Seats</th>
            <th>Validation Code</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="date"
                v-if="license?.attributes?.created?.split('T')?.[0] != null"
                :value="license?.attributes?.created?.split('T')?.[0]"
                disabled
                readOnly
              />
              <input type="text" v-else :value="'N/A'" disabled readOnly />
            </td>
            <td>
              <input
                type="date"
                v-if="license?.attributes?.expiry?.split('T')?.[0] != null"
                :value="license?.attributes?.expiry?.split('T')?.[0]"
                disabled
                readOnly
              />
              <input type="text" :value="'N/A'" disabled readOnly />
            </td>
            <td>
              <strong
                >{{ machines.length }}/{{
                  license?.attributes?.maxMachines || 0
                }}</strong
              >
            </td>
            <td>
              <code>{{ validation?.constant }}</code>
            </td>
            <td>
              <button type="button" @click="reset">Logout</button>
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
  name: "LicenseInfo",
  computed: {
    ...mapGetters(["errors", "validation", "license", "machines"]),
  },
  methods: {
    ...mapActions(["reset"]),
  },
};
</script>

<style scoped>
.LicenseInfo {
  position: relative;
  width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #edeff3;
  border-radius: 0.5rem;
}
h2 {
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
  background: #a6afbd;
  border: 2px solid #8d96a5;
}
:active {
  background: #8d96a5;
}

.LicenseInfoTable {
  overflow-x: auto;
  border-top: 1px solid #e2e2e2;
}

.LicenseInfoValidTag {
  position: relative;
  top: -4px;
  color: #fff;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.25em 0.75rem;
  background: #12c570;
  border-radius: 1rem;
  margin-left: 0.5rem;
}

.LicenseInfoInvalidTag {
  background: #fe0000;
}
</style>
