'use client';
import { fetcher, post } from '@/lib/api';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { Field, Form, Formik } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import { Fund, TransactionFormProps } from '../interfaces';


export default function TransactionForm({ isOpen, setIsOpen, onSaved, transactionsItem }: TransactionFormProps) {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [rawShareQty, setRawShareQty] = useState('');

  useEffect(() => {
    fetcher('/funds').then((funds) => {
      setFunds(funds);
    });
    setRawShareQty('');
  }, [isOpen]);

  const initialValues = {
    date: new Date().toISOString().split('T')[0],
    amount: transactionsItem?.amount || 0,
    share_qty: parseFloat(transactionsItem?.share_qty?.toString() ?? '0') || 0.0,
    tx_type: transactionsItem ? 'RESGATE' : 'APORTE',
    fund_id: transactionsItem?.fund_id,
  };

  function formatCurrency(value: number | string) {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num)
      ? ''
      : num.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
        });
  }

  async function handleSubmit(values: typeof initialValues) {
    try {
      await post('/transactions', values);
      onSaved();
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
    }
  }


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 flex items-center justify-center" onClose={() => setIsOpen(false)}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-90"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
                <h2 className="text-lg font-semibold mb-4 text-center">{transactionsItem ? 'Resgatar cotas' : 'Novo Aporte'}</h2>

                <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                  {({ isSubmitting, setFieldValue, values }) => {
                    return (
                      <Form className="space-y-4">
                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Fundo</label>
                          <Field as="select" name="fund_id" className="border rounded px-4 py-2" disabled={values.tx_type === 'RESGATE'}>
                            <option value="">Selecione um fundo</option>
                            {funds?.map((fund: Fund) => (
                              <option key={fund.id} value={fund.id}>{fund.ticker} - {fund.name}</option>
                            ))}
                          </Field>
                        </div>

                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Quantidade de cotas</label>
                          <input
                            type="text"
                            inputMode="decimal"
                            className="border rounded px-4 py-2"
                            placeholder="Ex: 5,5"
                            value={rawShareQty === '' ? '' : rawShareQty}
                            onChange={(e) => {
                              const input = e.target.value;
                              setRawShareQty(input);

                              const numeric = parseFloat(input.replace(',', '.'));
                              if (!isNaN(numeric)) {
                                setFieldValue('share_qty', numeric);

                                const fundoSelecionado = funds?.find((f: Fund) => f.id === Number(values.fund_id));

                                if (fundoSelecionado) {
                                  const calc = numeric * parseFloat(fundoSelecionado?.share_value?.toString() ?? '0');
                                  setFieldValue('amount', isNaN(calc) ? 0 : parseFloat(calc.toFixed(2)));
                                }
                              }
                            }}
                            onBlur={() => {
                              const n = parseFloat(rawShareQty.replace(',', '.'));
                              setRawShareQty(isNaN(n) ? '' : n.toString().replace('.', ','));
                            }}
                            onFocus={() => setRawShareQty(values.share_qty === 0 ? '' : values.share_qty.toString().replace('.', ','))}
                          />
                        </div>

                        <div className="flex flex-col">
                          <label className="text-sm font-medium mb-1">Valor total (R$)</label>
                          <div className="border rounded px-4 py-2 bg-gray-100 text-gray-700">
                            {formatCurrency(values.amount)}
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <button type="button" onClick={() => setIsOpen(false)} className="rounded-md px-4 py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer">
                            Cancelar
                          </button>
                          <button type="submit" disabled={isSubmitting} className="rounded-md px-4 py-2 bg-black text-white hover:bg-gray-700 cursor-pointer">
                            {isSubmitting ? 'Salvando...' : transactionsItem ? 'Resgatar' : 'Salvar'}
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
