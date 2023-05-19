import {
  Control,
  Controller,
  UseFormRegister,
  UseFormStateReturn,
} from "react-hook-form";
import { object, string } from "yup";

import { ModifiableWorld } from "@/api/world/types";
import { nameRegex } from "@/lib";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { TextArea } from "@/components/ui/textarea";

interface Props {
  formState: UseFormStateReturn<ModifiableWorld>;
  register: UseFormRegister<ModifiableWorld>;
  control: Control<ModifiableWorld>;
}

export const worldShape = object().shape({
  name: string()
    .required("Name is required!")
    .max(45, "Cannot be longer than 45 characters.")
    .matches(nameRegex, "Cannot contain special characters."),
  visibility: string().required("Visibility is required!"),
  description: string().required("World Description is required!"),
});

export default function WorldForm(props: Props) {
  const { formState, control, register } = props;

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row">
        <Input
          className="flex-1"
          errorText={formState.errors.name?.message}
          helpText="Make it cool, interesting, and unique!"
          label="World Name"
          placeholder="Forgotten Realms"
          status={formState.errors.name ? "error" : "default"}
          {...register("name")}
        />

        <Controller
          control={control}
          name="visibility"
          render={({ field }) => (
            <Select
              className="flex-1"
              errorText={formState.errors.visibility?.message}
              helpText="Should it be publicly accessible by everyone, or should it be private?"
              label="Privacy"
              onValueChange={field.onChange}
              placeholder="Privacy"
              status={formState.errors.visibility ? "error" : "default"}
              {...field}
            >
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </Select>
          )}
        />
      </div>

      <TextArea
        errorText={formState.errors.description?.message}
        helpText="This should be a short description of your world, no more than a paragraph."
        label="World Description"
        rows={6}
        status={formState.errors.description ? "error" : "default"}
        {...register("description")}
      />
    </>
  );
}
