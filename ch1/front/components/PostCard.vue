<template>
  <v-container>
    <v-card>
      <v-card-text>
        <div>
          <h3>
            <nuxt-link :to="'/user/' + post.id">
              {{ post.User.nickname }}
            </nuxt-link>
          </h3>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="orange">
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
        <v-btn text color="orange" @click="onToggleComment">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <v-menu offset-y open-on-hover>
          <template #activator="{on}">
            <v-btn text color="orange" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <div style="background : white">
            <v-btn dark color="red" @click="onRemovePost">삭제</v-btn>
            <v-btn dark color="orange" @click="onEditPost">수정</v-btn>
          </div>
        </v-menu>
      </v-card-actions>
    </v-card>
    <template v-if="commentOpend">
      <comment-form :post-id="post.id" />
      <v-list>
        <v-list-item v-for="c in post.Comments" :key="c.id">
          <v-list-item-avatar color="teal">
            <span> {{ c.User.nickname[0] }} </span>
          </v-list-item-avatar>
          <v-list-item-content>
            <h3>{{ c.User.nickname }}</h3>
            <div>{{ c.content }}</div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-container>
</template>

<script>
import CommentForm from "./CommentForm.vue";
export default {
  name: "PostCard",
  components: { CommentForm },
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      commentOpend: false,
    };
  },
  methods: {
    onRemovePost() {
      this.$store.dispatch("posts/remove", {
        id: this.post.id,
      });
    },
    onEditPost() {},
    onToggleComment() {
      this.commentOpend = !this.commentOpend;
    },
  },
};
</script>
<style scoped>
a {
  color: inherit;
  text-decoration: none;
}
</style>
