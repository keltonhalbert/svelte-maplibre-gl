---
title: Load Images from URLs
description: Utility for loading images from URLs
---

<script lang="ts">
  import Demo from "./Images.svelte";
  import demoRaw from "./Images.svelte?raw";
  import CodeBlock from "../../CodeBlock.svelte";
  let { shiki } = $props();
</script>

<Demo />

<CodeBlock content={demoRaw} shiki={shiki} />
