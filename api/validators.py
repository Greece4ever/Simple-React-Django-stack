from django.core.exceptions import ValidationError


def max_file_size(file_value):
    max_length = 2.5 * 1048576 #2.5 MiB
    if file_value.size > max_length:
        raise ValidationError('File cannot be greater than 2.5 MiB')