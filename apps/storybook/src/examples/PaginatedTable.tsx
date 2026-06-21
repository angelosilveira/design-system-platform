import React, { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Input,
  Pagination,
  Table,
  Typography,
} from "@design-system/ui";

type Status = "Ativo" | "Inativo" | "Pendente";

interface Member {
  id: number;
  name: string;
  role: string;
  team: string;
  status: Status;
  joined: string;
}

const ALL_MEMBERS: Member[] = Array.from({ length: 47 }, (_, i) => {
  const statuses: Status[] = ["Ativo", "Ativo", "Ativo", "Pendente", "Inativo"];
  const roles = ["Frontend", "Backend", "Fullstack", "Design", "Product", "QA"];
  const teams = ["Plataforma", "Growth", "Core", "Mobile", "Infra"];
  return {
    id: i + 1,
    name: `Colaborador ${String(i + 1).padStart(2, "0")}`,
    role: roles[i % roles.length],
    team: teams[i % teams.length],
    status: statuses[i % statuses.length],
    joined: new Date(2024, i % 12, (i % 28) + 1).toLocaleDateString("pt-BR"),
  };
});

const STATUS_VARIANT: Record<Status, "success" | "default" | "warning"> = {
  Ativo: "success",
  Inativo: "default",
  Pendente: "warning",
};

const PAGE_SIZE = 8;

type SortDir = "ascending" | "descending";

/**
 * Tabela paginada demonstrando composição de Table, Pagination, Input e Badge.
 */
export function PaginatedTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<SortDir>("ascending");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL_MEMBERS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.team.toLowerCase().includes(q),
    );
  }, [search]);

  const sorted = useMemo(() => {
    if (!sortColumn) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortColumn as keyof Member] as string;
      const bv = b[sortColumn as keyof Member] as string;
      return sortDirection === "ascending"
        ? av.localeCompare(bv)
        : bv.localeCompare(av);
    });
  }, [filtered, sortColumn, sortDirection]);

  const total = Math.ceil(sorted.length / PAGE_SIZE);
  const pageData = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSort(column: string) {
    if (sortColumn === column) {
      setSortDirection((d) => (d === "ascending" ? "descending" : "ascending"));
    } else {
      setSortColumn(column);
      setSortDirection("ascending");
    }
    setPage(1);
  }

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography.Heading size="lg">Membros da equipe</Typography.Heading>
        <Badge variant="default">{filtered.length} membros</Badge>
      </div>

      <div className="flex items-center gap-3">
        <Input
          label="Buscar membros"
          hideLabel
          placeholder="Buscar por nome, função ou time..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-72"
        />
        {search && (
          <Button variant="ghost" size="sm" onClick={() => handleSearch("")}>
            Limpar
          </Button>
        )}
      </div>

      <Table.Root caption="Lista de membros da equipe" captionVisuallyHidden>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sortDirection={sortColumn === "name" ? sortDirection : "none"}
              onSort={() => handleSort("name")}
            >
              Nome
            </Table.HeaderCell>
            <Table.HeaderCell
              sortDirection={sortColumn === "role" ? sortDirection : "none"}
              onSort={() => handleSort("role")}
            >
              Função
            </Table.HeaderCell>
            <Table.HeaderCell
              sortDirection={sortColumn === "team" ? sortDirection : "none"}
              onSort={() => handleSort("team")}
            >
              Time
            </Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Entrada</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {pageData.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={5} className="text-center text-text-subtle py-8">
                Nenhum membro encontrado para &ldquo;{search}&rdquo;
              </Table.Cell>
            </Table.Row>
          ) : (
            pageData.map((member) => (
              <Table.Row key={member.id}>
                <Table.Cell className="font-medium">{member.name}</Table.Cell>
                <Table.Cell>{member.role}</Table.Cell>
                <Table.Cell>{member.team}</Table.Cell>
                <Table.Cell>
                  <Badge variant={STATUS_VARIANT[member.status]} size="sm">
                    {member.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="text-text-subtle">{member.joined}</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>

      {total > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={total}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
