<template>
  <div class="modal fade" :id="props.idModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ props.titleModal ?? "Title" }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body size-body"><slot></slot></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  idModal: string;
  titleModal: string;
}>();
</script>

<style lang="scss" scoped>
.size-body {
  min-height: 50rem;
}
</style>
