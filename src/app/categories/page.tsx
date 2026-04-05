'use client';

import { useState } from 'react';
import { useExpenseStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Categories() {
  const { categories, addCategory, removeCategory } = useExpenseStore();
  const [newCategory, setNewCategory] = useState('');

  const handleAdd = () => {
    if (newCategory.trim()) {
      addCategory({ name: newCategory, isPredefined: false });
      setNewCategory('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Categorias</h1>
      <div className="mb-4">
        <Label htmlFor="new-cat">Nova Categoria</Label>
        <div className="flex space-x-2">
          <Input id="new-cat" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
          <Button onClick={handleAdd}>Adicionar</Button>
        </div>
      </div>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id} className="flex justify-between items-center">
            {cat.name} {cat.isPredefined && '(Pré-definida)'}
            {!cat.isPredefined && (
              <Button variant="destructive" size="sm" onClick={() => removeCategory(cat.id)}>
                Remover
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}