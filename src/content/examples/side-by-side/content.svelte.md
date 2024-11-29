---
title: Side by Side
description: Synchronize two maps.
---

<script lang="ts">
  import Demo from "./SideBySide.svelte";
  import demoRaw from "./SideBySide.svelte?raw";
  import CodeBlock from "../../CodeBlock.svelte";
    let { shiki } = $props();
</script>

<Demo />

<CodeBlock content={demoRaw} {shiki} />
