import React from 'react'
import { MenuItem, MenuCategory, Tag } from '../types'

interface MenuPreviewProps {
  menuItems: MenuItem[]
  categories: MenuCategory[]
  tags: Tag[]
}

const MenuPreview: React.FC<MenuPreviewProps> = ({ menuItems, categories, tags }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-amber-800">Paul's Bakery Menu</h1>
      {categories.map((category) => (
        <div key={category.id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-amber-700 border-b-2 border-amber-200 pb-2">
            {category.name}
          </h2>
          <ul className="space-y-4">
            {menuItems
              .filter((item) => item.category === category.id)
              .map((item) => (
                <li key={item.id} className="flex justify-between items-start">
                  <div className="flex items-start">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded mr-4" />
                    )}
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        {item.tag && (
                          <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                            {tags.find(t => t.id === item.tag)?.name}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                      {item.specialNotes && (
                        <p className="text-sm text-amber-600 italic mt-1">{item.specialNotes}</p>
                      )}
                      {item.allergens && item.allergens.length > 0 && (
                        <p className="text-xs text-red-600 mt-1">
                          Allergens: {item.allergens.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-amber-800 font-semibold">{item.price} Dh</span>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default MenuPreview