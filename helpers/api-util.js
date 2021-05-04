export async function getAllEvents() {
    const res = (await fetch('https://nextjs-8bf06-default-rtdb.firebaseio.com/events.json'))
    const data = await res.json()
    const events = []
    for (const key in data) {
        events.push(data[key])
    }
    return events
}

export async function getFeaturedEvents() {
    const events = await getAllEvents()
    return events.filter(e => e.isFeatured)
}

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter
    const events = await getAllEvents()
    return events.filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    })
}