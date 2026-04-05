import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  isConstant: boolean;
}

interface Category {
  id: string;
  name: string;
  isPredefined: boolean;
}

interface ExpenseStore {
  expenses: Expense[];
  categories: Category[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  removeExpense: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  removeCategory: (id: string) => void;
  getMonthlyTotal: (month: string) => number;
}

const predefinedCategories: Category[] = [
  { id: '1', name: 'Alimentação', isPredefined: true },
  { id: '2', name: 'Transporte', isPredefined: true },
  { id: '3', name: 'Lazer', isPredefined: true },
  { id: '4', name: 'Saúde', isPredefined: true },
  { id: '5', name: 'Educação', isPredefined: true },
];

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: [],
      categories: predefinedCategories,
      addExpense: (expense) =>
        set((state) => ({
          expenses: [...state.expenses, { ...expense, id: Date.now().toString() }],
        })),
      removeExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),
      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, { ...category, id: Date.now().toString() }],
        })),
      removeCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id && !c.isPredefined),
        })),
      getMonthlyTotal: (month) => {
        const expenses = get().expenses.filter((e) => e.date.startsWith(month));
        return expenses.reduce((total, e) => total + e.amount, 0);
      },
    }),
    { name: 'expense-store' }
  )
);