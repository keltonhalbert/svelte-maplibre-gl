---
title: Custom style layer
description: Use a custom style layer to render custom WebGL content.
---

<script lang="ts">
  import Demo from "./CustomLayer.svelte";
  import demoRaw from "./CustomLayer.svelte?raw";
  import CodeBlock from "../../CodeBlock.svelte";
  let { shiki } = $props();
</script>

<Demo />

<CodeBlock content={demoRaw} shiki={shiki} />
