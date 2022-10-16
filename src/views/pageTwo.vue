<template>
  <div class="page-2">
    <div class="flex-row" style="justify-content: space-around">
      <button @click.prevent="play('./music/new-wave-kit.ogg')">play music 1</button>
      <button @click.prevent="play('./music/synth-organ.ogg')">play music 2</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ctx: ''
    };
  },
  mounted() {},
  methods: {
    play(what) {
      if(this.ctx !== ''){
        this.stop()
      }
      this.ctx = new AudioContext();
      let audio;
      fetch(what)
        .then((data) => data.arrayBuffer())
        .then((arrayBuffer) => this.ctx.decodeAudioData(arrayBuffer))
        .then((decodedAudio) => {
          audio = decodedAudio;
          const playSound = this.ctx.createBufferSource();
          playSound.buffer = audio;
          playSound.connect(this.ctx.destination);
          playSound.start(this.ctx.currentTime);
        });
    },
    stop(){
      this.ctx.close();
    }
  },
};
</script>
