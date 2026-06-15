"use client";

import { useTransactions } from "@/hooks/useTransactions";
import { BalanceSummary } from "@/components/BalanceSummary";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { motion } from "motion/react";
import { Sparkle } from "@phosphor-icons/react";

export default function Home() {
  const { transactions, addTransaction, deleteTransaction, updateTransaction, isLoaded } = useTransactions();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-950 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-12 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 text-zinc-400 mb-1">
              <Sparkle size={16} weight="fill" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Personal Finance</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter text-zinc-950">
              Personal Finance Tracker
            </h1>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
              {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </header>

        {/* Summary Cards */}
        <BalanceSummary transactions={transactions} />

        {/* Action & List Section */}
        <div className="grid grid-cols-1 gap-8">
          <section>
            <TransactionForm onAdd={addTransaction} />
          </section>

          <section>
            <TransactionList 
              transactions={transactions} 
              onDelete={deleteTransaction}
              onUpdate={updateTransaction}
            />
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-zinc-200 text-center">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
            Built with Taste & Discipline - 2026
          </p>
        </footer>
      </div>
    </main>
  );
}
