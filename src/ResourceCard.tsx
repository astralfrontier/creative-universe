import { without } from 'ramda'

interface ResourceCardProps {
  resource: CreativeResource
  currentTag: TagName
}

const categoryUrl = (tag: TagName) => `/${encodeURIComponent(tag)}`

function ResourceCard(props: ResourceCardProps) {
  const { resource, currentTag } = props
  const tags = resource.tags || []
  return (
    <>
      <div className="card">
        <div className="card-content">
          <p className="is-size-4">
            <a href={resource.url} target="_blank">
              {resource.name}
            </a>
          </p>
          <div className="content">{resource.description}</div>
        </div>
        <footer className="card-footer">
          {without([currentTag], tags).map((tag) => (
            <a href={categoryUrl(tag)} className="card-footer-item">
              {tag}
            </a>
          ))}
        </footer>
      </div>
    </>
  )
}

export default ResourceCard
