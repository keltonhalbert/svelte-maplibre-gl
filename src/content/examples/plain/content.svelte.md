---
title: Plain Map
description: A minimal example showing only the base map.
---

<script lang="ts">
  import Demo from "./Plain.svelte";
  import demoRaw from "./Plain.svelte?raw";
  import CodeBlock from "../../CodeBlock.svelte";
  let { shiki } = $props();
</script>

<Demo />

<CodeBlock content={demoRaw} {shiki} />
