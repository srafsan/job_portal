import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FieldError } from "react-hook-form";
import { TextField } from "@mui/material";

type DatePickerFormFieldProps = {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: FieldError;
};

const DatePickerFormField: React.FC<DatePickerFormFieldProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value}
          onChange={onChange}
          textField={(params: any) => (
            <TextField
              {...params}
              error={!!error}
              helperText={error ? error.message : ""}
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
};

export default DatePickerFormField;
