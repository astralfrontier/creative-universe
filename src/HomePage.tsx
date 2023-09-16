import { filter, isEmpty, prop, sortBy, values } from 'ramda'
import data from './data'
import CategoryCard from './CategoryCard'
import CreativeNavbar from './Navbar'

// We show only the top-level categories (those without parents) on the front page
const topLevelCategories = sortBy(
  prop('tag'),
  values(filter((category) => isEmpty(category.parents), data))
)

function HomePage() {
  return (
    <>
      <CreativeNavbar />
      <div className="container page-container">
        <div className="columns is-multiline">
          {topLevelCategories.map((category) => (
            <div className="column is-half">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default HomePage
