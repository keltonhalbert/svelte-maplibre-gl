---
title: 3D Terrain
description: 3D terrain and the sky.
---

<script lang="ts">
  import Demo from "./Terrain.svelte";
  import demoRaw from "./Terrain.svelte?raw";
  import CodeBlock from "../../CodeBlock.svelte";
  let { shiki } = $props();
</script>

<Demo />

<CodeBlock content={demoRaw} shiki={shiki} />
