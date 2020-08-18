from django.core.exceptions import ValidationError

def max_file_size(file_value):
    max_length = 2.5 * 1048576 #2.5 MiB
    if file_value.size > max_length:
        raise ValidationError('File cannot be greater than 2.5 MiB')


def maxRepositorySize(**kwargs) -> None:
    name = kwargs.get('name')
    description = kwargs.get('description')
    if len(name) > 100 or len(description) > 500:
        raise ValidationError("Invalid Arguments : Title and description must be at most 100 and 500 characters accordingly")
