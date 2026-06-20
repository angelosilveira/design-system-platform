import { useRef, useState, type KeyboardEvent } from "react";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday as dateIsToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "../../lib/cn";
import { dayCellVariants } from "./datepicker.variants";

const WEEKDAY_LABELS = ["D", "S", "T", "Q", "Q", "S", "S"];

function getMonthGrid(monthDate: Date): Date[] {
  const start = startOfWeek(startOfMonth(monthDate));
  const end = endOfWeek(endOfMonth(monthDate));
  const days: Date[] = [];
  let cursor = start;
  while (cursor <= end) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return days;
}

export interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

export function Calendar({
  selectedDate,
  onSelectDate,
  onClose,
}: CalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(selectedDate ?? new Date());
  const [focusedDate, setFocusedDate] = useState(selectedDate ?? new Date());
  const cellRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const days = getMonthGrid(visibleMonth);

  function focusDate(date: Date) {
    setFocusedDate(date);
    if (!isSameMonth(date, visibleMonth)) {
      setVisibleMonth(date);
    }
    requestAnimationFrame(() => {
      cellRefs.current.get(format(date, "yyyy-MM-dd"))?.focus();
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, date: Date) {
    const keyActions: Record<string, () => void> = {
      ArrowRight: () => focusDate(addDays(date, 1)),
      ArrowLeft: () => focusDate(addDays(date, -1)),
      ArrowDown: () => focusDate(addDays(date, 7)),
      ArrowUp: () => focusDate(addDays(date, -7)),
      Home: () => focusDate(startOfWeek(date)),
      End: () => focusDate(endOfWeek(date)),
      PageUp: () => {
        const newDate = subMonths(date, 1);
        setVisibleMonth(newDate);
        focusDate(newDate);
      },
      PageDown: () => {
        const newDate = addMonths(date, 1);
        setVisibleMonth(newDate);
        focusDate(newDate);
      },
      Enter: () => {
        onSelectDate(date);
        onClose();
      },
      " ": () => {
        onSelectDate(date);
        onClose();
      },
      Escape: () => onClose(),
    };

    const action = keyActions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  }

  return (
    <div role="application" aria-label="Calendário" className="w-72 p-3">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          aria-label="Mês anterior"
          onClick={() => setVisibleMonth((current) => subMonths(current, 1))}
          className="rounded-md p-1 text-text-subtle hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          ‹
        </button>
        <span
          className="text-sm font-semibold capitalize text-text"
          aria-live="polite"
        >
          {format(visibleMonth, "MMMM yyyy", { locale: ptBR })}
        </span>
        <button
          type="button"
          aria-label="Próximo mês"
          onClick={() => setVisibleMonth((current) => addMonths(current, 1))}
          className="rounded-md p-1 text-text-subtle hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          ›
        </button>
      </div>

      <div
        role="grid"
        aria-label={format(visibleMonth, "MMMM yyyy", { locale: ptBR })}
      >
        <div role="row" className="mb-1 grid grid-cols-7">
          {WEEKDAY_LABELS.map((label, index) => (
            <span
              key={index}
              role="columnheader"
              aria-label={label}
              className="flex h-8 w-9 items-center justify-center text-xs font-medium text-text-subtle"
            >
              {label}
            </span>
          ))}
        </div>

        {Array.from({ length: days.length / 7 }).map((_, weekIndex) => (
          <div role="row" key={weekIndex} className="grid grid-cols-7">
            {days.slice(weekIndex * 7, weekIndex * 7 + 7).map((day) => {
              const isFocusable = isSameDay(day, focusedDate);
              const isSelected = Boolean(
                selectedDate && isSameDay(day, selectedDate),
              );
              const isOutsideMonth = !isSameMonth(day, visibleMonth);

              return (
                <div role="gridcell" key={day.toISOString()}>
                  <button
                    type="button"
                    ref={(node) => {
                      if (node)
                        cellRefs.current.set(format(day, "yyyy-MM-dd"), node);
                    }}
                    tabIndex={isFocusable ? 0 : -1}
                    aria-selected={isSelected}
                    aria-label={format(day, "PPPP", { locale: ptBR })}
                    aria-current={dateIsToday(day) ? "date" : undefined}
                    onClick={() => {
                      onSelectDate(day);
                      onClose();
                    }}
                    onKeyDown={(event) => handleKeyDown(event, day)}
                    className={cn(
                      dayCellVariants({
                        isSelected,
                        isOutsideMonth,
                        isToday: dateIsToday(day),
                      }),
                    )}
                  >
                    {format(day, "d")}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
