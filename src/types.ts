export interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  category: string
  image: string
  specialNotes?: string
  tag?: string
  allergens?: string[]
}

export interface MenuCategory {
  id: string
  name: string
}

export interface Tag {
  id: string
  name: string
}