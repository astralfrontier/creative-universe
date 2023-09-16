import { filter, isEmpty, prop, sortBy, values } from 'ramda'
import data from './data'
import CategoryCard from './CategoryCard'

// We show only the top-level categories (those without parents) on the front page
const topLevelCategories = sortBy(
  prop('tag'),
  values(filter((category) => isEmpty(category.parents), data))
)

function Home() {
  return (
    <div className="container">
      <div className="columns">
        {topLevelCategories.map((category) => (
          <div className="column is-half">
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
