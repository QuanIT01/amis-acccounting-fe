<template>
  <div class="main">
    <!-- navbar -->
    <TheNavbar></TheNavbar>

    <div class="content-wrapper">
      <!-- sidebar -->
      <TheSidebar></TheSidebar>

      <!-- main content -->
      <div class="main-content">
        <slot></slot>
      </div>
    </div>

    <!-- toast message -->
    <MISAToastContainer></MISAToastContainer>
  </div>
</template>

<script setup>
import TheNavbar from "./navbar/TheNavbar.vue";
import TheSidebar from "./sidebar/TheSidebar.vue";
import MISAToastContainer from "@/components/base/toast-message/MISAToastContainer.vue";
</script>

<style scoped></style>
