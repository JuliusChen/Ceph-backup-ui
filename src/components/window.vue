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
  </div>
</template>

<script>
  import interact from 'interact.js';

  export default {
    data() {
      return {
        icon: 'icon',
        window_name: 'window1',
      };
    },
    methods: {
      hide() {
      },
      resize() {
        const target = document.getElementById('window');
        if (this.datax === undefined) {
          this.datax = target.getAttribute('data-x');
          this.datay = target.getAttribute('data-y');
          this.width = target.style.width;
          this.height = target.style.height;

          target.style.webkitTransform =
            target.style.transform = 'translate( 0px, 0px)';
          target.setAttribute('data-x', 0);
          target.setAttribute('data-y', 0);
          target.style.width = `${window.innerWidth}px`;
          target.style.height = `${window.innerHeight}px`;
        } else {
          target.style.webkitTransform =
            target.style.transform = `translate( ${this.datax}px, ${this.datay}px)`;
          target.setAttribute('data-x', this.datax);
          target.setAttribute('data-y', this.datay);
          target.style.width = `${this.width}`;
          target.style.height = `${this.height}`;

          this.datax = undefined;
          this.datay = undefined;
          this.width = undefined;
          this.height = undefined;
        }
      },
      close() {
        const target = document.getElementById('window');
        target.parentElement.removeChild(target);
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
  width: 40%;
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
