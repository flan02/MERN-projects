
//? Esta funcion es para asegurarnos que el valor que le pasamos no sea undefined acepta cualquier tipo de dato.
export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
    if (!val) throw new Error(`Expected 'val' to be defined, but received ${val}`)
}

