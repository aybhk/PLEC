import React, { useState } from 'react'
import { Menu, ChefHat, Eye } from 'lucide-react'
import MenuCreator from './components/MenuCreator'
import MenuPreview from './components/MenuPreview'
import { MenuItem, MenuCategory, Tag } from './types'

function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="min-h-screen bg-amber-50 text-gray-800 font-serif">
      <header className="bg-amber-800 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            <Menu className="mr-2" />
            Paul's Menu Creator
          </h1>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            {showPreview ? <ChefHat className="mr-2" /> : <Eye className="mr-2" />}
            {showPreview ? 'Edit Menu' : 'Preview Menu'}
          </button>
        </div>
      </header>
      <main className="container mx-auto p-4">
        {showPreview ? (
          <MenuPreview menuItems={menuItems} categories={categories} tags={tags} />
        ) : (
          <MenuCreator
            menuItems={menuItems}
            setMenuItems={setMenuItems}
            categories={categories}
            setCategories={setCategories}
            tags={tags}
            setTags={setTags}
          />
        )}
      </main>
    </div>
  )
}

export default App