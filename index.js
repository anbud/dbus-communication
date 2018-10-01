process.env.DISPLAY = ':0'
process.env.DBUS_SESSION_BUS_ADDRESS = 'unix:path=/home/pi/.agile/agile_bus/agile_bus_socket'
const DBus = require('dbus')

const bus = DBus.getBus('session')

bus.getInterface('org.eclipse.agail.protocol.Dummy', '/org/eclipse/agail/protocol/Dummy', 'org.eclipse.agail.Protocol', (err, data) => {
    setInterval(() => data.Read('test', {}, (err, data) => console.log(data[0])), 1000)
})
