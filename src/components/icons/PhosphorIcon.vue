<script setup lang="ts">
import { computed } from 'vue'
import {
  PhStethoscope,
  PhHeartbeat,
  PhPhoneCall,
  PhArrowRight,
  PhArrowDown,
  PhUserPlus,
  PhShieldCheck,
  PhUsersThree,
  PhPills,
  PhPrescription,
  PhFirstAid,
  PhFlask,
  PhHospital,
  PhCross,
  PhMapPin,
  PhPhone,
  PhList,
  PhTranslate,
  PhCaretDown,
  PhCheck,
  PhUser,
  PhExternalLink,
  PhYoutubeLogo,
  PhInstagramLogo,
  PhTwitterLogo,
} from '@phosphor-icons/vue'
import {
  PhYoutubeLogoFill,
  PhInstagramLogoFill,
  PhTwitterLogoFill,
  PhCrossFill,
} from '@phosphor-icons/vue'

const props = defineProps<{
  name: string
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  class?: string
}>()

const iconComponent = computed(() => {
  const icons: Record<string, any> = {
    'ph-stethoscope': PhStethoscope,
    'ph-heartbeat': PhHeartbeat,
    'ph-phone-call': PhPhoneCall,
    'ph-arrow-right': PhArrowRight,
    'ph-arrow-down': PhArrowDown,
    'ph-user-plus': PhUserPlus,
    'ph-shield-check': PhShieldCheck,
    'ph-users-three': PhUsersThree,
    'ph-pills': PhPills,
    'ph-prescription': PhPrescription,
    'ph-first-aid': PhFirstAid,
    'ph-flask': PhFlask,
    'ph-hospital': PhHospital,
    'ph-cross': PhCross,
    'ph-map-pin': PhMapPin,
    'ph-phone': PhPhone,
    'ph-list': PhList,
    'ph-translate': PhTranslate,
    'ph-caret-down': PhCaretDown,
    'ph-check': PhCheck,
    'ph-user': PhUser,
    'ph-external-link': PhExternalLink,
    'ph-youtube-logo': PhYoutubeLogo,
    'ph-instagram-logo': PhInstagramLogo,
    'ph-twitter-logo': PhTwitterLogo,
  }

  // Handle fill variants
  const fillIcons: Record<string, any> = {
    'ph-fill ph-cross': PhCrossFill,
    'ph-fill ph-youtube-logo': PhYoutubeLogoFill,
    'ph-fill ph-instagram-logo': PhInstagramLogoFill,
    'ph-fill ph-twitter-logo': PhTwitterLogoFill,
  }

  // Check if name contains 'fill'
  if (props.name.startsWith('ph-fill')) {
    return fillIcons[props.name] || null
  }

  return icons[props.name] || null
})
</script>

<template>
  <component
    :is="iconComponent"
    :weight="weight || 'regular'"
    :class="props.class"
    v-if="iconComponent"
  />
</template>
