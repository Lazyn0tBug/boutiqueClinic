<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const { t } = useI18n()

// ========== Types ==========
interface QuickAccess {
  id: string
  titleKey: string
  descKey: string
  icon: string
  variant: 'default' | 'secondary' | 'highlight'
}

interface Service {
  title: string
  description: string
  image: string
  imageSrcset?: string
}

interface PharmacyItem {
  name: string
  description: string
  category: string
  tag: string
  tagType: 'otc' | 'prescription' | 'supplement'
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
  imageSrcset?: string
}

interface Partner {
  name: string
  icon: string
}

// ========== CVA 状态变体管理 ==========

const quickAccessCardVariants = cva(
  "flex flex-row items-center p-4 md:p-6 transition-colors",
  {
    variants: {
      variant: {
        default: "hover:border-primary/50",
        secondary: "hover:border-primary/50",
        highlight: "bg-primary text-primary-foreground border-primary"
      }
    }
  }
)

const quickAccessIconVariants = cva(
  "h-12 w-12 rounded-lg flex items-center justify-center text-2xl shrink-0 border",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border-primary/20",
        secondary: "bg-secondary text-secondary-foreground border-border",
        highlight: "bg-white/20 text-white border-white/20"
      }
    }
  }
)

const pharmacyTagVariants = cva(
  "absolute top-2 left-2 inline-flex items-center rounded-full border px-2 md:px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      type: {
        otc: "bg-background text-foreground border-border",
        prescription: "bg-red-50 text-red-700 border-red-200",
        supplement: "bg-orange-50 text-orange-700 border-orange-200"
      }
    }
  }
)

// ========== State & Data ==========
const quickAccessItems = computed<QuickAccess[]>(() => [
  {
    id: 'consultation',
    titleKey: 'quickAccess.consultation.title',
    descKey: 'quickAccess.consultation.description',
    icon: 'ph-stethoscope',
    variant: 'default',
  },
  {
    id: 'checkup',
    titleKey: 'quickAccess.checkup.title',
    descKey: 'quickAccess.checkup.description',
    icon: 'ph-heartbeat',
    variant: 'secondary',
  },
  {
    id: 'emergency',
    titleKey: 'quickAccess.emergency.title',
    descKey: 'quickAccess.emergency.description',
    icon: 'ph-phone-call',
    variant: 'highlight',
  },
])

const services = computed<Service[]>(() => [
  {
    title: t('services.items.checkup.title'),
    description: t('services.items.checkup.description'),
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    imageSrcset: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400 400w, https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800 800w, https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200 1200w',
  },
  {
    title: t('services.items.referral.title'),
    description: t('services.items.referral.description'),
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800',
    imageSrcset: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=400 400w, https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800 800w, https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1200 1200w',
  },
  {
    title: t('services.items.stemCell.title'),
    description: t('services.items.stemCell.description'),
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800',
    imageSrcset: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=400 400w, https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800 800w, https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=1200 1200w',
  },
])

const pharmacyItems = computed<PharmacyItem[]>(() => [
  {
    name: t('pharmacy.items.eve.name'),
    description: t('pharmacy.items.eve.description'),
    category: t('pharmacy.categories.painRelief'),
    tag: t('pharmacy.tags.otc'),
    tagType: 'otc',
    icon: 'ph-pills',
  },
  {
    name: t('pharmacy.items.takeda.name'),
    description: t('pharmacy.items.takeda.description'),
    category: t('pharmacy.categories.cardiovascular'),
    tag: t('pharmacy.tags.prescription'),
    tagType: 'prescription',
    icon: 'ph-prescription',
  },
  {
    name: t('pharmacy.items.taisho.name'),
    description: t('pharmacy.items.taisho.description'),
    category: t('pharmacy.categories.respiratory'),
    tag: t('pharmacy.tags.otc'),
    tagType: 'otc',
    icon: 'ph-first-aid',
  },
  {
    name: t('pharmacy.items.nmn.name'),
    description: t('pharmacy.items.nmn.description'),
    category: t('pharmacy.categories.regenerative'),
    tag: t('pharmacy.tags.supplement'),
    tagType: 'supplement',
    icon: 'ph-flask',
  },
])

const caseStudies = computed<CaseStudy[]>(() => [
  { tag: t('cases.items.cancer.tag'), title: t('cases.items.cancer.title'), summary: t('cases.items.cancer.summary'), icon: 'ph-shield-check' },
  { tag: t('cases.items.lungCancer.tag'), title: t('cases.items.lungCancer.title'), summary: t('cases.items.lungCancer.summary'), icon: 'ph-users-three' },
])

const doctors = computed<Doctor[]>(() => [
  {
    name: t('doctors.items.tanaka.name'), title: t('doctors.items.tanaka.title'), specialty: t('doctors.items.tanaka.specialty'),
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200',
    imageSrcset: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100 100w, https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200 200w',
  },
  {
    name: t('doctors.items.sato.name'), title: t('doctors.items.sato.title'), specialty: t('doctors.items.sato.specialty'),
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    imageSrcset: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100 100w, https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200 200w',
  },
])

const partners = computed<Partner[]>(() => [
  { name: t('partners.items.tokyo'), icon: 'ph-hospital' },
  { name: t('partners.items.juntendo'), icon: 'ph-cross' },
  { name: t('partners.items.kansai'), icon: 'ph-flask' },
  { name: t('partners.items.association'), icon: 'ph-first-aid' },
])
</script>

<template>
  <main class="flex-1">
    <div class="relative w-full h-[75vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-border bg-background">
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop"
          srcset="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=640&auto=format&fit=crop 640w, https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1280&auto=format&fit=crop 1280w, https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop 2053w"
          sizes="100vw" class="w-full h-full object-cover" alt="" loading="eager"
        />
        <div class="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      </div>

      <Container as="header" size="lg" class="relative z-10 w-full text-center py-20 page-container">
        <div class="inline-flex items-center rounded-full border border-border bg-background/80 backdrop-blur-md px-3 py-1 text-sm font-medium mb-8 text-foreground shadow-sm">
          <span class="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          {{ t('hero.badge') }}
        </div>
        <h1 class="page-heading-1 font-extrabold text-foreground leading-[1.1] mb-6 text-balance">
          {{ t('hero.title1') }}<br />
          <span class="text-primary mt-2 block">{{ t('hero.title2') }}</span>
        </h1>
        <p class="mt-6 text-base text-muted-foreground sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
          {{ t('hero.description') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" class="px-8 shadow-md h-12">{{ t('hero.btnOverseas') }}</Button>
          <Button variant="outline" size="lg" class="px-8 bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background h-12">
            {{ t('hero.btnLocal') }}
          </Button>
        </div>
      </Container>
    </div>

    <Container as="section" aria-label="快捷入口" class="-mt-8 relative z-20 lg:-mt-12 mb-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          v-for="item in quickAccessItems"
          :key="item.id"
          :class="cn(quickAccessCardVariants({ variant: item.variant }))"
        >
          <div :class="cn(quickAccessIconVariants({ variant: item.variant }))">
            <i :class="['ph', item.icon]"></i>
          </div>
          <div class="ml-4">
            <CardTitle class="text-base" :class="item.variant === 'highlight' ? 'text-primary-foreground' : ''">
              {{ t(item.titleKey) }}
            </CardTitle>
            <CardDescription class="mt-1" :class="item.variant === 'highlight' ? 'text-primary-foreground/80' : ''">
              {{ t(item.descKey) }}
            </CardDescription>
          </div>
        </Card>
      </div>
    </Container>

    <section id="services" class="py-16 md:py-24 bg-muted/30 border-y border-border">
      <Container class="page-container">
        <div class="flex flex-col items-center text-center mb-12">
          <h2 class="page-heading-2 font-bold tracking-tight text-foreground text-balance">{{ t('services.title') }}</h2>
          <p class="mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">{{ t('services.subtitle') }}</p>
        </div>

        <div class="mobile-swipe-row md:grid-cols-2 lg:grid-cols-3">
          <Card
            v-for="(service, index) in services"
            :key="index"
            class="mobile-swipe-card overflow-hidden group flex flex-col hover:border-primary/40 transition-colors w-10/12 md:w-auto"
          >
            <div class="aspect-card overflow-hidden border-b border-border">
              <img
                :src="service.image" :srcset="service.imageSrcset" sizes="(max-width: 768px) 85vw, 33vw"
                :alt="service.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy"
              />
            </div>
            <CardContent class="p-4 md:p-6 flex flex-col flex-grow">
              <CardTitle class="text-lg md:text-xl mb-2">{{ service.title }}</CardTitle>
              <CardDescription class="mb-4 md:mb-6 flex-grow text-pretty line-clamp-2 md:line-clamp-none">
                {{ service.description }}
              </CardDescription>
              <Button variant="outline" class="w-full h-11">{{ t('common.viewDetail') }}</Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>

    <section id="pharmacy" class="py-16 md:py-24 bg-background">
      <Container class="page-container">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-4 border-b border-border">
          <div>
            <h2 class="page-heading-2 font-bold tracking-tight text-foreground mb-2 text-balance">{{ t('pharmacy.title') }}</h2>
            <p class="text-muted-foreground text-pretty">{{ t('pharmacy.subtitle') }}</p>
          </div>
          <Button variant="ghost" class="mt-4 md:mt-0 gap-1 hidden md:flex h-11">
            {{ t('pharmacy.viewAll') }} <i class="ph ph-arrow-right"></i>
          </Button>
        </div>

        <div class="mobile-swipe-row sm:grid-cols-2 lg:grid-cols-4">
          <Card
            v-for="(medicine, index) in pharmacyItems"
            :key="index"
            class="mobile-swipe-card p-4 md:p-5 group cursor-pointer hover:border-primary/40 transition-colors w-9/12 md:w-auto"
          >
            <div class="aspect-square bg-muted rounded-md flex items-center justify-center relative mb-3 md:mb-4 border border-border">
              <span :class="cn(pharmacyTagVariants({ type: medicine.tagType }))">
                {{ medicine.tag }}
              </span>
              <i :class="['ph text-4xl md:text-5xl text-muted-foreground/50 group-hover:text-primary/70 transition-colors', medicine.icon]"></i>
            </div>
            <CardTitle class="text-sm md:text-base truncate">{{ medicine.name }}</CardTitle>
            <CardDescription class="mt-1 line-clamp-2 text-xs md:text-sm md:min-h-[2.5rem]">{{ medicine.description }}</CardDescription>
            <div class="flex items-center justify-between mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border">
              <span class="text-xs text-muted-foreground font-medium">{{ medicine.category }}</span>
              <i class="ph ph-arrow-right text-muted-foreground"></i>
            </div>
          </Card>
        </div>
      </Container>
    </section>

    <section id="information" class="py-16 md:py-24 bg-muted/30 border-t border-border">
      <Container class="page-container">
        <div class="mb-24">
          <div class="flex flex-col items-center text-center mb-12">
            <h2 class="page-heading-2 font-bold tracking-tight text-foreground text-balance">{{ t('cases.title') }}</h2>
            <p class="mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">{{ t('cases.subtitle') }}</p>
          </div>

          <div class="mobile-swipe-row lg:grid-cols-2">
            <Card
              v-for="(caseItem, index) in caseStudies"
              :key="index"
              class="mobile-swipe-card flex flex-row md:flex-col lg:flex-row overflow-hidden hover:border-primary/50 transition-colors w-[90vw] md:w-auto"
            >
              <div class="w-1/3 md:w-full lg:w-1/3 bg-muted border-r md:border-r-0 md:border-b lg:border-r lg:border-b-0 border-border flex items-center justify-center p-4 md:p-8 aspect-square md:aspect-[4/3] lg:aspect-auto shrink-0">
                <i :class="['ph text-4xl md:text-6xl text-primary/60', caseItem.icon]"></i>
              </div>
              <div class="w-2/3 md:w-full lg:w-2/3 p-4 md:p-6 flex flex-col justify-center">
                <span class="inline-flex w-fit rounded-md border border-border bg-background px-2 py-0.5 text-xs font-semibold text-foreground mb-2 md:mb-3">{{ caseItem.tag }}</span>
                <CardTitle class="text-base md:text-lg mb-1 md:mb-2">{{ caseItem.title }}</CardTitle>
                <CardDescription class="line-clamp-2 text-xs md:text-sm mb-0 md:mb-4">{{ caseItem.summary }}</CardDescription>
                <a href="#" class="text-xs md:text-sm font-medium text-primary hover:underline flex items-center gap-1 mt-2 md:mt-auto w-fit h-11">
                  {{ t('cases.readReport') }} <i class="ph ph-arrow-right text-xs"></i>
                </a>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <div class="flex justify-between items-end mb-8 border-b border-border pb-4">
            <h2 class="page-heading-3 font-bold tracking-tight text-foreground text-balance">{{ t('doctors.title') }}</h2>
            <a href="#" class="hidden md:flex text-sm font-medium text-primary hover:underline items-center h-11">{{ t('doctors.viewAll') }}</a>
          </div>

          <div class="mobile-swipe-row sm:grid-cols-2 lg:grid-cols-4">
            <Card
              v-for="(doctor, index) in doctors"
              :key="index"
              class="mobile-swipe-card p-4 md:p-6 text-center group w-9/12 md:w-auto"
            >
              <div class="aspect-square w-20 md:w-24 mx-auto rounded-full border-4 border-background shadow-sm overflow-hidden mb-3 md:mb-4 ring-1 ring-border group-hover:ring-primary/50 transition-all">
                <img :src="doctor.image" :srcset="doctor.imageSrcset" sizes="96px" :alt="doctor.name" class="w-full h-full object-cover" loading="lazy" />
              </div>
              <CardTitle class="text-base md:text-lg">{{ doctor.name }}</CardTitle>
              <p class="text-xs md:text-sm font-medium text-primary mb-1 md:mb-2">{{ doctor.title }}</p>
              <CardDescription class="line-clamp-1 md:line-clamp-2 text-xs md:text-sm">{{ doctor.specialty }}</CardDescription>
            </Card>

            <Card class="mobile-swipe-card p-4 md:p-6 text-center flex flex-col items-center justify-center border-dashed border-2 hover:border-primary/50 transition-colors bg-transparent shadow-none cursor-pointer w-9/12 md:w-auto min-h-[160px]">
              <div class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-muted flex items-center justify-center mb-2 md:mb-3">
                <i class="ph ph-user-plus text-xl md:text-2xl text-muted-foreground"></i>
              </div>
              <p class="text-xs md:text-sm font-medium text-muted-foreground">{{ t('doctors.moreExperts') }}</p>
            </Card>
          </div>

          <a href="#" class="md:hidden text-sm font-medium text-primary hover:underline h-11 flex items-center justify-center mt-4">
            {{ t('doctors.viewAll') }} <i class="ph ph-arrow-right ml-1"></i>
          </a>
        </div>
      </Container>
    </section>

    <section id="partners" class="py-16 bg-background border-t border-border">
      <Container class="page-container">
        <h3 class="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-8 text-center">{{ t('partners.title') }}</h3>
        <div class="flex flex-wrap justify-center items-center gap-6 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <div v-for="(partner, index) in partners" :key="index" class="flex items-center gap-2 font-bold text-base md:text-lg text-foreground">
            <i :class="['ph-fill text-xl md:text-2xl text-muted-foreground', partner.icon]"></i>
            {{ partner.name }}
          </div>
        </div>
      </Container>
    </section>
  </main>
</template>