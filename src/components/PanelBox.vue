<script setup lang="ts">
defineProps<{
  title: string
  height?: string
  accent?: 'cyan' | 'gold' | 'purple'
}>()
</script>

<template>
  <section
    class="panel-box"
    :class="accent ? `panel-box--${accent}` : ''"
    :style="{ height: height ?? 'auto' }"
  >
    <div class="panel-box__shine" />
    <header class="panel-box__header">
      <div class="panel-box__title-wrap">
        <span class="panel-box__indicator" />
        <h3 class="panel-box__title">{{ title }}</h3>
        <span class="panel-box__line" />
      </div>
      <div class="panel-box__meta">
        <span class="panel-box__dot" />
        <span class="panel-box__status">LIVE</span>
      </div>
    </header>
    <div class="panel-box__body">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
.panel-box {
  @include glass-panel;
  @include cyber-corners(16px, rgba(0, 229, 255, 0.55));
  display: flex;
  flex-direction: column;
  min-height: 0;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    border-color: rgba(0, 229, 255, 0.35);
    box-shadow:
      0 0 32px rgba(0, 229, 255, 0.18),
      inset 0 0 50px rgba(0, 229, 255, 0.05);
  }

  &--gold {
    @include cyber-corners(16px, rgba(255, 193, 77, 0.55));
    border-color: rgba(255, 193, 77, 0.2);

    .panel-box__indicator,
    .panel-box__dot {
      background: $color-accent;
      box-shadow: 0 0 10px $color-accent;
    }

    .panel-box__title {
      @include glow-text($color-accent);
    }
  }

  &--purple {
    @include cyber-corners(16px, rgba(139, 92, 246, 0.55));
  }

  &__shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.04), transparent);
    animation: shimmer 6s ease-in-out infinite;
    pointer-events: none;
    z-index: 1;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px 8px;
    border-bottom: 1px solid rgba(0, 229, 255, 0.12);
    position: relative;
    z-index: 2;
  }

  &__title-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    min-width: 0;
  }

  &__indicator {
    width: 3px;
    height: 14px;
    background: linear-gradient(180deg, $color-primary, $color-secondary);
    box-shadow: 0 0 8px $color-primary;
    flex-shrink: 0;
  }

  &__title {
    @include section-title;
    white-space: nowrap;
  }

  &__line {
    flex: 1;
    height: 1px;
    margin-left: 8px;
    background: linear-gradient(90deg, rgba(0, 229, 255, 0.4), transparent);
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: $color-success;
    box-shadow: 0 0 8px $color-success;
    animation: pulseGlow 2s ease-in-out infinite;
  }

  &__status {
    font-family: $font-display;
    font-size: 9px;
    letter-spacing: 0.2em;
    color: $color-success;
    opacity: 0.85;
  }

  &__body {
    flex: 1;
    min-height: 0;
    padding: 12px 14px 14px;
    position: relative;
    z-index: 2;
  }
}
</style>
