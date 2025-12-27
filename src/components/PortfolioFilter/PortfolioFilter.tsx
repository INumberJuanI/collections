import { getPayload } from 'payload'
import config from '@payload-config'
import { PortfolioFilterClient, PortfolioItemClient } from './PortfolioFilter.Client'

type PortfolioFilterArgs = {
  searchParams?: { [key: string]: string | string[] | undefined }
  title?: string
  subTitle?: string
  aspectRatio?: string
}

export async function PortfolioFilter({
  title,
  subTitle,
  aspectRatio,
  searchParams = {},
}: PortfolioFilterArgs) {
  const payload = await getPayload({ config })

  // Fetch users
  const usersResult = await payload.find({
    collection: 'users',
    limit: 100,
  })

  // Get filter parameters from URL
  const search = typeof searchParams.search === 'string' ? searchParams.search : ''
  const ownersParam = typeof searchParams.owners === 'string' ? searchParams.owners : ''
  const ownerIds = ownersParam ? ownersParam.split(',') : []

  // Build where clause for filtered query
  const whereConditions: Record<string, object> = {}

  if (search) {
    whereConditions.or = [
      { title: { contains: search } },
      { identifier: { contains: search } },
      { slug: { contains: search } },
      { 'image.alt': { contains: search } },
    ]
  }

  if (ownerIds.length > 0) {
    whereConditions.owner = { in: ownerIds }
  }

  // Fetch filtered items
  const itemsResult = await payload.find({
    collection: 'media',
    where: Object.keys(whereConditions).length > 0 ? whereConditions : undefined,
    depth: 1,
    limit: 100,
  })

  // Transform to PortfolioSection format
  const portfolioItems = itemsResult.docs.map((item) => ({
    title: item.title,
    description: typeof item.owner === 'object' ? item.owner?.name : 'Collection Item',
    mediaUrl: typeof item.url === 'string' ? item.url : undefined,
  }))

  return (
    <>
      <section id="portfolio" className="relative py-20!" suppressHydrationWarning>
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {(title || subTitle) && (
              <div className="text-center mb-4">
                <div className="inline-block mb-3">
                  {subTitle && (
                    <div className="text-xs text-cyan-400 tracking-widest uppercase mb-1">
                      {subTitle}
                    </div>
                  )}
                  {title && (
                    <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      {title}
                    </div>
                  )}
                </div>

                <div className="w-20 h-1 bg-linear-to-r from-cyan-500 to-indigo-500 mx-auto"></div>
              </div>
            )}
            <PortfolioFilterClient owners={usersResult.docs} />
            {portfolioItems.length > 0 ? (
              <div className="grid md:grid-cols-3 lg:grid-cols-4! gap-6">
                {portfolioItems.map((item) => (
                  <PortfolioItemClient key={item.title} {...item} aspectRatio={aspectRatio} />
                ))}
                {true && (
                  <PortfolioItemClient
                    aspectRatio={aspectRatio}
                    title="Neue Figur?"
                    bgText="+"
                    link={{ href: '/dashboard/collections/media/create', label: 'Hinzufügen' }}
                  />
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No items found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
