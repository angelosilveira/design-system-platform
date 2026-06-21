import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, Table } from "@design-system/ui";
import metrics from "./metrics.json";

export function HealthDashboard() {
  const coverageData = [
    { name: "Documentação", value: metrics.documentationCoverage },
    { name: "Testes", value: metrics.testCoverage },
    { name: "Descrição (JSDoc)", value: metrics.descriptionCoverage },
  ];

  return (
    <div className="flex w-full max-w-3xl flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Componentes" value={metrics.totalComponents} />
        <StatCard
          label="Documentação"
          value={`${metrics.documentationCoverage}%`}
        />
        <StatCard
          label="Cobertura de testes"
          value={`${metrics.testCoverage}%`}
        />
        <StatCard label="Testes unitários" value={metrics.totalTests} />
      </div>

      <Card.Root>
        <Card.Header>
          <Card.Title>Cobertura por categoria</Card.Title>
          <Card.Description>
            Calculado lendo o código real de cada componente (presença de
            stories, testes e JSDoc).
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coverageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} unit="%" />
                <Tooltip />
                <Bar dataKey="value" fill="#0052CC" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card.Root>

      <Card.Root padding="none">
        <Table.Root caption="Detalhamento por componente">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Componente</Table.HeaderCell>
              <Table.HeaderCell>Stories</Table.HeaderCell>
              <Table.HeaderCell>Testes</Table.HeaderCell>
              <Table.HeaderCell>Descrição</Table.HeaderCell>
              <Table.HeaderCell>Linhas de código</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {metrics.components.map((component) => (
              <Table.Row key={component.name}>
                <Table.Cell className="font-medium">
                  {component.name}
                </Table.Cell>
                <Table.Cell>
                  <StatusBadge ok={component.hasStories} />
                </Table.Cell>
                <Table.Cell>
                  <StatusBadge
                    ok={component.hasTests}
                    label={`${component.testCount} casos`}
                  />
                </Table.Cell>
                <Table.Cell>
                  <StatusBadge ok={component.hasDescription} />
                </Table.Cell>
                <Table.Cell>{component.linesOfCode}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card.Root>

      <p className="text-xs text-text-subtle">
        Última atualização:{" "}
        {new Date(metrics.generatedAt).toLocaleString("pt-BR")} · gerado por{" "}
        <code>pnpm metrics</code>
      </p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card.Root padding="sm" className="text-center">
      <p className="text-2xl font-semibold text-text">{value}</p>
      <p className="text-xs text-text-subtle">{label}</p>
    </Card.Root>
  );
}

function StatusBadge({ ok, label }: { ok: boolean; label?: string }) {
  return (
    <span
      className={
        ok
          ? "inline-flex items-center gap-1 rounded bg-success-subtle px-2 py-0.5 text-xs text-success-hover"
          : "inline-flex items-center gap-1 rounded bg-danger-subtle px-2 py-0.5 text-xs text-danger-hover"
      }
    >
      {ok ? "✓" : "✕"} {label ?? (ok ? "Sim" : "Não")}
    </span>
  );
}
