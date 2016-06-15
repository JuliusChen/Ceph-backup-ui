<template>
  <div class="tree-menu-item" v-bind:class="{'is-expanded': hasChild && isExpanded, 'top-level': topLevel}">
    <div class="tree-menu-item-label" v-on:click="toggleItem">
      <a><i v-if="view" class="tree-menu-item-icon material-icons">{{icon}}</i>{{ title }}</a></span>
    </div>
    <div class="tree-menu-item-content" v-on:click.prevent v-show="isExpanded">
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .tree-menu-item {
    box-sizing:border-box;
    &.is-expanded {
      background-color: #f8f8f9;
      > .tree-menu-item-content {
        display: block;
      }

      .tree-menu-item-label {
        > a {
          padding-left: 16px;
        }
      }
    }
    &.top-level.is-expanded {
      border-left: 4px solid #19aa8d;
    }
  }

  .tree-menu-item-label {
    position: relative;
    color: #676a6c;
    cursor: pointer;
    > a {
      display: inline-block;
      text-decoration: none;
      padding: 8px 15px 8px 20px;
      line-height: 20px;
      width: 100%;
      box-sizing: border-box;
      color: #676a6c;
    }
    &:hover {
      font-weight: 600;
      color: #5b5d5f;
    }
  }

  .tree-menu-item-icon {
    display: inline-block;
    width: 18px;
    margin-right: 8px;
    height: 20px;
    line-height: 20px;
    vertical-align: top;
  }

  .tree-menu-item-content {
    padding-left: 20px;
    display: none;
    overflow: hidden;
  }
</style>

<script>
import window from './window.vue';

export default {
  props: {
    icon: '',
    view: '',
    title: '',
    path: {},
    isExpanded: {
      type: Boolean,
    },
  },
  components: {
    window,
  },
  data: () => ({
    hasChild: false,
    topLevel: false,
  }),
  created() {
    this.$isTreeMenu = true;
  },
  ready() {
    this.hasChild = this.$children.length > 0;
    this.topLevel = !this.$parent.isTreeMenu;
  },
  methods: {
    toggleItem() {
      this.isExpanded = !this.isExpanded;
      this.$dispatch('changeView', this.view);
    },
  },
};
</script>
