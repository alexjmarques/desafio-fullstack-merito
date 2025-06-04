'use client';
import { post, put } from '@/lib/api';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { Field, Form, Formik } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import { FundFormProps } from '../interfaces';



export default function FundForm({ onClose, onSaved, isOpen, setIsOpen, fund }: FundFormProps) {
  const [rawShareValue, setRawShareValue] = useState('');
  const initialValues = fund ?? {
    name: '',
    ticker: '',
    fund_type: '',
    share_value: 0
  };

  function formatCurrency(value: number | string) {
    if (!value && value !== 0) return '';
    const number = typeof value === 'string' ? parseFloat(value) : value;
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  }

  async function handleSubmit(values: typeof initialValues) {
    try {
      if (fund?.id) {
        await put(`/funds/${fund.id}`, values);
      } else {
        await post('/funds', values);
      }
      onSaved();
      setIsOpen(false);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar fundo:", error);
    }
  }


  useEffect(() => {
    if (fund?.share_value) {
      setRawShareValue(formatCurrency(fund.share_value));
    } else {
      setRawShareValue('');
    }
  }, [fund]);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex items-center justify-center z-10" onClose={() => setIsOpen(false)}>
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
                <div className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <h2 className="text-lg font-semibold mb-4 text-center">
                    Novo fundo
                  </h2>

                  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="w-full flex flex-col mb-4">
                          <div className="relative p-1 rounded-lg">
                            <Field
                              id="name"
                              name="name"
                              placeholder=" "
                              className="peer w-full rounded-lg border h-[50px] border-stroke bg-transparent py-4 pl-4 pr-4 text-black outline-none focus:border-[#B3B3B3] focus-visible:shadow-none"
                              required
                            />
                            <label htmlFor="name" className="absolute bg-white font-light cursor-text px-1 transition-all transform origin-left z-0 -top-1 sm:-top-1 left-3 text-xs sm:text-sm text-secondary peer-focus:-top-1 sm:peer-focus:-top-1 peer-focus:text-[10px] peer-focus:text-primary">Nome</label>
                          </div>
                        </div>

                        <div className="w-full flex flex-col mb-4">
                          <div className="relative p-1 rounded-lg">
                            <Field
                              id="ticker"
                              name="ticker"
                              placeholder=" "
                              className="peer w-full rounded-lg border h-[50px] border-stroke bg-transparent py-4 pl-4 pr-4 text-black outline-none focus:border-[#B3B3B3] focus-visible:shadow-none"
                              required
                            />
                            <label htmlFor="ticker" className="absolute bg-white font-light cursor-text px-1 transition-all transform origin-left z-0 -top-1 sm:-top-1 left-3 text-xs sm:text-sm text-secondary peer-focus:-top-1 sm:peer-focus:-top-1 peer-focus:text-[10px] peer-focus:text-primary">Código</label>
                          </div>
                        </div>

                        <div className="w-full flex flex-col mb-4">
                          <div className="relative p-1 rounded-lg">
                            <Field
                              id="fund_type"
                              name="fund_type"
                              placeholder=" "
                              className="peer w-full rounded-lg border h-[50px] border-stroke bg-transparent py-4 pl-4 pr-4 text-black outline-none focus:border-[#B3B3B3] focus-visible:shadow-none"
                              required
                            />
                            <label htmlFor="fund_type" className="absolute bg-white font-light cursor-text px-1 transition-all transform origin-left z-0 -top-1 sm:-top-1 left-3 text-xs sm:text-sm text-secondary peer-focus:-top-1 sm:peer-focus:-top-1 peer-focus:text-[10px] peer-focus:text-primary">Tipo</label>
                          </div>
                        </div>

                        <div className="w-full flex flex-col mb-4">
                          <div className="relative p-1 rounded-lg">
                            <Field name="share_value">
                              {({ form }: { field: { name: string, value: number }, form: { setFieldValue: (name: string, value: number) => void } }) => (
                                <input
                                  type="text"
                                  inputMode="decimal"
                                  placeholder="Cota (R$)"
                                  className="peer w-full rounded-lg border h-[50px] border-stroke bg-transparent py-4 px-4 text-black outline-none focus:border-[#B3B3B3] focus-visible:shadow-none"
                                  value={rawShareValue}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const cleaned = value.replace(/[^\d,]/g, '');
                                    setRawShareValue(cleaned);
                                    const numeric = parseFloat(cleaned.replace(',', '.'));
                                    form.setFieldValue("share_value", isNaN(numeric) ? 0 : numeric);
                                  }}
                                  onBlur={() => {
                                    const numeric = parseFloat(rawShareValue.replace(',', '.'));
                                    setRawShareValue(
                                      isNaN(numeric) ? '' : formatCurrency(numeric)
                                    );
                                  }}
                                  onFocus={() => {
                                    if (fund?.share_value) {
                                      setRawShareValue(fund.share_value.toString().replace('.', ','));
                                    } else {
                                      setRawShareValue('');
                                    }
                                  }}
                                />
                              )}
                            </Field>


                            <label htmlFor="share_value" className="absolute bg-white font-light cursor-text px-1 transition-all transform origin-left z-0 -top-1 sm:-top-1 left-3 text-xs sm:text-sm text-secondary peer-focus:-top-1 sm:peer-focus:-top-1 peer-focus:text-[10px] peer-focus:text-primary">Cota (R$)</label>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end gap-2">
                          <button type="button" onClick={() => setIsOpen(false)} className="font-semibold rounded-md p-2 px-4 transition-colors duration-300 bg-gray-200 hover:bg-gray-600 hover:text-white cursor-pointer">
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`font-semibold rounded-md p-2 px-4 transition-colors duration-300 text-white cursor-pointer ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-600"
                              }`}
                          >
                            {isSubmitting ? "Salvando..." : "Salvar"}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
