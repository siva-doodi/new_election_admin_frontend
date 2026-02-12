'use client'

import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'
import TextField from '@mui/material/TextField'

export default function ClockTimePicker({ value, onChange, label }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopTimePicker
        label={label}
        value={value ? dayjs(value, 'HH:mm') : null}
        onChange={(newValue) => {
          if (!newValue) return
          onChange(newValue.format('HH:mm'))
        }}
        views={['hours', 'minutes']}
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
        }}
        ampm
        slotProps={{
          textField: {
            fullWidth: true,
            size: 'small',
          },
        }}
      />
    </LocalizationProvider>
  )
}
