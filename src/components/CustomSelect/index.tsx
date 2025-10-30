import { useRef } from 'react';
import {
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { type SelectProps } from '@mui/material/Select'; 

const POINTER_CLASSNAME = "pointer-open";

const CustomSelect = <T extends string | string[] = string>(
  {
    label, // These are now destructured directly from SelectProps<T>
    id,
    labelId,
    children,
    MenuProps,
    input, // Ensure 'input' prop is destructured if you explicitly use it
    ...rest // Capture all other standard SelectProps
  }: SelectProps<T>
) => {
  const menu = useRef<HTMLUListElement>(null);

  const mergedMenuProps = {
    ...MenuProps,
    slotProps: {
      list: {
        ref: menu,
      },
    },
    sx: {
      [`.${POINTER_CLASSNAME} .MuiMenuItem-root.Mui-focusVisible`]: {
        backgroundColor: 'transparent',
      },
      [`.${POINTER_CLASSNAME} .MuiMenuItem-root:hover.Mui-focusVisible`]: {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    onKeyDown: () => {
      menu.current?.classList.remove(POINTER_CLASSNAME);
    },
  };

  return (
    <FormControl fullWidth>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select<T>
        // Use the passed 'input' prop if available, otherwise default to OutlinedInput
        input={input || <OutlinedInput label={label} />}
        /**
       * The next three properties are a workaround to deal with
       * https://github.com/mui/material-ui/issues/23747
       *
       * Note: Another workaround is mentioned in the issue, but breaks
       * accessibility (https://github.com/mui/material-ui/issues/23747#issuecomment-2596590221)
       */
      onPointerDown={() => {
        // This likely isn't necessasry---the Menu unmounts on close.
        // But let's not rely on that.
        menu.current?.classList.remove(POINTER_CLASSNAME)
      }}
      onPointerUp={() => {
        menu.current?.classList.add(POINTER_CLASSNAME)
      }}
        MenuProps={mergedMenuProps}
        {...rest} // Spread all remaining SelectProps to the MUI Select component
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
