import { Navigation } from '@/components/Navigation/Navigation'
import { Footer } from '@/components/Footer'
import { PortfolioFilter } from '@/components/PortfolioFilter/PortfolioFilter'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams

  return (
    <>
      <Navigation />

      <main>
        {/* <HeroSection /> */}
        {/* <AboutSection /> */}
        {/* <ServicesSection /> */}
        <PortfolioFilter
          title="Unsere Kollektionen"
          subTitle="Das haben wir schon"
          searchParams={params}
          aspectRatio="aspect-4/5"
        />
        {/* <ContactSection /> */}
      </main>

      <Footer />
    </>
  )
}
