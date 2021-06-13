<template>
  <nav class="bg-green-400 shadow-lg">
    <div class="container mx-auto">
      <div class="flex py-1">
        <div class="flex-none w-80 h-12">
          <p class="text-gray-800 text-2xl font-bold p-2">Book Store</p>
        </div>
        <div class="flex-grow self-center">
          <global-search
            @exitSearch="search = false"
            v-if="search"
            v-on="$listeners"
          />
        </div>
        <div class="flex w-80 h-12 items-center justify-end">
          <button @click="search = true" v-if="!search">
            <search-icon />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import GlobalSearch from "./global-search/GlobalSearch.vue";
import SearchIcon from "./icons/SearchIcon.vue";

export default {
  name: "Navbar",
  components: { GlobalSearch, SearchIcon },

  data: () => ({
    search: false,
  }),
};
</script>
