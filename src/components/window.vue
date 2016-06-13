<template>
  <div id="window" class="window resize-drag">
    <nav>
      <div class="nav-wrapper grey lighten-2">
        <span class="black-text">{{ icon }} {{ window_name }}</span>
        <ul class="right hide-on-med-and-down">
          <li v-on:click="hide"><a><i class="material-icons black-text md-18">remove</i></a></li>
          <li v-on:click="resize" ><a><i class="material-icons black-text md-18">check_box_outline_blank</i></a></li>
          <li v-on:click="close" class="nav-button"><a><i class="material-icons black-text md-18">close</i></a></li>
        </ul>
        </ul>
      </div>
    </nav>
    <div class="row" id="app">
      <div class="col-md-3">
        <tree-menu>
          <tree-menu-item isExpanded view="BackupPlan" icon="view_agenda" title="Buliding Up Backup Plan"></tree-menu-item>
          <tree-menu-item isExpanded view="TaskList" icon="format_list_bulleted" title="List Backup Tasks"></tree-menu-item>
        </tree-menu>
      </div>
      <div class="col-md-9">
        <component :is="currentView"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import interact from 'interact.js';
  import TreeMenu from './TreeMenu.vue';
  import TreeMenuItem from './TreeMenuItem.vue';

  export default {
    data() {
      return {
        icon: 'icon',
        window_name: 'window1',
        is_maximal: false,
        currentWindow: document.getElementsByClassName('window resize-drag'),
        currentView: 'BackupPlan',
      };
    },
    components: {
      TreeMenu,
      TreeMenuItem,
    },
    methods: {
      setWindow(WindowSize) {
        this.AppWindow = {};
        this.AppWindow.Width = WindowSize.clientWidth;
        this.AppWindow.Height = WindowSize.clientHeight;
        this.AppWindow.datax = WindowSize.getAttribute('data-x');
        this.AppWindow.datay = WindowSize.getAttribute('data-y');
        this.AppWindow.maxmial = (this.AppWindow.Width === window.innerWidth ||
            this.AppWindow.Height === window.innerHeight) && true;
      },
      getWindow() {
        return this.AppWindow;
      },
      hide() {
      },
      maxmial() {
        this.is_maximal = true;
        this.setWindow(this.currentWindow[0]);

        this.currentWindow[0].style.transform = 'translate(0px, 0px)';
        this.currentWindow[0].style.width = `${window.innerWidth}px`;
        this.currentWindow[0].style.height = `${window.innerHeight}px`;
      },
      rollback() {
        this.is_maximal = false;

        this.currentWindow[0].style.transform = `translate(${this.getWindow().datax}px,
          ${this.getWindow().datay}px)`;
        this.currentWindow[0].setAttribute('data-x', this.getWindow().datax);
        this.currentWindow[0].setAttribute('data-y', this.getWindow().datay);

        this.currentWindow[0].style.width = `${this.getWindow().Width}px`;
        this.currentWindow[0].style.height = `${this.getWindow().Height}px`;
      },
      close() {
        this.currentWindow[0].parentElement.removeChild(this.currentWindow[0]);
      },
    },
    events: {
      changeView(view) {
        this.currentView = view;
      },
    },
  };

  function dragMoveListener(event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
      target.style.transform = `translate( ${x}px, ${y}px)`;

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  window.dragMoveListener = dragMoveListener;

  interact('.resize-drag').draggable({
    onmove: window.dragMoveListener,
  })
    .resizable({
      preserveAspectRatio: false, edges: { left: true, right: true, bottom: true, top: true },
    })
      .on('resizemove', (event) => {
        const target = event.target;
        let x = (parseFloat(target.getAttribute('data-x')) || 0);
        let y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width = `${event.rect.width}px`;
        target.style.height = `${event.rect.height}px`;

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform =
          target.style.transform = `translate( ${x}px, ${y}px)`;

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      });
</script>

<style lang="scss">
.window {
  width: 70%;
  min-height: 6.5em;
  height: 15px;
  line-height: 15px;

  border-style: solid;
  border-width: 1px;
  border-color: black;

  box-sizing: border-box;

  -webkit-transform: translate(0px, 0px);
  transform: translate(0px, 0px);
}

.material-icons.md-18 {
  font-size: 18px;
}
</style>
