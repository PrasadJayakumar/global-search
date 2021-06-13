<template>
  <div class="relative">
    <div class="flex items-center border bg-white rounded-md">
      <label class="w-5 mx-2" for="globalSearch">
        <search-icon />
      </label>
      <input
        id="globalSearch"
        ref="globalSearch"
        class="flex-auto text-gray-800 p-2 outline-none"
        autocomplete="off"
        @input="waitAndAccept"
        @keydown.esc="exitSearch"
      />
      <button
        class="
          px-1
          mx-2
          focus:outline-none
          border-2
          rounded-lg
          border-solid border-gray-300
          text-gray-500
          bg-gray-50
        "
        @click="exitSearch"
      >
        esc
      </button>
    </div>
    <div
      class="
        absolute
        mt-1
        bg-white
        rounded-md
        shadow-lg
        overflow-hidden
        w-full
        z-20
      "
    >
      <div
        class="py-2 px-8 hover:bg-gray-200"
        v-for="row in result"
        v-bind:key="row.key"
        @click="goto(row)"
      >
        <p class="text-gray-600 text-sm mx-2">
          {{ row.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SearchIcon from "@/components/icons/SearchIcon.vue";

export default {
  components: { SearchIcon },

  data() {
    return {
      keywords: null,
      result: [],

      //
      timeout: null,
      cancelTokenSource: null,
    };
  },

  created() {
    this.result = [];
  },

  mounted() {
    this.focusInput();
  },

  destroyed() {
    if (this.timeout) clearTimeout(this.timeout);
  },

  methods: {
    focusInput() {
      this.$refs.globalSearch.focus();
    },

    // debounce logic
    waitAndAccept: function (e) {
      if (this.timeout) clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        this.keywords = e.target.value;
        this.getSearchResults(this.keywords);
      }, 200);
    },

    //
    getSearchResults(keywords) {
      console.log(keywords);
      if (this.cancelTokenSource) {
        this.cancelTokenSource.cancel("Stale request is cancelled");
      }
      this.cancelTokenSource = axios.CancelToken.source();

      // Category is hard-code for now
      this.$http
        .get(
          `search?keywords=${encodeURIComponent(
            keywords
          )}&category=${encodeURIComponent("Juvenile Fiction")}`,
          {
            cancelToken: this.cancelTokenSource.token,
          }
        )
        .then((resp) => {
          this.result = resp.data;
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log(`axios message: ${error}`);
          } else {
            // Handle the error scenario
            console.error(error);
          }
        });
    },

    exitSearch() {
      this.$emit("exitSearch");
    },

    goto(row) {
      this.$emit("selectedSearchResult", JSON.parse(JSON.stringify(row)));
      this.exitSearch();
    },
  },
};
</script>
