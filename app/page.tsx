'use client'

import { HeroSection } from '@/components/sections/hero'
import { WhatWeDoSection } from '@/components/sections/what-we-do'
import { ProjectsSection } from '@/components/sections/projects'
import { EngineersCarousel } from '@/components/sections/engineers-carousel'
import { PageLayout } from '@/components/shared/page-layout'

export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <WhatWeDoSection />
      <EngineersCarousel />
      <ProjectsSection />
    </PageLayout>
  )
}