---
title: Custom Protocols
description: How to add custom protocols.
---

<script lang="ts">
  import Demo from "./CustomProtocol.svelte";
  import demoRaw from "./CustomProtocol.svelte?raw";
  import CodeBlock from "../../CodeBlock.svelte";
    let { shiki } = $props();
</script>

<Demo />

<CodeBlock content={demoRaw} {shiki} />
