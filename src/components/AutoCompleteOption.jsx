import React from 'react'

function AutoCompleteOption({ options, setSelected, selected }) {

    // 🔑 Convert formData.owner (ID) to the full user option object
    const selectedValue = options.find(option => option.id === setSelected) || null;

    const handleChange = (event, selectedOption) => {
        setSelected(selectedOption.id)
    };

    return (
        <Autocomplete
            disablePortal
            options={options}
            value={selectedValue}
            onChange={handleChange}
            getOptionLabel={(option) => option?.label || ""}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option) => {
                const { key, ...rest } = props;
                return (
                    <Box key={key} component="li" {...rest} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src={option.image}>{option.label.charAt(0)}</Avatar>
                        <Typography>{option.label}</Typography>
                    </Box>
                );
            }}
            renderInput={(params) => (
                <TextField {...params} label="Select Option" />
            )}
        />
    );
}

export default AutoCompleteOption