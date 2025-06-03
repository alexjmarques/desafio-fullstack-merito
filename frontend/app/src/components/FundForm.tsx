'use client';
import { post } from '@/lib/api';
import { Field, Form, Formik } from 'formik';

interface FundForm {
    onClose: () => void;
    onSaved: () => void;
}

export default function FundForm({ onClose, onSaved }: FundForm) {
  const initialValues = {
    name: '',
    ticker: '',
    fund_type: '',
    share_value: 0
  };

  async function handleSubmit(values: typeof initialValues) {
    await post('/funds', values);
    onSaved();
    onClose();
  }

  return (
    <div className="modal">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="modal-box">
            <h2 className="mb-4 text-lg font-semibold">Novo fundo</h2>
            <Field
              name="name"
              placeholder="Nome"
              className="input mb-3 w-full"
              required
            />
            <Field
              name="ticker"
              placeholder="Ticker"
              className="input mb-3 w-full"
              required
            />
            <Field
              name="fund_type"
              placeholder="Tipo"
              className="input mb-3 w-full"
              required
            />
            <Field
              name="share_value"
              placeholder="Cota (R$)"
              type="number"
              className="input mb-3 w-full"
              required
            />
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
              <button type="submit" disabled={isSubmitting} className="btn-primary">Salvar</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}