---
title: Locate the User
description: Locate the User
---

<script lang="ts">
  import Demo from "./Geolocate.svelte";
  import demoRaw from "./Geolocate.svelte?raw";
  import CodeBlock from "../../CodeBlock.svelte";
  let { shiki } = $props();
</script>

<Demo />

<CodeBlock content={demoRaw} shiki={shiki} />
