export function formatDate(dateString: string): string {
    interface DateOpts {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }
    const opts: DateOpts = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }

    return new Date(dateString).toLocaleString("es-AR", opts)
}