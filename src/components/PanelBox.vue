<script setup lang="ts">
defineProps<{
  title: string
  height?: string
  accent?: 'gold' | 'violet' | 'rose'
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
  @include luxe-corners(14px, rgba(212, 175, 122, 0.45));
  display: flex;
  flex-direction: column;
  min-height: 0;
  transition: box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease;

  &:hover {
    border-color: rgba(212, 175, 122, 0.28);
    box-shadow:
      0 0 40px rgba(167, 139, 250, 0.12),
      inset 0 0 50px rgba(212, 175, 122, 0.03);
  }

  &--gold {
    @include luxe-corners(14px, rgba(212, 175, 122, 0.55));
    border-color: rgba(212, 175, 122, 0.22);

    .panel-box__indicator,
    .panel-box__dot {
      background: $color-primary;
      box-shadow: 0 0 10px rgba(212, 175, 122, 0.5);
    }

    .panel-box__title {
      color: $color-primary;
    }
  }

  &--violet {
    @include luxe-corners(14px, rgba(167, 139, 250, 0.5));
    border-color: rgba(167, 139, 250, 0.18);

    .panel-box__indicator {
      background: linear-gradient(180deg, $color-secondary, $color-purple);
      box-shadow: 0 0 10px rgba(167, 139, 250, 0.45);
    }

    .panel-box__title {
      color: $color-secondary;
    }
  }

  &--rose {
    @include luxe-corners(14px, rgba(240, 171, 252, 0.45));
    border-color: rgba(240, 171, 252, 0.15);

    .panel-box__indicator {
      background: $color-accent;
      box-shadow: 0 0 10px rgba(240, 171, 252, 0.4);
    }

    .panel-box__title {
      color: $color-accent;
    }
  }

  &__shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent);
    animation: shimmer 7s ease-in-out infinite;
    pointer-events: none;
    z-index: 1;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px 10px;
    border-bottom: 1px solid rgba(212, 175, 122, 0.1);
    position: relative;
    z-index: 2;
  }

  &__title-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    min-width: 0;
  }

  &__indicator {
    width: 2px;
    height: 16px;
    background: linear-gradient(180deg, $color-primary, $color-secondary);
    box-shadow: 0 0 8px rgba(212, 175, 122, 0.4);
    flex-shrink: 0;
    border-radius: 1px;
  }

  &__title {
    @include section-title;
    white-space: nowrap;
  }

  &__line {
    flex: 1;
    height: 1px;
    margin-left: 10px;
    background: linear-gradient(90deg, rgba(212, 175, 122, 0.35), transparent);
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  &__dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: $color-success;
    box-shadow: 0 0 8px rgba(134, 239, 172, 0.5);
    animation: pulseGlow 2.5s ease-in-out infinite;
  }

  &__status {
    font-family: $font-body;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.22em;
    color: $color-success;
    opacity: 0.8;
  }

  &__body {
    flex: 1;
    min-height: 0;
    padding: 14px 16px 16px;
    position: relative;
    z-index: 2;
  }
}
</style>
