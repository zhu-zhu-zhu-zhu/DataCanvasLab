<script setup lang="ts">
defineProps<{
  title: string
  height?: string
}>()
</script>

<template>
  <section class="panel-box" :style="{ height: height ?? 'auto' }">
    <header class="panel-box__header">
      <span class="panel-box__dot" />
      <h3 class="panel-box__title">{{ title }}</h3>
    </header>
    <div class="panel-box__body">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
.panel-box {
  @include glass-panel;
  display: flex;
  flex-direction: column;
  min-height: 0;
  transition: box-shadow 0.25s ease;

  &:hover {
    box-shadow: 0 0 28px rgba(0, 212, 255, 0.15), inset 0 0 30px rgba(0, 212, 255, 0.04);
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px 8px;
    border-bottom: 1px solid rgba(0, 212, 255, 0.12);
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $color-primary;
    box-shadow: 0 0 8px $color-primary;
  }

  &__title {
    @include section-title;
    font-size: 14px;
  }

  &__body {
    flex: 1;
    min-height: 0;
    padding: 12px 16px 16px;
  }
}
</style>
