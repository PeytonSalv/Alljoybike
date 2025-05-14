'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInDays } from 'date-fns';

interface Props {
  start: Date | null;
  end: Date | null;
  onChange(range: { start: Date | null; end: Date | null }): void;
  onConfirm?(): void;
}

export default function RentalDatePicker({ start, end, onChange, onConfirm }: Props) {
  // Calculate days between dates (excluding the last day)
  const daysBetween = start && end ? differenceInDays(end, start) : 0;
  
  return (
    <section className="flex justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Select Your Rental Dates
        </h2>
        
        <div className="flex justify-center items-center mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span>Return by end of day on last date</span>
            <div className="relative group">
              <div className="cursor-help w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
                i
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-gray-800 text-white text-xs rounded p-2 shadow-lg">
                Rental period counts from pickup date to return date, excluding the return date. 
                For example, renting from 13th to 16th counts as a 3-day rental.
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Start date */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Start Date
            </label>
            <DatePicker
              selected={start}
              onChange={(date) =>
                onChange({ start: date, end: date && end && date > end ? null : end })
              }
              selectsStart
              startDate={start}
              endDate={end}
              minDate={new Date()}
              placeholderText="Start date"
              className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#29B0C2] focus:border-[#29B0C2] transition"
            />
          </div>

          {/* End date */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              End Date
            </label>
            <DatePicker
              selected={end}
              onChange={(date) => onChange({ start, end: date })}
              selectsEnd
              startDate={start}
              endDate={end}
              minDate={start || new Date()}
              placeholderText="End date"
              className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#29B0C2] focus:border-[#29B0C2] transition"
            />
          </div>
        </div>
        
        {/* Confirmation button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onConfirm}
            disabled={!start || !end}
            className={`px-6 py-3 rounded-md text-white font-semibold transition ${
              start && end
                ? 'bg-[#29B0C2] hover:bg-[#218b99] cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {start && end 
              ? `Confirm ${daysBetween} ${daysBetween === 1 ? 'day' : 'days'} rental`
              : 'Select both dates'}
          </button>
        </div>
      </div>
    </section>
  );
}