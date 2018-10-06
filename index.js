process.env.DISPLAY = ':0'
process.env.DBUS_SESSION_BUS_ADDRESS = 'unix:path=/home/pi/.agile/agile_bus/agile_bus_socket'
const DBus = require('dbus')
const got = require('got')

const bus = DBus.getBus('session')

got('users', {
    baseUrl: 'http://localhost:4000',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    body: {
        username: 'Andrej',
        orgName: 'agileiot'
    },
    form: true
}).then(data => {
    if (data && data.body) {
        data.body = JSON.parse(data.body)

        bus.getInterface('org.eclipse.agail.protocol.Dummy', '/org/eclipse/agail/protocol/Dummy', 'org.eclipse.agail.Protocol', (err, inter) => {
            setInterval(() => inter.Read('test', {}, (err, d) => {
                got('channels/sensors/chaincodes/sensorscc', {
                    baseUrl: 'http://localhost:4000',
                    headers: {
                        'authorization': `Bearer ${data.body.token}`,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
        		peers: ['peer0.test.vlf.zx.rs'],
        		fcn: 'changeSensorValue',
        		args: ['Sensor0', `${d[0]}`]
    		    })
		}).then(data => console.log('Write successfull', d[0]))
            }), 180000) // every 3 minutes, for test
        })
    }
})

