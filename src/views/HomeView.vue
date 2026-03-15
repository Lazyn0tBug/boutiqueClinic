<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const { t } = useI18n()

// ========== CVA 状态变体管理 ==========

const quickAccessCardVariants = cva(
  "flex flex-row items-center p-4 transition-all active:scale-[0.98] border border-border/50",
  {
    variants: {
      variant: {
        default: "bg-background hover:border-primary/50",
        secondary: "bg-secondary/30 hover:border-primary/50",
        highlight: "bg-primary text-primary-foreground border-primary shadow-md"
      }
    }
  }
)

const pharmacyTagVariants = cva(
  "absolute top-2 left-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm",
  {
    variants: {
      type: {
        otc: "bg-white/90 text-slate-800 backdrop-blur-sm",
        prescription: "bg-red-500 text-white",
        supplement: "bg-orange-500 text-white"
      }
    }
  }
)

// ========== Data ==========
const quickAccessItems = computed(() => [
  { id: 'consultation', titleKey: 'quickAccess.consultation.title', descKey: 'quickAccess.consultation.description', icon: 'ph-stethoscope', variant: 'default' },
  { id: 'checkup', titleKey: 'quickAccess.checkup.title', descKey: 'quickAccess.checkup.description', icon: 'ph-heartbeat', variant: 'secondary' },
  { id: 'emergency', titleKey: 'quickAccess.emergency.title', descKey: 'quickAccess.emergency.description', icon: 'ph-phone-call', variant: 'highlight' },
])

const services = computed(() => [
  { title: t('services.items.checkup.title'), desc: t('services.items.checkup.description'), img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800' },
  { title: t('services.items.referral.title'), desc: t('services.items.referral.description'), img: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800' },
  { title: t('services.items.stemCell.title'), desc: t('services.items.stemCell.description'), img: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800' },
])

const pharmacyItems = computed(() => [
  { name: t('pharmacy.items.eve.name'), cat: t('pharmacy.categories.painRelief'), tag: t('pharmacy.tags.otc'), type: 'otc', icon: 'ph-pills' },
  { name: t('pharmacy.items.takeda.name'), cat: t('pharmacy.categories.cardiovascular'), tag: t('pharmacy.tags.prescription'), type: 'prescription', icon: 'ph-prescription' },
  { name: t('pharmacy.items.taisho.name'), cat: t('pharmacy.categories.respiratory'), tag: t('pharmacy.tags.otc'), type: 'otc', icon: 'ph-first-aid' },
  { name: t('pharmacy.items.nmn.name'), cat: t('pharmacy.categories.regenerative'), tag: t('pharmacy.tags.supplement'), type: 'supplement', icon: 'ph-flask' },
])

const caseStudies = computed(() => [
  { tag: t('cases.items.cancer.tag'), title: t('cases.items.cancer.title'), summary: t('cases.items.cancer.summary'), icon: 'ph-shield-check' },
  { tag: t('cases.items.lungCancer.tag'), title: t('cases.items.lungCancer.title'), summary: t('cases.items.lungCancer.summary'), icon: 'ph-users-three' },
])

const doctors = computed(() => [
  { name: t('doctors.items.tanaka.name'), title: t('doctors.items.tanaka.title'), img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' },
  { name: t('doctors.items.sato.name'), title: t('doctors.items.sato.title'), img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200' },
  { name: '山田 太郎', title: '心脏内科 专家', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200' },
  { name: '鈴木 花子', title: '儿科 主任', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200' },
])

const partners = computed(() => [
  { name: t('partners.items.tokyo'), icon: 'ph-hospital' },
  { name: t('partners.items.juntendo'), icon: 'ph-cross' },
  { name: t('partners.items.kansai'), icon: 'ph-flask' },
  { name: t('partners.items.association'), icon: 'ph-first-aid' },
])
</script>

<template>
  <main class="flex-1">
    <div class="relative w-full flex items-center justify-center overflow-hidden border-b border-border bg-background pt-32 pb-20 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40">
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop"
          class="w-full h-full object-cover" alt="" loading="eager"
        />
        <div class="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      </div>

      <Container class="relative z-10 text-center px-6">
        <h1 class="text-3xl md:text-6xl font-black text-foreground leading-tight mb-6 text-balance">
          {{ t('hero.title1') }}<br />
          <span class="text-primary">{{ t('hero.title2') }}</span>
        </h1>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" class="px-8 h-12 rounded-xl shadow-lg">{{ t('hero.btnOverseas') }}</Button>
          <Button variant="outline" size="lg" class="px-8 h-12 rounded-xl bg-background/50 backdrop-blur-sm shadow-sm">{{ t('hero.btnLocal') }}</Button>
        </div>
      </Container>
    </div>

    <Container class="-mt-8 relative z-20 px-4 md:px-0 mb-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          v-for="item in quickAccessItems"
          :key="item.id"
          :class="cn(quickAccessCardVariants({ variant: item.variant as any }), 'rounded-2xl')"
        >
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" 
            :class="item.variant === 'highlight' ? 'bg-white/20' : 'bg-primary/10 text-primary'">
            <i :class="['ph', item.icon]"></i>
          </div>
          <div class="ml-4">
            <CardTitle class="text-base" :class="item.variant === 'highlight' ? 'text-white' : ''">{{ t(item.titleKey) }}</CardTitle>
            <CardDescription class="text-xs" :class="item.variant === 'highlight' ? 'text-white/80' : ''">{{ t(item.descKey) }}</CardDescription>
          </div>
        </Card>
      </div>
    </Container>

    <section id="services" class="py-16 md:py-24 bg-muted/20 border-y border-border">
      <Container>
        <div class="mb-10 px-4 md:px-0">
          <h2 class="text-2xl md:text-4xl font-black text-foreground">{{ t('services.title') }}</h2>
          <p class="text-muted-foreground mt-2">{{ t('services.subtitle') }}</p>
        </div>

        <div class="mobile-swipe-row lg:grid-cols-3">
          <Card 
            v-for="(service, index) in services" 
            :key="index"
            class="mobile-swipe-card w-[85vw] md:w-auto relative group rounded-[1.5rem] overflow-hidden aspect-[4/3] shadow-md border-border/50"
          >
            <img :src="service.img" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div class="absolute bottom-0 p-6 text-white w-full">
              <h3 class="text-xl font-bold mb-1">{{ service.title }}</h3>
              <p class="text-xs text-white/70 line-clamp-1 mb-4">{{ service.desc }}</p>
              <Button size="sm" variant="secondary" class="rounded-full font-bold px-6 h-9">{{ t('common.viewDetail') }}</Button>
            </div>
          </Card>
        </div>
      </Container>
    </section>

    <section id="pharmacy" class="py-16 md:py-24 bg-background">
      <Container>
        <div class="flex items-center justify-between mb-10 px-4 md:px-0">
          <div>
            <h2 class="text-2xl md:text-4xl font-black">{{ t('pharmacy.title') }}</h2>
            <p class="text-muted-foreground mt-1">{{ t('pharmacy.subtitle') }}</p>
          </div>
          <Button variant="ghost" class="text-primary p-0 h-10 px-4">{{ t('pharmacy.viewAll') }}</Button>
        </div>

        <div class="mobile-swipe-row sm:grid-cols-2 lg:grid-cols-4">
          <Card 
            v-for="(item, index) in pharmacyItems" 
            :key="index"
            class="mobile-swipe-card w-[65vw] md:w-auto p-4 bg-slate-50 border-none rounded-[1.25rem] active:bg-slate-100 transition-colors"
          >
            <div class="relative aspect-square bg-white rounded-xl flex items-center justify-center mb-4 border border-border/30 shadow-sm">
              <span :class="cn(pharmacyTagVariants({ type: item.type as any }))">{{ item.tag }}</span>
              <i :class="['ph-fill text-4xl text-slate-200', item.icon]"></i>
            </div>
            <div class="text-[10px] font-bold text-primary mb-1">{{ item.cat }}</div>
            <div class="text-sm font-bold text-slate-900 truncate">{{ item.name }}</div>
          </Card>
        </div>
      </Container>
    </section>

    <section id="information" class="py-16 md:py-24 bg-muted/20 border-t border-border">
      <Container>
        <div class="text-center mb-12 px-4 md:px-0">
          <h2 class="text-2xl md:text-4xl font-black text-foreground">{{ t('cases.title') }}</h2>
          <p class="text-muted-foreground mt-2">{{ t('cases.subtitle') }}</p>
        </div>

        <div class="mobile-swipe-row lg:grid-cols-2">
          <Card 
            v-for="(caseItem, index) in caseStudies" 
            :key="index"
            class="mobile-swipe-card w-[90vw] md:w-auto flex flex-row overflow-hidden hover:border-primary/50 transition-all rounded-2xl"
          >
            <div class="w-24 md:w-32 bg-primary/5 border-r border-border flex items-center justify-center shrink-0">
              <i :class="['ph text-4xl text-primary/40', caseItem.icon]"></i>
            </div>
            <div class="p-4 md:p-6 flex flex-col justify-center overflow-hidden">
              <span class="inline-flex w-fit rounded-md border border-border bg-background px-2 py-0.5 text-[10px] font-bold mb-2">{{ caseItem.tag }}</span>
              <h4 class="text-sm md:text-base font-black truncate mb-1">{{ caseItem.title }}</h4>
              <p class="text-xs text-muted-foreground line-clamp-2 mb-3">{{ caseItem.summary }}</p>
              <a href="#" class="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                {{ t('cases.readReport') }} <i class="ph ph-arrow-right"></i>
              </a>
            </div>
          </Card>
        </div>
      </Container>
    </section>

    <section class="py-16 md:py-24 border-t border-border bg-white">
      <Container>
        <div class="flex items-center justify-between mb-10 px-4 md:px-0">
          <h2 class="text-2xl md:text-4xl font-black">{{ t('doctors.title') }}</h2>
          <a href="#" class="text-sm font-bold text-primary">{{ t('doctors.viewAll') }}</a>
        </div>
        
        <div class="mobile-swipe-row md:grid-cols-4 lg:grid-cols-5">
          <div 
            v-for="(doc, index) in doctors" 
            :key="index"
            class="mobile-swipe-card w-28 text-center group"
          >
            <div class="w-20 h-20 mx-auto rounded-full p-1 border-2 border-primary/10 group-active:border-primary transition-all mb-3 overflow-hidden shadow-inner">
              <img :src="doc.img" class="w-full h-full rounded-full object-cover" alt="" />
            </div>
            <div class="text-xs font-black text-slate-900 truncate">{{ doc.name }}</div>
            <div class="text-[10px] text-muted-foreground truncate">{{ doc.title }}</div>
          </div>
        </div>
      </Container>
    </section>

    <section id="partners" class="py-16 bg-slate-50 border-t border-border">
      <Container>
        <h3 class="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-8 text-center">{{ t('partners.title') }}</h3>
        <div class="flex flex-wrap justify-center items-center gap-6 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div v-for="(partner, index) in partners" :key="index" class="flex items-center gap-2 font-black text-sm md:text-base text-slate-700">
            <i :class="['ph-fill text-lg md:text-xl text-slate-400', partner.icon]"></i>
            {{ partner.name }}
          </div>
        </div>
      </Container>
    </section>
  </main>
</template>