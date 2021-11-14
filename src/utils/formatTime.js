function formatTime (data) {
	const t = new Date(data)
	return `${t.getFullYear()}-${t.getMonth() < 10 ? '0' + t.getMonth() : t.getMonth()}-${t.getDate() < 10 ? '0' + t.getDate() : t.getDate()}`
}

export default formatTime
