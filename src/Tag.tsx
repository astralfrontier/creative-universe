import { map } from 'ramda'
import data from './data'
import CategoryCard from './CategoryCard'
import { useParams } from 'react-router-dom'
import ResourceCard from './ResourceCard'

const categoryUrl = (tag: TagName) => `/${encodeURIComponent(tag)}`

function Tag() {
  const { tag } = useParams<'tag'>()
  const category = data[tag || '']
  const parents = map((parent) => data[parent], category.parents)
  const children = map((child) => data[child], category.children)
  return (
    <div className="container">
      <>
        <nav
          className="breadcrumb is-centered has-bullet-separator"
          aria-label="breadcrumbs"
        >
          <ul>
            <li>
              <a href={'/'}>HOME</a>
            </li>
            {parents.map((parent) => (
              <li>
                <a href={categoryUrl(parent.tag)}>{parent.tag}</a>
              </li>
            ))}
          </ul>
        </nav>
        <h1 className="title">{category.tag}</h1>
        <div className="columns is-multiline">
          {children.map((category) => (
            <div className="column is-half">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
        <div className="columns is-multiline">
          {category.resources.map((resource) => (
            <div className="column is-one-third">
              <ResourceCard resource={resource} currentTag={tag || ''} />
            </div>
          ))}
        </div>
      </>
    </div>
  )
}

export default Tag
