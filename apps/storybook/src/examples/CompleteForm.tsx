import React, { useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Checkbox,
  Input,
  Radio,
  Select,
  Textarea,
  Typography,
} from "@design-system/ui";

const roleOptions = [
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Fullstack", value: "fullstack" },
  { label: "Design", value: "design" },
  { label: "Product", value: "product" },
];

type Status = "idle" | "success" | "error";

/**
 * Formulário completo demonstrando composição de componentes do Design System.
 *
 * Componentes usados: Typography, Input, Select, Textarea, Radio, Checkbox, Button, Alert, Badge.
 */
export function CompleteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [role, setRole] = useState("");
  const [notificationType, setNotificationType] = useState("email");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: EventTarget & HTMLFormElement) {
    const data = new FormData(form);
    const next: Record<string, string> = {};
    if (!data.get("name")) next.name = "Nome é obrigatório";
    if (!data.get("email")) next.email = "E-mail é obrigatório";
    if (!role) next.role = "Selecione uma função";
    if (!data.get("bio")) next.bio = "Conte um pouco sobre você";
    if (!agreed) next.terms = "Você precisa aceitar os termos";
    return next;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate(e.currentTarget);
    if (Object.keys(next).length > 0) {
      setErrors(next);
      setStatus("error");
      return;
    }
    setErrors({});
    setStatus("success");
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-surface rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <Typography.Heading size="xl">Cadastro de Perfil</Typography.Heading>
        <Badge variant="primary" size="sm">Beta</Badge>
      </div>

      {status === "success" && (
        <Alert
          variant="success"
          className="mb-6"
          onDismiss={() => setStatus("idle")}
        >
          Perfil salvo com sucesso!
        </Alert>
      )}
      {status === "error" && (
        <Alert
          variant="danger"
          className="mb-6"
          onDismiss={() => setStatus("idle")}
        >
          Corrija os campos com erro antes de continuar.
        </Alert>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <Input
          label="Nome completo"
          name="name"
          placeholder="Seu nome"
          errorMessage={errors.name}
          required
        />

        <Input
          label="E-mail"
          name="email"
          type="email"
          placeholder="voce@empresa.com"
          errorMessage={errors.email}
          required
        />

        <Select
          label="Função"
          options={roleOptions}
          value={role}
          onChange={setRole}
          placeholder="Selecione sua função"
          errorMessage={errors.role}
        />

        <Textarea
          label="Bio"
          name="bio"
          placeholder="Conte um pouco sobre você e sua experiência..."
          rows={4}
          errorMessage={errors.bio}
          helperText="Mínimo de 50 caracteres"
        />

        <div>
          <Typography.Text size="sm" weight="medium" className="mb-2 block">
            Preferência de notificação
          </Typography.Text>
          <Radio.Group
            name="notification"
            value={notificationType}
            onChange={setNotificationType}
            className="flex gap-6"
          >
            <Radio.Item value="email" label="E-mail" />
            <Radio.Item value="sms" label="SMS" />
            <Radio.Item value="push" label="Push" />
          </Radio.Group>
        </div>

        <Checkbox
          label="Li e aceito os termos de uso e a política de privacidade"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          errorMessage={errors.terms}
        />

        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="primary" className="flex-1">
            Salvar perfil
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setStatus("idle");
              setErrors({});
              setAgreed(false);
              setRole("");
            }}
          >
            Limpar
          </Button>
        </div>
      </form>
    </div>
  );
}
