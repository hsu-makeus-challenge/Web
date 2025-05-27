import {
  useForm as useReactHookForm,
  UseFormProps,
  UseFormReturn,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, ZodTypeDef } from "zod";

export function useForm<T extends FieldValues>(
  schema: ZodType<T, ZodTypeDef, T>,
  options?: UseFormProps<T>
): UseFormReturn<T> {
  return useReactHookForm<T>({
    resolver: zodResolver(schema),
    ...options,
  });
}
