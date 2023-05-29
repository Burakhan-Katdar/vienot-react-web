function UtcWriter() {
    let timezoneExact = -(new Date().getTimezoneOffset() / 60)
    if (timezoneExact >= 0) {
        return '(UTC +' + timezoneExact + ')'
    } else {
        return '(UTC ' + timezoneExact + ')'
    }
}

export default UtcWriter