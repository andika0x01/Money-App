"use client";

import { useState } from "react";
import { TransactionFormData, TransactionType } from "@/types";
import { Plus, X } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

interface FormProps {
  onAdd: (data: TransactionFormData) => void;
}

export const TransactionForm = ({ onAdd }: FormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState("Umum");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    onAdd({
      title,
      amount: parseFloat(amount),
      type,
      category,
    });

    setTitle("");
    setAmount("");
    setIsOpen(false);
  };

  return (
    <div className="mb-12">
      {!isOpen ? (
        <motion.button
          layoutId="form"
          onClick={() => setIsOpen(true)}
          className="w-full py-4 border-2 border-dashed border-zinc-200 rounded-2xl flex items-center justify-center gap-2 text-zinc-400 hover:text-zinc-600 hover:border-zinc-300 transition-all font-medium"
        >
          <Plus size={20} weight="bold" />
          Add Transaction
        </motion.button>
      ) : (
        <motion.div
          layoutId="form"
          className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold tracking-tight">New Transaction</h3>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-zinc-600">
              <X size={20} weight="bold" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2 p-1 bg-zinc-100 rounded-lg mb-4">
              <button
                type="button"
                onClick={() => setType("expense")}
                className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
                  type === "expense" ? "bg-white shadow-sm text-rose-600" : "text-zinc-500"
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setType("income")}
                className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
                  type === "income" ? "bg-white shadow-sm text-emerald-600" : "text-zinc-500"
                }`}
              >
                Income
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 ml-1">Title</label>
              <input
                autoFocus
                type="text"
                placeholder="What did you buy/earn?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950/10 transition-all text-zinc-950"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 ml-1">Amount</label>
                <input
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950/10 transition-all text-zinc-950 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 ml-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-950/10 transition-all text-zinc-950 appearance-none"
                >
                  <option>Umum</option>
                  <option>Makan</option>
                  <option>Transport</option>
                  <option>Hiburan</option>
                  <option>Gaji</option>
                  <option>Investasi</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-zinc-950 text-white rounded-xl font-bold mt-4 hover:bg-zinc-800 transition-all active:scale-[0.98]"
            >
              Add {type === "income" ? "Income" : "Expense"}
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
};
