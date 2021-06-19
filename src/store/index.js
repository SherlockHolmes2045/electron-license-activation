import { createStore } from "vuex";
import { ipcRenderer } from "electron";
import * as client from "@/services/client";

export default createStore({
  state: {
    notes: [
      {
        id: 1,
        title: "This is the first note",
        note: "This is the first description about bla bla black sheep..This is the content of this particular note...it has an id of 1 for now",
      },
      {
        id: 2,
        title: "This is the second note",
        note: "This is the second description about bla bla black sheep..This is the content of this particular note...it has an id of 2 for now",
      },
      {
        id: 3,
        title: "This is the third note",
        note: "This is the third description about bla bla black sheep..This is the content of this particular note...it has an id of 3 for now",
      },
    ],
    noteData: {},
    // The fingerprint of the current device
    fingerprint: ipcRenderer.sendSync("GET_DEVICE_FINGERPRINT"),

    // The current license key
    key: "7ECED4-AAC314-2F0C99-D81643-4C66B9-V3",

    // The result of the most recent license validation
    validation: null,

    // The current license object
    license: null,

    // List of activated machine objects
    machines: [],

    // API errors
    errors: [],
  },
  mutations: {
    GET_NOTE(state, payload) {
      state.noteData = payload;
    },

    ADD_NOTE: (state, payload) => {
      state.notes.push(payload);
    },
    DELETE_NOTE: (state, note) => {
      let noteIndex = state.notes.findIndex((n) => n.id === note.id);
      state.notes.splice(noteIndex, 1);
    },
    CLEAR_ERROR: (state, error) => {
      state.errors = state.errors.filter((e) => e !== error);
    },
    SET_ERRORS: (state, error) => {
      state.errors = error;
    },
    SET_VALIDATION: (state, validation) => {
      state.validation = validation;
    },
    SET_LICENCE: (state, license) => {
      state.license = license;
    },
    SET_MACHINE: (state, machines) => {
      state.machines = machines;
    },
    SET_KEY: (state, key) => {
      state.key = key;
    },
  },
  getters: {
    notes: ({ notes }) => {
      return notes;
    },
    fingerprint: ({ fingerprint }) => {
      return fingerprint;
    },
    key: ({ key }) => {
      return key;
    },
    listMachinesForLicense: ({ listMachinesForLicense }) => {
      return listMachinesForLicense;
    },
    errors: ({ errors }) => {
      return errors;
    },
    singleNote: (state) => (noteId) => {
      return state.notes.find((note) => note.id === noteId);
    },
    validation: ({ validation }) => {
      return validation;
    },
    license: ({ license }) => {
      return license;
    },
    machines: ({ machines }) => {
      return machines;
    },
    updateId(state) {
      let lastid = 3;
      state.notes.forEach((element) => {
        if (element.id > lastid) {
          lastid = element.id;
        }
      });
      return lastid;
    },
  },
  actions: {
    showNote: (context, param) => {
      let data = context.getters.singleNote(param);
      context.commit("GET_NOTE", data);
    },

    validateLicenseKey: async (context) => {
      const { key, fingerprint, listMachinesForLicense } = context.getters;
      const { meta, data, errors } =
        await client.validateLicenseKeyWithFingerprint(key, fingerprint);
      if (errors) {
        context.commit("SET_ERRORS", errors);
      }
      await context.commit("SET_VALIDATION", meta);
      await context.commit("SET_LICENCE", data);
      // List machines for the license if it exists (regardless of validity)
      if (data != null) {
        listMachinesForLicense();
      }
    },
    listMachinesForLicense: async (context) => {
      const { license } = context.getters;

      const { data, errors } = await client.listMachinesForLicense(license);
      if (errors) {
        context.commit("SET_ERRORS", errors);
      }

      context.commit("SET_MACHINE", data);
    },

    deactivateMachineForLicense: async (context, id) => {
      const { license } = context.getters;

      const { errors } = await client.deactivateMachineForLicense(license, id);
      if (errors) {
        context.commit("SET_ERRORS", errors);
      }
      await context.dispatch("listMachinesForLicense");
      await context.dispatch("validateLicenseKey");
    },
    activateMachineForLicense: async (context, payload) => {
      const { name, platform, version } = payload;

      const { license, fingerprint } = context.getters;

      const { errors } = await client.activateMachineForLicense(
        license,
        fingerprint,
        name,
        platform,
        version
      );
      if (errors) {
        // List machines to give the user the option to free up activation slots
        await context.dispatch("listMachinesForLicense");
        return context.commit("SET_ERRORS", errors);
      }
      await context.dispatch("clearError", []);
      await context.dispatch("listMachinesForLicense");
      await context.dispatch("validateLicenseKey");
    },
    addNote: (context, payload) => {
      context.commit("ADD_NOTE", payload);
    },
    deleteNote: (context, note) => {
      context.commit("DELETE_NOTE", note);
    },
    clearError: (context, error) => {
      context.commit("CLEAR_ERROR", error);
    },
    setKey: (context, key) => {
      context.commit("SET_KEY", key);
    },
    reset: async (context) => {
      await context.commit("SET_KEY", null);
      await context.commit("SET_VALIDATION", null);
      await context.commit("SET_LICENCE", null);
      await context.commit("SET_MACHINE", []);
      await context.commit("SET_ERRORS", []);
    },
  },
  modules: {},
});
