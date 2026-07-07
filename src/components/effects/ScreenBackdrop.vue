<script setup lang="ts">
interface Particle {
  left: string
  top: string
  size: number
  delay: string
  duration: string
  color: string
}

const particles: Particle[] = Array.from({ length: 28 }, (_, i) => ({
  left: `${8 + ((i * 37 + 13) % 84)}%`,
  top: `${6 + ((i * 53 + 7) % 88)}%`,
  size: 2 + (i % 3),
  delay: `${(i * 0.45) % 6}s`,
  duration: `${7 + (i % 6) * 1.5}s`,
  color: i % 3 === 0 ? 'rgba(232, 200, 150, 0.9)' : i % 3 === 1 ? 'rgba(184, 155, 248, 0.85)' : 'rgba(255, 255, 255, 0.7)',
}))
</script>

<template>
  <div class="screen-backdrop" aria-hidden="true">
    <!-- 顶部聚光 -->
    <div class="screen-backdrop__spotlight" />

    <!-- 动态极光 -->
    <div class="screen-backdrop__aurora screen-backdrop__aurora--1" />
    <div class="screen-backdrop__aurora screen-backdrop__aurora--2" />
    <div class="screen-backdrop__aurora screen-backdrop__aurora--3" />
    <div class="screen-backdrop__aurora screen-backdrop__aurora--4" />

    <!-- 流动网格 -->
    <div class="screen-backdrop__grid" />

    <!-- 扫光 -->
    <div class="screen-backdrop__sweep" />

    <!-- 漂浮粒子 -->
    <span
      v-for="(p, i) in particles"
      :key="i"
      class="screen-backdrop__particle"
      :style="{
        left: p.left,
        top: p.top,
        width: `${p.size}px`,
        height: `${p.size}px`,
        animationDelay: p.delay,
        animationDuration: p.duration,
        background: p.color,
        boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
      }"
    />

    <!-- 轻暗角（减弱） -->
    <div class="screen-backdrop__vignette" />

    <!-- 装饰框 -->
    <div class="screen-backdrop__frame screen-backdrop__frame--tl" />
    <div class="screen-backdrop__frame screen-backdrop__frame--tr" />
    <div class="screen-backdrop__frame screen-backdrop__frame--bl" />
    <div class="screen-backdrop__frame screen-backdrop__frame--br" />
  </div>
</template>

<style scoped lang="scss">
.screen-backdrop {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;

  &__spotlight {
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 50%;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.07) 0%,
      rgba(232, 200, 150, 0.05) 30%,
      transparent 70%
    );
    animation: pulseGlow 8s ease-in-out infinite;
  }

  &__aurora {
    position: absolute;
    border-radius: 50%;
    filter: blur(70px);
    will-change: transform, opacity;

    &--1 {
      width: 520px;
      height: 520px;
      top: -10%;
      left: 5%;
      background: radial-gradient(circle, rgba(184, 155, 248, 0.28) 0%, transparent 68%);
      animation: auroraDrift 22s ease-in-out infinite;
    }

    &--2 {
      width: 460px;
      height: 460px;
      bottom: -8%;
      right: 3%;
      background: radial-gradient(circle, rgba(232, 200, 150, 0.22) 0%, transparent 68%);
      animation: auroraDrift 18s ease-in-out infinite reverse;
      animation-delay: -6s;
    }

    &--3 {
      width: 380px;
      height: 380px;
      top: 35%;
      left: 42%;
      background: radial-gradient(circle, rgba(245, 184, 252, 0.16) 0%, transparent 68%);
      animation: auroraShift 16s ease-in-out infinite;
      animation-delay: -10s;
    }

    &--4 {
      width: 300px;
      height: 300px;
      top: 60%;
      left: 10%;
      background: radial-gradient(circle, rgba(157, 123, 234, 0.14) 0%, transparent 68%);
      animation: auroraDrift 25s ease-in-out infinite;
      animation-delay: -14s;
    }
  }

  &__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(232, 200, 150, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(184, 155, 248, 0.035) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse at center, #000 25%, transparent 88%);
    animation: gridFlow 12s linear infinite;
    opacity: 0.7;
  }

  &__sweep {
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.03) 40%,
      rgba(232, 200, 150, 0.06) 50%,
      rgba(255, 255, 255, 0.03) 60%,
      transparent
    );
    animation: lightSweep 14s ease-in-out infinite;
  }

  &__particle {
    position: absolute;
    border-radius: 50%;
    animation: particleFloat ease-in-out infinite;
  }

  &__vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.35) 100%);
  }

  &__frame {
    position: absolute;
    width: 64px;
    height: 64px;
    opacity: 0.5;

    &--tl {
      top: 16px;
      left: 16px;
      border-top: 1px solid rgba(232, 200, 150, 0.55);
      border-left: 1px solid rgba(232, 200, 150, 0.55);
      box-shadow: -2px -2px 12px rgba(232, 200, 150, 0.15);
    }

    &--tr {
      top: 16px;
      right: 16px;
      border-top: 1px solid rgba(184, 155, 248, 0.45);
      border-right: 1px solid rgba(184, 155, 248, 0.45);
    }

    &--bl {
      bottom: 16px;
      left: 16px;
      border-bottom: 1px solid rgba(184, 155, 248, 0.45);
      border-left: 1px solid rgba(184, 155, 248, 0.45);
    }

    &--br {
      bottom: 16px;
      right: 16px;
      border-bottom: 1px solid rgba(232, 200, 150, 0.55);
      border-right: 1px solid rgba(232, 200, 150, 0.55);
    }
  }
}
</style>
