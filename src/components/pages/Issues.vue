<template>  
    <div class="card">
      <h2>{{ L('Issues') }}</h2>
      <p>{{ L('Disclaimer Text') }}</p>      
      <p>{{ L('Bug Report Text') }} <a :href="repositoryUrl" target="_blank">Github</a></p>
    </div>    
    <div></div>
  </template>
  
  <script setup>
  const repositoryUrl = import.meta.env.VITE_GITHUB_REPO_URL
  </script>
  