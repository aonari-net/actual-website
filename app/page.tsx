import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { SpeedSection } from "@/components/speed-section"
import { PrivacySection } from "@/components/privacy-section"
import { Platforms } from "@/components/platforms"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { SectionDivider } from "@/components/section-divider"

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SectionDivider />
      <Features />
      <SectionDivider />
      <SpeedSection />
      <SectionDivider />
      <PrivacySection />
      <SectionDivider />
      <Platforms />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <Pricing />
      <SectionDivider />
      <CTASection />
      <Footer />
    </main>
  )
}
