---
title: Custom Control
description: Custom Control allows to easily create user defined controls.
---

<script lang="ts">
  import Demo from "./CustomControl.svelte";
  import demoRaw from "./CustomControl.svelte?raw";
  import CodeBlock from "../../CodeBlock.svelte";
  let { shiki } = $props();
</script>

<Demo />

<CodeBlock content={demoRaw} {shiki} />
