# DBus communication module

## Description
A simple proof-of-concept communication module that stores dummy byte data from Agile IOT's [Dummy DBus protocol](https://github.com/Agile-IoT/agile-dummy-protocol) on Hyperledger Fabric blockchain.

It stores data on two Hyperledger channels, `sensors` and `shared`, every 1 minute and 1 hour, respectively. Both of the channels are hosted on our cloud infrastructure.

## Example chaincodes
Chaincodes used in this example are available [here](https://github.com/anbud/chaincodes).