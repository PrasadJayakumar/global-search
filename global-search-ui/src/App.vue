<template>
  <div>
    <Navbar @selectedSearchResult="showSelectedEntry" />
    <Main>
      <p>{{ message.title }}</p>
    </Main>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",

  components: {
    Navbar,
  },

  data: () => ({
    message: {},
  }),

  methods: {
    showSelectedEntry(row) {
      console.log(row);
      this.message = row;
    },
  },
};
</script>
