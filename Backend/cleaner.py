def clean_data(data):
    if isinstance(data, dict):
        return {k: clean_data(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [clean_data(i) for i in data]
    elif isinstance(data, float):
        if data == float('inf') or data == float('-inf') or data != data:  # Checks for inf and NaN values
            return None
    return data
