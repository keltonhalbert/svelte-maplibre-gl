---
title: Complex
description: A showcase of various reactive features.
---

<script lang="ts">
  import Demo from "./Complex.svelte";
  import demoRaw from "./Complex.svelte?raw";
  import CodeBlock from "../../CodeBlock.svelte";
  let { shiki } = $props();
</script>

<Demo />

<CodeBlock content={demoRaw} {shiki} />
