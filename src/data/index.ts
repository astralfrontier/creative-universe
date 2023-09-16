import { assoc, filter, map, reduce } from 'ramda'
import dict from './dictionary.tags.yaml'

import creativeProcess from './creative-process.data.yaml'
import fonts from './fonts.data.yaml'

// A more formal version of "tag"
export interface CreativeCategory {
  tag: TagName
  desc: string
  parents: TagName[]
  children: TagName[]
  resources: CreativeResource[]
}

type CreativeCategoryDb = Record<TagName, CreativeCategory>

// All resources across all data files
const resources = [...creativeProcess, ...fonts]

// A filter function to return only those resources that have a given tag
const resourcesWithTag = (tag: TagName) =>
  filter((resource) => (resource.tags || []).includes(tag), resources)

// Construct a database of tags for later reference
const tagDb = reduce(
  (db, tag) => assoc(tag.tag, tag, db),
  {} as Record<TagName, Tag>,
  dict
)

// Which tags have this tag as a parent?
const childrenOfThisTag = (tag: TagName): TagName[] =>
  map(
    (tag: Tag) => tag.tag,
    filter((candidate: Tag) => (candidate.parents || []).includes(tag), dict)
  )

// Build a (TagName => CreativeCategory) map, based on all tags we know of.
const creativeCategories: CreativeCategoryDb = reduce(
  (db, tag) => {
    const category: CreativeCategory = {
      tag: tag.tag,
      desc: tag.desc || '',
      parents: tag.parents || [],
      children: childrenOfThisTag(tag.tag),
      resources: resourcesWithTag(tag.tag),
    }
    return assoc(tag.tag, category, db)
  },
  {} as CreativeCategoryDb,
  dict
)

export default creativeCategories
