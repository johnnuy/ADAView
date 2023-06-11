<template>
  <div class="layout-menu-container mb-3">
    <ul class="layout-menu">
      <li class="layout-menuitem-category" role="none">
        <div class="layout-menuitem-root-text">{{ L('Navigation') }}</div>
        <ul>
          <li class="active-menuitem" role="none">
            <span class="flex flex-row align-items-center">
              <router-link v-ripple :to="{ name: 'Home' }" class="p-ripple w-full" exact role="menuitem">
                <i class="pi pi-fw pi-home"></i>
                <span>{{ L('Home') }}</span>
              </router-link>
            </span>
          </li>
          <li class="active-menuitem" role="none">
            <span class="flex flex-row align-items-center">
              <router-link v-ripple :to="{ name: 'Roadmap' }" class="p-ripple w-full" exact role="menuitem">
                <i class="pi pi-fw pi-map"></i>
                <span>{{ L('Roadmap') }}</span>
              </router-link>
            </span>
          </li>
          <li class="active-menuitem" role="none">
            <span class="flex flex-row align-items-center">
              <router-link v-ripple :to="{ name: 'Support' }" class="p-ripple w-full" exact role="menuitem">
                <i class="pi pi-fw pi-thumbs-up"></i>
                <span>{{ L('SupportUs') }}</span>
              </router-link>
            </span>
          </li>
          <li class="active-menuitem" role="none">
            <span class="flex flex-row align-items-center">
              <router-link v-ripple :to="{ name: 'Issues' }" class="p-ripple w-full" exact role="menuitem">
                <i class="pi pi-fw pi-question-circle"></i>
                <span>{{ L('Issues') }}</span>
              </router-link>
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup></script>
