export default {
    filters: JSON.parse(
        localStorage.getItem('filter')
    ) || [ "created_at" ],
    name: ""
}
