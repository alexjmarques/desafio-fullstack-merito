'use client';
import { post } from '@/lib/api';
import { Field, Form, Formik } from 'formik';

interface Fund {
  id: number;
  ticker: string;
}

interface TransactionFormProps {
  funds: Fund[];
  onClose: () => void;
  onSaved: () => void;
}

export default function TransactionForm({ funds, onClose, onSaved }: TransactionFormProps) {
  const initialValues = {
    date: '',
    amount: 0,
    share_qty: 0,
    tx_type: 'APORTE',
    fund_id: funds[0]?.id
  };

  async function handleSubmit(values: typeof initialValues) {
    await post('/transactions', values);
    onSaved();
    onClose();
  }

  return (
    <div className="modal">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="modal-box">
            <h2 className="mb-4 text-lg font-semibold">Aporte / Resgate</h2>

            <Field
              type="date"
              name="date"
              className="input mb-3 w-full"
              required
            />

            <Field
              as="select"
              name="fund_id"
              className="select mb-3 w-full"
            >
              {funds.map((f: Fund) => <option key={f.id} value={f.id}>{f.ticker}</option>)}
            </Field>

            <div className="flex gap-3 mb-3">
              <Field
                name="amount"
                placeholder="Valor (R$)"
                type="number"
                step="0.01"
                className="input w-full"
                required
              />
              <Field
                name="share_qty"
                placeholder="Cotas"
                type="number"
                step="0.0001"
                className="input w-full"
                required
              />
            </div>

            <Field
              as="select"
              name="tx_type"
              className="select mb-4 w-full"
            >
              <option value="APORTE">Aporte</option>
              <option value="RESGATE">Resgate</option>
            </Field>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
              <button type="submit" disabled={isSubmitting} className="btn-primary">Salvar</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}