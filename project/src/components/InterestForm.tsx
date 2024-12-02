import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { InterestCalculation, InterestResult, calculateInterest } from '../utils/calculations';

export default function InterestForm() {
  const [formData, setFormData] = useState<InterestCalculation>({
    capital: 0,
    tna: 0,
    payment: 0,
    diasVencidos: 0,
  });

  const [result, setResult] = useState<InterestResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const results = calculateInterest(formData);
    setResult(results);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">Calculadora de Intereses</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Capital
          </label>
          <input
            type="number"
            name="capital"
            value={formData.capital || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingrese el capital"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monto Cuota
          </label>
          <input
            type="number"
            name="payment"
            value={formData.payment || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingrese el monto de cuota"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            TNA (%)
          </label>
          <input
            type="number"
            name="tna"
            value={formData.tna || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingrese la TNA"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Días Vencidos
          </label>
          <input
            type="number"
            name="diasVencidos"
            value={formData.diasVencidos || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingrese los días vencidos"
            min="0"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Calcular
        </button>
      </form>

      {result && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Resultados</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Interés Diario:</p>
              <p className="text-lg font-medium">{formatCurrency(result.interesDiario)}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Interés Compensatorio:</p>
              <p className="text-lg font-medium">{formatCurrency(result.interesCompensatorio)}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Interés Punitorio:</p>
              <p className="text-lg font-medium">{formatCurrency(result.interesPunitorio)}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Monto Total:</p>
              <p className="text-lg font-semibold text-blue-600">{formatCurrency(result.montoTotal)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">En mora:</p>
              <p className="text-lg font-semibold text-blue-600">{formatCurrency(result.montoSolo)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}