import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

export default function CustomSelect({
  placeholder = "Select an option",
  options = [],
  value,
  onChange,
}) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className="
          flex
          h-14
          w-full
          items-center
          justify-between
          rounded-2xl
          bg-grey-100
          px-4
          text-body
          text-black-400
          outline-none
          transition
          data-[placeholder]:text-black-200
          hover:bg-grey-200
          focus:ring-2
          focus:ring-black-400/10
        "
      >
        <Select.Value placeholder={placeholder} />

        <Select.Icon>
          <ChevronDown size={18} className="text-black-300" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          className="
            z-50
            w-[var(--radix-select-trigger-width)]
            overflow-hidden
            rounded-2xl
            bg-grey-100
            shadow-xl
            border
            border-grey-200
            animate-in
            fade-in-0
            zoom-in-95
          "
        >
          <Select.Viewport className="p-2">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="
                  relative
                  flex
                  cursor-pointer
                  select-none
                  items-center
                  rounded-xl
                  px-4
                  py-3
                  text-body
                  text-black-400
                  outline-none
                  transition
                  hover:bg-white
                  data-[highlighted]:bg-white
                  data-[state=checked]:bg-white
                "
              >
                <Select.ItemText>{option.label}</Select.ItemText>

                <Select.ItemIndicator className="absolute right-4">
                  <Check size={16} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}