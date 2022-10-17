<template>
  <div class="page-1">
    <div class="func flex-row">
      <button @click.prevent="handleReset">Reset</button>
      <button @click.prevent="handleSort">Sort Title</button>
      <button @click.prevent="handleGroupBy">Group by User Id</button>
      <div class="flex-row">
        <span class="">Filter By User Id: </span>
        <div style="width: 1rem"></div>
        <select name="" id="" @change.prevent="handleFilter" v-model="userId">
          <option value="">All</option>
          <option v-for="(item, index) in userIds" :key="index" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
    </div>
    <table>
      <tr>
        <th>Body</th>
        <th>Id</th>
        <th>Title</th>
        <th>User Id</th>
      </tr>
      <tr v-for="(row, index) in posts" :key="index">
        <td>{{ row.body }}</td>
        <td>{{ row.id }}</td>
        <td>{{ row.title }}</td>
        <td>{{ row.userId }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      userIds: [],
      userId: "",
      originalPosts: [],
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    handleReset() {
      this.getPosts();
      this.userId = "";
    },
    handleSort() {
      this.posts.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else {
          return 1;
        }
      });
    },
    handleGroupBy() {
      this.userId = ''
      const groupBy = (array, key) => {
        return array.reduce((result, currentValue) => {
          (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
          );
          return result;
        }, {}); 
      };
      this.posts = this.originalPosts;
      this.posts = Object.values(groupBy(this.posts, "userId")).flat() 
    },
    handleFilter() {
      this.posts = this.originalPosts;
      if (this.userId === "") {
        return;
      }
      this.posts = this.posts.filter((item) => item.userId == this.userId);
    },
    getPosts() {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          this.posts = json;
          this.originalPosts = json;
          const ids = new Set();
          for (const item of json) {
            ids.add(item.userId);
          }
          this.userIds = Array.from(ids);
        });
    },
  },
};
</script>

<style lang="css" scoped>
.func {
  justify-content: space-around;
}
</style>
