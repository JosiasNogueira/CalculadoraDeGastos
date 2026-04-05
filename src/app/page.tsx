'use client';

import { useExpenseStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const { expenses, getMonthlyTotal } = useExpenseStore();
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  const total = getMonthlyTotal(currentMonth);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calculadora de Gastos Mensais</h1>
      <Card>
        <CardHeader>
          <CardTitle>Total do Mês Atual: R$ {total.toFixed(2)}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Gastos registrados: {expenses.length}</p>
          <div className="mt-4 space-x-2">
            <Link href="/add-expense">
              <Button>Adicionar Gasto</Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline">Gerenciar Categorias</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      {/* Lista de gastos aqui (expandir futuramente) */}
    </div>
  );
}
