import type { CreativeCategory } from './data'

interface CategoryCardProps {
  category: CreativeCategory
}

const categoryUrl = (category: Tag) => `/${encodeURIComponent(category.tag)}`

function CategoryCard(props: CategoryCardProps) {
  const { category } = props
  return (
    <>
      <div className="card">
        <div className="card-content">
          <p className="is-size-4">
            <a href={categoryUrl(category)}>{category.tag}</a>
          </p>
          <div className="content">{category.desc}</div>
        </div>
      </div>
    </>
  )
}

export default CategoryCard
