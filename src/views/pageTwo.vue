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
    return {};
  },
  mounted() {},
  methods: {
    play(what) {
      const ctx = new AudioContext();
      let audio;
      fetch(what)
        .then((data) => data.arrayBuffer())
        .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
        .then((decodedAudio) => {
          audio = decodedAudio;
          const playSound = ctx.createBufferSource();
          playSound.buffer = audio;
          playSound.connect(ctx.destination);
          playSound.start(ctx.currentTime);
        });
    },
  },
};
</script>
