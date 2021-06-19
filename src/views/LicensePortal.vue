<template>
  <div v-if="errors?.length">
    <LicenseErrors />
    <LicenseInfo />
    <LicenseManager
      v-if="errors.some((e) => e.code === 'MACHINE_LIMIT_EXCEEDED')"
    />
  </div>
  <LicenseValidator v-if="license == null && validation == null" />
  <div v-if="validation?.valid">
    <LicenseInfo />
    <LicenseManager />
  </div>
  <div v-else-if="validation?.constant === 'FINGERPRINT_SCOPE_MISMATCH'">
    <LicenseInfo />
    <LicenseActivator />
  </div>
  <div v-else-if="validation?.constant === 'NO_MACHINES'">
    <LicenseInfo />
    <LicenseActivator />
  </div>
  <div v-else-if="validation?.constant === 'NO_MACHINE'">
    <LicenseInfo />
    <LicenseActivator />
  </div>
  <div v-else>
    <LicenseInfo />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LicenseErrors from "@/components/LicenseErrors";
import LicenseValidator from "@/components/LicenseValidator";
import LicenseInfo from "@/components/LicenseInfo";
import LicenseManager from "@/components/LicenseManager";
import LicenseActivator from "@/components/LicenseActivator";

export default {
  name: "LicensePortal",
  components: {
    LicenseActivator,
    LicenseManager,
    LicenseInfo,
    LicenseValidator,
    LicenseErrors,
  },
  computed: {
    ...mapGetters(["errors", "validation", "license"]),
  },
};
</script>

<style scoped></style>
