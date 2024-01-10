import React, {useState, useEffect} from 'react';
import DropDownPicker, {
  DropDownPickerProps,
} from 'react-native-dropdown-picker';

interface Option {
  label: string;
  value: string;
}

interface DropdownProps
  extends Omit<
    DropDownPickerProps<Option>,
    'open' | 'value' | 'items' | 'setOpen' | 'setValue' | 'setItems'
  > {
  items: Option[];
  defaultValue?: Option;
  onChange?: (selectedItem: Option) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  defaultValue,
  onChange,
  containerStyle,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue || null);

  useEffect(() => {
    if (onChange && value) {
      onChange(value);
    }
  }, [onChange, value]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      setOpen={setOpen}
      setValue={setValue}
      items={items}
      containerStyle={{width: '80%', ...containerStyle}}
      {...rest}
    />
  );
};

export default Dropdown;
