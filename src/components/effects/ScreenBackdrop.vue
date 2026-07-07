<template>
  <div class="screen-backdrop" aria-hidden="true">
    <div class="screen-backdrop__vignette" />
    <div class="screen-backdrop__orb screen-backdrop__orb--1" />
    <div class="screen-backdrop__orb screen-backdrop__orb--2" />
    <div class="screen-backdrop__scanlines" />
    <div class="screen-backdrop__frame screen-backdrop__frame--tl" />
    <div class="screen-backdrop__frame screen-backdrop__frame--tr" />
    <div class="screen-backdrop__frame screen-backdrop__frame--bl" />
    <div class="screen-backdrop__frame screen-backdrop__frame--br" />
    <div class="screen-backdrop__rail screen-backdrop__rail--left" />
    <div class="screen-backdrop__rail screen-backdrop__rail--right" />
  </div>
</template>

<style scoped lang="scss">
.screen-backdrop {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;

  &__vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 45%, rgba(0, 0, 0, 0.55) 100%);
  }

  &__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    animation: floatOrb 12s ease-in-out infinite;

    &--1 {
      width: 320px;
      height: 320px;
      top: 8%;
      left: 12%;
      background: rgba(0, 229, 255, 0.12);
    }

    &--2 {
      width: 280px;
      height: 280px;
      bottom: 10%;
      right: 8%;
      background: rgba(79, 140, 255, 0.1);
      animation-delay: -6s;
    }
  }

  &__scanlines {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.06) 2px,
      rgba(0, 0, 0, 0.06) 4px
    );
    opacity: 0.35;
  }

  &__frame {
    position: absolute;
    width: 80px;
    height: 80px;
    border: 2px solid rgba(0, 229, 255, 0.35);
    opacity: 0.6;

    &--tl {
      top: 12px;
      left: 12px;
      border-right: none;
      border-bottom: none;
      box-shadow: -4px -4px 16px rgba(0, 229, 255, 0.15);
    }

    &--tr {
      top: 12px;
      right: 12px;
      border-left: none;
      border-bottom: none;
    }

    &--bl {
      bottom: 12px;
      left: 12px;
      border-right: none;
      border-top: none;
    }

    &--br {
      bottom: 12px;
      right: 12px;
      border-left: none;
      border-top: none;
    }
  }

  &__rail {
    position: absolute;
    top: 10%;
    bottom: 10%;
    width: 1px;
    background: linear-gradient(
      180deg,
      transparent,
      rgba(0, 229, 255, 0.35) 20%,
      rgba(0, 229, 255, 0.35) 80%,
      transparent
    );

    &--left {
      left: 6px;
    }

    &--right {
      right: 6px;
    }
  }
}
</style>
