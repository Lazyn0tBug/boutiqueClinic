<template>
  <main class="flex-1 scroll-container">
    <!-- ==================== 英雄區 (Hero) ==================== -->
    <div
      class="relative w-full min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-border bg-background"
    >
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop"
          class="w-full h-full object-cover"
          alt=""
        />
        <div class="absolute inset-0 bg-background/80 backdrop-blur-[2px]"></div>
      </div>

      <div
        class="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32"
      >
        <div
          class="inline-flex items-center rounded-full border border-border bg-background/80 backdrop-blur-md px-3 py-1 text-sm font-medium mb-8 text-foreground shadow-sm"
        >
          <span class="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          {{ t('hero.badge') }}
        </div>
        <h1
          class="text-4xl tracking-tight font-extrabold text-foreground sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.1] mb-6 text-balance"
        >
          {{ t('hero.title1') }}<br />
          <span class="text-primary mt-2 block">{{ t('hero.title2') }}</span>
        </h1>
        <p
          class="mt-6 text-base text-muted-foreground sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-pretty"
        >
          {{ t('hero.description') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="sh-btn sh-btn-primary h-12 px-8 text-base shadow-md">
            {{ t('hero.btnOverseas') }}
          </button>
          <button
            class="sh-btn sh-btn-outline h-12 px-8 text-base bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background"
          >
            {{ t('hero.btnLocal') }}
          </button>
        </div>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="max-w-7xl mx-auto px-4 -mt-4 relative z-20 sm:-mt-8 lg:-mt-12 mb-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 card-container">
        <div
          class="shadcn-card p-6 flex flex-row items-center gap-4 hover:border-primary/50 transition-colors bg-background card-adaptive"
        >
          <div
            class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20"
          >
            <i class="ph ph-stethoscope text-2xl"></i>
          </div>
          <div>
            <h3 class="font-semibold text-foreground">{{ t('quickAccess.consultation.title') }}</h3>
            <p class="text-sm text-muted-foreground mt-1">{{ t('quickAccess.consultation.description') }}</p>
          </div>
        </div>
        <div
          class="shadcn-card p-6 flex flex-row items-center gap-4 hover:border-primary/50 transition-colors bg-background"
        >
          <div
            class="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground border border-border"
          >
            <i class="ph ph-heartbeat text-2xl"></i>
          </div>
          <div>
            <h3 class="font-semibold text-foreground">{{ t('quickAccess.checkup.title') }}</h3>
            <p class="text-sm text-muted-foreground mt-1">{{ t('quickAccess.checkup.description') }}</p>
          </div>
        </div>
        <div
          class="shadcn-card p-6 flex flex-row items-center gap-4 bg-primary text-primary-foreground border-primary"
        >
          <div
            class="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center text-white border border-white/20"
          >
            <i class="ph ph-phone-call text-2xl"></i>
          </div>
          <div>
            <h3 class="font-semibold text-primary-foreground">{{ t('quickAccess.emergency.title') }}</h3>
            <p class="text-sm text-primary-foreground/80 mt-1">{{ t('quickAccess.emergency.description') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== 服務模塊 (Services) ==================== -->
    <section id="services" class="py-16 md:py-24 bg-muted/30 border-y border-border">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-col items-center justify-center text-center mb-12">
          <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            {{ t('services.title') }}
          </h2>
          <p class="mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            {{ t('services.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 card-container">
          <!-- 服務卡片動態渲染 -->
          <div
            v-for="(service, index) in services"
            :key="index"
            class="shadcn-card overflow-hidden group flex flex-col hover:border-primary/40 transition-colors responsive-card"
          >
            <div class="aspect-[16/10] overflow-hidden border-b border-border">
              <img
                :src="service.image"
                :alt="``"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="p-6 flex flex-col flex-grow bg-card">
              <h3 class="text-xl font-semibold mb-2">{{ service.title }}</h3>
              <p class="text-sm text-muted-foreground mb-6 flex-grow">{{ service.description }}</p>
              <button class="sh-btn sh-btn-outline w-full h-9 mt-auto">{{ t('common.viewDetail') }}</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== 常用藥專區 (Pharmacy) ==================== -->
    <section id="pharmacy" class="py-16 md:py-24 bg-background">
      <div class="max-w-7xl mx-auto px-4">
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-4 border-b border-border"
        >
          <div>
            <h2 class="text-3xl font-bold tracking-tight text-foreground mb-2 text-balance">{{ t('pharmacy.title') }}</h2>
            <p class="text-muted-foreground text-pretty">{{ t('pharmacy.subtitle') }}</p>
          </div>
          <button
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-foreground h-9 px-3 border border-transparent hover:border-border mt-4 md:mt-0 gap-1 hidden md:flex"
          >
            {{ t('pharmacy.viewAll') }} <i class="ph ph-arrow-right"></i>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 card-container">
          <!-- 藥品卡片動態渲染 -->
          <div
            v-for="(medicine, index) in pharmacyItems"
            :key="index"
            class="shadcn-card p-5 group cursor-pointer hover:border-primary/40 transition-colors responsive-card"
          >
            <div
              class="aspect-square bg-muted rounded-md flex items-center justify-center relative mb-4 border border-border"
            >
              <span
                class="absolute top-2 left-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors"
                :class="medicine.tagClass"
              >
                {{ medicine.tag }}
              </span>
              <i
                :class="[
                  'ph text-5xl text-muted-foreground/50 group-hover:text-primary/70 transition-colors',
                  medicine.icon,
                ]"
              ></i>
            </div>
            <h3 class="font-semibold text-foreground truncate">{{ medicine.name }}</h3>
            <p class="text-xs text-muted-foreground mt-1 line-clamp-2 min-h-[2rem]">
              {{ medicine.description }}
            </p>
            <div class="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <span class="text-xs text-muted-foreground font-medium">{{ medicine.category }}</span>
              <i class="ph ph-arrow-right text-muted-foreground"></i>
            </div>
          </div>
        </div>

        <button class="sh-btn sh-btn-outline w-full mt-6 md:hidden">{{ t('pharmacy.viewAll') }}</button>
      </div>
    </section>

    <!-- ==================== 信息模塊: 專家與案例 (Information) ==================== -->
    <section id="information" class="py-16 md:py-24 bg-muted/30 border-t border-border scroll-container">
      <div class="max-w-7xl mx-auto px-4">
        <!-- 案例展示區 -->
        <div class="mb-24">
          <div class="flex flex-col items-center justify-center text-center mb-12">
            <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {{ t('cases.title') }}
            </h2>
            <p class="mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
              {{ t('cases.subtitle') }}
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 card-container">
            <!-- 案例動態渲染 -->
            <div
              v-for="(caseItem, index) in caseStudies"
              :key="index"
              class="shadcn-card flex flex-col sm:flex-row overflow-hidden hover:border-primary/50 transition-colors card-adaptive"
            >
              <div
                class="w-full sm:w-1/3 bg-muted border-r border-border flex items-center justify-center p-8 aspect-[4/3] sm:aspect-auto"
              >
                <i :class="['ph text-6xl text-primary/60', caseItem.icon]"></i>
              </div>
              <div class="w-full sm:w-2/3 p-6 flex flex-col justify-center">
                <span
                  class="inline-flex w-fit items-center rounded-md border border-border bg-background px-2 py-0.5 text-xs font-semibold text-foreground mb-3"
                  >{{ caseItem.tag }}</span
                >
                <h3 class="text-lg font-bold text-foreground mb-2">{{ caseItem.title }}</h3>
                <p class="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {{ caseItem.summary }}
                </p>
                <a
                  href="#"
                  class="text-sm font-medium text-primary hover:underline flex items-center gap-1 mt-auto w-fit"
                  >{{ t('cases.readReport') }} <i class="ph ph-arrow-right text-xs"></i
                ></a>
              </div>
            </div>
          </div>
        </div>

        <!-- 專家團隊區 -->
        <div>
          <div class="flex justify-between items-end mb-8 border-b border-border pb-4">
            <h2 class="text-2xl font-bold tracking-tight text-foreground text-balance">{{ t('doctors.title') }}</h2>
            <a href="#" class="text-sm font-medium text-primary hover:underline">{{ t('doctors.viewAll') }}</a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 card-container">
            <!-- 醫生卡片動態渲染 -->
            <div
              v-for="(doctor, index) in doctors"
              :key="index"
              class="shadcn-card p-6 text-center group responsive-card"
            >
              <div
                class="aspect-square w-24 mx-auto rounded-full border-4 border-background shadow-sm overflow-hidden mb-4 ring-1 ring-border group-hover:ring-primary/50 transition-all"
              >
                <img :src="doctor.image" :alt="``" class="w-full h-full object-cover" />
              </div>
              <h3 class="font-bold text-lg text-foreground">{{ doctor.name }}</h3>
              <p class="text-sm font-medium text-primary mb-2">{{ doctor.title }}</p>
              <p class="text-xs text-muted-foreground line-clamp-2">{{ doctor.specialty }}</p>
            </div>

            <!-- 預留占位 -->
            <div
              class="shadcn-card p-6 text-center flex flex-col items-center justify-center border-dashed border-2 hover:border-primary/50 transition-colors bg-transparent shadow-none cursor-pointer"
            >
              <div class="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                <i class="ph ph-user-plus text-2xl text-muted-foreground"></i>
              </div>
              <p class="text-sm font-medium text-muted-foreground">{{ t('doctors.moreExperts') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== 合作機構 (Partners) ==================== -->
    <section id="partners" class="py-16 bg-background border-t border-border">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h3 class="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-8">
          {{ t('partners.title') }}
        </h3>
        <div
          class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500"
        >
          <div
            v-for="(partner, index) in partners"
            :key="index"
            class="flex items-center gap-2 font-bold text-lg text-foreground"
          >
            <i :class="['ph-fill text-2xl text-muted-foreground', partner.icon]"></i>
            {{ partner.name }}
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// ========== Types ==========
interface Service {
  title: string
  description: string
  image: string
}

interface PharmacyItem {
  name: string
  description: string
  category: string
  tag: string
  tagClass: string
  icon: string
}

interface CaseStudy {
  tag: string
  title: string
  summary: string
  icon: string
}

interface Doctor {
  name: string
  title: string
  specialty: string
  image: string
}

interface Partner {
  name: string
  icon: string
}

// ========== State & Data ==========

const services = ref<Service[]>([
  {
    title: t('services.items.checkup.title'),
    description: t('services.items.checkup.description'),
    image:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: t('services.items.referral.title'),
    description: t('services.items.referral.description'),
    image:
      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: t('services.items.stemCell.title'),
    description: t('services.items.stemCell.description'),
    image:
      'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800',
  },
])

const pharmacyItems = ref<PharmacyItem[]>([
  {
    name: t('pharmacy.items.eve.name'),
    description: t('pharmacy.items.eve.description'),
    category: t('pharmacy.categories.painRelief'),
    tag: t('pharmacy.tags.otc'),
    tagClass: 'bg-background text-foreground border-border',
    icon: 'ph-pills',
  },
  {
    name: t('pharmacy.items.takeda.name'),
    description: t('pharmacy.items.takeda.description'),
    category: t('pharmacy.categories.cardiovascular'),
    tag: t('pharmacy.tags.prescription'),
    tagClass: 'bg-red-50 text-red-700 border-red-200',
    icon: 'ph-prescription',
  },
  {
    name: t('pharmacy.items.taisho.name'),
    description: t('pharmacy.items.taisho.description'),
    category: t('pharmacy.categories.respiratory'),
    tag: t('pharmacy.tags.otc'),
    tagClass: 'bg-background text-foreground border-border',
    icon: 'ph-first-aid',
  },
  {
    name: t('pharmacy.items.nmn.name'),
    description: t('pharmacy.items.nmn.description'),
    category: t('pharmacy.categories.regenerative'),
    tag: t('pharmacy.tags.supplement'),
    tagClass: 'bg-orange-50 text-orange-700 border-orange-200',
    icon: 'ph-flask',
  },
])

const caseStudies = ref<CaseStudy[]>([
  {
    tag: t('cases.items.cancer.tag'),
    title: t('cases.items.cancer.title'),
    summary: t('cases.items.cancer.summary'),
    icon: 'ph-shield-check',
  },
  {
    tag: t('cases.items.lungCancer.tag'),
    title: t('cases.items.lungCancer.title'),
    summary: t('cases.items.lungCancer.summary'),
    icon: 'ph-users-three',
  },
])

const doctors = ref<Doctor[]>([
  {
    name: t('doctors.items.tanaka.name'),
    title: t('doctors.items.tanaka.title'),
    specialty: t('doctors.items.tanaka.specialty'),
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200',
  },
  {
    name: t('doctors.items.sato.name'),
    title: t('doctors.items.sato.title'),
    specialty: t('doctors.items.sato.specialty'),
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
  },
])

const partners = ref<Partner[]>([
  { name: t('partners.items.tokyo'), icon: 'ph-hospital' },
  { name: t('partners.items.juntendo'), icon: 'ph-cross' },
  { name: t('partners.items.kansai'), icon: 'ph-flask' },
  { name: t('partners.items.association'), icon: 'ph-first-aid' },
])
</script>

<style></style>