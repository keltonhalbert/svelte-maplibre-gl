---
title: Change Cursor
description: Change the cursor style on hover
---

<script lang="ts">
  import Demo from "./Cursor.svelte";
  import demoRaw from "./Cursor.svelte?raw";
  import CodeBlock from "../../CodeBlock.svelte";
  let { shiki } = $props();
</script>

<Demo />

<CodeBlock content={demoRaw} {shiki} />
