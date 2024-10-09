import React, { useState, ChangeEvent } from 'react'
import { Plus, Trash2, Upload, Edit, Save, Tag as TagIcon } from 'lucide-react'
import { MenuItem, MenuCategory, Tag } from '../types'

interface MenuCreatorProps {
  menuItems: MenuItem[]
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>
  categories: MenuCategory[]
  setCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>
  tags: Tag[]
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>
}

const MenuCreator: React.FC<MenuCreatorProps> = ({
  menuItems,
  setMenuItems,
  categories,
  setCategories,
  tags,
  setTags,
}) => {
  const [newItem, setNewItem] = useState<MenuItem>({
    id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    specialNotes: '',
    tag: '',
    allergens: [],
  })
  const [newCategory, setNewCategory] = useState<string>('')
  const [newTag, setNewTag] = useState<string>('')
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [editingTagId, setEditingTagId] = useState<string | null>(null)

  const handleItemChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewItem({ ...newItem, [name]: value })
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewItem({ ...newItem, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const addMenuItem = () => {
    if (newItem.name && newItem.price && newItem.category) {
      if (editingItemId) {
        setMenuItems(menuItems.map(item => 
          item.id === editingItemId ? { ...newItem, id: editingItemId } : item
        ))
        setEditingItemId(null)
      } else {
        setMenuItems([...menuItems, { ...newItem, id: Date.now().toString() }])
      }
      setNewItem({
        id: '',
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        specialNotes: '',
        tag: '',
        allergens: [],
      })
    }
  }

  const removeMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id))
  }

  const startEditingItem = (item: MenuItem) => {
    setNewItem(item)
    setEditingItemId(item.id)
  }

  const addCategory = () => {
    if (newCategory) {
      setCategories([...categories, { id: Date.now().toString(), name: newCategory }])
      setNewCategory('')
    }
  }

  const removeCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id))
    setMenuItems(menuItems.filter(item => item.category !== id))
  }

  const addTag = () => {
    if (newTag) {
      if (editingTagId) {
        setTags(tags.map(tag => 
          tag.id === editingTagId ? { ...tag, name: newTag } : tag
        ))
        setEditingTagId(null)
      } else {
        setTags([...tags, { id: Date.now().toString(), name: newTag }])
      }
      setNewTag('')
    }
  }

  const removeTag = (id: string) => {
    setTags(tags.filter(tag => tag.id !== id))
    setMenuItems(menuItems.map(item => 
      item.tag === id ? { ...item, tag: '' } : item
    ))
  }

  const startEditingTag = (tag: Tag) => {
    setNewTag(tag.name)
    setEditingTagId(tag.id)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Add Menu Item</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={newItem.name}
            onChange={handleItemChange}
            className="border p-2 rounded"
          />
          <div className="relative">
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={newItem.price}
              onChange={handleItemChange}
              className="border p-2 rounded w-full pr-8"
            />
            <span className="absolute right-2 top-2 text-gray-500">Dh</span>
          </div>
          <textarea
            name="description"
            placeholder="Description"
            value={newItem.description}
            onChange={handleItemChange}
            className="border p-2 rounded col-span-2"
          />
          <select
            name="category"
            value={newItem.category}
            onChange={handleItemChange}
            className="border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            name="tag"
            value={newItem.tag}
            onChange={handleItemChange}
            className="border p-2 rounded"
          >
            <option value="">Select Tag</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image Upload
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border p-2 rounded w-full"
            />
            {newItem.image && (
              <img src={newItem.image} alt="Preview" className="mt-2 h-32 object-cover rounded" />
            )}
          </div>
          <input
            type="text"
            name="specialNotes"
            placeholder="Special Notes"
            value={newItem.specialNotes}
            onChange={handleItemChange}
            className="border p-2 rounded col-span-2"
          />
          <input
            type="text"
            name="allergens"
            placeholder="Allergens (comma-separated)"
            value={newItem.allergens?.join(', ')}
            onChange={(e) => setNewItem({ ...newItem, allergens: e.target.value.split(',').map(a => a.trim()) })}
            className="border p-2 rounded col-span-2"
          />
        </div>
        <button
          onClick={addMenuItem}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          {editingItemId ? <Save className="mr-2" /> : <Plus className="mr-2" />}
          {editingItemId ? 'Update Item' : 'Add Item'}
        </button>
      </div>

      {/* Category Management section remains unchanged */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Category Management</h2>
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border p-2 rounded flex-grow"
          />
          <button
            onClick={addCategory}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <Plus className="mr-2" />
            Add Category
          </button>
        </div>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center justify-between bg-white p-2 rounded shadow">
              <span>{category.name}</span>
              <button
                onClick={() => removeCategory(category.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tag Management section remains unchanged */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Tag Management</h2>
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Tag Name"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="border p-2 rounded flex-grow"
          />
          <button
            onClick={addTag}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            {editingTagId ? <Save className="mr-2" /> : <Plus className="mr-2" />}
            {editingTagId ? 'Update Tag' : 'Add Tag'}
          </button>
        </div>
        <ul className="space-y-2">
          {tags.map((tag) => (
            <li key={tag.id} className="flex items-center justify-between bg-white p-2 rounded shadow">
              <span className="flex items-center">
                <TagIcon className="mr-2 text-purple-600" size={16} />
                {tag.name}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => startEditingTag(tag)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => removeTag(tag.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-start">
                <div className="flex">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded mr-4" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-sm">
                      Category: {categories.find(c => c.id === item.category)?.name}
                    </p>
                    {item.tag && (
                      <p className="text-sm">
                        Tag: {tags.find(t => t.id === item.tag)?.name}
                      </p>
                    )}
                    <p className="text-amber-800 font-semibold">{item.price} Dh</p>
                    {item.specialNotes && (
                      <p className="text-sm text-amber-600 italic">{item.specialNotes}</p>
                    )}
                    {item.allergens && item.allergens.length > 0 && (
                      <p className="text-xs text-red-600">
                        Allergens: {item.allergens.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditingItem(item)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => removeMenuItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MenuCreator