/// <reference types="vite/client" />

type TagName = string

interface CreativeResource {
  name: string
  url: string
  desc?: string
  tags?: TagName[]
}

interface Tag {
  tag: TagName
  parents?: TagName[]
  desc?: string
}

declare module '*.module.sass'
declare module '*.module.css'
declare module '*.css'
declare module '*.data.yaml' {
  const data: CreativeResource[]
  export = data
}
declare module '*.tags.yaml' {
  const data: Tag[]
  export = data
}
declare module '*.yaml'
